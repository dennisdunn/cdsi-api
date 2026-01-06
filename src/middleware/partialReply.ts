import mung from "express-mung";

const extractFieldsFromObject = (json, fields) => {
    let data = {};
    fields.forEach(field => {
        data[field] = json[field];
    });
    return data;
}

/** Partial Reply */
const trimReply = (json, req, res) => {
    if (!!!req.query.fields) return undefined;

    const fields = req.query.fields.split(",");

    return Array.isArray(json) ? json.map(item => extractFieldsFromObject(item, fields)) : extractFieldsFromObject(json, fields)
}

export const partialReply = mung.json(trimReply);