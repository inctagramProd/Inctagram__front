export type SingInParams = {
  email: string
  password: string
}
export type ApiAuth = {
  code: string | undefined
}

export type SignInSchema = {
  accessToken: string | null
}

export type AccessToken = {
  accessToken: string
}
export type ThirdPartyAuth = {
  username: string
  accessToken: string
}
