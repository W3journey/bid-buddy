import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    id: 1,
    href: "/",
    label: "All Auctions",
  },
  {
    id: 2,
    href: "/items/create",
    label: "Create Auction",
  },
  {
    id: 3,
    href: "/auctions",
    label: "My Auctions",
  },
];

export async function Header() {
  const session = await auth();

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href={"/"} className="flex items-center gap-1 hover:underline">
            <Image src="/logo.png" width={"50"} height={"50"} alt="Logo" />
            BidBuddy.com
          </Link>
          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="flex items-center gap-1 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div>{session?.user?.name}</div>
          <div>{session ? <SignOut /> : <SignIn />}</div>
        </div>
      </div>
    </div>
  );
}
