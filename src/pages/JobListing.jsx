import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";



const JobListing = () => {
  const { isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const {
    fn: fnJobs,
    data: jobs=[],
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data: companies=[] } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnJobs(); // fetch jobs
    }
  }, [isLoaded, company_id, searchQuery, location]);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies(); // fetch companies
    }
  }, [isLoaded]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(formData);
    const query = formData.get("search-query")?.trim();
    if (query) {
      setSearchQuery(query);
    }
  };

  const handleClearFilter = () => {
    setCompany_id("");
    setLocation("");
    setSearchQuery("");
  };

  // Show loader initially
  if (!isLoaded || jobs === undefined) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-10 flex gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by title.."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        ></Input>
        <Button variant="blue" type="submit" className="h-full sm:28">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2 ">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Search by location.." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Search by company.." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant="destructive"
          className="sm:w-1/2"
          onClick={handleClearFilter}
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="my-4" width={"100%"} color="#36d7b7" />
      )}

      {!loadingJobs && (
        <div className="mt-8 grid mid:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length > 0 ? (
            jobs?.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="text-center text-lg mt-6">No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
