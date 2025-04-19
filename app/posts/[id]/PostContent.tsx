"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useImages } from "../../context/ImageContext";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

async function getUser(userId: number): Promise<User> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

async function getComments(postId: string): Promise<Comment[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
      <div className="h-40 bg-gray-200 rounded mb-12"></div>
    </div>
  );
}

interface PostContentProps {
  postId: string;
  initialPost?: Post;
}

export default function PostContent({ postId, initialPost }: PostContentProps) {
  const { avatarPath, cardImagePath } = useImages();
  const [post, setPost] = useState<Post | null>(initialPost || null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(!initialPost);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!post) {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
          );
          if (!res.ok) throw new Error("Failed to fetch post");
          const postData = await res.json();
          setPost(postData);
        }

        if (post) {
          const [userData, commentsData] = await Promise.all([
            getUser(post.userId),
            getComments(postId),
          ]);
          setUser(userData);
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [postId, post]);

  if (loading || !post || !user) {
    return <Loading />;
  }

  return (
    <>
      <h1 className="text-[40px] font-semibold text-gray-900 mb-4">
        {post.title}
      </h1>

      <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden">
        <Image
          src={cardImagePath}
          alt="Post cover"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          <Image
            src={avatarPath}
            alt={user.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <p className="font-medium text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="prose max-w-none mb-12">
        <p className="text-gray-600 text-lg leading-relaxed">{post.body}</p>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-8">Comments</h2>
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 p-6 bg-gray-50 rounded-xl"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                <Image
                  src={avatarPath}
                  alt={comment.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {comment.name}
                  </h3>
                  <p className="text-sm text-gray-500">{comment.email}</p>
                </div>
                <p className="text-gray-600">{comment.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex items-center gap-4 border-t border-gray-200 pt-8">
        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
          <Image
            src={avatarPath}
            alt={user.name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <p className="font-medium text-gray-900">Written by {user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
    </>
  );
}
