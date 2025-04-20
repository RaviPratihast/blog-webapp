import { useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

function SearchInput({ placeholder = "Search", onSearch }: SearchInputProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="max-w-[320px] mx-auto relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg
          className="h-[20px] w-[20px] text-[#667085]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className="pl-10 pr-4 py-2.5 w-full border border-[#D0D5DD] rounded-md text-[#101828] placeholder-[#667085] text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-[#7F56D9] focus:border-[#7F56D9]"
      />
    </div>
  );
}

export default SearchInput;
