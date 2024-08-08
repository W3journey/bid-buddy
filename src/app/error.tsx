"use client";

import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);

  if (error.message === "Unauthorized") {
    return (
      <div className="mt-12 flex flex-col items-center space-y-8">
        <Image
          src={"/access_denied.svg"}
          alt="Access Denied"
          width={200}
          height={200}
        />
        <PageTitle>Unauthorized</PageTitle>
        <p>You need to be logged in to view this page.</p>
        <Button
          type="submit"
          className="space-x-2"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <span>Signin with GitHub</span>
          <Github />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <PageTitle>Something went wrong!</PageTitle>
    </div>
  );
}
