export const params = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const paramsWithAuth = (token: string) => ({
  ...params,
  headers: {
    ...params.headers,
    'Authorization': `Bearer ${token}`
  }
});
