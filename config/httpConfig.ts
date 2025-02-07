import { userAgent } from "./userAgentProvider";

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'user-agent': userAgent()
  };
  
  export const params = {
    headers: defaultHeaders
  };
  
  export const authParams = (token: string, tags: { [name: string]: string; } = {}) => ({
    tags: tags,
    headers: {
      ...defaultHeaders,
      'Authorization': `Bearer ${token}`
    }
  });