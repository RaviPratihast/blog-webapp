"use client";

import { useState } from "react";
import ResourceCard from "./components/ResourceCard";
import SearchInput from "./components/SearchInput";
import Pagination from "./components/Pagination";
import { resources } from "./constants/resources";

 function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 9;

  // Filter resources based on search query
  const filteredResources = resources.filter((resource) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.category.toLowerCase().includes(query)
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
    setCurrentPage(1); // on the new search, it will reset to first page...
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <p className="inline-block px-4 py-1 text-[#6941C6] text-lg font-medium bg-[#f4ebff]  rounded-full">
          Our blog
        </p>

        <h1 className="text-[32px] md:text-[36px] font-semibold mb-4 text-[#42307D]">
          Resources and insights
        </h1>

        <p className="text-[#6941C6] mb-8 text-base max-w-2xl mx-auto">
          The latest industry news, interviews, technologies, and resources.
        </p>

        <SearchInput onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedResources.map((resource) => (
          <ResourceCard key={resource.id} {...resource} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default Home;