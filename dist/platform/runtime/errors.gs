"use strict";
var Platform;
(function (Platform) {
    var Runtime;
    (function (Runtime) {
        class AppError extends Error {
            constructor(message, code, details) {
                super(message);
                this.code = code;
                this.details = details;
                this.name = 'AppError';
            }
        }
        Runtime.AppError = AppError;
        function normalizeError(error) {
            if (error instanceof Error)
                return error.message;
            if (typeof error === 'string')
                return error;
            return JSON.stringify(error);
        }
        Runtime.normalizeError = normalizeError;
    })(Runtime = Platform.Runtime || (Platform.Runtime = {}));
})(Platform || (Platform = {}));
