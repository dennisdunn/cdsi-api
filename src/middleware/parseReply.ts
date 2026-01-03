import mung from "express-mung";

const parse = node => {
    if (typeof node == 'object') {
        for (let key in node) {
            node[key] = parse(node[key]);
        }
    } else {
        if (typeof node == 'string') {
            if (node == "Yes" || node == "Y") {
                return true;
            } else if (node == "No" || node == "N") {
                return false;
            } else if (isDateString(node)) {
                return parseDate(node);
            } else if (isIntervalString(node)) {
                return parseInterval(node);
            } else if (isListOfNumber(node)) {
                return node.split(";").map(parseFloat).filter(item => !isNaN(item));
            } else if (isNumber(node)) {
                return parseFloat(node.replace(/[a-zA-Z]/g, ''));
            }
        }
    }
    return node;
}

const dateRe = [

]
const parseDate = str => {
    const reg1 = /(\d{4})-?(\d{2})-?(\d{2})/;
    const reg2 = /(\d{2})\/(\d{2})\/(\d{4})/;
    if (reg1.test(str)) {
        const match = reg1.exec(str);
        return match ? ({ year: match[1], month: match[2], date: match[3] }) : str;
    } else if (reg2.test(str)) {
        const match = reg2.exec(str);
        return match ? ({ year: match[3], month: match[1], date: match[2] }) : str;
    } else {
        return str;
    }
}

const isDateString = str => {
    const reg = /\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}/; // doesn't match test case ids
    return reg.test(str);
}

const parseInterval = str => {
    const reg = /(-?\d+)(year|month|week|day)/ig;
    const ws = /\s|s/ig;
    str = str.replace(ws, '').toLowerCase();
    const matches = str.matchAll(reg).map(match => ({ 'value': parseFloat(match[1]), 'unit': match[2] }));
    return matches ? [...matches] : str;
}

const isNumber = str => {
    if (typeof str == 'string') {
        const reg = /^(Dose )?-?\d+\.?\d*$/;
        return reg.test(str);
    }
    else {
        return false;
    }
}

const isListOfNumber = str => {
    const reg = /\d+\s*;/;
    return reg.test(str);
}

const isIntervalString = str => {
    const reg = /^-?\s*\d+\s*[month|week|day|year]/i;
    return reg.test(str);
}

const parseJson = (json, req, res) => {
    return parse(json);
}


export const parseReply = mung.json(parseJson);