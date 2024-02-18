import { baseApi } from '@/src/shared/api/baseApi'
import { clearToken } from '@/src/features/auth/signIn/model/signInSlice'

export const LogOut = baseApi.injectEndpoints({
  endpoints: build => ({
    logOut: build.mutation<any, void>({
      query: () => ({
        method: 'POST',
        url: 'auth/logout',
      }),
      async onQueryStarted(args, { dispatch }) {
        try {
          dispatch(clearToken())
        } catch (e) {
          console.error(e)
        }
      },
    }),
  }),
})
export const { useLogOutMutation } = LogOut
