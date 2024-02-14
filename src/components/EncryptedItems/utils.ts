export const delay = (timeout: number = 1000): Promise<void> => new Promise(resolve => setTimeout(resolve, timeout))

export const htmlDecode = (input: string): string | null => {
    var doc = new DOMParser().parseFromString(input, 'text/html')
    return doc.documentElement.textContent
}
