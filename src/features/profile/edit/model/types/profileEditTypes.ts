export type ProfileEditParams = {
    userName: string
    firstName: string
    lastName: string
    country: string
    city: string
    aboutMe: string
    dateOfBirth: string
}

export type ProfileData = {
    userName: string
    firstName: string
    lastName: string
    dateOfBirth: string
    country: string
    city: string
    aboutMe: string
    userId: number | null
    createdAt: string
    updatedAt: string
    deletedAt: string
    profileImageURL: string | undefined
    canModify: boolean
}

// {
//   "id": 2250,
//     "userName": "testuser22",
//     "firstName": null,
//     "lastName": null,
//     "city": null,
//     "country": null,
//     "region": null,
//     "dateOfBirth": null,
//     "aboutMe": null,
//     "createdAt": "2025-02-16T19:37:22.047Z",
//     "avatars": []
// }