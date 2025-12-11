import mung from "express-mung";

const isEmpty = node => {
    switch (typeof node) {
        case 'object':
            let result = true;
            for (let key in node) {
                result = result && isEmpty(node[key]);
            }
            return result;
        case 'string':
            return node === "" || node === "null";
        case 'number':
            return false;
    }
}

const cleanUpEmptyProperties = (json, req, res) => {
    if (isEmpty(json)) {
        if (Array.isArray(json)) {
            return [];
        } else {
            return null;
        }
    } else {
        if (typeof json == 'object') {
            for (let key in json) {
                json[key] = cleanUpEmptyProperties(json[key], null, null);
            }
        }
        return json;
    }
}

export const cleanReply = mung.json(cleanUpEmptyProperties);