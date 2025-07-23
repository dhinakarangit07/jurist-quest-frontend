import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, Cloud, Loader2 } from "lucide-react";
import useMemorials from "@/hooks/useMemorials";
import MemorialUploadSkeleton from "@/components/skeleton/TeamDashboard/MemorialUploadSkeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MemorialUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { memorials, isLoading, error, uploadMemorial } = useMemorials();
  const [isUploading, setIsUploading] = useState(false);
  const [mootProblem, setMootProblem] = useState("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedFile && mootProblem) {
      setIsUploading(true);
      setUploadError(null);
      try {
        await uploadMemorial(selectedFile, mootProblem);
        setSelectedFile(null);
        setMootProblem("");
        setPreviewUrl(null);
        const fileInput = document.getElementById('memorial-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } catch (uploadError: any) {
        setUploadError(uploadError.message);
      } finally {
        setIsUploading(false);
      }
    }
  };

  if (isLoading) {
    return <MemorialUploadSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error.message}</p>
      </div>
    );
  }

  const submittedProblems = memorials.map(m => m.moot_problem);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-gray-900">Submit Memorial</CardTitle>
          <CardDescription>
            Upload your memorial document (PDF format only, max 10MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select onValueChange={setMootProblem} value={mootProblem}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Moot Problem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="problem1" disabled={submittedProblems.includes('problem1')}>MOOT PROBLEM - I</SelectItem>
                <SelectItem value="problem2" disabled={submittedProblems.includes('problem2')}>MOOT PROBLEM - II</SelectItem>
              </SelectContent>
            </Select>

            <div
              className="border-2 border-dashed border-[#2d4817] rounded-lg p-8 text-center hover:border-[#2a4015] transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Cloud className="h-12 w-12 text-[#2d4817] mx-auto" />
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
                  {mootProblem && (
                    <p className="text-sm text-blue-600 mt-1">
                      Moot Problem: {mootProblem === 'problem1' ? 'MOOT PROBLEM - I' : 'MOOT PROBLEM - II'}
                    </p>
                  )}
                  {previewUrl && (
                    <div className="mt-4">
                      <iframe
                        src={previewUrl}
                        className="w-full h-96 rounded-lg"
                        title="PDF Preview"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
            <Button onClick={handleUpload} disabled={!selectedFile || isUploading || !mootProblem} className="w-full mt-4 bg-[#2d4817] hover:bg-[#2a4015] text-white">
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Upload
            </Button>

            <div className="mt-3 space-y-1 text-xs text-gray-500">
              <p>• Only PDF files are accepted</p>
              <p>• Maximum file size: 10MB</p>
              <p>• File naming: Memorial_TeamName_v[version].pdf</p>
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
            {memorials.length > 0 ? (
              memorials.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{upload.file.split('/').pop()}</p>
                      <p className="text-sm text-gray-500">{upload.moot_problem_display} - {new Date(upload.created_at).toLocaleString()}</p>
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
