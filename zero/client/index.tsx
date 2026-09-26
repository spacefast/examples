import { useState } from "preact/hooks";

import { useMutation, useQuery } from "@spacefast/zero/client";

type Comment = {
  id: string;
  authorName: string;
  avatarUrl: string;
  body: string;
  createdAt: string;
};

function formText(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
}

export function App() {
  const value = useQuery<Comment[]>("comments");
  const comments = Array.isArray(value) ? value : [];
  const commentsImageUrl = `/og/comments.png?comments=${comments.length}`;
  const addComment = useMutation<
    [authorName: string, authorEmail: string, body: string],
    { accepted: boolean }
  >("addComment");
  const [status, setStatus] = useState("");

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    setStatus("Posting…");
    try {
      const result = await addComment(
        formText(data, "name"),
        formText(data, "email"),
        formText(data, "comment"),
      );
      if (!result.accepted) {
        setStatus("That comment could not be posted.");
        return;
      }
      form.reset();
      setStatus("Posted.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not post the comment.");
    }
  }

  return (
    <main>
      <h1>Comments</h1>
      <section aria-labelledby="comments-image-heading">
        <h2 id="comments-image-heading">Generated social image</h2>
        <a href={commentsImageUrl} target="_blank" rel="noreferrer">
          <img src={commentsImageUrl} alt="Generated comments social card" width={600} />
        </a>
      </section>
      <form onSubmit={submit}>
        <label>
          Name <input name="name" required maxLength={80} />
        </label>
        <label>
          Email <input name="email" type="email" required maxLength={240} />
        </label>
        <label>
          Comment <textarea name="comment" required maxLength={2000} rows={5} />
        </label>
        <button type="submit">Post comment</button>
        <p role="status">{status}</p>
      </form>

      <ol aria-label="Comments">
        {comments.map((comment) => (
          <li key={comment.id}>
            <img src={comment.avatarUrl} width={40} height={40} alt="" />
            <div>
              <strong>{comment.authorName}</strong>{" "}
              <time dateTime={comment.createdAt}>
                {new Date(comment.createdAt).toLocaleString()}
              </time>
              <p>{comment.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
