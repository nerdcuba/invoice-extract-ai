
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useAppContext } from "@/contexts/AppContext";
import { ProcessStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const FileUploader = () => {
  const { file, status } = useAppContext();
  const { isDragging, onDragOver, onDragLeave, onDrop, onFileChange } = useFileUpload();

  const isProcessing = status === ProcessStatus.PROCESSING || status === ProcessStatus.UPLOADING;

  return (
    <Card className="w-full">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Bank Statement</h2>
        
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragging ? "border-brand-500 bg-brand-50" : "border-gray-300 hover:border-brand-400",
            "cursor-pointer"
          )}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input
            type="file"
            id="file-upload"
            accept=".pdf"
            className="hidden"
            onChange={onFileChange}
            disabled={isProcessing}
          />
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-brand-500"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            
            <div>
              <p className="text-gray-700 font-medium">
                {file ? file.name : "Drag and drop your PDF or click to browse"}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Only PDF files are supported
              </p>
            </div>
            
            <Button
              variant="outline"
              disabled={isProcessing}
              onClick={() => document.getElementById("file-upload")?.click()}
              className="mt-4"
            >
              Select File
            </Button>
          </div>
        </div>
        
        {file && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-500 mr-2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
                <span className="font-medium truncate max-w-xs">{file.name}</span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={isProcessing}
                className="text-sm"
              >
                Change
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
