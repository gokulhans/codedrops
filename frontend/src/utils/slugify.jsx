const convertToSlug = (text) => {
    return text
        .toLowerCase() // convert the string to lowercase
        .replace(/\s+/g, '-') // replace spaces with dashes
        .replace(/[^\w\-]+/g, '') // remove non-word characters (except dashes)
        .replace(/\-\-+/g, '-') // replace multiple dashes with a single dash
        .replace(/^-+/, '') // trim dashes from the beginning of the string
        .replace(/-+$/, ''); // trim dashes from the end of the string
}

export default convertToSlug;