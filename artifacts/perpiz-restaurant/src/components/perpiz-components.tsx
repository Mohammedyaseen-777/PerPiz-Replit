import { useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  Flame,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  QrCode,
  Search,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react';
import type { MenuItem, Variant } from '@/data/menu';
import { categories, menuByCategory } from '@/data/menu';
import { useCart } from '@/store/cart';
import type { CartLine } from '@/store/cart';

export const rupees = (value: number) => `₹${value.toLocaleString('en-IN')}`;

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${inverse ? 'text-[#fff6e9]' : 'text-[#3b274b]'}`} data-testid="text-perpiz-wordmark">
      <span className="grid h-9 w-9 rotate-[-7deg] place-items-center rounded-[11px] bg-[#ec4e2c] text-sm font-black text-[#fff6e9] shadow-[3px_3px_0_#ffca3a]">P</span>
      <span className="font-display text-[1.4rem] font-extrabold tracking-[-0.08em]">PerPiz<span className="text-[#ec4e2c]">.</span></span>
    </span>
  );
}

export function Header({ onCart, onQr }: { onCart: () => void; onQr: () => void }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/#menu', label: 'Menu' },
    { href: '/#story', label: 'Our story' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#ead9ca] bg-[#fffaf2]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
        <Link href="/" className="shrink-0" data-testid="link-home-wordmark"><Wordmark /></Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`font-mono text-[10px] font-medium uppercase tracking-[.18em] transition-colors hover:text-[#ec4e2c] ${location === link.href ? 'text-[#ec4e2c]' : 'text-[#725f70]'}`} data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}>
              {link.label}
            </Link>
          ))}
          <button onClick={onQr} className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[.18em] text-[#725f70] transition-colors hover:text-[#ec4e2c]" data-testid="button-open-qr">
            <QrCode className="h-4 w-4" /> QR menu
          </button>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onCart} className="relative inline-flex h-11 items-center gap-2 rounded-full bg-[#3b274b] px-4 text-[#fff6e9] transition-transform hover:-translate-y-0.5 active:translate-y-0" data-testid="button-open-cart">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[.14em] sm:inline">Your cart</span>
            {count > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#ffca3a] px-1 text-[10px] font-bold text-[#3b274b]" data-testid="text-cart-count">{count}</span>}
          </button>
          <button onClick={() => setMobileOpen((open) => !open)} className="grid h-11 w-11 place-items-center rounded-full border border-[#ead9ca] text-[#3b274b] md:hidden" aria-label="Toggle mobile navigation" data-testid="button-toggle-mobile-nav">
            {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="border-t border-[#ead9ca] bg-[#fffaf2] px-5 py-4 md:hidden" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block border-b border-[#ead9ca] py-3 font-mono text-xs uppercase tracking-[.16em] text-[#3b274b]" data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}>{link.label}</Link>
          ))}
          <button onClick={() => { setMobileOpen(false); onQr(); }} className="flex w-full items-center gap-2 py-3 font-mono text-xs uppercase tracking-[.16em] text-[#ec4e2c]" data-testid="button-mobile-qr"><QrCode className="h-4 w-4" /> Open QR menu</button>
        </nav>
      )}
    </header>
  );
}

