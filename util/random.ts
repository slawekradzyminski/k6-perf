export const getRandomString = () => {
    return 'k6' + Math.random().toString(36).substring(2)
}

export const getRandomEmail = () => {
    return 'k6' + Math.random().toString(36).substring(2) + '@k6.com'
}