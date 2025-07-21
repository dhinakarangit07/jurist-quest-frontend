import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import useDownloads from "@/hooks/useDownloads";

const DownloadCenter = () => {
  const { downloads, isLoading, error } = useDownloads();

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Competition Materials</CardTitle>
          <CardDescription>
            Essential Documents and Resources for the Competition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Name</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Format</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Size</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Uploaded On</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody>
                {downloads.map((item, index) => (
                  <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{item.name}</span>
                        {item.important && (
                          <Badge className="bg-red-500 text-white text-xs rounded-md px-2 py-1">
                            Important
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{item.format}</td>
                    <td className="py-4 px-4 text-gray-600">{item.size}</td>
                    <td className="py-4 px-4 text-gray-600">{item.created_at}</td>
                    <td className="py-4 px-4">
                      <Button
                        size="sm"
                        onClick={() => handleDownload(item.file)}
                        className="bg-[#2d4817] hover:bg-[#2a4015] text-white flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadCenter;