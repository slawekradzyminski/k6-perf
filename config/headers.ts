export const jsonHeaders = {
    'Content-Type': 'application/json'
}

export const getAuthHeaders = (token: string) => {
    return {
        ...jsonHeaders,
        Authorization: `Bearer ${token}`
    }
}