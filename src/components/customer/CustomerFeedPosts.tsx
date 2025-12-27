import { Eye } from "lucide-react";
import { usePosts } from "../../contexts/PostsContext";

export default function CustomerFeedPosts({ count = 10 }: { count?: number }) {
  const { getLatest } = usePosts();
  const posts = getLatest(count);

  if (!posts.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Latest from GigaEase</h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
        {posts.map((p) => (
          <li key={p.id} className="flex items-center gap-3 py-2">
            {p.image ? (
              <img src={p.image} alt="" className="h-9 w-9 rounded object-cover" />
            ) : (
              <div className="grid h-9 w-9 place-content-center rounded bg-gray-100 text-gray-400 dark:bg-gray-800">📝</div>
            )}
            <div className="flex-1">
              <p className="truncate font-medium text-gray-800 dark:text-gray-200">{p.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Eye className="h-3 w-3" /> {p.views ?? 0} views
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
