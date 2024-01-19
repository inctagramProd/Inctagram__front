import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    sendUserEmail: builder.mutation({
      query: email => ({
        url: '/api/v1/auth/password-recovery-request',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
})

export const { useSendUserEmailMutation } = authApi
