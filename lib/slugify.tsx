const Slugify = (text: any) => {
    // const randomnumber = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
    const slug =  String(text)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-'); // remove consecutive hyphens

    const final_slug = slug;
    return final_slug;
}
 
export default Slugify;