export function CategoryTabs({ selected, onSelect }: { selected: string; onSelect: (category: string) => void }) {
  return (
    <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu categories">
      {categories.map((category) => (
        <button key={category} onClick={() => onSelect(category)} role="tab" aria-selected={selected === category} className={`shrink-0 rounded-full border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[.14em] transition-all ${selected === category ? 'border-[#ec4e2c] bg-[#ec4e2c] text-[#fff6e9]' : 'border-[#ead9ca] bg-[#fffaf2] text-[#725f70] hover:border-[#ec4e2c] hover:text-[#ec4e2c]'}`} data-testid={`button-category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
          {category}
        </button>
      ))}
    </div>
  );
}

const categoryMark: Record<string, string> = {
  'CHEESE PIZZA': 'CHEESE',
  'VEG PIZZA': 'VEG',
  'NON-VEG PIZZA': 'MEAT',
  'FRENCH FRIES': 'FRIES',
  'GARLIC BREAD': 'BAKE',
  BURGER: 'STACK',
  PASTA: 'PASTA',
  DESSERTS: 'SWEET',
};

export function MenuItemCard({ item, onAdded }: { item: MenuItem; onAdded?: (item: MenuItem, variant: Variant) => void }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = item.variants[selectedIndex];
  return (
    <article className="group flex min-h-[214px] flex-col justify-between rounded-[22px] border border-[#ead9ca] bg-[#fffaf2] p-5 transition-all hover:-translate-y-1 hover:border-[#ec4e2c] hover:shadow-[0_18px_40px_rgba(59,39,75,.09)]" data-testid={`card-menu-item-${item.id}`}>
      <div>
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f6e6d6] font-mono text-[9px] font-medium uppercase leading-tight tracking-[.1em] text-[#ec4e2c]">{categoryMark[item.category] ?? item.category.slice(0, 5)}</div>
          {item.badge && <span className={`rounded-full px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[.12em] ${item.badge === 'BS' ? 'bg-[#ffca3a] text-[#3b274b]' : 'bg-[#e6efe6] text-[#47704d]'}`}>{item.badge === 'BS' ? 'Best seller' : 'Fan favourite'}</span>}
        </div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.08rem] font-bold leading-[1.05] tracking-[-.04em] text-[#3b274b]">{item.name}</h3>
          <span className="shrink-0 font-display text-[1.02rem] font-bold text-[#ec4e2c]">{rupees(selected.price)}</span>
        </div>
        {item.description && <p className="mt-2 max-w-[34rem] text-xs leading-relaxed text-[#806d7a]">{item.description}</p>}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        {item.variants.length > 1 ? (
          <div className="flex flex-wrap gap-1.5">
            {item.variants.map((variant, index) => (
              <button key={variant.label} onClick={() => setSelectedIndex(index)} className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.1em] ${index === selectedIndex ? 'border-[#3b274b] bg-[#3b274b] text-[#fff6e9]' : 'border-[#ead9ca] text-[#806d7a] hover:border-[#3b274b]'}`} aria-label={`Choose ${variant.label} for ${item.name}`} data-testid={`button-variant-${item.id}-${variant.label.toLowerCase().replace('-', '')}`}>{variant.label}</button>
            ))}
          </div>
        ) : <span className="font-mono text-[9px] uppercase tracking-[.12em] text-[#9a8491]">{item.variants[0].label}</span>}
        <button onClick={() => onAdded?.(item, selected)} className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-[#ec4e2c] px-3.5 font-mono text-[10px] uppercase tracking-[.1em] text-[#fff6e9] transition-transform hover:scale-105 active:scale-95" data-testid={`button-add-${item.id}`}>
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </div>
    </article>
  );
}

export function MenuSections({ filter, query, onAdded }: { filter: string; query: string; onAdded: (item: MenuItem, variant: Variant) => void }) {
  const visible = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return menuByCategory.filter(({ category }) => filter === 'ALL' || category === filter).map(({ category, items }) => ({
      category,
      items: lower ? items.filter((item) => `${item.name} ${item.description ?? ''}`.toLowerCase().includes(lower)) : items,
    })).filter(({ items }) => items.length > 0);
  }, [filter, query]);

  if (!visible.length) return <div className="rounded-[24px] border border-dashed border-[#d9c5b5] bg-[#fffaf2] px-6 py-16 text-center" data-testid="empty-menu-results"><Search className="mx-auto mb-3 h-7 w-7 text-[#ec4e2c]" /><h3 className="font-display text-xl font-bold text-[#3b274b]">Nothing by that name.</h3><p className="mt-2 text-sm text-[#806d7a]">Try a different craving or category.</p></div>;
  return <div className="space-y-12">{visible.map(({ category, items }) => <section key={category} id={category.toLowerCase().replace(/ /g, '-')}><div className="mb-5 flex items-end justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#ec4e2c]">PerPiz menu</p><h2 className="mt-1 font-display text-3xl font-extrabold tracking-[-.06em] text-[#3b274b]">{category}</h2></div><span className="font-mono text-[10px] uppercase tracking-[.12em] text-[#9a8491]">{items.length} picks</span></div><div className="grid gap-4 md:grid-cols-2">{items.map((item) => <MenuItemCard key={item.id} item={item} onAdded={onAdded} />)}</div></section>)}</div>;
}

