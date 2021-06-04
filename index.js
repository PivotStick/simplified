const ArchitectureRequired = require("./errors/ArchitectureRequired");
const ExpressInitializer = require("./utils/ExpressInitializer");
const ProjectInitializer = require("./utils/ProjectInitializer");

class App {
    /**
     * @param {{
     *  port?: number;
     *  beforeControllers?: import("express").Handler[]
     *  errorHandler?: import("express").ErrorRequestHandler
     *  architecture: {
     *      [__dirname]: { [k: string]: object | RegExp }
     *  };
     *  endpoints?: {
     *      controllers?: string
     *      middlewares?: string
     *  };
     * }} configs
     */
    constructor(configs = {}) {
        if (!configs.architecture) throw new ArchitectureRequired();

        this.configs = configs;
        this.initializeProject();
    }

    async initializeProject() {
        const project = new ProjectInitializer(
            this.configs.architecture,
            this.configs.endpoints
        );

        const { controllers, middlewares } = project.initialize();

        const app = new ExpressInitializer({
            beforeControllers: this.configs.beforeControllers,
            controllers,
            middlewares,
        });

        app.initControllers();

        app.errorHandler(
            this.configs.errorHandler ||
                ((err, req, res, next) => {
                    res.status(err.status || 400).json({
                        [req.method]: req.url,
                        error: { ...err },
                    });
                })
        );

        const port = await app.listen(this.configs.port);

        (
            this.configs.onListen ||
            (() => {
                console.clear();
                console.log(`http://localhost:${port}`);
            })
        )();
    }
}

module.exports = App;
