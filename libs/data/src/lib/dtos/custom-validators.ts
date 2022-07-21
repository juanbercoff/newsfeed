import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { sanitize } from 'dompurify';

@ValidatorConstraint({ name: 'incorrectUrlDomain' })
export class CorrectUrlDomain implements ValidatorConstraintInterface {
  validate(url: string) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname === 'images.unsplash.com';
    } catch (error) {
      throw new Error('Invalid URL on create article');
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'The domain must be unsplash';
  }
}
