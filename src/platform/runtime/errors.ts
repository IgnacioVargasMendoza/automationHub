namespace Platform.Runtime {
    export class AppError extends Error {
        constructor(message: string, public code: string, public details?: any) {
            super(message);
            this.name = 'AppError';
        }
    }

    export function normalizeError(error: unknown): string {
        if (error instanceof Error) return error.message;
        if (typeof error === 'string') return error;
        return JSON.stringify(error);
    }
}
