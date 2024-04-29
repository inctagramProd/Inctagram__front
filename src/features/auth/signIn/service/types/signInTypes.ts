export type SingInParams = {
  email: string
  password: string
}
export type ApiAuth = {
  code: string | null
}

export type SignInSchema = {
  userId: number | null
  username: string | null
  accessToken: string | null
}
