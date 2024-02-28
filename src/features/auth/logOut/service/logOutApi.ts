import { clearToken } from '@/src/features/auth/signIn/model/signInSlice'
import { baseApi } from '@/src/shared/api/baseApi'

export const LogOut = baseApi.injectEndpoints({
  endpoints: build => ({
    logOut: build.mutation<any, void>({
      async onQueryStarted(args, { dispatch }) {
        try {
          dispatch(clearToken())
        } catch (e) {
          console.error(e)
        }
      },
      query: () => ({
        method: 'DELETE',
        url: 'auth/logout',
      }),
    }),
  }),
})
export const { useLogOutMutation } = LogOut
