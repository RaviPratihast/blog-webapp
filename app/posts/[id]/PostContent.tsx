"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useImages } from "../../context/ImageContext";
import { v4 as uuidv4 } from "uuid";
import PostContentSkeleton from "../../components/PostContentSkeleton";

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
  id: string;
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
  const [newComment, setNewComment] = useState("");
  const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);

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

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: uuidv4(),
      postId: parseInt(postId),
      name: "Anonymous User",
      email: "anonymous@example.com",
      body: newComment,
    };

    setComments([...comments, comment]);
    setNewComment("");
    setIsCommentFormVisible(false);
  };

  if (loading || !post || !user) {
    return <PostContentSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <main className="max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-[40px] font-semibold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.25)]">
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
                <div key={comment.id} className="bg-white rounded-xl p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {comment.name}
                    </h3>
                    <p className="text-gray-600">{comment.body}</p>
                  </div>

                  <div className="flex items-center gap-3 mt-4 justify-end">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      <Image
                        src={avatarPath}
                        alt={comment.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {comment.name.split(" ")[0]}
                      </p>
                      <p className="text-xs text-gray-500">{comment.email}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsCommentFormVisible(!isCommentFormVisible)}
                  className="flex items-center gap-2 text-[#6941C6] hover:text-violet-700 font-medium"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transform transition-transform ${
                      isCommentFormVisible ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M15 12.5L10 7.5L5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[14px]">Add Comment</span>
                </button>
              </div>

              {isCommentFormVisible && (
                <div className="bg-white rounded-xl p-6 mb-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      <Image
                        src={avatarPath}
                        alt="Your avatar"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                      />
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={handleAddComment}
                          className="px-4 py-2 bg-[#6941C6] text-white rounded-lg hover:bg-violet-700 transition-colors"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 bg-white rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                <Image
                  src={avatarPath}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  Written by {user.name}
                </h3>
                <p className="text-gray-600 mt-2">{post.body.split(".")[0]}.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
