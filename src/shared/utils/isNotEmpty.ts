export const isNotEmpty = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value !== ''
}
