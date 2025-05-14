
import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { AppState, Config, GeneratedDocument, ProcessStatus } from '@/lib/types';
import { loadConfig, saveConfig, processPdf, fetchDocuments } from '@/lib/api';
import { toast } from "@/hooks/use-toast";

interface AppContextType extends AppState {
  setFile: (file: File | null) => void;
  processFile: () => Promise<void>;
  setConfig: (config: Config) => void;
  setError: (error: string | null) => void;
  setProgress: (progress: number | ((prev: number) => number)) => void;
  downloadZip: () => Promise<void>;
  clearDocuments: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    config: loadConfig(),
    file: null,
    status: ProcessStatus.IDLE,
    progress: 0,
    documents: [],
    error: null,
  });

  const setFile = useCallback((file: File | null) => {
    setState(prev => ({
      ...prev,
      file,
      status: file ? ProcessStatus.IDLE : ProcessStatus.IDLE,
      error: null,
    }));
  }, []);

  const setConfig = useCallback((config: Config) => {
    saveConfig(config);
    setState(prev => ({ ...prev, config }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, status: error ? ProcessStatus.ERROR : prev.status }));
  }, []);

  const setProgress = useCallback((progress: number | ((prev: number) => number)) => {
    setState(prev => ({
      ...prev,
      progress: typeof progress === 'function' ? progress(prev.progress) : progress,
    }));
  }, []);

  const processFile = useCallback(async () => {
    if (!state.file) {
      setError('No file selected');
      return;
    }

    if (!state.config.webhookUrl) {
      setError('Webhook URL not configured');
      return;
    }

    setState(prev => ({
      ...prev,
      status: ProcessStatus.UPLOADING,
      progress: 0,
      error: null,
    }));

    try {
      setState(prev => ({ ...prev, status: ProcessStatus.PROCESSING }));
      
      const documents = await processPdf(state.file, state.config, setProgress);
      
      setState(prev => ({
        ...prev,
        documents,
        status: ProcessStatus.SUCCESS,
        progress: 100,
      }));
      
      toast({
        title: "Success!",
        description: `Generated ${documents.length} documents`,
      });
    } catch (error) {
      console.error('Process error:', error);
      setState(prev => ({
        ...prev,
        status: ProcessStatus.ERROR,
        error: error instanceof Error ? error.message : 'Failed to process PDF',
      }));
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to process PDF',
        variant: "destructive",
      });
    }
  }, [state.file, state.config, setError]);

  const downloadZip = useCallback(async () => {
    if (state.documents.length === 0) {
      setError('No documents to download');
      return;
    }

    try {
      // This function would be implemented in your API
      // For now it's just a mock function
      await fetch('/api/download-zip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documents: state.documents }),
      });
      
      toast({
        title: "ZIP downloaded",
        description: "All documents have been downloaded as a ZIP file",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : 'Failed to download ZIP',
        variant: "destructive",
      });
    }
  }, [state.documents, setError]);

  const clearDocuments = useCallback(() => {
    setState(prev => ({
      ...prev,
      documents: [],
      status: ProcessStatus.IDLE,
    }));
  }, []);

  const value = {
    ...state,
    setFile,
    processFile,
    setConfig,
    setError,
    setProgress,
    downloadZip,
    clearDocuments,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
