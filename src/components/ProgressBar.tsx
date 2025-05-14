
import { useAppContext } from "@/contexts/AppContext";
import { Progress } from "@/components/ui/progress";
import { ProcessStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ProgressBar = () => {
  const { status, progress, file, processFile } = useAppContext();
  
  const isIdle = status === ProcessStatus.IDLE;
  const isProcessing = status === ProcessStatus.PROCESSING || status === ProcessStatus.UPLOADING;
  const isError = status === ProcessStatus.ERROR;
  const isSuccess = status === ProcessStatus.SUCCESS;
  
  const getStatusText = () => {
    switch (status) {
      case ProcessStatus.UPLOADING:
        return "Uploading PDF...";
      case ProcessStatus.PROCESSING:
        return "Analyzing statement and generating invoices...";
      case ProcessStatus.ERROR:
        return "Error processing file";
      case ProcessStatus.SUCCESS:
        return "Processing complete!";
      default:
        return "Ready to process";
    }
  };

  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Process Statement</h2>
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          isProcessing && "bg-yellow-100 text-yellow-800",
          isError && "bg-red-100 text-red-800",
          isSuccess && "bg-green-100 text-green-800",
          isIdle && "bg-gray-100 text-gray-800"
        )}>
          {getStatusText()}
        </div>
      </div>
      
      <Progress 
        value={progress} 
        className={cn(
          "h-2",
          isError && "bg-red-100 [&>div]:bg-red-500",
          isSuccess && "bg-green-100 [&>div]:bg-green-500",
          isProcessing && "bg-brand-100 [&>div]:bg-brand-500"
        )}
      />
      
      <div className="mt-6 flex justify-end">
        <Button
          disabled={!file || isProcessing}
          onClick={processFile}
          className="bg-brand-500 hover:bg-brand-600"
        >
          {isProcessing ? "Processing..." : "Process Statement"}
        </Button>
      </div>
    </div>
  );
};
