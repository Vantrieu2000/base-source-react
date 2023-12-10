import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

const regexYear = /^\d{0,4}$/;

@ValidatorConstraint({ name: 'isYear', async: false })
export class IsYear implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!text) {
      return true;
    }

    return  regexYear.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'year ($value) is invalid';
  }
}
