const yaml = require("yaml");
const fs = require("node:fs");

const extensions = [".yml", ".yaml"];

extensions.forEach(extension => {
    require.extensions[extension] = (module, filename) => {
        module.exports = yaml.parse(fs.readFileSync(filename, "utf8"));
    }
});