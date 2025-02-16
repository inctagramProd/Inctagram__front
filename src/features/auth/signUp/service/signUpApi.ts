import { baseApi } from '@/src/shared/api/baseApi'
import { SignUpParams } from './types/signUpTypes'

export const signUp = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<void, SignUpParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/registration',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useSignUpMutation } = signUp
