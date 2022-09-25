export const extractParameterFromUrl = (
    url: string,
    keyBeforeValue: string
) => {
    const split = url.split('/')
    const index = split.findIndex((val) => val === keyBeforeValue) + 1
    return split[index]
}
