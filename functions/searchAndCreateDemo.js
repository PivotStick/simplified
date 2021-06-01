const EndpointNotFound = require("../errors/EndpointNotFound");
const createEndpointWithDemo = require("./createEndpointWithDemo");
const searchPathFromObject = require("./searchPathFromObject");

module.exports = ({ endpoint, demoFile, architecture }) => {
    const result = searchPathFromObject(endpoint, architecture);

    if (result === null) throw new EndpointNotFound(endpoint);

    createEndpointWithDemo(result.path, demoFile);

    return result;
};
