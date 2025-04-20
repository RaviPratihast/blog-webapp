"use client";

import { useState, useEffect } from "react";
import ResourceCard from "./components/ResourceCard";
import ResourceCardSkeleton from "./components/ResourceCardSkeleton";
import SearchInput from "./components/SearchInput";
import Pagination from "./components/Pagination";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const resourcesPerPage = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter resources based on search query
  const filteredResources = posts.filter((post) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
  const startIndex = (currentPage - 1) * resourcesPerPage;
  const paginatedResources = filteredResources.slice(
    startIndex,
    startIndex + resourcesPerPage
  );

  // Handling search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <p className="inline-block px-4 py-1 text-[#6941C6] text-lg font-medium bg-[#f4ebff] rounded-full">
          Our blog
        </p>

        <h1 className="text-[48px] md:text-[45px] font-semibold mb-4 text-[#53389E]">
          Resources and insights
        </h1>

        <p className="text-[#6941C6] mb-8 text-xl max-w-2xl mx-auto">
          The latest industry news, interviews, technologies, and resources.
        </p>

        <SearchInput onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? // Show 6 skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => (
              <ResourceCardSkeleton key={index} />
            ))
          : paginatedResources.map((post) => (
              <ResourceCard
                key={post.id}
                id={post.id}
                category="Article"
                title={post.title}
                description={post.body}
                author={{
                  name: `Author ${post.userId}`,
                  date: new Date().toLocaleDateString(),
                }}
              />
            ))}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
