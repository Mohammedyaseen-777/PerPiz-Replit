import { useState } from 'react';
import { ArrowDownRight, ArrowRight, Check, ChevronRight, Instagram, Search, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@/assets/perpiz-hero.jpg';
import spreadImage from '@/assets/perpiz-spread.jpg';
import type { MenuItem, Variant } from '@/data/menu';
import { useCart } from '@/store/cart';
import { BranchCard, CartDrawer, CategoryTabs, Header, MenuSections, QrModal, TrustStrip, Wordmark } from '@/components/perpiz-components';

export default function Storefront() {
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
    <div className="noise min-h-[100dvh] bg-[#fffaf2]">
      <Header onCart={() => setCartOpen(true)} onQr={() => setQrOpen(true)} />
      {added && <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#3b274b] px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[#fff6e9] shadow-xl reveal" role="status" data-testid="status-item-added"><Check className="h-4 w-4 text-[#ffca3a]" /> {added}</div>}

      <main>
        <section className="mx-auto max-w-[1240px] px-5 pb-14 pt-10 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
            <div className="reveal">
              <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.2em] text-[#ec4e2c]"><span className="h-px w-8 bg-[#ec4e2c]" /> ALWAYS FRESH ALWAYS CRISP</div>
              <h1 className="max-w-[620px] font-display text-[clamp(3.9rem,9vw,8.2rem)] font-extrabold leading-[.82] tracking-[-.1em] text-[#3b274b]">The perfect<br /><span className="text-[#ec4e2c]">pizza</span> exists.</h1>
              <p className="mt-7 max-w-[420px] text-[1.05rem] leading-relaxed text-[#725f70]">Hot, crisp and properly loaded. Your late-night neighbourhood spot for the kind of meal that fixes the day.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#menu" className="inline-flex items-center gap-3 rounded-full bg-[#ec4e2c] px-6 py-4 font-mono text-[11px] uppercase tracking-[.15em] text-[#fff6e9] transition-transform hover:-translate-y-1" data-testid="link-hero-order">Order your fix <ArrowRight className="h-4 w-4" /></a>
                <button onClick={() => setQrOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-[#3b274b] px-5 py-4 font-mono text-[11px] uppercase tracking-[.15em] text-[#3b274b] transition-colors hover:bg-[#3b274b] hover:text-[#fff6e9]" data-testid="button-hero-qr">Scan menu <Sparkles className="h-4 w-4" /></button>
              </div>
              <div className="mt-8 flex items-center gap-4"><div className="flex -space-x-2"><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#fffaf2] bg-[#f4b39d] font-mono text-[9px] text-[#3b274b]">AK</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#fffaf2] bg-[#ffca3a] font-mono text-[9px] text-[#3b274b]">RS</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#fffaf2] bg-[#bfd4c1] font-mono text-[9px] text-[#3b274b]">NK</span></div><span className="font-mono text-[10px] uppercase tracking-[.13em] text-[#806d7a]">Loved around the block</span></div>
            </div>
            <div className="relative reveal reveal-delay-1">
              <div className="absolute -right-3 top-5 z-10 rotate-6 rounded-2xl bg-[#ffca3a] px-4 py-3 text-center shadow-lg lg:right-0"><span className="block font-display text-2xl font-extrabold leading-none text-[#3b274b]">4.8</span><span className="font-mono text-[8px] uppercase tracking-[.1em] text-[#3b274b]">rated by locals</span></div>
              <div className="absolute -bottom-7 -left-4 z-10 w-40 -rotate-6 rounded-2xl bg-[#3b274b] p-4 text-[#fff6e9] shadow-xl lg:-left-8"><p className="font-mono text-[9px] uppercase tracking-[.14em] text-[#ffca3a]">Tonight's move</p><p className="mt-2 font-display text-lg font-bold leading-tight">PerPiz Special<br />+ cheese burst</p></div>
              <div className="aspect-[.92] overflow-hidden rounded-[42px] rounded-br-[110px] rounded-tl-[110px] bg-[#3b274b] shadow-[18px_24px_0_#f6e6d6]"><img src={heroImage} alt="Hot PerPiz pizza with golden bubbling cheese" className="h-full w-full object-cover" data-testid="img-hero-pizza" /></div>
              <div className="absolute -bottom-8 right-12 h-16 w-16 rounded-full border border-dashed border-[#ec4e2c] lg:right-20" />
            </div>
          </div>
        </section>

        <section className="border-y border-[#3b274b] bg-[#3b274b] text-[#fff6e9]">
          <div className="mx-auto flex max-w-[1240px] items-center gap-8 overflow-hidden px-5 py-4 lg:px-8"><div className="flex shrink-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[.2em] text-[#ffca3a]"><span className="h-2 w-2 rounded-full bg-[#ec4e2c]" /> Open late</div><p className="whitespace-nowrap font-display text-[1.05rem] font-bold tracking-[-.03em]">The kind of crisp you can hear.</p><div className="hidden h-px flex-1 bg-[#634c69] sm:block" /><span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[.16em] text-[#bfaebd] sm:inline">PerPiz The Perfect Pizza</span></div>
        </section>

        <section className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24" id="story">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#ec4e2c]">Why PerPiz?</p><h2 className="mt-3 font-display text-4xl font-extrabold leading-[.95] tracking-[-.08em] text-[#3b274b] sm:text-5xl">A little extra<br /><span className="text-[#ec4e2c]">never hurt.</span></h2><p className="mt-5 text-sm leading-relaxed text-[#806d7a]">We make the food we want after 11pm: generous, crunchy at the edges, saucy in the middle, and always worth the wait.</p><Link href="/menu" className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-[#3b274b] underline decoration-[#ec4e2c] decoration-2 underline-offset-8" data-testid="link-story-menu">See every craving <ArrowRight className="h-4 w-4 text-[#ec4e2c]" /></Link></div>
            <TrustStrip />
          </div>
        </section>

        <section className="bg-[#f6e6d6] px-5 py-16 lg:px-8 lg:py-24" id="menu">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#ec4e2c]">Made for right now</p><h2 className="mt-2 font-display text-5xl font-extrabold tracking-[-.08em] text-[#3b274b] sm:text-6xl">Pick your<br />perfect.</h2></div><div className="flex w-full max-w-[340px] items-center gap-2 rounded-full border border-[#ddc9b9] bg-[#fffaf2] px-4 py-3"><Search className="h-4 w-4 text-[#ec4e2c]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the menu" className="w-full bg-transparent text-sm text-[#3b274b] outline-none placeholder:text-[#9a8491]" aria-label="Search menu" data-testid="input-search-menu" /></div></div>
            <CategoryTabs selected={filter} onSelect={setFilter} />
            <div className="mt-10"><MenuSections filter={filter} query={query} onAdded={handleAdded} /></div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] gap-8 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
          <div className="relative min-h-[350px] overflow-hidden rounded-[30px] bg-[#3b274b]"><img src={spreadImage} alt="PerPiz pizza, loaded fries and garlic bread spread" className="absolute inset-0 h-full w-full object-cover opacity-80" data-testid="img-menu-spread" /><div className="absolute inset-0 bg-gradient-to-t from-[#3b274b] via-transparent to-transparent" /><div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-[#fff6e9]"><div><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#ffca3a]">Good food, no small talk</p><h2 className="mt-2 font-display text-3xl font-extrabold leading-none tracking-[-.06em]">Bring the whole<br />street home.</h2></div><ArrowDownRight className="h-8 w-8 text-[#ffca3a]" /></div></div>
          <div className="flex flex-col justify-center rounded-[30px] bg-[#ffca3a] p-7 sm:p-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#725f70]">No second guessing</p><h2 className="mt-3 font-display text-4xl font-extrabold leading-[.9] tracking-[-.08em] text-[#3b274b]">See it all.<br />Order easy.</h2><p className="mt-5 max-w-[320px] text-sm leading-relaxed text-[#725f70]">Our QR menu has every pizza, slice, dip, crust and late-night dessert in one neat place.</p><button onClick={() => setQrOpen(true)} className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#3b274b] px-5 py-3.5 font-mono text-[10px] uppercase tracking-[.15em] text-[#fff6e9]" data-testid="button-spread-qr">Get the QR menu <ChevronRight className="h-4 w-4 text-[#ffca3a]" /></button></div>
        </section>

        <section className="border-t border-[#ead9ca] bg-[#fbf2e7] px-5 py-16 lg:px-8 lg:py-20" id="visit">
          <div className="mx-auto max-w-[1240px]"><div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#ec4e2c]">Come say hi</p><h2 className="mt-2 font-display text-4xl font-extrabold tracking-[-.07em] text-[#3b274b]">Your nearest<br />slice of home.</h2></div><p className="max-w-[280px] text-sm leading-relaxed text-[#806d7a]">Pick a branch, give us a ring, and we will get the oven going.</p></div><div className="grid gap-4 md:grid-cols-2"><BranchCard name="Al-Burooj Store" hours="12pm–12am" line="Now delivering too." phones={['+91 7383 186877']} /><BranchCard name="Sonal Store" hours="5pm–3am" line="For all your late-night foodies." phones={['+91 73836 86877', '+91 73835 26877']} /></div></div>
        </section>
      </main>

      <footer className="bg-[#3b274b] px-5 py-10 text-[#fff6e9] lg:px-8"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col justify-between gap-8 md:flex-row"><div><Wordmark inverse /><p className="mt-4 max-w-[270px] text-sm leading-relaxed text-[#cdbdca]">Hot, crisp, proudly local. PerPiz The Perfect Pizza.</p></div><div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[.14em] text-[#cdbdca]"><a href="#menu" className="hover:text-[#ffca3a]" data-testid="link-footer-menu">Menu</a><a href="#visit" className="hover:text-[#ffca3a]" data-testid="link-footer-visit">Branches</a><a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#ffca3a]" data-testid="link-instagram"><Instagram className="h-3.5 w-3.5" /> Instagram</a></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-[#634c69] pt-5 font-mono text-[9px] uppercase tracking-[.12em] text-[#9d879d] sm:flex-row"><span>© PerPiz · The perfect pizza</span><span>5% GST applicable on all items</span></div></div></footer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  );
}