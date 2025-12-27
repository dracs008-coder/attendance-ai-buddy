import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getPostsServer } from "../lib/server-data";

export type PostItem = {
  id: string;
  title: string;
  content?: string;
  date?: string;
  status?: string; // Draft / Scheduled / Published
  image?: string;
  views?: number;
};

type PostsContextValue = {
  posts: PostItem[];
  getPublished: () => PostItem[];
  getLatest: (count?: number) => PostItem[];
};

const PostsContext = createContext<PostsContextValue | undefined>(undefined);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const data = await getPostsServer();
      if (!cancel) setPosts(data as PostItem[]);
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const getPublished = () => posts.filter((p) => (p.status || "Published") === "Published");
  const getLatest = (count = 10) => {
    return [...getPublished()].slice(0, count);
  };

  return (
    <PostsContext.Provider value={{ posts, getPublished, getLatest }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within PostsProvider");
  return ctx;
}
