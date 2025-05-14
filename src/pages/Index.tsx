
import { AppProvider } from "@/contexts/AppContext";
import { Header } from "@/components/Header";
import { FileUploader } from "@/components/FileUploader";
import { ProgressBar } from "@/components/ProgressBar";
import { DocumentList } from "@/components/DocumentList";

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <FileUploader />
            <ProgressBar />
            <DocumentList />
            
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Bank2Invoice.ai - Convert bank statements to invoices automatically</p>
            </div>
          </div>
        </main>
      </div>
    </AppProvider>
  );
};

export default Index;
