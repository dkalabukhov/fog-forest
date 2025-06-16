import { axiosPublic, axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IProduct, IProductInput } from "@/shared/types/product.interface";

class ProductService {
  async getAllWithFilters(searchTerm?: string, page?: number, limit?: number) {
    let params = {};
    if (searchTerm) {
      params = { searchTerm };
    }

    if (page && limit) {
      params = { page, limit };
    }
    const { data } = await axiosPublic<IProduct[]>({
      url: API_URL.products(),
      method: 'GET',
      params
    })

    return data;
  }

  async getAll() {
    const { data } = await axiosWithAuth<IProduct[]>({
      url: API_URL.products('/all'),
      method: 'GET'
    });

    return data;
  }

  async getById(id: string) {
    const { data } = await axiosPublic<IProduct>({
      url: API_URL.products(`/${id}`),
      method: 'GET'
    });

    return data;
  }

  async getByIdIncludesHidden(id: string) {
    const { data } = await axiosWithAuth<IProduct>({
      url: API_URL.products(`/hidden/${id}`),
      method: 'GET'
    });

    return data;
  }

  async getByCategory(categoryId: string) {
    const { data } = await axiosPublic<IProduct[]>({
      url: API_URL.products(`/category/${categoryId}`),
      method: 'GET'
    });

    return data;
  }

  async getByCategoryIncludesHidden(categoryId: string) {
    const { data } = await axiosWithAuth<IProduct[]>({
      url: API_URL.products(`/category/hidden/${categoryId}`),
      method: 'GET'
    });

    return data;
  }

  async getMostPopular(limit: number) {
    const { data } = await axiosPublic<IProduct[]>({
      url: API_URL.products(`/most-popular`),
      method: 'GET',
      params: { limit }
    });

    return data;
  }

  async getSimilar(id: string) {
    const { data } = await axiosPublic<IProduct[]>({
      url: API_URL.products(`/similar/${id}`),
      method: 'GET'
    });

    return data;
  }

  async create(data: IProductInput) {
    const { data: createdProduct } = await axiosWithAuth<IProduct>({
      url: API_URL.products(),
      method: 'POST',
      data
    });

    return createdProduct;
  }

  async update(id: string, data: IProductInput) {
    const { data: updatedProduct } = await axiosWithAuth<IProduct>({
      url: API_URL.products(`/${id}`),
      method: 'PUT',
      data
    });

    return updatedProduct;
  }

  async toggleProductsVisibility(ids: string[]) {
    const { data: updatedProducts } = await axiosWithAuth<IProduct[]>({
      url: API_URL.products('/many/visibility'),
      method: 'PATCH',
      data: { ids }
    });

    return updatedProducts;
  }

  async toggleProductVisibility(id: string) {
    const { data: updatedProduct } = await axiosWithAuth<IProduct>({
      url: API_URL.products(`/${id}`),
      method: 'PATCH'
    });

    return updatedProduct;
  }

  async deleteMany(ids: string[]) {
    const { data: deletedProducts } = await axiosWithAuth<IProduct[]>({
      url: API_URL.products('/many/delete'),
      method: 'DELETE',
      data: { ids }
    });

    return deletedProducts;
  }

  async delete(id: string) {
    const { data } = await axiosWithAuth<IProduct>({
      url: API_URL.products(`/${id}`),
      method: 'DELETE'
    });

    return data;
  }
}

export const productService = new ProductService();