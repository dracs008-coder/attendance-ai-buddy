interface LogoProps { className?: string; dark?: boolean; }
export default function Logo({ className = "", dark = false }: LogoProps) {
  return (
    <img
      src="/gigaease-logo.png"
      alt="Site logo"
      className={`h-10 w-auto ${dark ? "brightness-0 invert" : ""} ${className}`}
      loading="lazy"
    />
  );
}
