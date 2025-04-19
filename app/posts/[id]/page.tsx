import Image from "next/image";


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

async function getPost(id: string): Promise<Post> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

async function getUser(userId: number): Promise<User> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

async function getComments(postId: string): Promise<Comment[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  try {
    const post = await getPost(params.id);
    const user = await getUser(post.userId);
    const comments = await getComments(params.id);

    return (
      <div className="max-w-[1000px] mx-auto px-4 py-8">

        <h1 className="text-[40px] font-semibold text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 mb-8">
          <span className="text-gray-600 text-sm">Aug 1, 2023</span>
          <span className="text-gray-600 text-sm">•</span>
          <span className="text-gray-600 text-sm">7 min read</span>
        </div>

        <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden">
          <Image
            src="/images/lighthouse.jpg"
            alt="Blog post cover"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
              width={40}
              height={40}
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
                    src={`https://ui-avatars.com/api/?name=${comment.name}`}
                    alt={comment.name}
                    width={40}
                    height={40}
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
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
              width={48}
              height={48}
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">Written by {user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    return (
      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-red-600">
          Error loading post
        </h1>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }
}
