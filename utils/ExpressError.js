class ExpressError extends Error {
    constructor(statuscode, message) {
        super();
        this.statusCode = statuscode;
        this.message = message;
    }
}

module.exports = ExpressError;