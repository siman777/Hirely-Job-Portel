import supabaseClient from "@/utils/supabase";
import { any } from "zod";

// This function fetches filtered job listings from Supabase
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), saved:saved_jobs(id)");

  // Apply filters BEFORE executing
  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  // Now execute the final query
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching jobs:", error);
    return null;
  }

  return data;
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*,company:companies(name,logo_url),applications:applications(*),recruiter:recruiter_id"
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen: isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error updating Job:", error);
    return null;
  }

  return data;
}

export async function addNewJobs(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error Creating Job:", error);
    return null;
  }

  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("jobs").delete().eq("id", job_id);
  if (error) {
    console.log("error deleting job", error);
    return null;
  }

  return data;
}
