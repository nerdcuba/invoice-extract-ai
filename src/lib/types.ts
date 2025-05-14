
export interface Config {
  webhookUrl: string;
  supabaseUrl: string;
  supabaseKey: string;
}

export interface GeneratedDocument {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  size: string;
}

export enum ProcessStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  ERROR = 'error',
  SUCCESS = 'success'
}

export interface AppState {
  config: Config;
  file: File | null;
  status: ProcessStatus;
  progress: number;
  documents: GeneratedDocument[];
  error: string | null;
}
