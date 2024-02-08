import { setToken } from '@/src/features/auth/signIn/model/signInSlice'
import { AccessToken, ThirdPartyAuth } from '@/src/features/auth/signIn/service/types/signInTypes'
import { baseApi } from '@/src/shared/api/baseApi'

export const AuthApi = baseApi.injectEndpoints({
  endpoints: build => ({
    gitAuth: build.mutation<AccessToken, ThirdPartyAuth>({
      query: (body: object) => ({
        url: '/auth/github-auth',
        method: 'POST',
        body,
      }),
    }),
    GoogleAuth: build.mutation<AccessToken, ThirdPartyAuth>({
      query: (body: object) => ({
        url: '/auth/google-auth',
        method: 'POST',
        body,
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

export const { useGitAuthMutation, useGoogleAuthMutation } = AuthApi
