import { baseApi } from '@/src/shared/api/baseApi'

export const invalidLinkVerificationApi = baseApi.injectEndpoints({
  endpoints: build => ({
    resendLink: build.mutation<string, { userEmail: string }>({
      query: data => ({
        method: 'PATCH',
        url: 'auth/registration-email-resending',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useResendLinkMutation } = invalidLinkVerificationApi
