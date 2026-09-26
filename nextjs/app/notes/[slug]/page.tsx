import type { Metadata } from "next";
import { notFound } from "next/navigation";

const notes = {
  "runtime-boundaries": {
    title: "Put the runtime where the answer changes",
    body: [
      "A server is useful when the request changes the answer: authentication, fresh data, mutations, or a computation that belongs near the user.",
      "Everything else should be allowed to become a file. A clear runtime boundary makes the fast path obvious and the expensive path intentional.",
    ],
  },
} as const;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = notes[(await params).slug as keyof typeof notes];
  return { title: note?.title ?? "Note not found" };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = notes[slug as keyof typeof notes];
  if (!note) notFound();
  return <article className="prose"><p className="eyebrow">Field note · {slug}</p><h1>{note.title}</h1>{note.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a href="/">← Back to dispatch</a></article>;
}
