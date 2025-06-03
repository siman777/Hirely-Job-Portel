import CreateApplication from "@/components/CreateApplication";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { BarLoader } from "react-spinners";
import CreateJobs from "@/components/CreateJobs";

export default function MyJobs() {
  const { isLoading, user } = useUser();

  return (
    <div>
      {isLoading && <BarLoader width={"100%"} color="#36d7b7" />}
      <div>
        <h1 className="gradient-title font-extrabold text:5xl sm:text-7xl  text-center pb-8">
          {user?.unsafeMetadata?.role === "candidate"
            ? "My Applications"
            : "My Jobs"}
        </h1>

        {user?.unsafeMetadata?.role === "candidate" ? (
          <CreateApplication />
        ) : (
          <CreateJobs />
        )}
      </div>
    </div>
  );
}
