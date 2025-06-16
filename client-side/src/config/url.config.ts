export const APP_URL = process.env.APP_URL as string;

export const PUBLIC_URL = {
  root: (url = '') => `${url ? url : ''}`,

  home: () => PUBLIC_URL.root('/'),
  auth: () => PUBLIC_URL.root('/auth'),
  explorer: (query = '') => PUBLIC_URL.root(`/explorer${query}`),

  product: (id = '') => PUBLIC_URL.root(`/product/${id}`),
  category: (id = '') => PUBLIC_URL.root(`/category/${id}`),
}

export const DASHBOARD_URL = {
  root: (url = '') => `/dashboard${url ? url : ''}`,

  home: () => DASHBOARD_URL.root('/'),
  favorites: () => DASHBOARD_URL.root('/favorites'),
}

export const STORE_URL = {
	root: (url = '') => `/store${url ? url : ''}`,

	home: () => STORE_URL.root(`/`),

	products: () => STORE_URL.root(`/products`),
	productCreate: () =>
		STORE_URL.root(`/products/create`),
	productEdit: (id = '') =>
		STORE_URL.root(`/products/${id}`),

	categories: () => STORE_URL.root(`/categories`),
	categoryCreate: () =>
		STORE_URL.root(`/categories/create`),
	categoryEdit: (id = '') =>
		STORE_URL.root(`/categories/${id}`),

	reviews: () => STORE_URL.root(`/reviews`),

	settings: () => STORE_URL.root(`/settings`)
}
