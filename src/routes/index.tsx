import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  MapPin,
  Plane,
  Search,
  ShoppingBag,
  Building2,
  TrainFront,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { STORES, type TabId } from "@/lib/stores";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PriceWise — Compare Prices Across Major Stores" },
      {
        name: "description",
        content:
          "Compare prices for products, flights, hotels and trains across major stores in 8 countries and find the best deal instantly.",
      },
      { property: "og:title", content: "PriceWise — Compare Prices Across Major Stores" },
      {
        property: "og:description",
        content:
          "Search products, flights, hotels and trains and compare prices across the biggest retailers worldwide.",
      },
    ],
  }),
  component: Index,
});

const TABS = [
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Building2 },
  { id: "trains", label: "Trains", icon: TrainFront },
  { id: "travel", label: "Travel", icon: MapPin },
] as const;

const COUNTRIES = [
  { code: "US", flag: "🇺🇸", name: "USA", currency: "USD" },
  { code: "UK", flag: "🇬🇧", name: "UK", currency: "GBP" },
  { code: "IN", flag: "🇮🇳", name: "India", currency: "INR" },
  { code: "DE", flag: "🇩🇪", name: "Germany", currency: "EUR" },
  { code: "JP", flag: "🇯🇵", name: "Japan", currency: "JPY" },
  { code: "AU", flag: "🇦🇺", name: "Australia", currency: "AUD" },
  { code: "CA", flag: "🇨🇦", name: "Canada", currency: "CAD" },
  { code: "AE", flag: "🇦🇪", name: "UAE", currency: "AED" },
] as const;

const PLACEHOLDERS: Record<TabId, string> = {
  products: "iPhone 15, Nike Air Max, Samsung TV...",
  flights: "New York to London, JFK - LHR...",
  hotels: "Hotels in Tokyo, Paris city centre...",
  trains: "London to Manchester, Delhi to Jaipur...",
  travel: "Rome tours, Bali packages, museum tickets...",
};

function Index() {
  const [tab, setTab] = useState<TabId>("products");
  const [country, setCountry] = useState<string>("US");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const active = COUNTRIES.find((c) => c.code === country)!;
  const stores = STORES[tab][country] ?? [];

  const results = useMemo(
    () =>
      submitted
        ? stores.map((store) => ({ store, href: store.url(submitted) }))
        : [],
    [submitted, stores],
  );

  function runSearch(ev: React.FormEvent) {
    ev.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setTimeout(() => {
      setSubmitted(q);
      setLoading(false);
    }, 400);
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <header>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
                <path d="M13 2 4.5 13.5H10l-1 8.5L19.5 10H13.8z" />
              </svg>
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              PriceWise
            </h1>
          </div>
          <p className="mt-3 text-muted-foreground">
            Compare prices across all major stores worldwide
          </p>
        </header>

        <nav
          aria-label="Search category"
          className="mt-8 flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1.5 shadow-[var(--shadow-panel)]"
        >
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                tab === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>

        <section className="mt-6">
          <p className="text-sm text-muted-foreground">Select your country</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setCountry(c.code)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm transition-colors",
                  country === c.code
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-accent",
                )}
              >
                <span aria-hidden="true">{c.flag}</span>
                <span className="font-semibold">{c.name}</span>
                <span
                  className={cn(
                    "text-xs",
                    country === c.code ? "opacity-60" : "text-muted-foreground",
                  )}
                >
                  {c.currency}
                </span>
              </button>
            ))}
          </div>
        </section>

        <form onSubmit={runSearch} className="mt-7 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              placeholder={PLACEHOLDERS[tab]}
              aria-label="Search query"
              className="h-14 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-secondary px-8 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-accent disabled:opacity-70"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : null}
            Search
          </button>
        </form>

        <div className="mt-5 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-panel)]">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Searching across
          </p>
          <p className="mt-2 text-sm text-foreground">
            {stores.map((s) => s.name).join(", ")}
          </p>
        </div>

        {submitted ? (
          <section className="mt-10">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-foreground">
                “{submitted}” in {active.name}
              </h2>
              <span className="text-sm text-muted-foreground">{results.length} stores</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Open each store to see its live listings and current price for this search.
            </p>
            <ul className="mt-4 space-y-3">
              {results.map(({ store, href }) => (
                <li key={store.name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-ring hover:bg-accent/40"
                  >
                    <div>
                      <span className="font-semibold text-foreground">{store.name}</span>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Live results for “{submitted}”
                      </p>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground">
                      Open store <ExternalLink className="size-3.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="mt-20 flex flex-col items-center text-center">
            <Search className="size-16 text-muted" strokeWidth={1.5} />
            <h2 className="mt-6 text-2xl font-bold text-foreground">Start Comparing Prices</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Search for any product, flight, hotel, or train ticket to find the best deal across
              all stores in {active.name}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
