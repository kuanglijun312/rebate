import { requestGet, requestPost, setToken } from ".";

export const login = async (uid: string) => {
  const res = await requestPost('/api/user/login', { uid }, {
    ingoreCheckLogin: true
  })
  setToken(res.data.token)
  return res
}

export const logout = async () => (
  requestPost('/api/user/logout', {}, {
    ingoreCheckLogin: true
  })
)

export const getProfile = async () => (
  requestGet('/api/user/profile', {}, {
    ingoreCheckLogin: true
  })
)

export const register = async (data: { name: string; inviteCode: string }) => (
  requestPost('/api/user/register', data, {
    ingoreCheckLogin: true
  })
)
