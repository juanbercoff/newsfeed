import { HttpException, HttpStatus } from '@nestjs/common';
import { CUSTOM_EXCEPTION_CODES } from '../utils/constants';

export class UserNotFullyRegisteredException extends HttpException {
  constructor() {
    super(
      {
        code: CUSTOM_EXCEPTION_CODES.AUTH_USER_NOT_FULLY_REGISTERED,
        message: 'The user is not fully registered',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN
    );
  }
}
