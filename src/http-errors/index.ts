/* tslint:disable:max-classes-per-file */
import * as CODES from 'http-codes';
import { BaseError, IBaseErrorDescription } from '../base-error';

export interface IHttpError extends Error {
    code: number;
    type: string;
    payload: any;
    isHttp: true;
}

interface IHttpErrorDescription<E> {
    type?: E;
    message?: string;
    payload?: any;
    err?: BaseError<E> | Error;
}

interface IErrorDesriptor<E> {
    type: E;
    message: string;
    code: number;
}

export abstract class HttpError extends BaseError<string> implements IHttpError {
    public message: string;
    public code: number;
    public isHttp: true;

    constructor(errorDescription?: IHttpErrorDescription<string>) {
        const errorMessage = errorDescription || { message: null, payload: null, type: null, err: null };
        super(errorMessage as IBaseErrorDescription<string>);

        const { message, type, err } = errorMessage;
        this.stack = err ? err.stack : this.stack;

        const descriptor = this.getDescriptor();
        this.code = descriptor.code;

        const errMessage = err ? err.message : null;
        const descriptorMessage = descriptor ? descriptor.message : null;
        const errType = err ? (<BaseError<any>>err).type : null;
        const descriptorType = descriptor ? descriptor.type : null;

        this.message = message || errMessage || descriptorMessage;
        this.type = type || errType || descriptorType;
        this.isHttp = true;
    }

    protected abstract getDescriptor(): IErrorDesriptor<string>;
}

export class BadRequestError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'bad_request',
            message: 'Request not processed',
            code: CODES.BAD_REQUEST,
        };
    }
}

export class UnauthorizedError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'unauthorized',
            message: 'Authorization process fail',
            code: CODES.UNAUTHORIZED,
        };
    }
}

export class ForbiddenError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'forbidden',
            message: 'Permission denied',
            code: CODES.FORBIDDEN,
        };
    }
}

export class NotFoundError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'not_found',
            message: 'Resource not found',
            code: CODES.NOT_FOUND,
        };
    }
}

export class MethodNotAllowedError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'method_not_allowed',
            message: 'Method Not Allowed',
            code: CODES.METHOD_NOT_ALLOWED,
        };
    }
}

export class NotAcceptableError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'not_acceptable',
            message: `Request isn't acceptable`,
            code: CODES.NOT_ACCEPTABLE,
        };
    }
}

export class RequestTimeoutError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'request_timeout',
            message: `Request timeouted`,
            code: CODES.REQUEST_TIMEOUT,
        };
    }
}

export class ConflictError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'conflict',
            message: `Data conflict`,
            code: CODES.CONFLICT,
        };
    }
}

export class GoneError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'gone',
            message: `Resource isn't available`,
            code: CODES.GONE,
        };
    }
}

export class LengthRequiredError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'length_required',
            message: `Request length header is required`,
            code: CODES.LENGTH_REQUIRED,
        };
    }
}

export class PreconditionFailedError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'precondition_failed',
            message: `Request precondition failed`,
            code: CODES.PRECONDITION_FAILED,
        };
    }
}

export class RequestEntityTooLargeError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'request_entity_too_large',
            message: `Request entity is too large`,
            code: 413,
        };
    }
}

export class UnsupportedMediaTypeError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'unsupported_media_type',
            message: `Media type is not supported`,
            code: CODES.UNSUPPORTED_MEDIA_TYPE,
        };
    }
}

export class UnprocessableEntityError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'unprocessable_entity',
            message: `Validation isn't pass`,
            code: CODES.UNPROCESSABLE_ENTITY,
        };
    }
}

export class LockedError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'locked',
            message: `Resource is locked`,
            code: CODES.LOCKED,
        };
    }
}

export class FailedDependencyError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'failed_dependency',
            message: `Request depependency failed`,
            code: CODES.FAILED_DEPENDENCY,
        };
    }
}

export class PreconditionRequiredError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'precondition_required',
            message: `Request need precondition`,
            code: CODES.PRECONDITION_REQUIRED,
        };
    }
}

export class InternalServerError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'internal_server_error',
            message: `Internal server error`,
            code: CODES.INTERNAL_SERVER_ERROR,
        };
    }
}

export class NotImplementedError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'not_implemented',
            message: `Feature was not implemented`,
            code: CODES.NOT_IMPLEMENTED,
        };
    }
}

export class ServiceUnavailableError extends HttpError {
    protected getDescriptor(): IErrorDesriptor<string> {
        return {
            type: 'service_unavailable',
            message: `Service is temporarily unavailable`,
            code: CODES.SERVICE_UNAVAILABLE,
        };
    }
}
