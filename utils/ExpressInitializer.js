const express = require("express");
const getRoutersFromControllers = require("../functions/getRoutersFromControllers");
const ProjectInitializer = require("./ProjectInitializer");

module.exports = class ExpressInitializer {
    app = express();

    constructor(resources) {
        this.controllers = resources.controllers;
        this.middlewares = resources.middlewares;

        this.initControllers();
    }

    initControllers() {
        const controllers = getRoutersFromControllers(
            ProjectInitializer.require(this.controllers),
            this.controllers.matcher,
            this.middlewares
        );

        controllers.forEach(({ prefix, router }) => {
            this.app.use(prefix, router);
        });
    }

    listen(port = 3500) {
        return new Promise((resolve) => {
            this.app.listen(port, () => resolve(port));
        });
    }
};
