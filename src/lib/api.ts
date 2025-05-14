
import { Config, GeneratedDocument } from './types';

// Process PDF file with n8n webhook
export const processPdf = async (
  file: File,
  config: Config,
  onProgressUpdate: (progress: number) => void
): Promise<GeneratedDocument[]> => {
  // Create FormData with file
  const formData = new FormData();
  formData.append('file', file);

  try {
    // In a real implementation, you'd stream the upload and get progress
    // Simulate progress for now
    const progressInterval = setInterval(() => {
      const randomProgress = Math.random() * 20;
      onProgressUpdate((prev) => Math.min(prev + randomProgress, 95));
    }, 500);

    const response = await fetch(config.webhookUrl, {
      method: 'POST',
      body: formData,
    });

    clearInterval(progressInterval);
    onProgressUpdate(100);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to process PDF');
    }

    // This assumes your n8n webhook returns generated documents
    const data = await response.json();
    return data.documents;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
};

// Download all documents as ZIP
export const downloadAllAsZip = async (documents: GeneratedDocument[]): Promise<void> => {
  // In a real implementation, you'd call your backend to create a zip
  // and then download it
  try {
    const documentUrls = documents.map(doc => doc.url);
    
    // This would be the endpoint that creates a ZIP from the document URLs
    const response = await fetch('/api/download-zip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls: documentUrls }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate ZIP file');
    }
    
    // Get the ZIP file blob and create a download link
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-documents.zip';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading ZIP:', error);
    throw error;
  }
};

// Mock function to simulate fetching documents from Supabase
export const fetchDocuments = async (config: Config): Promise<GeneratedDocument[]> => {
  // In a real implementation, you'd fetch from Supabase
  // This is just a mock for now
  return [
    {
      id: '1',
      name: 'Invoice-001.pdf',
      url: 'https://example.com/invoice-001.pdf',
      createdAt: new Date().toISOString(),
      size: '256 KB',
    },
    {
      id: '2',
      name: 'Invoice-002.pdf',
      url: 'https://example.com/invoice-002.pdf',
      createdAt: new Date().toISOString(),
      size: '312 KB',
    },
  ];
};

// Save configuration to localStorage
export const saveConfig = (config: Config): void => {
  localStorage.setItem('bank2invoice-config', JSON.stringify(config));
};

// Load configuration from localStorage
export const loadConfig = (): Config => {
  const defaultConfig: Config = {
    webhookUrl: '',
    supabaseUrl: '',
    supabaseKey: '',
  };
  
  try {
    const savedConfig = localStorage.getItem('bank2invoice-config');
    return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
  } catch (error) {
    console.error('Error loading config:', error);
    return defaultConfig;
  }
};
