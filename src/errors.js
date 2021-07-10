class vkToolsError extends Error {
    constructor(message) {
        super(message);
    };
};

class VKAPIError extends Error {
    constructor(code, message) {
        super(message);

        this.code = +code;
        this.message = message;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    };
};

module.exports = { vkToolsError, VKAPIError };