export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-1/3 bg-muted animate-pulse" />
      <div className="h-4 w-2/3 bg-muted animate-pulse" />
      <div className="h-4 w-1/2 bg-muted animate-pulse" />
    </div>
  );
}
