export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
      <div className="aspect-[2/3] bg-muted animate-pulse" />
      <div className="space-y-4">
        <div className="h-6 w-20 bg-muted animate-pulse" />
        <div className="h-10 w-3/4 bg-muted animate-pulse" />
        <div className="h-4 w-1/2 bg-muted animate-pulse" />
        <div className="space-y-2 pt-4">
          <div className="h-3 w-full bg-muted animate-pulse" />
          <div className="h-3 w-full bg-muted animate-pulse" />
          <div className="h-3 w-2/3 bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}
