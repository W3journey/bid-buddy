"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { items } from "@/db/schema";

export async function createItemAction({
  name,
  startingPrice,
  fileName,
}: {
  name: string;
  startingPrice: number;
  fileName: string;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  await database.insert(items).values({
    name,
    startingPrice,
    userId: user.id,
    fileKey: fileName,
  });

  redirect("/");
}
