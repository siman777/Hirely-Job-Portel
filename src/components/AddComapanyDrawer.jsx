import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useFetch from "@/hooks/use-fetch";
import { AddNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";

const schema = z.object({
  name: z.string().min(1, { message: "company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg" || file[0].type === "image/jpg" || file[0].type === "image/avif"),
      { message: "Only image is allowed" }
    ),
});

const AddComapanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddNewCompany,
    data: dataAddNewCompany,
    fn: fnAddNewCompany,
  } = useFetch(AddNewCompany);

  const onSubmit = (data) => {
    fnAddNewCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddNewCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Button variant="secondary" type="button" size="sm">
            Add Company
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add a new Company</DrawerTitle>
          </DrawerHeader>
          <form className="flex gap-2 pb-0">
            <Input placeholder="Company Name" {...register("name")} />
            <Input
              type="file"
              accept="image/*"
              className="file:text-grey-500"
              {...register("logo")}
            />
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              variant="destructive"
              className="w-40"
            >
              Add
            </Button>
          </form>
          {errors.name && (
            <p className="text-red-5000">{errors.name.message}</p>
          )}
          {errors.logo && (
            <p className="text-red-5000">{errors.logo.message}</p>
          )}
          {errorAddNewCompany?.message && (
            <p className="text-red-500">{errorAddNewCompany?.message}</p>
          )}
          {loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" />}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary" type="button">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddComapanyDrawer;
