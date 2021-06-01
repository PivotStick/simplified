const ArchitectureRequired = require("./errors/ArchitectureRequired");
const ExpressInitializer = require("./utils/ExpressInitializer");
const ProjectInitializer = require("./utils/ProjectInitializer");

class App {
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
            controllers,
            middlewares,
        });

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
