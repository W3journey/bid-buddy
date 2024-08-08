import { ItemCard } from "@/components/item-card";
import { PageTitle } from "@/components/ui/page-title";
import { getAllItems } from "@/data-access/items";

export default async function Home() {
  const allItems = await getAllItems();

  return (
    <main className="space-y-8">
      <PageTitle>Items For Sale</PageTitle>
      <div className="grid grid-cols-4 gap-8">
        {allItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
