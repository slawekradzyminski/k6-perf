export const repeat = (func: Function, times: number) => {
    for (let i = 0; i < times; i++) {
      func()
    }
  }