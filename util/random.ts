export const getRandomString = () => {
    return 'k6' + Math.random().toString(36).substring(3)
}

export const getRandomEmail = () => {
    return 'k6' + Math.random().toString(36).substring(3) + '@k6.com'
}

export const getRandomIndex = (length: number) => Math.floor(Math.random() * length);
