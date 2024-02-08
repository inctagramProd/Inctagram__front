export type SingInParams = {
  email: string
  password: string
}
export type ThirdPartyAuth = {
  code: string
}

export type SignInSchema = {
  accessToken: string | null
}

export type AccessToken = {
  accessToken: string
}
