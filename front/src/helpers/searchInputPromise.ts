export const searchInputPromise = (
  input: HTMLInputElement
): Promise<string> => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(input.value)
    }, 500)

    input.addEventListener('input', () => {
      clearTimeout(timeout)
    })
  })
}
