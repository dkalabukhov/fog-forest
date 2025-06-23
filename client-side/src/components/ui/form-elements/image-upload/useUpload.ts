import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useRef } from 'react';
import toast from 'react-hot-toast';

import { fileService } from '@/services/files.service';

export function useUpload(onChange: (value: string[]) => void) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFiles, isPending: isUploading } = useMutation({
    mutationKey: ['upload files'],
    mutationFn: (formData: FormData) => fileService.upload(formData),
    onSuccess(data) {
      onChange(data.map((file) => file.url));
    },
    onError() {
      toast.error('Ошибка при загрузки файлов');
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);

      const formData = new FormData();
      fileArray.forEach((file) => formData.append('files', file));

      uploadFiles(formData);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return { handleButtonClick, isUploading, fileInputRef, handleFileChange };
}
