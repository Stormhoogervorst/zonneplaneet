import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Pagina niet gevonden</h1>
      <p className="mt-4">Deze pagina bestaat niet of is verplaatst.</p>
      <Link className="mt-6 inline-block underline" href="/">
        Ga terug naar de homepage
      </Link>
    </main>
  );
}
