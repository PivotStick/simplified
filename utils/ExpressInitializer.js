const { Router } = require("express");
const express = require("express");
const getRoutersFromControllers = require("../functions/getRoutersFromControllers");
const ProjectInitializer = require("./ProjectInitializer");

module.exports = class ExpressInitializer {
    app = express();

    constructor({ beforeControllers = [], controllers, middlewares }) {
        this.beforeControllers = beforeControllers;
        this.controllers = controllers;
        this.middlewares = middlewares;
    }

    initControllers() {
        const controllers = getRoutersFromControllers(
            ProjectInitializer.require(this.controllers),
            this.controllers.matcher,
            this.middlewares
        );

        this.app.use(express.json());

        for (const handler of this.beforeControllers) this.app.use(handler);

        controllers.forEach(({ prefix, router }) => {
            this.app.use(prefix, router);
        });

        this.app.use((req, res, next) => {
            const error = new Error("Route not found");
            error.status = 404;
            next(error);
        });
    }

    /**
     * @param {import("express").ErrorRequestHandler} handler
     */
    errorHandler(handler) {
        this.app.use(handler);
    }

    listen(port = 3500) {
        return new Promise((resolve) => {
            this.app.listen(port, () => resolve(port));
        });
    }
};
