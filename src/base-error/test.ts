import { expect } from 'chai';
import { BaseError } from '.';

describe('base-error', () => {
    class ExtendedFromBaseError extends BaseError<string> {
        getErrorName(): string {
            return 'ExtendedFromBaseError';
        }
    }
    class TestClass {
        run() {
            this.ab();
        }

        ab() {
            this.bb();
        }

        bb() {
            this.cb();
        }

        cb() {
            throw new Error('some specific error');
        }
    }
    it('should create stack form base error', () => {
        const testInstance = new TestClass();
        try {
            testInstance.run();
        } catch (err) {
            const error = new ExtendedFromBaseError({ message: 'gtesagasd', type: 'some', previousError: err });
            const errStackSplittedAndTrimed = error.stack.split('\n').map((str) => str.trim());
            expect(errStackSplittedAndTrimed[0]).to.be.eql('Error: some specific error');
            expect(errStackSplittedAndTrimed[1].startsWith('at Context')).to.be.eql(true);
            expect(errStackSplittedAndTrimed[2].startsWith('at TestClass.cb')).to.be.eql(true);
            expect(errStackSplittedAndTrimed[3].startsWith('at TestClass.bb')).to.be.eql(true);
            expect(errStackSplittedAndTrimed[4].startsWith('at TestClass.ab')).to.be.eql(true);
        }
    });
});
