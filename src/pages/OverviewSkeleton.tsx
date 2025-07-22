import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const OverviewSkeleton = () => {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Welcome Section Skeleton */}
      <Card className="bg-gray-200/50 dark:bg-gray-800/50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <Skeleton className="h-10 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-3/4 mb-6" />

              <div className="mb-4">
                <Skeleton className="h-7 w-1/3 mb-3" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <Skeleton className="w-10 h-10 rounded" />
                        <div className="w-full">
                          <Skeleton className="h-6 w-3/4" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Skeleton className="h-2 w-full rounded-full" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Competition Starts In Block Skeleton */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center flex-shrink-0 w-full md:w-auto">
              <Skeleton className="h-4 w-24 mb-1 mx-auto" />
              <div className="bg-gray-200 dark:bg-gray-800 rounded-md p-2 mb-2 inline-block min-w-[80px]">
                <Skeleton className="h-16 w-20" />
              </div>
              <Skeleton className="h-4 w-12 mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Deadline Alert Skeleton */}
      <Card className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Information and University Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Team Card Skeleton */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Skeleton className="w-12 h-12 rounded-full mb-3" />
            <Skeleton className="h-6 w-16 mb-1" />
            <Skeleton className="h-4 w-24" />
          </CardContent>
        </Card>

        {/* University Card Skeleton */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Skeleton className="w-12 h-12 rounded-full mb-3" />
            <Skeleton className="h-6 w-24 mb-1" />
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>

        {/* Team Members Card Skeleton */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-4 mx-auto" />
            <div className="flex justify-center gap-4 flex-wrap">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <Skeleton className="w-12 h-12 rounded-full mb-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OverviewSkeleton
