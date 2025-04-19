import { Metadata } from "next";
import PostContent from "./PostContent";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function generateStaticParams() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );

  return posts.map((post: Post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const post = await getPost(params.id);
    return {
      title: post.title,
      description: post.body.slice(0, 160),
    };
  } catch {
    return {
      title: "Blog Post",
      description: "Loading blog post...",
    };
  }
}

export default function PostPage({ params }: PageProps) {
  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <PostContent postId={params.id} />
    </div>
  );
}
