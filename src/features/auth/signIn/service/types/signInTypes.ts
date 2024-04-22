export type SingInParams = {
  email: string
  password: string
}
export type ApiAuth = {
  code: string | null
}

export type SignInSchema = {
  accessToken: string | null
}

export type AccessToken = {
  accessToken: string
  userId: number
  username: string
}
export type ThirdPartyAuth = {
  username: string
  accessToken: string
}
