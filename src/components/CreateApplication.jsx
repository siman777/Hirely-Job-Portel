
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";
import getApplications from "@/api/apiApplicatons";

const CreateApplication = () => {
    const {isLoading,user}=useUser()
    console.log("User ID:", user?.id);
  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications,{user_id:user.id});

  useEffect(()=>{
    fnApplications()

  },[])
  
  return <div className="flex flex-col gap-2">
    {loadingApplications && <BarLoader width={"100%"} color="#36d7b7"/>}
      {applications?.map((application) => {
            return (
              <ApplicationCard key={application.id} application={application}
              isCandidate />
            );
          })}
  </div>;
};

export default CreateApplication;
