import { expect } from 'chai';
import * as CODES from 'http-codes';
import { NotFoundError } from './';

describe('http-error', () => {
    it('should create error with default values', () => {
        const httpError = new NotFoundError();

        expect(httpError).to.have.property('code', CODES.NOT_FOUND);
        expect(httpError).to.have.property('type', 'not_found');
        expect(httpError).to.have.property('message', 'Resource not found');
        expect(httpError).to.have.property('isHttp', true);
        expect(httpError)
            .to.have.property('payload')
            .be.deep.eq({});
    });

    it('should create error with extended values', () => {
        const httpError = new NotFoundError({
            message: 'some message',
            type: 'new_type',
            payload: { a: 'b' },
        });

        expect(httpError).to.have.property('code', CODES.NOT_FOUND);
        expect(httpError).to.have.property('type', 'new_type');
        expect(httpError).to.have.property('message', 'some message');
        expect(httpError).to.have.property('isHttp', true);
        expect(httpError)
            .to.have.property('payload')
            .be.deep.eq({ a: 'b' });
    });
});
