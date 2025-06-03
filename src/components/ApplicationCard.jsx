import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, BriefcaseBusiness, Download, School } from "lucide-react";

function ApplicationCard({ application, isCandidate = false }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.setAttribute("download", "resume.pdf");
    link.target = "_blank";
    link.click();
  };
  console.log(application.name)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold pl-8 ">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <div>
            <Download
              size={18}
              className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
              onClick={handleDownload}
            />
          </div>
        </CardTitle>
        <CardContent className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">
              <BriefcaseBusiness size={15} />
              {application?.experience} Years of Experience
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Box size={15} />
              {application?.skills}
            </div>
            <div className="flex flex-row gap-2 items-center">
              <School size={15} />
              {application?.education}
            </div>
          </div>
          <hr />
        </CardContent>
        <CardFooter className="felx flex-row justify-between">
          <span>{new Date(application?.created_at).toLocaleString()}</span>

        </CardFooter>
      </CardHeader>
    </Card>
  );
}

export default ApplicationCard;
