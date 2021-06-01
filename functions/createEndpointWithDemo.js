const fs = require("fs");
const path = require("path");
const demos = require("../demos");

module.exports = (fullPath, demoFile) => {
    if (fs.existsSync(fullPath)) return;

    fs.mkdirSync(fullPath, { recursive: true });

    if (demoFile)
        fs.writeFileSync(
            path.join(fullPath, demoFile + ".js"),
            demos.get(demoFile)
        );
};
