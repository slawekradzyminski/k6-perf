import { sleep } from "k6";
import { randomIntBetween } from "./randomUtil"

export const repeat = (func: Function, times: number) => {
    const wholeTimes = Math.floor(times); 
    for (let i = 0; i < wholeTimes; i++) {
        func();
        sleep(randomIntBetween(1, 4))
    }

    const probability = times - wholeTimes;
    runWithProbability(func, probability)
};

export const runWithProbability = (func: Function, probability: number) => {
    if (Math.random() <= probability) {
        func()
        sleep(randomIntBetween(1, 4))
    }
}