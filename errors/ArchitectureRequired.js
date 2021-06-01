module.exports = class ArchitectureRequired extends Error {
    constructor() {
        super(
            `The "architecture" property is required, please refer to the "READEME.md" as an example`
        );
    }
};
