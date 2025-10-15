import { ReactNode } from 'react';

export default function Card({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-sm">{children}</div>
    </article>
  );
}
