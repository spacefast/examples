import {
  Link,
  Route,
  Router,
  Routes,
  SignInWithGoogle,
  signOut,
  useAuth,
  useMutation,
  useQuery,
} from "@spacefast/zero/client";
import { useEffect, useState } from "preact/hooks";

import { cleanTodoText, type Todo } from "../shared/todo";

function RecipeBadge() {
  useEffect(() => {
    if (document.querySelector('script[data-example="zero-perfect"]')) return;
    const script = document.createElement("script");
    script.src = "https://spacefast.com/badge.js";
    script.dataset.example = "zero-perfect";
    document.body.append(script);
    return () => script.remove();
  }, []);
  return null;
}

function TodoPage() {
  const todos = useQuery<Todo[]>("todos");
  const addTodo = useMutation<[text: string], void>("addTodo");

  async function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const text = cleanTodoText(String(data.get("text") ?? ""));
    if (!text) return;
    await addTodo(text);
    form.reset();
  }

  return (
    <section>
      <h1>Zero Perfect</h1>
      <p>Realtime via Cast</p>
      <form onSubmit={(event) => void onSubmit(event)}>
        <input name="text" placeholder="Add a todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </section>
  );
}

function StatusPage() {
  const [status, setStatus] = useState("not checked");
  async function checkStatus() {
    const response = await fetch("/api/status");
    setStatus(response.ok ? await response.text() : "error " + response.status);
  }
  return (
    <section>
      <h1>Status</h1>
      <button type="button" onClick={() => void checkStatus()}>
        Check endpoint
      </button>
      <p>endpoint: {status}</p>
    </section>
  );
}

export function App() {
  const auth = useAuth();
  return (
    <Router>
      <RecipeBadge />
      <main>
        <header>
          <span>{auth.isLoading ? "checking session" : auth.displayName}</span>
          {!auth.isLoading && auth.isGuest ? (
            <SignInWithGoogle />
          ) : !auth.isLoading ? (
            <button type="button" onClick={() => signOut()}>
              Sign out
            </button>
          ) : null}
        </header>
        <nav>
          <Link to="/">Todos</Link>
          <Link to="/status">Status</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="*" element={<section><h1>Not found</h1><Link to="/">Back to todos</Link></section>} />
        </Routes>
      </main>
    </Router>
  );
}
