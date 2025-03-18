import { baseApi } from '@/src/shared/api/baseApi'
import {GetTotalUsersResponse} from "@/src/features/profile/model/types/profileTypes";

export const publicProfileApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getPublicProfile: build.query({
      query: profileId => ({
        url: `public-user/profile/${profileId}`,
      }),
    }),
    getTotalUsersCount: build.query<GetTotalUsersResponse, void>({
      query: () => ({
        url: 'public-user',
      }),
    }),
  }),
})

export const { getPublicProfile, getTotalUsersCount } = publicProfileApi.endpoints
export const { useGetPublicProfileQuery, useGetTotalUsersCountQuery } = publicProfileApi
