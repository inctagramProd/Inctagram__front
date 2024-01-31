import { baseApi } from '@/src/shared/api/baseApi'

export const invalidLinkVerification = baseApi.injectEndpoints({
  endpoints: build => ({
    resendSignUpLink: build.mutation<any, { userEmail: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/resend-register-email',
        body: data,
      }),
    }),
    resendPasswordRecoveryLink: build.mutation<any, { userEmail: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/resend-password-link',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useResendSignUpLinkMutation, useResendPasswordRecoveryLinkMutation } =
  invalidLinkVerification
