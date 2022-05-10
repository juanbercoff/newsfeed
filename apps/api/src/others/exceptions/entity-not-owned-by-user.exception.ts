import { HttpException, HttpStatus } from '@nestjs/common';
import { CUSTOM_EXCEPTION_CODES } from '../utils/constants';

export class EntityNotOwnedByUserException extends HttpException {
  constructor(entityName: string) {
    super(
      {
        code: CUSTOM_EXCEPTION_CODES.ENTITY_NOT_OWNED_BY_USER,
        message: `The given ${entityName} is not owned by the given User`,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
}
