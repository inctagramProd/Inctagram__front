import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    sendUserEmail: builder.mutation({
      query: email => ({
        url: '/api/v1/auth/password-recovery-request',
        method: 'POST',
        body: email,
      }),
    }),
    validateEmailToken: builder.mutation({
      query: token => ({
        url: '/api/v1/auth/check-password-recovery-code',
        method: 'POST',
        body: { token },
      }),
    }),
  }),
})

export const { useSendUserEmailMutation, useValidateEmailTokenMutation } = authApi
