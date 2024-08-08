"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "@/app/items/create/actions";
import { UploadButton } from "@/lib/uploadthing";
import { PageTitle } from "@/components/ui/page-title";

export default function CreatePage() {
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!fileName) {
      toast.error("Please upload an image");
      return;
    }

    const name = formData.get("name") as string;
    const startingPrice = Number(formData.get("startingPrice")) * 100;

    await createItemAction({
      name,
      startingPrice,
      fileName,
    });
  };

  return (
    <main className="space-y-8">
      <PageTitle>Post an Item</PageTitle>
      <form
        className="flex max-w-lg flex-col space-y-4 rounded-xl border p-8"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input required name="name" placeholder="Name your item" />
        <Input
          required
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            toast("Uploaded!");
            setFileName(res[0].key);
          }}
          onUploadError={(error: Error) => {
            toast.error("Error: " + error.message);
          }}
        />
        <Button className="self-end" type="submit" disabled={!fileName}>
          Post Item
        </Button>
      </form>
    </main>
  );
}
