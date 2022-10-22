import HttpException from '@models/http-exception.model';

const testCases = [
  { errorCode: 100, errorType: 'MISSING_FIELD', statusCode: 400, message: 'foo is required' },
  { errorCode: 101, errorType: 'INVALID_FIELD', statusCode: 400, message: 'invalid foo param' },
  { errorCode: 102, errorType: 'UNAVAILABLE_API_SERVICE', statusCode: 503, message: 'api is offline' }
];

describe('http exception model', () => {
  test.each(testCases)(
    'should return errorCode $errorCode mapped with message $message',
    ({ errorCode, message, errorType, statusCode }) => {
      const httpException = new HttpException(errorCode, message);
      expect(httpException.errorCode).toEqual(errorCode);
      expect(httpException.message).toEqual(message);
      expect(httpException.errorType).toEqual(errorType);
      expect(httpException.statusCode).toEqual(statusCode);
    }
  );
});
