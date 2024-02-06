import { baseApi } from '@/src/shared/api/baseApi'

export const createNewPassword = baseApi.injectEndpoints({
  endpoints: build => ({
    sendNewPassword: build.mutation({
      query: data => ({
        method: 'POST',
        url: '/api/v1/auth/password-recovery',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useSendNewPasswordMutation } = createNewPassword
