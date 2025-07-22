export type ModuleMeta = { enabled: boolean; plan_min: string };
export type ModuleRegistry = Record<string, ModuleMeta>;

let cache: ModuleRegistry | null = null;

export async function fetchModuleRegistry(): Promise<ModuleRegistry> {
  if (cache) return cache;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000"}/api/v1/flags`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("failed to load module flags");
  cache = await res.json();
  return cache;
}
