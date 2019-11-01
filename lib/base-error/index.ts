export interface IBaseErrorDescription<E> {
    type: E;
    message: string;
    payload?: any;
    fingerprint?: string;
    previousError?: Error;
}

export abstract class BaseError<E> extends Error {
    name: string;
    payload: any;
    type: E;
    fingerprint: string;

    constructor(errorDescription: IBaseErrorDescription<E>) {
        super(errorDescription.message);
        const { type, payload, fingerprint, previousError } = errorDescription;

        this.name = this.getErrorName();
        this.payload = payload || {};
        this.type = type;
        this.fingerprint = fingerprint;
        if (previousError) {
            try {
                const currentStack = this.stack.split('\n');
                const previousStack = previousError.stack.split('\n');
                this.stack = [previousStack[0], currentStack[1], ...previousStack.slice(1)].join('\n');
            } catch (err) {
                this.stack = previousError.stack; // if something went wrong, we won't throw exception in base error
            }
        }
    }

    getErrorName() {
        return this.constructor.name;
    }
}
