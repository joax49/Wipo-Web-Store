export class AppError extends Error {
    status;
    code;
    constructor(code, message, status = 400) {
        super(message);
        this.code = code;
        this.status = status;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
//# sourceMappingURL=appError.js.map