export function addComma(value?: string | number, postfix = ' 원') {
  if (!value) {
    return
  }

  const number = Number(value)
  if (Number.isNaN(number)) {
    return Number.NaN
  }

  const result = number.toLocaleString('ko-KR')

  return !postfix ? result : `${result}${postfix}`
}
