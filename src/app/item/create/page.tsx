import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction } from "@/app/item/create/actions";

export default async function CreatePage() {
  return (
    <main className="container mx-auto space-y-8 py-12">
      <h1 className="text-4xl font-bold">Post an Item</h1>
      <form
        className="flex max-w-lg flex-col space-y-4 rounded-xl border p-8"
        action={createItemAction}
      >
        <Input required name="name" placeholder="Name your item" />
        <Input
          required
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
