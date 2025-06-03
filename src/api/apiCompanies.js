import { supabaseUrl } from "@/utils/supabase";
import { User } from "lucide-react";
import supabaseClient from "@/utils/supabase";

// Fetch all companies from the Supabase database
export async function getCompanies(token) {
  const supabase = await supabaseClient(token); // Get authenticated Supabase client

  const { data, error } = await supabase
    .from("companies") // target table
    .select("*"); // select all columns

  if (error) {
    console.error("Error fetching Companies:", error);
    return null;
  }

  return data; // return company data
}

export async function AddNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token); // Get authenticated Supabase client

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  const file = companyData.logo; // Ensure we are sending the correct file object
  console.log("File being uploaded:", file);
  console.log("File Type:", file.type);

  const { error: storageError } = await supabase.storage
    .from("comapany-logo") // Ensure the bucket name matches your Supabase storage bucket
    .upload(fileName, file);

  if (storageError) {
    console.error("Storage upload error:", storageError); // Log detailed error
  }

  // Ensure correct bucket name and avoid double slashes
  const logo_url = `${supabaseUrl}/storage/v1/object/public/comapany-logo/${fileName}`;
  console.log("Logo URL:", logo_url);

  const { data, error } = await supabase
    .from("companies")
    .insert([{ name: companyData.name, logo_url }])
    .select();

  if (error) {
    console.error("Error Adding new Companies:", error);
    throw new Error("Failed to add new company");
  }

  return data; // Return company data
}

export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);
  if (error) {
    console.log("error fetching jobs");
  }
  return data;
}
