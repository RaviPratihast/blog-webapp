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

export default function ResourceCard({
  id,
  category,
  title,
  description,
  author,
}: ResourceCardProps) {
  const { avatarPath, cardImagePath } = useImages();

  return (
    <div className="group bg-white overflow-hidden border border-[#EAECF0] hover:border-transparent hover:shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] transition-all duration-300">
      <div className="p-6">
        <div className="relative h-[200px] w-full bg-[#F9FAFB] overflow-hidden">
          <Image
            src={cardImagePath}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="mt-8">
          <div className="mb-4">
            <span className="text-sm font-semibold text-[#6941C6]">
              {category}
            </span>
          </div>

          <Link href={`/posts/${id}`} className="group block mb-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-2xl text-[#101828] group-hover:text-[#6941C6] line-clamp-2 pr-4">
                {title}
              </h3>
              <svg
                className="transition-transform group-hover:translate-x-1 flex-shrink-0"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 14L15.5 6M15.5 6H8.5M15.5 6V13"
                  stroke="#101828"
                  strokeWidth="1.67"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>

          <p className="text-[#667085] text-base mb-8 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-[#F9FAFB] flex-shrink-0">
              <Image
                src={avatarPath}
                alt={author.name}
                fill
                className="w-full h-full object-cover"
                sizes="40px"
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
    </div>
  );
}
