import { Headphones, RefreshCcw, CreditCard } from 'lucide-react';

export default function Callouts() {
  const items = [
    { icon: Headphones, title: 'Atendimento', desc: 'Seg a Sex, 9h às 17h30' },
    {
      icon: RefreshCcw,
      title: 'Trocas e Devoluções',
      desc: 'Até 7 dias após a compra',
    },
    { icon: CreditCard, title: 'Parcelamento', desc: 'Em até 10x no cartão' },
  ];
  return (
    <section aria-label="Vantagens" className="grid sm:grid-cols-3 gap-3">
      {items.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="rounded border bg-card text-card-foreground p-4 flex items-center gap-3"
        >
          <Icon className="h-5 w-5 text-primary" aria-hidden />
          <div>
            <div className="font-semibold text-sm">{title}</div>
            <div className="text-xs text-muted-foreground">{desc}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