function CartLineRow({ line, onChange }: { line: CartLine; onChange: (key: string, delta: number) => void }) {
  return <div className="flex items-center gap-3 border-b border-[#ead9ca] py-4" data-testid={`row-cart-${line.key}`}><div className="min-w-0 flex-1"><p className="font-display text-sm font-bold leading-tight text-[#3b274b]">{line.item.name}</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[.1em] text-[#9a8491]">{line.variant.label} · {rupees(line.variant.price)}</p></div><div className="flex items-center gap-2 rounded-full border border-[#ead9ca] px-1.5 py-1"><button className="grid h-6 w-6 place-items-center rounded-full text-[#3b274b] hover:bg-[#f6e6d6]" onClick={() => onChange(line.key, -1)} aria-label={`Decrease ${line.item.name}`} data-testid={`button-decrease-${line.key}`}><Minus className="h-3 w-3" /></button><span className="w-4 text-center font-mono text-xs" data-testid={`text-quantity-${line.key}`}>{line.quantity}</span><button className="grid h-6 w-6 place-items-center rounded-full bg-[#3b274b] text-[#fff6e9] hover:bg-[#ec4e2c]" onClick={() => onChange(line.key, 1)} aria-label={`Increase ${line.item.name}`} data-testid={`button-increase-${line.key}`}><Plus className="h-3 w-3" /></button></div><span className="w-14 text-right font-display text-sm font-bold text-[#ec4e2c]">{rupees(line.variant.price * line.quantity)}</span></div>;
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, subtotal, changeQuantity, clearCart } = useCart();
  const [branch, setBranch] = useState('Al-Burooj Store');
  if (!open) return null;
  const phone = branch === 'Al-Burooj Store' ? '917383186877' : '917383686877';
  const orderText = lines.map((line) => `${line.quantity}x ${line.item.name} (${line.variant.label})`).join(', ');
  const orderHref = `tel:+${phone}?body=${encodeURIComponent(`Hi PerPiz, I want to order: ${orderText}. Total: ${rupees(Math.round(subtotal * 1.05))}. Branch: ${branch}.`)}`;
  return <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Your cart" data-testid="dialog-cart"><button className="absolute inset-0 bg-[#3b274b]/40 backdrop-blur-sm" onClick={onClose} aria-label="Close cart backdrop" data-testid="button-close-cart-backdrop" /><aside className="absolute right-0 top-0 flex h-[100dvh] w-full max-w-[440px] flex-col bg-[#fffaf2] shadow-[-15px_0_50px_rgba(59,39,75,.16)]"><div className="flex items-center justify-between border-b border-[#ead9ca] px-6 py-5"><div><p className="font-mono text-[10px] uppercase tracking-[.18em] text-[#ec4e2c]">The good part</p><h2 className="font-display text-2xl font-extrabold tracking-[-.06em] text-[#3b274b]">Your cart</h2></div><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-[#ead9ca] text-[#3b274b]" aria-label="Close cart" data-testid="button-close-cart"><X className="h-5 w-5" /></button></div>{lines.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#f6e6d6] text-[#ec4e2c]"><ShoppingBag /></div><h3 className="font-display text-xl font-bold text-[#3b274b]">Your cart is taking a nap.</h3><p className="mt-2 text-sm text-[#806d7a]">Add something hot and crisp from the menu.</p><button onClick={onClose} className="mt-6 rounded-full bg-[#ec4e2c] px-5 py-3 font-mono text-[10px] uppercase tracking-[.14em] text-[#fff6e9]" data-testid="button-browse-menu">Browse menu</button></div> : <><div className="flex-1 overflow-y-auto px-6">{lines.map((line) => <CartLineRow key={line.key} line={line} onChange={changeQuantity} />)}<button onClick={clearCart} className="mt-4 font-mono text-[10px] uppercase tracking-[.14em] text-[#9a8491] underline decoration-[#ec4e2c] underline-offset-4 hover:text-[#ec4e2c]" data-testid="button-clear-cart">Clear cart</button></div><div className="border-t border-[#ead9ca] bg-[#f9efdf] px-6 py-5"><label htmlFor="branch-select" className="mb-2 block font-mono text-[10px] uppercase tracking-[.15em] text-[#725f70]">Choose your branch</label><div className="relative"><select id="branch-select" value={branch} onChange={(event) => setBranch(event.target.value)} className="w-full appearance-none rounded-xl border border-[#ddc9b9] bg-[#fffaf2] px-3 py-3 font-display text-sm font-bold text-[#3b274b]" data-testid="select-checkout-branch"><option>Al-Burooj Store</option><option>Sonal Store</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-[#ec4e2c]" /></div><div className="mt-4 flex items-end justify-between"><span className="font-mono text-[10px] uppercase tracking-[.15em] text-[#725f70]">Subtotal + 5% GST</span><span className="font-display text-2xl font-extrabold text-[#3b274b]">{rupees(Math.round(subtotal * 1.05))}</span></div><a href={orderHref} onClick={onClose} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#ec4e2c] py-4 font-mono text-[11px] uppercase tracking-[.16em] text-[#fff6e9] transition-transform hover:-translate-y-0.5" data-testid="link-call-to-order">Call {branch} <Phone className="h-4 w-4" /></a><p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[.1em] text-[#9a8491]">Orders placed cannot be cancelled</p></div></>}</aside></div>;
}

export function QrModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const menuUrl = `${window.location.origin}/menu`;
  if (!open) return null;
  const qr = `https://quickchart.io/qr?text=${encodeURIComponent(menuUrl)}&size=280&margin=2&dark=3b274b&light=fffaf2`;
  const downloadMenu = () => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>PerPiz — The Perfect Pizza</title><style>body{font-family:Arial,sans-serif;max-width:900px;margin:40px auto;color:#3b274b}h1{color:#ec4e2c}h2{border-bottom:1px solid #ddd;padding-bottom:8px}li{margin:7px 0}small{color:#806d7a}</style></head><body><h1>PerPiz.</h1><p>PerPiz The Perfect Pizza · ALWAYS FRESH ALWAYS CRISP</p>${menuByCategory.map(({ category, items }) => `<h2>${category}</h2><ul>${items.map((item) => `<li><strong>${item.name}</strong> — ${item.variants.map((variant) => `${variant.label}: ₹${variant.price}`).join(' / ')}${item.badge ? ` · ${item.badge === 'BS' ? 'Best seller' : 'Fan favourite'}` : ''}${item.description ? `<br><small>${item.description}</small>` : ''}</li>`).join('')}</ul>`).join('')}<p>5% GST applicable on all items. Orders placed cannot be cancelled.</p></body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'perpiz-complete-menu.html';
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return <div className="fixed inset-0 z-[60] grid place-items-center bg-[#3b274b]/55 px-5 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="QR menu" data-testid="dialog-qr"><div className="relative max-h-full w-full max-w-[460px] overflow-y-auto rounded-[28px] bg-[#fffaf2] p-6 shadow-2xl sm:p-8"><button onClick={onClose} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-[#ead9ca] text-[#3b274b]" aria-label="Close QR menu" data-testid="button-close-qr"><X className="h-4 w-4" /></button><div className="pr-8"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#ec4e2c]">Scan, browse, order</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-.07em] text-[#3b274b]">The whole menu,<br /><span className="text-[#ec4e2c]">in your pocket.</span></h2></div><div className="mx-auto mt-7 grid w-fit place-items-center rounded-2xl border-8 border-[#3b274b] bg-[#fffaf2] p-2"><img src={qr} alt="QR code linking to the PerPiz menu" className="h-52 w-52" data-testid="img-menu-qr" /></div><p className="mt-5 text-center text-sm leading-relaxed text-[#806d7a]">Open the complete PerPiz menu on your phone, or keep it for later.</p><div className="mt-6 flex flex-col gap-2 sm:flex-row"><Link href="/menu" onClick={onClose} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#ec4e2c] py-3.5 font-mono text-[10px] uppercase tracking-[.14em] text-[#fff6e9]" data-testid="link-open-full-menu">Open full menu <ArrowRight className="h-4 w-4" /></Link><button onClick={downloadMenu} className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#3b274b] py-3.5 font-mono text-[10px] uppercase tracking-[.14em] text-[#3b274b]" data-testid="button-download-menu">Download menu <ArrowRight className="h-4 w-4" /></button></div></div></div>;
}

export function TrustStrip() {
  return <div className="grid gap-px overflow-hidden rounded-[22px] bg-[#d9c5b5] sm:grid-cols-3"><div className="bg-[#3b274b] p-5 text-[#fff6e9]"><Star className="mb-5 h-5 w-5 text-[#ffca3a] fill-[#ffca3a]" /><p className="font-display text-3xl font-extrabold">4.8<span className="text-[#ec4e2c]">/5</span></p><p className="mt-1 font-mono text-[10px] uppercase tracking-[.15em] text-[#cdbdca]">Neighbourhood approved</p></div><div className="bg-[#f6e6d6] p-5 text-[#3b274b]"><Clock3 className="mb-5 h-5 w-5 text-[#ec4e2c]" /><p className="font-display text-3xl font-extrabold">15–35</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[.15em] text-[#806d7a]">Minutes to your door</p></div><div className="bg-[#ffca3a] p-5 text-[#3b274b]"><Flame className="mb-5 h-5 w-5 text-[#ec4e2c]" /><p className="font-display text-3xl font-extrabold">12 PM–3 AM</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[.15em] text-[#725f70]">For late-night cravings</p></div></div>;
}

export function BranchCard({ name, hours, line, phones }: { name: string; hours: string; line: string; phones: string[] }) {
  return <div className="rounded-[22px] border border-[#ead9ca] bg-[#fffaf2] p-5" data-testid={`card-branch-${name.toLowerCase().replace(/[^a-z]+/g, '-')}`}><div className="flex items-start justify-between gap-3"><div><h3 className="font-display text-xl font-bold tracking-[-.05em] text-[#3b274b]">{name}</h3><p className="mt-1 font-mono text-[10px] uppercase tracking-[.12em] text-[#ec4e2c]">{hours}</p></div><MapPin className="h-5 w-5 text-[#ec4e2c]" /></div><p className="mt-5 border-t border-[#ead9ca] pt-4 text-sm text-[#806d7a]">{line}</p><div className="mt-3 flex flex-wrap gap-2">{phones.map((phone) => <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#f6e6d6] px-3 py-2 font-mono text-[10px] text-[#3b274b]" data-testid={`link-phone-${phone.replace(/\s/g, '')}`}><Phone className="h-3 w-3 text-[#ec4e2c]" />{phone}</a>)}</div></div>;
}