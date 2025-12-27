interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number; // pixels
  name?: string; // for fallback initials
}

export default function Avatar({ src, alt = "avatar", size = 32, name }: AvatarProps) {
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase() : "?";
  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center rounded-full overflow-hidden bg-gray-300 text-xs font-semibold text-white"
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          onError={e => (e.currentTarget.style.display = "none")}
        />
      ) : (
        initials
      )}
    </div>
  );
}
