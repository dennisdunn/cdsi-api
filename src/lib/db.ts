import kebabCase from 'just-kebab-case';

export const readDb = (key, collection) => {
    key = key.indexOf('/') > -1 ? key.toLowerCase() : key
    key = kebabCase(key)
    return collection.find(item => item.key == key)
}