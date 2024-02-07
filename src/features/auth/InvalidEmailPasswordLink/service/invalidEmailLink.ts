import { baseApi } from '@/src/shared/api/baseApi'

export const invalidEmailLink = baseApi.injectEndpoints({
  endpoints: build => ({
    resendPasswordRecoveryLink: build.mutation<any, { userEmail: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/password-recovery-code-check',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useResendPasswordRecoveryLinkMutation } = invalidEmailLink
