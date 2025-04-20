export default function ResourceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-[200px] bg-gray-200" />

      <div className="p-8">
        {/* Category skeleton */}
        <div className="w-20 h-6 bg-gray-200 rounded-full mb-3" />

        {/* Title skeleton */}
        <div className="space-y-3 mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-8">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Author skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-24 mb-1" />
            <div className="h-3 bg-gray-200 rounded w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
