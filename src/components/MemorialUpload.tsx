import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, Cloud } from "lucide-react";

interface MemorialUploadProps {
  teamCode?: string;
}

const MemorialUpload = ({ teamCode = "ABC123" }: MemorialUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [urlUpload, setUrlUpload] = useState("");
  const [uploadHistory, setUploadHistory] = useState([
    {
      id: 1,
      fileName: "Memorial_ABC123_v1.pdf",
      uploadDate: "2024-12-05 14:30",
      status: "submitted",
      version: 1
    }
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newUpload = {
        id: uploadHistory.length + 1,
        fileName: selectedFile.name,
        uploadDate: new Date().toLocaleString(),
        status: "submitted",
        version: uploadHistory.length + 1
      };
      setUploadHistory([newUpload, ...uploadHistory]);
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('memorial-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const handleUrlUpload = () => {
    if (urlUpload) {
      // Handle URL upload logic here
      console.log("Uploading from URL:", urlUpload);
      setUrlUpload("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-gray-900">Submit Memorial</CardTitle>
          <CardDescription>
            Upload your memorial document (PDF format only, max 10MB)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Media Upload Section */}
          <div>
            <Label className="text-base font-medium text-gray-900 mb-2 block">Media Upload</Label>
            <p className="text-sm text-gray-600 mb-4">Upload your memorial document here</p>

            <div
              className="border-2 border-dashed border-[#2d4817] rounded-lg p-8 text-center hover:border-[#2a4015] transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Cloud className="h-12 w-12 text-[#2d4817]" />
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Drag your file(s) or </span>
                <label htmlFor="memorial-upload" className="text-[#2d4817] hover:text-[#2a4015] cursor-pointer underline">
                  browse
                </label>
              </p>
              <p className="text-sm text-gray-500 mb-4">Max 10 MB files are allowed</p>

              <input
                id="memorial-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              {selectedFile && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">{selectedFile.name}</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            <div className="mt-3 space-y-1 text-xs text-gray-500">
              <p>• Only PDF files are accepted</p>
              <p>• Maximum file size: 10MB</p>
              <p>• File naming: Memorial_{teamCode}_v[version].pdf</p>
            </div>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Upload from URL */}
          <div>
            <Label className="text-base font-medium text-gray-900 mb-2 block">Upload from URL</Label>
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://sharefile.xyz/file.jpg "
                value={urlUpload}
                onChange={(e) => setUrlUpload(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleUrlUpload}
                className="bg-[#2d4817] hover:bg-[#2a4015] text-white"
                disabled={!urlUpload}
              >
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload History */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-gray-900">Upload History</CardTitle>
          <CardDescription>
            Track your memorial submissions and versions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadHistory.length > 0 ? (
              uploadHistory.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{upload.fileName}</p>
                      <p className="text-sm text-gray-500">{upload.uploadDate}</p>
                    </div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No uploads yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemorialUpload;