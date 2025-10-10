const brands = ['Nutriplan', 'Forth', 'Tramontina', 'Trapp', 'Raiz', 'Yoorin'];

export default function BrandsStrip() {
  return (
    <section aria-label="Marcas" className="rounded border p-3 overflow-x-auto">
      <div className="flex items-center gap-6 text-sm">
        {brands.map((b) => (
          <a
            key={b}
            href={`/products?q=${encodeURIComponent(b)}`}
            className="font-medium hover:underline whitespace-nowrap"
          >
            {b}
          </a>
        ))}
      </div>
    </section>
  );
}
