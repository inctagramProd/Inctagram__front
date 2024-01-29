import { baseApi } from '@/src/shared/api/baseApi'

export const emailConfirmed = baseApi.injectEndpoints({
  endpoints: build => ({
    emailConfirmed: build.mutation<string, { code: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/register-code-check',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useEmailConfirmedMutation } = emailConfirmed
