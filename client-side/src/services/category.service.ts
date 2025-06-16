import { axiosPublic, axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { ICategory, ICategoryInput } from "@/shared/types/category.interface";

class CategoryService {
  async getAll() {
    const { data } = await axiosPublic<ICategory[]>({
      url: API_URL.categories(),
      method: 'GET'
    })

    return data;
  }

  async getById(id: string) {
    const { data } = await axiosPublic<ICategory>({
      url: API_URL.categories(`/${id}`),
      method: 'GET'
    });

    return data;
  }

  async create(data: ICategoryInput) {
    const { data: createdCategory } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(),
      method: 'POST',
      data
    });

    return createdCategory;
  }

  async update(id: string, data: ICategoryInput) {
    const { data: updatedCategory } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`/${id}`),
      method: 'PUT',
      data
    });

    return updatedCategory;
  }

  async delete(id: string) {
    const { data: deletedCategory } = await axiosWithAuth<ICategory>({
      url: API_URL.categories(`/${id}`),
      method: 'DELETE'
    });

    return deletedCategory;
  }
}

export const categoryService = new CategoryService();
