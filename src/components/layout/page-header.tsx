import { Breadcrumbs, type Breadcrumb } from "@/components/ui/breadcrumbs";

export interface PageHeaderProps {
  breadcrumbs: Breadcrumb[];
  title: string;
  description?: string;
  meta?: string;
  children?: React.ReactNode;
}

/** Shared header block for internal public pages — breadcrumbs, title, intro, optional CTA row. */
function PageHeader({ breadcrumbs, title, description, meta, children }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Breadcrumbs items={breadcrumbs} />
        {meta && (
          <p className="mt-4 font-sans text-xs text-text-muted">{meta}</p>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl font-sans text-base text-text-muted">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

export { PageHeader };
