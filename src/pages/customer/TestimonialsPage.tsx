import { useState } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  rating: number;
  content: string;
  status: "pending" | "approved" | "rejected";
  imageUrl?: string;
}

export default function TestimonialsPage() {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = () => {
    if (rating === 0 || content.trim().length < 20) return;
    const newItem: Testimonial = {
      id: Date.now().toString(),
      rating,
      content: content.trim(),
      status: "pending",
      imageUrl: previewUrl || undefined,
    };
    setTestimonials(prev => [newItem, ...prev]);
    setRating(0);
    setContent("");
    setImageFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Testimonials</h2>
      <p className="text-gray-600 max-w-prose">
        Share your experience with GigaEase. Your testimonial will be reviewed and
        shown on our homepage after approval.
      </p>

      {/* Form */}
      <div className="card p-6 space-y-4 max-w-lg">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <button
              key={i}
              onClick={() => setRating(i)}
              className={`${rating >= i ? "text-yellow-400" : "text-gray-300"}`}
              aria-label={`Set rating ${i}`}
            >
              <Star className="w-5 h-5" fill={rating >= i ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write at least 20 characters..."
          className="w-full h-24 border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue"
        />
        {/* Image upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Optional photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0] || null;
              setImageFile(file ?? null);
              if (file) {
                const reader = new FileReader();
                reader.onload = ev => setPreviewUrl(ev.target?.result as string);
                reader.readAsDataURL(file);
              } else {
                setPreviewUrl(null);
              }
            }}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-blue file:text-white hover:file:bg-primary-700"
          />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="h-24 w-auto rounded-md border" />
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={rating === 0 || content.trim().length < 20}
          className="btn-primary disabled:opacity-50"
        >
          Submit Testimonial
        </button>
      </div>

      {/* List */}
      {testimonials.length > 0 && (
        <div className="space-y-4 max-w-xl">
          {testimonials.map(t => (
            <div key={t.id} className="border p-4 rounded-md bg-white shadow-sm">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4"
                    fill={idx < t.rating ? "#FACC15" : "none"}
                    color={idx < t.rating ? "#FACC15" : "#D1D5DB"}
                  />
                ))}
                <span className="ml-auto text-xs capitalize text-gray-500">{t.status}</span>
              </div>
              {t.imageUrl && (
                <img src={t.imageUrl} alt="testimonial" className="h-24 w-auto rounded-md mb-2" />
              )}
              <p className="text-sm text-gray-700 whitespace-pre-line">{t.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
