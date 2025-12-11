import mung from "express-mung";

/** Partial Reply */
const trimReply = (json, req, res) => {
    if (!!!req.query.fields) return undefined;

    const fields = req.query.fields.split(",");

    let data = {};
    fields.forEach(field => {
        data[field] = json[field];
    });

    return data;
}

export const partialReply = mung.json(trimReply);

/** NoCache */
export const noCache = (req, res, next) => {
    res.set('Cache-control', 'no-cache, max-age=0');
    next();
}

/** Search */
const searchProperty = (value, term) => {
    if (!!!value) return false;

    switch (typeof value) {
        case "string":
            return value.toLowerCase().includes(term.toLowerCase());
        case "number":
            return value === parseFloat(term);
        case "object":
            return searchObj(value, term);
        default:
            return false;
    }
};

const searchObj = (obj, term) => {
    return Object.keys(obj)
        .map((key) => searchProperty(obj[key], term))
        .reduce((a, c) => a || c, false);
};

const makePredicate = (terms) => {
    return (obj) => {
        return terms
            .map((term) => searchObj(obj, term))
            .reduce((a, c) => a || c, false);
    };
};

const search = (json, req, res) => {
    if (!!!req.query.q || !Array.isArray(json)) return undefined;

    const terms = req.query.q.split(",");
    return json.filter(makePredicate(terms));
};


export const searchReply = mung.json(search);

// EmptyString Munger

const getType = o => Array.isArray(o) ? 'array' : typeof (o);

const emptyStringToNull = (json, req, res) => {
    if (!!!json) return undefined;

    switch (getType(json)) {
        case 'object':
            const keys = Object.keys(json);
            keys.forEach(key => {
                switch (getType(json[key])) {
                    case 'string':
                        json[key] = json[key] === "" ? null : json[key];
                        break;
                    case 'array':
                        if (json[key].length === 1 && json[key][0] === "") {
                            json[key] = [];
                        } else {
                            emptyStringToNull(json[key], req, res);
                        }
                        break;
                    case 'object':
                        emptyStringToNull(json[key], req, res);
                        break;
                    default:
                        break;
                }
            });
            return json;
        case 'array':
            json.forEach(element => {
                emptyStringToNull(element, req, res)
            });
            return json;
        default:
            return json === "" ? null : json;
    }
}

export const nullstringReply = mung.json(emptyStringToNull);


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

export const cleanUpReply = mung.json(cleanUpEmptyProperties);

