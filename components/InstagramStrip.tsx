import Link from 'next/link';
import Image from 'next/image';

export default function InstagramStrip({
  items,
}: {
  items?: Array<{ id: string; image: string; url?: string }>;
}) {
  const sample = items ?? [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1558944351-c0bcb7ddce78',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    },
  ];
  return (
    <section aria-label="Instagram — Agro Mané" className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Siga nosso Instagram</h3>
        <a
          href="https://www.instagram.com/agropecuariadomane/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline"
        >
          @agropecuariadomane
        </a>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {sample.map((s) => (
          <Link
            key={s.id}
            href={s.url ?? 'https://www.instagram.com/agropecuariadomane/'}
            target="_blank"
            rel="noreferrer"
          >
            <div className="relative h-24 w-full rounded overflow-hidden border bg-muted">
              <Image
                src={s.image}
                alt="Instagram"
                fill
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
