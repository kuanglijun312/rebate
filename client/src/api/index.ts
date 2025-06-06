const BASE_URL = import.meta.env.VITE_API_BASE_URL

let token = localStorage.getItem('token')
export const setToken = (newToken: string) => {
  token = newToken
  localStorage.setItem('token', newToken)
}

const checkLogin = (resData: {
  code: number
}) => {
  if (resData.code === 401) {
    window.location.href = '/login'
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestPost = async (url: string, data: any = {}, config: Record<string, string | number | boolean> = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (!config.ingoreCheckLogin) {
    checkLogin(resData)
  }
  return resData;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requestGet = async (url: string, params: any = {}, config: Record<string, string | number | boolean> = {}) => {
  const response = await fetch(`${BASE_URL}${url}` + '?' + new URLSearchParams(params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const resData = await response.json();
  if (!config.ingoreCheckLogin) {
    checkLogin(resData)
  }
  return resData;
}