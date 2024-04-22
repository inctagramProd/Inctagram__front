import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
// Mutex. Preventing multiple unauthorized errors
import { Mutex } from 'async-mutex'
import { api } from './ThirdPartyApi'
import { clearToken, setToken } from '@/src/features/auth/signIn/model/signInSlice'
import { AppRootState } from '@/src/app/store'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: api.serverURL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as AppRootState).signIn.accessToken
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          { url: 'auth/update-tokens-pair', method: 'PUT' },
          api,
          extraOptions
        )
        // try to get a new token
        if (refreshResult.data) {
          const newAccessToken = refreshResult.data as { accessToken: string }
          api.dispatch(setToken(newAccessToken))
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(clearToken())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}