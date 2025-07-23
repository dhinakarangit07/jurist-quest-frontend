import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const AnnouncementFeedSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Quick Actions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-white border border-[#2d4817] rounded-lg shadow-sm">
                <CardContent className="p-6 text-center">
                    <Skeleton className="h-12 w-12 rounded-full mx-auto mb-3" />
                    <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-full mx-auto mb-4" />
                    <Skeleton className="h-10 w-2/3 mx-auto" />
                </CardContent>
            </Card>
        ))}
      </div>

      {/* Competition Announcements */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            <Skeleton className="h-7 w-64" />
          </CardTitle>
          <CardDescription className="text-gray-600">
            <Skeleton className="h-4 w-80 mt-1" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="border-b border-gray-200 last:border-b-0">
                    <div
                        className="w-full flex justify-between items-center py-4 px-4 text-left"
                    >
                        <div>
                            <Skeleton className="h-5 w-48 mb-1" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-5 w-5" />
                    </div>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnnouncementFeedSkeleton