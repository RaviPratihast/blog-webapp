"use client";

import Image from "next/image";
import Link from "next/link";
import { useImages } from "../context/ImageContext";

interface Author {
  name: string;
  date: string;
}

export interface ResourceCardProps {
  id: number;
  category: string;
  title: string;
  description: string;
  author: Author;
}

function ResourceCard({
  id,
  category,
  title,
  description,
  author,
}: ResourceCardProps) {
  const { avatarPath, cardImagePath } = useImages();

  return (
    <div className="group bg-white rounded overflow-hidden border border-[#EAECF0] hover:border-transparent hover:shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] transition-all duration-300">
      <div className="relative h-[240px] w-full bg-[#F9FAFB]">
        <Image src={cardImagePath} alt={title} fill className="object-cover" />
      </div>

      <div className="p-8">
        <div className="mb-3">
          <span className="text-sm font-semibold text-[#6941C6]">
            {category}
          </span>
        </div>

        <Link href={`/posts/${id}`} className="group block">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-xl text-[#101828] group-hover:text-[#6941C6]">
              {title}
            </h3>
            <svg
              className="transition-transform group-hover:translate-x-1"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66699 8.00004H13.3337M13.3337 8.00004L8.00033 2.66671M13.3337 8.00004L8.00033 13.3334"
                stroke="#6941C6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>

        <p className="text-[#667085] text-base mb-8">{description}</p>

        <div className="flex items-center">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-[#F9FAFB] flex-shrink-0">
            <Image
              src={avatarPath}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-semibold text-[#101828]">
              {author.name}
            </p>
            <p className="text-sm text-[#667085]">{author.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
