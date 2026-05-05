import mung from "express-mung";

const transform = value => {
    switch (value) {
        case "null":
        case "":
            return null;
        case "undefined":
            return undefined;
        case "true":
        case "Yes":
        case "Y":
            return true;
        case "false":
        case "No":
        case "N":
            return false;
        default:
            if (RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/).test(value)) {
                return new Date(value);
            } else if (RegExp(/^\d{4}-\d{2}-\d{2}$/).test(value)) {
                return new Date(value);
            } else if (RegExp(/^(\d{4})(\d{2})(\d{2})$/).test(value)) {
                const [, year, month, day] = value.match(/^(\d{4})(\d{2})(\d{2})$/);
                return new Date(`${year}-${month}-${day}`);
            }
            else if (RegExp(/^\d+$/).test(value)) {
                return parseInt(value, 10);
            } else if (RegExp(/^\d+\.\d+$/).test(value)) {
                return parseFloat(value);
            } else if (RegExp(/^(\d+;\s*)+$/).test(value + ";")) {
                const numbers = value.split(";").filter(v => v !== "").map(v => parseInt(v, 10));
                return numbers;
            } else {
                return value;
            }
    }
}

const isEmptyObject = obj => { 
    return Object.values(obj).every(value => value === null || value === "");
}

const isEmptyArray = arr => { 
    return Array.isArray(arr) && arr.length === 0 || (arr.length === 1 && arr[0] === null || arr[0] === "");
}

const normalize = (obj) => {
    if (Array.isArray(obj)) {
        return isEmptyArray(obj) ? [] : obj.map(item => normalize(item));
    }
    else if (typeof obj === "object" && obj !== null) {
        if (isEmptyObject(obj)) {
            return null;
        } else {
            for (let key in obj) {
                obj[key] = normalize(obj[key]);
            }
            return obj;
        }
    } else if (typeof obj === "string") {
        return transform(obj);
    } else {
        return obj;
    }
}

export default mung.json((obj, req, res) => normalize(obj));