export const getAccessToken = (): string => {
  const tokenData = JSON.parse(
    localStorage.getItem('Google Data') ||
      localStorage.getItem('Git Data') ||
      localStorage.getItem('accessToken') ||
      ''
  )

  return tokenData?.accessToken || ''
}
