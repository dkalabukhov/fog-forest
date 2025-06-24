import { axiosPublic, axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IAuthForm, IAuthResponse } from '@/shared/types/auth.interface'

class AuthService {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosPublic<IAuthResponse>({
			url: API_URL.auth(`/${type}`),
			method: 'POST',
			data
		})

		return response
	}

	async getNewTokens() {
		const response = await axiosPublic<IAuthResponse>({
			url: API_URL.auth('/login/access-token'),
			method: 'POST'
		})

		return response
	}

	async logout() {
		const response = await axiosPublic<boolean>({
			url: API_URL.auth('/logout'),
			method: 'POST'
		})

		return response
	}

	async verifyRole() {
		const response = await axiosWithAuth<IAuthResponse>({
			url: API_URL.auth('/verify-role'),
			method: 'GET'
		})

		return response
	}
}

export const authService = new AuthService()