import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="flex flex-col md:flex-row w-full justify-between overflow-hidden gap-10 my-6 relative">
      <div className="flex-grow w-full md:w-1/2">
        <Skeleton className="w-full h-[400px] rounded-lg" />{' '}
      </div>

      <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-4 pt-2">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-sm" />
          <Skeleton className="h-6 w-20 rounded-sm" />
          <Skeleton className="h-6 w-20 rounded-sm" />
        </div>

        <Skeleton className="h-6 w-[150px] rounded-sm" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />

        <div className="flex gap-3 font-semibold">
          <Skeleton className="h-4 w-[100px]" />
        </div>

        <Skeleton className="h-4 w-[300px]" />

        <div className="flex gap-2 mb-4">
          <Skeleton className="h-12 w-[50%] rounded-lg" />
          <Skeleton className="h-12 w-[50%] rounded-lg" />
        </div>

        <Skeleton className="h-12 w-full rounded-lg" />

        <div className="flex justify-center">
          <Skeleton className="h-8 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
