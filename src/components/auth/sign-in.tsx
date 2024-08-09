import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit" className="space-x-2" variant={"secondary"}>
        <span>Sign In</span>
      </Button>
    </form>
  );
}
