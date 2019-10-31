import * as util from 'util';
import { BaseError, IBaseErrorDescription } from '../base-error';

interface IErrorDescriptionMessage<E> {
    type: E;
    message: string;
}

export interface IErrorDescriptionContainer<E> {
    errorName: string;
    messages: IErrorDescriptionMessage<E>[];
}

export class GenericError<E> extends BaseError<E> {
    public name: string;
    public payload: any;
    public type: E;

    constructor(errorName: string, error: IBaseErrorDescription<E>) {
        super(error);
        this.name = errorName;
    }
}

export const errorFactory = <E>(
    errorDescription: IErrorDescriptionContainer<E>,
    genericErrorChild: new (errorName: string, error: IBaseErrorDescription<E>) => GenericError<E>,
    errorType: E,
    payload?: any[] | any,
) => {
    const isPayloadArray = Array.isArray(payload);
    const errorData = errorDescription.messages.find((message: IErrorDescriptionMessage<E>) => message.type === errorType);

    if (!errorData) {
        throw new GenericError('ErrorFactoryError', {
            type: 'TypeError',
            message: `type '${errorType}' was not defined in description ${JSON.stringify(errorDescription)}`,
            payload: [errorType, errorDescription],
        });
    }

    const genericErrorConfig = {
        payload,
        type: errorData.type,
        message: isPayloadArray
            ? util.format(errorData.message, ...payload.map((obj) => JSON.stringify(obj)))
            : errorData.message.replace('%s', JSON.stringify(payload)),
    };
    return genericErrorChild
        ? new genericErrorChild(errorDescription.errorName, genericErrorConfig)
        : new GenericError(errorDescription.errorName, genericErrorConfig);
};

export const createErrorFactory = <E>(
    errorDescriptions: IErrorDescriptionContainer<E>,
    genericErrorChild?: new (errorName: string, error: IBaseErrorDescription<E>) => GenericError<E>,
): ((errorType: E, payload?: any[] | any) => GenericError<E>) => {
    return errorFactory.bind(null, errorDescriptions, genericErrorChild);
};
