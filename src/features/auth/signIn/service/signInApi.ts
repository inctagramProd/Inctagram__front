import { baseApi } from '@/src/shared/api/baseApi'
import { setToken } from '@/src/features/auth/signIn/model/signInSlice'
import { AccessToken, SingInParams } from '@/src/features/auth/signIn/service/types/signInTypes'

export const authByEmail = baseApi.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<AccessToken, SingInParams>({
      query: data => ({
        method: 'POST',
        url: 'auth/login',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.accessToken) {
            console.log(data)
            dispatch(setToken({ accessToken: data.accessToken }))
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useSignInMutation } = authByEmail
