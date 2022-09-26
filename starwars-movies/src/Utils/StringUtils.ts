export const extractParameterFromUrl = (
    url: string,
    keyBeforeValue: string
) => {
    const split = url.split('/')
    const index = split.findIndex((val) => val === keyBeforeValue)
    if (index < 0) return null
    return split[index + 1]
}
