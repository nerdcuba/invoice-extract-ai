
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ConfigModal } from "./ConfigModal";

export const Header = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-brand-500 rounded-md flex items-center justify-center mr-3">
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
              className="text-white"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Bank2Invoice.ai</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsConfigOpen(true)}
          className="text-gray-600 hover:text-gray-900"
        >
          Configure
        </Button>
      </div>
      
      <ConfigModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />
    </header>
  );
};
