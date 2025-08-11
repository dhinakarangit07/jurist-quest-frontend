import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import useDownloads from "@/hooks/useDownloads";
import DownloadCenterSkeleton from "@/components/skeleton/TeamDashboard/DownloadCenterSkeleton";
import { format } from 'date-fns';

const DownloadCenter = () => {
  const { downloads, isLoading, error } = useDownloads();

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  if (isLoading) {
    return <DownloadCenterSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-gray-900">Competition Materials</CardTitle>
          <CardDescription>
            Essential Documents and Resources for the Competition
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop/tablet table view */}
          <div className="w-full overflow-x-auto hidden sm:block">
            <table className="min-w-[600px] w-full border-collapse border border-slate-300 text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Name</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Format</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Size</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Uploaded On</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Deadline</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody>
                {downloads.map((item, index) => (
                  <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-3 sm:py-4 px-2 sm:px-4 flex items-center gap-2 sm:gap-3">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="font-medium text-gray-900 text-xs sm:text-sm">{item.name}</span>
                        {item.important && (
                          <Badge className="bg-red-500 text-white text-[10px] sm:text-xs rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1">
                            Important
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600">{item.format}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600">{item.size}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600">{format(new Date(item.created_at), 'dd/MM/yyyy')}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600">{item.deadline ? format(new Date(item.deadline), 'dd/MM/yyyy HH:mm') : "N/A"}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(item.file)}
                        className="bg-[#2d4817] hover:bg-[#2a4015] text-white flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        <span className="hidden xs:inline">Download</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile card/list view */}
          <div className="block sm:hidden space-y-4">
            {downloads.map((item, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-3 flex flex-col gap-2 bg-slate-50">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                  {item.important && (
                    <Badge className="bg-red-500 text-white text-[10px] rounded-md px-2 py-0.5 ml-2">
                      Important
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  <span><b>Format:</b> {item.format}</span>
                  <span><b>Size:</b> {item.size}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  <span><b>Uploaded:</b> {format(new Date(item.created_at), 'dd/MM/yyyy')}</span>
                  <span><b>Deadline:</b> {item.deadline ? format(new Date(item.deadline), 'dd/MM/yyyy HH:mm') : "N/A"}</span>
                </div>
                <div>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(item.file)}
                    className="bg-[#2d4817] hover:bg-[#2a4015] text-white flex items-center gap-1 w-full justify-center"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadCenter;
