export const delay = (timeout: number  = 1000):Promise<void> => new Promise(resolve => setTimeout(resolve, timeout))
