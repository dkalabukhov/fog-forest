import { axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IFile } from "@/shared/types/file.interface";

class FileService {
  async upload(file: FormData, folder?: string) {
    const { data } = await axiosWithAuth<IFile[]>({
      url: API_URL.files(),
      method: 'POST',
      data: file,
      params: { folder },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  }
}

export const fileService = new FileService();
