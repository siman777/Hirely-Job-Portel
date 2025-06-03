import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

export const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);
  const handleOverLayClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-36" alt="Logo" />
        </Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button varient="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {/* - The ?. (optional chaining) ensures that if user or unsafeMetadata is undefined or null, it won’t cause an error.
             */}
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  href="/my-jobs"
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]"
          onClick={handleOverLayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            signUpFallbackRedirectUrl="/onboarding"
            // like backup URL
          />
        </div>
      )}
    </>
  );
};
