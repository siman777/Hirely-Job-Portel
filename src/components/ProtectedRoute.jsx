import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" state={{ from: pathname }} />;
  }

  //protecting to go any URL without onboarding(first specify the role i.e candidate or recuiter)
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  return children;
}
