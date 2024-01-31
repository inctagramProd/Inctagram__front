import { baseApi } from '@/src/shared/api/baseApi'
import { SignUpParams } from './types/signUpTypes'

export const signUp = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<string, SignUpParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/register',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useSignUpMutation } = signUp
