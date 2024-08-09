"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInClient() {
  return (
    <Button type="submit" className="space-x-2" onClick={() => signIn()}>
      <span>Sign In</span>
    </Button>
  );
}
