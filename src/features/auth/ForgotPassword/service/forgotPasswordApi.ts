import { baseApi } from '@/src/shared/api/baseApi'

export const forgotPassword = baseApi.injectEndpoints({
  endpoints: build => ({
    sendUserEmail: build.mutation({
      query: data => ({
        method: 'POST',
        url: 'auth/password-recovery-request',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useSendUserEmailMutation } = forgotPassword
