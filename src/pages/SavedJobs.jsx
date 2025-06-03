import React from 'react'
import { BarLoader } from 'react-spinners';
import { useUser } from '@clerk/clerk-react';

export default function SavedJobs() {
  const { user,isLoaded } = useUser();
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>SavedJobs</div>
  )
}
