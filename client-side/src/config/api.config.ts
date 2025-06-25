export const SERVER_URL = process.env.SERVER_URL as string;

export const API_URL = {
  root: (url = '') => `${url ? url : ''}`,

  auth: (url = '') => API_URL.root(`/auth${url}`),
  users: (url = '') => API_URL.root(`/users${url}`),
  products: (url = '') => API_URL.root(`/products${url}`),
  categories: (url = '') => API_URL.root(`/categories${url}`),
  reviews: (url = '') => API_URL.root(`/reviews${url}`),
  orders: (url = '') => API_URL.root(`/orders${url}`),
  files: (url = '') => API_URL.root(`/files${url}`),
  favorites: (url = '') => API_URL.root(`/favorites${url}`),
};
