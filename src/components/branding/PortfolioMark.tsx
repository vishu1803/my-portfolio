/** Font-independent VN monogram shared by the PNG favicon and Apple touch icon. */
export default function PortfolioMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0b0b0c" />
      <path d="M9 18h6l6 25 6-25h6l-9 30h-6zM35 48V18h5l9 20V18h6v30h-5L41 28v20z" fill="#e9e2d0" />
      <path d="M46 7h9v4h-9z" fill="#b80f1a" />
    </svg>
  );
}
