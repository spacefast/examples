import { navigate } from "../hooks.js";

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

// An internal link that drives the hash router but still behaves like a real
// anchor (real href, keyboard + middle-click friendly).
export function Link({ to, className, children, ...rest }) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        // Let modified clicks (new tab) behave normally.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

// A blurred placeholder + graceful fallback for remote images that may 404.
export function SmartImage({ src, alt, className, ratio }) {
  return (
    <span className={`img-frame ${className || ""}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {src ? (
        <img
          src={src}
          alt={alt || ""}
          loading="lazy"
          onLoad={(e) => e.currentTarget.parentElement.classList.add("is-loaded")}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement.classList.add("is-broken");
          }}
        />
      ) : (
        <span className="img-empty" aria-hidden="true" />
      )}
    </span>
  );
}

export function Spinner({ label = "Loading" }) {
  return (
    <span className="spinner" role="status" aria-live="polite">
      <span className="spinner-ring" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </span>
  );
}

// Friendly, recoverable error panel.
export function ErrorState({ error, onRetry }) {
  return (
    <div className="state state-error" role="alert">
      <div className="state-emoji" aria-hidden="true">·_·</div>
      <h2 className="state-title">Something went sideways</h2>
      <p className="state-body">
        {error?.message || "We couldn't load this just now."}
      </p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, body }) {
  return (
    <div className="state">
      <div className="state-emoji" aria-hidden="true">···</div>
      <h2 className="state-title">{title}</h2>
      {body && <p className="state-body">{body}</p>}
    </div>
  );
}
