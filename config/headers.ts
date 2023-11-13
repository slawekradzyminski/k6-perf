export const jsonHeaders = { 'Content-Type': 'application/json' }

export const authHeaders = (token: string) => {
    return {
        ...jsonHeaders,
        Authorization: `Bearer ${token}`
    }
}