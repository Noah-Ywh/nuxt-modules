export const useAuth = () => {
  const token = useState('token', () => useCookie('access_token').value || '')

  function login(t: string) {
    token.value = t
    useLoginSuccess(t, { maxAge: 3600 })
  }

  function logout() {
    useCookie('access_token').value = ''
    token.value = ''
  }

  return { token, login, logout }
}
