import kebabCase from 'just-kebab-case';

const re = new RegExp("\\b[A-Z]+\\b|[\/]")

export const readDb = (key, collection) => {
    key = re.test(key) ? key.toLowerCase() : key 
    key = kebabCase(key)
    return collection.find(item => item.key == key)
}
