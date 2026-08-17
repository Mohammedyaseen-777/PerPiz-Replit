import { useState } from 'react';
import { ArrowLeft, Check, Search } from 'lucide-react';
import { Link } from 'wouter';
import type { MenuItem, Variant } from '@/data/menu';
import { useCart } from '@/store/cart';
import { CartDrawer, CategoryTabs, Header, MenuSections, QrModal } from '@/components/perpiz-components';

export default function MenuPage() {
  const [filter, setFilter] = useState('ALL');
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [added, setAdded] = useState('');
  const { addItem } = useCart();

  const handleAdded = (item: MenuItem, variant: Variant) => {
    addItem(item, variant);
    setAdded(`${item.name} added`);
    window.setTimeout(() => setAdded(''), 1800);
  };

  return (
    <div className="noise min-h-[100dvh] bg-[#f6e6d6]">
      <Header onCart={() => setCartOpen(true)} onQr={() => setQrOpen(true)} />
      {added && <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#3b274b] px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[#fff6e9] shadow-xl reveal" role="status" data-testid="status-menu-item-added"><Check className="h-4 w-4 text-[#ffca3a]" /> {added}</div>}
      <main>
        <section className="border-b border-[#d9c5b5] bg-[#fffaf2] px-5 pb-10 pt-9 lg:px-8 lg:pb-14 lg:pt-14">
          <div className="mx-auto max-w-[1240px]">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-[#725f70] hover:text-[#ec4e2c]" data-testid="link-back-home"><ArrowLeft className="h-4 w-4" /> Back home</Link>
            <div className="mt-9 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#ec4e2c]">PerPiz · full menu</p><h1 className="mt-3 font-display text-[clamp(3.4rem,8vw,7rem)] font-extrabold leading-[.82] tracking-[-.1em] text-[#3b274b]">Choose your<br /><span className="text-[#ec4e2c]">kind of good.</span></h1><p className="mt-5 max-w-[520px] text-sm leading-relaxed text-[#806d7a]">Every pizza, side, slice, dip, crust and dessert. Made to order, served hot, and priced honestly in rupees.</p></div><div className="flex max-w-[360px] flex-col gap-3"><div className="flex items-center gap-2 rounded-full border border-[#ead9ca] bg-[#f6e6d6] px-4 py-3"><Search className="h-4 w-4 text-[#ec4e2c]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search everything" className="w-full bg-transparent text-sm text-[#3b274b] outline-none placeholder:text-[#9a8491]" aria-label="Search full menu" data-testid="input-full-menu-search" /></div><button onClick={() => setQrOpen(true)} className="rounded-full border border-[#3b274b] px-4 py-3 font-mono text-[10px] uppercase tracking-[.15em] text-[#3b274b] hover:bg-[#3b274b] hover:text-[#fffaf2]" data-testid="button-full-menu-qr">Open QR menu + download</button></div></div>
          </div>
        </section>
        <section className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8 lg:py-16">
          <CategoryTabs selected={filter} onSelect={setFilter} />
          <div className="mt-10"><MenuSections filter={filter} query={query} onAdded={handleAdded} /></div>
          <div className="mt-16 rounded-[24px] border border-[#d9c5b5] bg-[#fffaf2] p-6 text-center sm:p-8"><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#ec4e2c]">A quick note from the counter</p><p className="mx-auto mt-3 max-w-[640px] font-display text-xl font-bold leading-tight tracking-[-.04em] text-[#3b274b]">5% GST applies on all items. Orders placed cannot be cancelled. Maintain peace after your order is placed.</p><p className="mt-3 text-sm text-[#806d7a]">The variety that is present will be found. Tell suggestions at the counter.</p></div>
        </section>
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  );
}