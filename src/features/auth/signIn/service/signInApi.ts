import { baseApi } from '@/src/shared/api/baseApi'
import { setToken, setName } from '@/src/features/auth/signIn/model/signInSlice'
import {
  AccessToken,
  ThirdPartyAuth,
  ApiAuth,
  SingInParams,
} from '@/src/features/auth/signIn/service/types/signInTypes'

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
            dispatch(setToken({ accessToken: data.accessToken }))
          }
        } catch (e) {
          console.error(e)
        }
      },
    }),
    gitAuth: builder.mutation<ThirdPartyAuth, ApiAuth>({
      query: (data: object) => ({
        url: 'auth/github-auth',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.accessToken) {
            localStorage.setItem('Git Data', JSON.stringify(data))
            dispatch(setName({ username: data.username }))
            dispatch(setToken({ accessToken: data.accessToken }))
          }
        } catch (e) {
          console.error(e)
          localStorage.setItem('apiError', JSON.stringify(e))
        }
      },
    }),
    googleAuth: builder.mutation<ThirdPartyAuth, ApiAuth>({
      query: (data: object) => ({
        url: 'auth/google-auth',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.accessToken) {
            localStorage.setItem('Google Data', JSON.stringify(data))
            dispatch(setName({ username: data.username }))
            dispatch(setToken({ accessToken: data.accessToken }))
          }
        } catch (e) {
          console.error(e)
          localStorage.setItem('apiError', JSON.stringify(e))
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useSignInMutation, useGitAuthMutation, useGoogleAuthMutation } = authByEmail
