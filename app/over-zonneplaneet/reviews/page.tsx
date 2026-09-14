import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Reviews van Zonneplaneet.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ReviewsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Reviews</h1>
      {/* TODO: Vul de reviews in. */}
      <p className="mt-4">TODO: tekst volgt.</p>
    </main>
  );
}
