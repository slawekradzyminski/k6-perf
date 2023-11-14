export const repeatNTimes = (fn: Function, n: number) => {
    for (let i = 0; i < Math.floor(n); i++) {
        fn()
    }
    // last iteration with certain probability. So for 3.5 last iteration with probability 50%
    executeWithProbability(fn, n - Math.floor(n))
}

export const executeWithProbability = (fn: Function, p: number) => {
    if (Math.random() <= p) {
        fn()
    }
}