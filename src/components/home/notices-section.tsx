import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { NEWS_ITEMS } from "@/lib/news";

function NoticesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-2xl font-semibold text-text sm:text-3xl">
          Recent notices
        </h2>
        <Link href="/news" className="font-sans text-sm font-medium text-secondary hover:underline">
          View all notices →
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {NEWS_ITEMS.map((item) => (
          <Link
            key={item.slug}
            href={`/news/${item.slug}`}
            className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-5 hover:border-secondary"
          >
            <div className="flex items-center justify-between gap-2">
              <time className="font-mono text-xs text-text-muted">{item.publishedAt}</time>
              {item.category === "STATUS_CHANGE" ? (
                <StatusBadge tone="warning" label="Status change" size="sm" />
              ) : (
                <StatusBadge tone="info" label="Routine" size="sm" />
              )}
            </div>
            <p className="font-sans text-sm font-semibold text-text">{item.title}</p>
            <p className="font-sans text-xs text-text-muted">{item.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export { NoticesSection };
