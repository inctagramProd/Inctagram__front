import { baseApi } from '@/src/shared/api/baseApi'

export const invalidLinkVerificationApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resendLink: build.mutation<string, { userEmail: string }>({
      query: data => ({
        method: 'PATCH',
        url: 'auth/resend-register-email',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useResendLinkMutation } = invalidLinkVerificationApi
