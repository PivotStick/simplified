/**
 * The name of this file is the identifier to find it.
 *
 * For this instance if you type "@demo" before the route name
 * it will find it here
 */

/** @type {import("express").Handler} */
module.exports = async (req, res, next) => {
    // My middleware

    next();
};
