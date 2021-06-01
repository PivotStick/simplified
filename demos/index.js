const fs = require("fs");
const path = require("path");

const getFile = (file) =>
    fs.readFileSync(path.join(__dirname, file), { encoding: "utf-8" });

this.get = (file) => {
    const header = getFile("header.txt");
    const demo = getFile(`${file}.js`);

    return `${header}\n\n${demo}`;
};
