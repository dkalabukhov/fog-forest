import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import {
	EnumOrderStatus,
	IOrder,
	IPaymentResponse
} from '@/shared/types/order.interface'

type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		price: number
		productId: string
		storeId: string
	}[]
}

class OrderService {
	async place(data: TypeData) {
		return axiosWithAuth<IPaymentResponse>({
			url: API_URL.orders('/place'),
			method: 'POST',
			data
		});
	}

  async getAll() {
    const { data } = await axiosWithAuth<IOrder[]>({
      url: API_URL.orders(),
      method: 'GET'
    });

    return data;;
  }
}

export const orderService = new OrderService()