import { SearchForm } from "./search-form";

// Static shell — the interactive bit is the client component below.
export default function SearchPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2 border-b border-foreground/20 pb-6">
        <h1 className="text-2xl font-bold">Search</h1>
        <p className="text-xs text-muted-foreground">
          Client-side filtering · Server Action runs the query
        </p>
      </header>
      <SearchForm />
    </div>
  );
}
