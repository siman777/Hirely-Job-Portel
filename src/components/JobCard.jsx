import React from "react";
import { MapPinIcon, Trash2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link} from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteJob } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";


const JobCard = ({ job, isMyJob = false, OnJobSaved = () => {} }) => {
  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDelete = async () => {
  await fnDeleteJob();
  window.location.reload(); // This forces a full page reload
};
  return (
    <Card className="flex flex-col">
      {loadingDeleteJob && <BarLoader width={"100%"} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer hover:scale-110 transition"
              onClick={handleDelete}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {job.description}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
