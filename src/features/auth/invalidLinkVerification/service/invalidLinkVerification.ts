import { baseApi } from '@/src/shared/api/baseApi'

export const invalidLinkVerification = baseApi.injectEndpoints({
  endpoints: build => ({
    resendLink: build.mutation<any, { userEmail: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/resend-register-email',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useResendLinkMutation } = invalidLinkVerification
