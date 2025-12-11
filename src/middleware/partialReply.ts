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