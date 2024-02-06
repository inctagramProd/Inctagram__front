import { baseApi } from '@/src/shared/api/baseApi'

export const validateEmailToken = baseApi.injectEndpoints({
  endpoints: build => ({
    validateEmailToken: build.mutation({
      query: passwordRecoveryCode => ({
        url: 'auth/password-recovery-code-check',
        method: 'POST',
        body: { passwordRecoveryCode },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useValidateEmailTokenMutation } = validateEmailToken
