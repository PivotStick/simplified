module.exports = class EndpointNotFound extends Error {
    constructor(endpoint) {
        super(`"${endpoint}" is not found in the provided architecture.`);
    }
};
