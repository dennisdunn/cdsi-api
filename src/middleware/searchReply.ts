import mung from "express-mung";

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