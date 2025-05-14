
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export const DocumentList = () => {
  const { documents, downloadZip } = useAppContext();
  
  if (documents.length === 0) {
    return null;
  }
  
  return (
    <Card className="w-full mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Generated Documents</CardTitle>
        <Button onClick={downloadZip} disabled={documents.length === 0}>
          Download ZIP
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center mr-4">
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
                    className="text-gray-600"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <span>{doc.size}</span>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>Created {formatDistanceToNow(new Date(doc.createdAt))} ago</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                asChild
              >
                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
