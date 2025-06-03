import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

export default function OnBoarding() {
  const { user, isLoaded } = useUser(); //clerk component
  {!isLoaded && <BarLoader width={"100%"} color="#36d7b7"/>}
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => { 
    //we can use user.update also but updateUser is new 
    console.log("clickded")
    await user.update({
      unsafeMetadata: { role },
    })
      .then(() => {
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className=" gradient-title text-7xl font-extrabold sm:text-8xl  tracking-tighter py-4 ">
        I am a..
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          className="h-36 text-2xl hover:brightness-90"
          variant="blue"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          className="h-36 text-2xl hover:brightness-90"
          variant="destructive"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
}
