export const truncateDescription = (description: string): string => {
  return description.substring(0, 125) + '...'
}
