import { axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IProduct } from "@/shared/types/product.interface";

class FavoriteService {
  async getFavorites() {
    const { data } = await axiosWithAuth<IProduct[]>({
      url: API_URL.favorites(),
      method: 'GET'
    });

    return data;
  }
}

export const favoriteService = new FavoriteService();
