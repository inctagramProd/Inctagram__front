import { baseApi } from '@/src/shared/api/baseApi'

export const emailConfirmed = baseApi.injectEndpoints({
  endpoints: build => ({
    emailConfirmed: build.mutation<void, { confirmationCode: string }>({
      query: data => ({
        method: 'POST',
        url: 'auth/registration-confirmation',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})
export const { useEmailConfirmedMutation } = emailConfirmed
