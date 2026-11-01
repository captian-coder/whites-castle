import { ProductCard } from "@/components/ProductCard";

export function MenuProductGrid({ groupedCategories }: any) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 pb-12 sm:px-8">
      {groupedCategories.length > 0 ? (
        groupedCategories.map((group: any) => (
          <div key={group.id} id={`section-${group.id}`} className="mb-10 pt-4">
            <h2 className="mb-6 text-2xl font-black uppercase text-[#1c1917]">{group.label}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="py-12 text-center text-sm font-semibold text-neutral-400">
          No products found.
        </div>
      )}
    </div>
  );
}