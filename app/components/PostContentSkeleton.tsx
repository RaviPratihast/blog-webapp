export default function PostContentSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Title skeleton */}
      <div className="space-y-4 mb-8">
        <div className="h-8 bg-gray-200 rounded-lg w-3/4" />
        <div className="h-8 bg-gray-200 rounded-lg w-1/2" />
      </div>

      {/* Main image skeleton */}
      <div className="relative h-[400px] w-full mb-8 rounded-2xl bg-gray-200" />

      {/* Author info skeleton */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4 mb-12">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>

      {/* Comments section skeleton */}
      <div className="mt-16">
        <div className="h-6 bg-gray-200 rounded w-32 mb-8" />
        <div className="space-y-6">
          {/* Comment skeleton */}
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-6">
              <div className="space-y-4 mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="flex items-center gap-3 justify-end">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24" />
                  <div className="h-2 bg-gray-200 rounded w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Written by section skeleton */}
      <div className="mt-16 bg-white rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-4">
            <div className="h-5 bg-gray-200 rounded w-48" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
