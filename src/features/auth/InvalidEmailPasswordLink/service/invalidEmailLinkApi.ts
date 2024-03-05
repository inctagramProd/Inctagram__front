import { baseApi } from '@/src/shared/api/baseApi'

export const invalidEmailLinkApi = baseApi.injectEndpoints({
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

export const { useResendPasswordRecoveryLinkMutation } = invalidEmailLinkApi
