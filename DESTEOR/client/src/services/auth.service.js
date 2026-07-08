import api, {
  clearTokens,
  getStoredRefreshToken,
  storeTokens,
} from '@/services/api';

function persistAuthPayload(payload) {
  storeTokens({
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  });

  return payload.user;
}

export async function registerUser(data) {
  const response = await api.post('/auth/register', data);
  return persistAuthPayload(response.data.data);
}

export async function loginUser(data) {
  const response = await api.post('/auth/login', data);
  return persistAuthPayload(response.data.data);
}

export async function logoutUser() {
  try {
    await api.post('/auth/logout');
  } finally {
    clearTokens();
  }
}

export async function verifyUser() {
  const response = await api.get('/auth/verify');
  return response.data.data.user;
}

export async function refreshSession() {
  const refreshToken = getStoredRefreshToken();

  if (!refreshToken) {
    throw new Error('Refresh token is unavailable.');
  }

  const response = await api.post('/auth/refresh', { refreshToken });
  return persistAuthPayload(response.data.data);
}

export async function requestPasswordReset(email) {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
}

export async function resetPassword(token, data) {
  const response = await api.post(`/auth/reset-password/${token}`, data);
  return response.data;
}
