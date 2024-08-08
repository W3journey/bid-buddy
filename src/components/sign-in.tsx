import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button type="submit" className="space-x-2" variant={"secondary"}>
        <span>Signin with GitHub</span>
        <Github />
      </Button>
    </form>
  );
}
