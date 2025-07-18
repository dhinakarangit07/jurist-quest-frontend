import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";

const DownloadCenter = () => {
  const downloads = [
    { 
      name: "Moot Problem 2024", 
      format: "PDF", 
      size: "2.4 MB", 
      uploadedOn: "December 14, 2024", 
      important: true 
    },
    { 
      name: "Rules & Regulations", 
      format: "PDF", 
      size: "2.4 MB", 
      uploadedOn: "December 14, 2024", 
      important: true 
    },
    { 
      name: "Schedule", 
      format: "PDF", 
      size: "2.4 MB", 
      uploadedOn: "December 14, 2024", 
      important: true 
    },
    { 
      name: "Score sheets format", 
      format: "PDF", 
      size: "2.4 MB", 
      uploadedOn: "December 14, 2024", 
      important: false 
    },
    { 
      name: "Certificates", 
      format: "PDF", 
      size: "2.4 MB", 
      uploadedOn: "December 14, 2024", 
      important: false 
    }
  ];

  const handleDownload = (fileName: string) => {
    // Mock download function
    console.log(`Downloading: ${fileName}`);
  };

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
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Format</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Uploaded On</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700"></th>
                </tr>
              </thead>
              <tbody>
                {downloads.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{item.name}</span>
                          {item.important && (
                            <Badge className="bg-red-100 text-red-700 text-xs border-red-200">
                              Important
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{item.format}</td>
                    <td className="py-4 px-4 text-gray-600">{item.size}</td>
                    <td className="py-4 px-4 text-gray-600">{item.uploadedOn}</td>
                    <td className="py-4 px-4">
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(item.name)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Download className="h-4 w-4 mr-1" />
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