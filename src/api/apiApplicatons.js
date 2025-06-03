import { supabaseUrl } from "@/utils/supabase";
import supabaseClient from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  console.log("applyToJob function STARTED");

  const supabase = await supabaseClient(token);

  console.log("Received jobData:", jobData); // Check the incoming data

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  if (!jobData.resume || jobData.resume.length === 0) {
    console.error("No resume file detected");
    throw new Error("Resume file is missing.");
  }

  const file = jobData.resume; // Ensure we are sending the correct file object
  console.log("File being uploaded:", file);

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, file);

  if (storageError) {
    console.error("Upload error:", storageError);
    throw new Error("Error uploading Resume");
  }

  const resumeUrl = `${supabaseUrl}/storage/v1/object/public/resumes//${fileName}`;
  console.log("Resume URL:", resumeUrl);

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume: resumeUrl, // Store the file URL instead of the raw file
      },
    ])
    .select();

  console.log("Data being inserted into applications table:", {
    ...jobData,
    resume: resumeUrl,
  });

  if (error) {
    console.error("Database insertion error:", error);
    throw new Error("Error submitting Application");
  }

  console.log("Application submitted successfully:", data);
  return data;
}

export default async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .select("*,job:jobs(title,company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.log("error fetching Applications", error);
  }

  return data;
}
