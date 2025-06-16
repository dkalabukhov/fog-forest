import { axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IUser } from "@/shared/types/user.interface";

class UserService {
  async getProfile() {
    const response = await axiosWithAuth<IUser>({
      url: API_URL.users('/profile'),
      method: 'GET'
    });

    return response;
  }

  async toggleFavorites(productId: string) {
    const response = await axiosWithAuth<IUser>({
      url: API_URL.users(`/profile/favorites/${productId}`),
      method: 'PUT'
    });

    return response
  }
}

export const userService = new UserService();
