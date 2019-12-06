# Error utils

Throw normalized errors for better error handling and understanding what happend in our code.

Package include ancestor of all your errors and implementation of HTTP errors for simply use. In the package 
you also find swagger documentation for HTTP errors which can be used with 
[@qest/swagger-utils](https://www.npmjs.com/package/@qest/swagger-utils) package.

## Instalation
Install package to our dependencies from NPM.
```
yarn add @qest/error-utils
```
or
```
npm install @qest/error-utils
```

## Usage
For normalization of errors is good to have one ancestor for all errors which you throw in code. 
Also there is better to have more types of concrete errors for understanding what happend on first look.

### Define own errors 
```typescript
import { BaseError } from "@qest/error-utils";

export class SomeError extends BaseError {}

enum EnumOfErrorTypes {
    OneType,
    SecondType,
};
export class ComplexError extends BaseError<EnumOfErrorTypes> {}
```

### Use it in code
In this example you can see usage of previously defined errors. You must define type and message in error description.
You can also pass some data to payload, which is usefull for debugging what happend.
```typescript
try {
    // ... do something ...
    if(isBad){
        throw new SomeError({
            type: 'MY_ERROR_TYPE';
            message: 'some bad was happend';
        });
    }
    
    const data = { foo: 'bar' };
    // ... other code with data manipulating ...   
    if(data.foo !== 'bar') {
       throw new ComplexError({
            type: EnumOfErrorTypes.SecondType,
            message: 'Some bad was happend',
            payload: data,         
       });
    }
    
} catch (e) {
    console.error(e);
}
```

### Error descriptor object
All base error accept `IBaseErrorDescription` object, which has these paramethers:

|Property|Type|Default|Description
|---|---|---|---|
|type|`string` as default but it can be enum, number, etc.. ||is constant identificator of an error|
|message|`string`||is human readable report what happend. It can be variable|
|payload|`any`|null|here you can pass any data which help you to debug concrete problem|
|previousError|Error|null|if our error is consequence of other error (e.g. error from third party package), you can use his stacktrace to know where is problem|
|fingerprint|string|null|fingerprint can be used for grouping some errors together in sentry from [@qest/logger-utils](https://www.npmjs.com/package/@qest/logger-utils) package|

## HTTP errors
This is special errors definiton for expres, etc...
We use this errors to handle error in express middleware from [@qest/express-utils](https://www.npmjs.com/package/@qest/express-utils) package, but it can be used anywhere.

They is descendants of BaseError and have defaults for properties, so you don't have to define type etc.
```typescript
import {NotFoundError} from "@qest/error-utils"; 
export const someExpressController = (req, res, next) => {
    try {
        if(!exist){
            throw new NotFoundError({ message: 'something not exist' });
        }
    } catch (e) {
        next(e);
    }
}
```

### Swagger documentation of HTTP errors 
It can be used with our [@qest/swagger-utils](https://www.npmjs.com/package/@qest/swagger-utils) package.
We have documentation for 2.0 and 3.0 OpenAPI definition.

#### How to use with [@qest/swagger-utils](https://www.npmjs.com/package/@qest/swagger-utils) package
First define swagger generator and load HTTP errors definitons with it.
```
export const swaggerGenerator = new SwaggerGenerator({   
    ...
    includePaths: ['./src', './node_modules/@qest/error-utils/dist/http-errors/doc-swagger-2.0'],   
});
```
Than you can use it everywhere in your swagger yamls.
```yaml
paths:p
  /api/v1/something/{id}:
    get:
      produces:
        - application/json
      description: get sometginf
      parameters:
        - in: path
          name: id
          required: true
          type: string        
      responses:
        200:
          $ref: '#/responses/OurSomethingResponse'
        401:
          $ref: '#/responses/UnauthorizedError'
        404:
          $ref: '#/responses/NotFoundError'
        422:
          $ref: '#/responses/UnprocessableEntityError' 
```