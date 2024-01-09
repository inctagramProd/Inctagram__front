export const transformNumberToArray = (number: number, selected: number) => {
  const arr: any[] = Array.from({ length: number }, (_, i) => i + 1)
  const index: number | string = arr.indexOf(selected)
  let result: any[]

  if (arr.length < 7) {
    return arr
  }

  if (index <= 2) {
    result = arr.slice(0, 5).concat(['...'], arr.slice(-1))
  } else if (index >= arr.length - 3) {
    result = arr.slice(0, 1).concat(['...'], arr.slice(-6))
  } else {
    result = arr
      .slice(0, 1)
      .concat(['...'], arr.slice(index - 1, index + 2), ['...'], arr.slice(-1))
  }

  return result
}
