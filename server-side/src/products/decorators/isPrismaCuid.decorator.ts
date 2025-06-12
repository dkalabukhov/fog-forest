import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPrismaCuid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPrismaCuid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            value.startsWith('c') &&
            value.length >= 24 &&
            value.length <= 30
          );
        },
        defaultMessage() {
          return 'ID must be a valid Prisma CUID (e.g., "cl5k7q3lz0000sulj6q9t7q1e")';
        },
      },
    });
  };
}
