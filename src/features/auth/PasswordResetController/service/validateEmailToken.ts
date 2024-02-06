import { baseApi } from '@/src/shared/api/baseApi'

export const validateEmailToken = baseApi.injectEndpoints({
  endpoints: build => ({
    validateEmailToken: build.mutation({
      query: passwordRecoveryCode => ({
        url: '/api/v1/auth/password-recovery-code-check',
        method: 'POST',
        body: { passwordRecoveryCode },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useValidateEmailTokenMutation } = validateEmailToken
