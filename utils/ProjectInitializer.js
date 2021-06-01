const fs = require("fs");
const { join } = require("path");
const searchAndCreateDemo = require("../functions/searchAndCreateDemo");

module.exports = class ProjectInitializer {
    constructor(architecture, endpoints = {}) {
        this.architecture = architecture;
        this.endpoints = endpoints;
    }

    initialize() {
        return {
            controllers: this.makeControllers(this.endpoints.controllers),
            middlewares: this.makeMiddlewares(this.endpoints.middlewares),
        };
    }

    makeControllers(endpoint = "controllers") {
        return this.makeEndpoint(endpoint, "controller.demo");
    }

    makeMiddlewares(endpoint = "middlewares") {
        return this.makeEndpoint(endpoint, "demo");
    }

    makeEndpoint(endpoint, demoFile) {
        return searchAndCreateDemo({
            endpoint,
            demoFile,
            architecture: this.architecture,
        });
    }

    static require({ path, matcher }) {
        const results = [];
        const files = fs.readdirSync(path).filter((file) => matcher.test(file));

        files.forEach((fileName) => {
            const fullPath = join(path, fileName);
            const result = require(fullPath);
            results.push({ result, fileName });
        });

        return results;
    }
};
