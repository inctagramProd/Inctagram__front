import { baseApi } from '@/src/shared/api/baseApi'
import { SignUpParams } from './types/signUpTypes'

export const signUp = baseApi.injectEndpoints({
  endpoints: build => ({
    signUp: build.mutation<any, SignUpParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/register',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {data} = await queryFulfilled
          console.log(data)
        } catch (e) {
          console.error(e)
        }
      },
    }),
  }),
})
export const { useSignUpMutation } = signUp
