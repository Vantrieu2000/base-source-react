import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

const regexPosTalCode = /^\d{3}-\d{4}$/;

@ValidatorConstraint({ name: 'isPostalCode', async: false })
export class IsPostalCode implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (!text) {
      return true;
    }

    return  regexPosTalCode.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'postalcode ($value) is invalid';
  }
}
