import { getMyJobs } from '@/api/apiCompanies'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import JobCard from './JobCard'

const CreateJobs = () => {
  const {isLoading,user}=useUser()

  const {
    loading:loadingJobs,
    data:createdJobs,
    fn:fnJobs
  }=useFetch(getMyJobs,{recruiter_id:user.id})
  console.log(user.id)

  useEffect(()=>{
    if(user?.id)
    fnJobs()
  },[])
  return (
   <div>
    {loadingJobs && <BarLoader width={"100%"} color='#36d7b7'/>}
    <div className="mt-8 grid mid:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length > 0 ? (
            createdJobs?.map((job) => <JobCard key={job.id} job={job} isMyJob />)
          ) : (
            <div className="text-center text-lg mt-6">No jobs Found 😢</div>
          )}
        </div>

   </div>
  )
}

export default CreateJobs