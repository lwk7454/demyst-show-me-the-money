
export async function wait(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), time * 1000))
}
