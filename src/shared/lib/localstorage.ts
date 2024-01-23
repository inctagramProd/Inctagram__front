import { AppRootState } from '@/src/app/store'

const KEY = 'accessToken'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(KEY)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = (state: AppRootState) => {
  const signIn = state.signIn
  let lsData = { signIn }

  try {
    const serializedState = JSON.stringify(lsData)
    localStorage.setItem(KEY, serializedState)
  } catch {
    // ignore write errors
  }
}
