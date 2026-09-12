import { SkeletonHeading, SkeletonTable } from "@/components/ui/skeleton";

export default function PortalLoading() {
  return (
    <div className="px-6 py-8">
      <SkeletonHeading />
      <div className="mt-6">
        <SkeletonTable />
      </div>
    </div>
  );
}
