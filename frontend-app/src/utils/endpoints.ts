const BASE_URL = process.env.EXPO_PUBLIC_API_URL || '';

export const endpoints = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`
};
