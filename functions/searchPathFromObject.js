const path = require("path");

/**
 * @param {string} endpoint The name of the targeted directory
 * @param {{ [k: string]: Object | RegExp }} object The architecture object
 * @param {string} currentPath The recursive passed variable (do not use)
 *
 * @returns {null | { path: string, matcher: RegExp }} null if nothing is found
 */
module.exports = (endpoint, object, currentPath = "") => {
    if (object.constructor === RegExp)
        return currentPath.endsWith(endpoint)
            ? { path: currentPath, matcher: object }
            : null;

    if (object.constructor !== Object)
        throw new Error(
            `${object.constructor.name} is expected to be an Object or a Regex`
        );

    for (const key in object) {
        const result = module.exports(
            endpoint,
            object[key],
            path.join(currentPath, key)
        );

        if (result !== null) return result;
    }

    return null;
};
