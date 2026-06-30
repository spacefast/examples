// Tiny inline icon set (stroke-based, inherits currentColor). Keeps the bundle
// dependency-free and crisp at any size.
const S = ({ children, size = 18, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

export const IconBoard = (p) => (
  <S {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18M15 3v18" />
  </S>
);
export const IconList = (p) => (
  <S {...p}>
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </S>
);
export const IconSearch = (p) => (
  <S {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </S>
);
export const IconPlus = (p) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);
export const IconClose = (p) => (
  <S {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </S>
);
export const IconSun = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </S>
);
export const IconMoon = (p) => (
  <S {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
  </S>
);
export const IconCheck = (p) => (
  <S {...p}>
    <path d="M20 6 9 17l-5-5" />
  </S>
);
export const IconClock = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </S>
);
export const IconChat = (p) => (
  <S {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-12.1 7.6L3 21l1.9-5.9A8.4 8.4 0 1 1 21 11.5Z" />
  </S>
);
export const IconChecklist = (p) => (
  <S {...p}>
    <path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 16M11 6h10M11 12h10M11 18h10" />
  </S>
);
export const IconTrash = (p) => (
  <S {...p}>
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
  </S>
);
export const IconChevron = (p) => (
  <S {...p}>
    <path d="m9 18 6-6-6-6" />
  </S>
);
export const IconFlame = (p) => (
  <S {...p}>
    <path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.2.5-2 1-2.6C9 9.7 9 8 9 8c2 1 3-2 3-5Z" />
  </S>
);
export const IconReset = (p) => (
  <S {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5" />
  </S>
);
