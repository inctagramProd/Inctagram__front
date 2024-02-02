import { baseApi } from '@/src/shared/api/baseApi'

export const validateEmailToken = baseApi.injectEndpoints({
  endpoints: build => ({
    validateEmailToken: build.mutation({
      query: token => ({
        url: '/api/v1/auth/check-password-recovery-code',
        method: 'POST',
        body: { token },
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useValidateEmailTokenMutation } = validateEmailToken
