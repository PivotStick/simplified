const express = require("express");
const path = require("path");

const controllerHandler = (controller) => async (req, res, next) => {
    try {
        const payload = (await controller(req)) || {};
        const { status = 200, json = {}, headers = {} } = payload;

        for (const name in headers) {
            const value = headers[name];
            res.setHeader(name, value);
        }
        res.status(status).json(json);
    } catch (error) {
        next(error);
    }
};

const setEndpointsTo = (router, middlewaresEndpoint) => (endpoints, method) => {
    Object.keys(endpoints).forEach((key) => {
        let middlewares = key.split(" ");
        let endpoint = middlewares.splice(middlewares.length - 1, 1)[0];

        middlewares = middlewares
            .map((middleware) => {
                switch (middleware[0]) {
                    case "@":
                        middleware = middleware.slice(1) + ".js";
                        if (middlewaresEndpoint.matcher.test(middleware))
                            return require(path.join(
                                middlewaresEndpoint.path,
                                middleware
                            ));
                        break;
                }
            })
            .filter((m) => m.constructor !== Function);

        router[method](
            endpoint,
            ...middlewares,
            controllerHandler(endpoints[key])
        );
    });
};

const forEachMethodsOf = (controller, callback) =>
    Object.keys(controller)
        .filter((method) => /^(get|post|put|patch|delete)$/i.test(method))
        .forEach((method) => callback(controller[method], method));

const controllersMapper = (controller, prefix, middlewares) => {
    const router = express.Router();

    forEachMethodsOf(controller, setEndpointsTo(router, middlewares));

    return { prefix, router };
};

module.exports = (controllers, matcher, middlewares) =>
    controllers.map(({ result, fileName }) =>
        controllersMapper(
            result,
            "/" + fileName.match(matcher).groups.prefix,
            middlewares
        )
    );
