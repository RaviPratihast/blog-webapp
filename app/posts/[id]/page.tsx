import { Metadata } from "next";
import PostContent from "./PostContent";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
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
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await getPost(id);
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

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div className="bg-[#F9F5FF] min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <PostContent postId={id} initialPost={post} />
      </div>
      <footer className="w-full bg-white mt-16">
        <div className="py-12">
          <nav className="flex justify-center space-x-8 mb-8">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 text-[12px]"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 text-[12px]"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 text-[12px]"
            >
              Contact
            </a>
          </nav>
          <p className="text-center text-gray-600 font-merriweather font-bold text-[14px] leading-[160%] tracking-[0%]">
            Copyright © {new Date().getFullYear()}, All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
