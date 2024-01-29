import { baseApi } from '@/src/shared/api/baseApi'

export const invalidLinkVerification = baseApi.injectEndpoints({
  endpoints: build => ({
    emailConfirmed: build.mutation<any, { code: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/resend-register-email',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useInvalidLinkVerificationMutation } = invalidLinkVerification
