export const repeatNTimes = (fn: Function, p: number) => {
    for (let i = 0; i < Math.floor(p); i++) {
        fn()
    }
    runWithProbability(fn, p - Math.floor(p))
}

export const runWithProbability = (fn: Function, p: number) => {
    if (Math.random() <= p) {
        fn()
    }
}