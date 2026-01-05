import kebabCase from 'just-kebab-case';

export const readDb = (key, collection) => {
    key = key == "DTaP/Tdap/Td" ? key.toLowerCase() : key
    key = kebabCase(key)
    return collection.find(item => item.key == key)
}