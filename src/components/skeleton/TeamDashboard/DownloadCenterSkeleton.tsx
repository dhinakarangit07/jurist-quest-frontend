import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const DownloadCenterSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">
            <Skeleton className="h-7 w-64" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-80 mt-1" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">
                    <Skeleton className="h-5 w-24" />
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">
                    <Skeleton className="h-5 w-16" />
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">
                    <Skeleton className="h-5 w-16" />
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">
                    <Skeleton className="h-5 w-24" />
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index} className="border-b border-slate-200">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-5 w-40" />
                    </td>
                    <td className="py-4 px-4">
                      <Skeleton className="h-5 w-12" />
                    </td>
                    <td className="py-4 px-4">
                      <Skeleton className="h-5 w-12" />
                    </td>
                    <td className="py-4 px-4">
                      <Skeleton className="h-5 w-24" />
                    </td>
                    <td className="py-4 px-4">
                      <Skeleton className="h-9 w-28" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DownloadCenterSkeleton
