
import { useState, useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';

export const useFileUpload = () => {
  const { setFile } = useAppContext();
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type === 'application/pdf') {
          setFile(file);
        } else {
          console.error('File must be a PDF');
        }
      }
    },
    [setFile],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (file.type === 'application/pdf') {
          setFile(file);
        } else {
          console.error('File must be a PDF');
        }
      }
    },
    [setFile],
  );

  return {
    isDragging,
    onDragOver,
    onDragLeave,
    onDrop,
    onFileChange,
  };
};
