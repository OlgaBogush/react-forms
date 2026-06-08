import * as yup from 'yup';

const regExpName = new RegExp(/^[A-ZА-ЯЁ][a-zа-яё]*$/);

export const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Required field')
    .matches(regExpName, 'The first letter must be uppercase'),

  age: yup
    .number()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? undefined : value
    )
    .required('Required field')
    .positive('Age must be a positive number')
    .integer('Age should be a number.')
    .min(1, 'Age must be greater than 0')
    .max(120, 'Age must not exceed 120 years'),

  email: yup
    .string()
    .required('Required field')
    .test('check-email', 'Incorrect Email Address', (value) => {
      const array = value.trim().split('@');
      if (array.length !== 2) return false;
      const [local, domain] = array;
      return (
        local.length > 0 &&
        domain.includes('.') &&
        !domain.startsWith('.') &&
        !domain.endsWith('.')
      );
    }),

  gender: yup.string().required('Required field'),

  country: yup
    .string()
    .required('Select your country')
    .test(
      'check country',
      'Select your country from the list',
      function (value) {
        const { countries } = this.options.context as { countries?: string[] };
        if (!countries) return false;
        return countries.includes(value);
      }
    ),

  file: yup.string(),

  password: yup
    .string()
    .required('Required field')
    .matches(/[a-z]/, 'The password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'The password must contain at least one uppercase letter')
    .matches(/\d/, 'The password must contain at least one digit')
    .matches(
      /[@$!%*?&]/,
      'The password must contain at least one special character'
    ),

  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'The password does not match'),

  terms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and conditions'),
});

export type User = yup.InferType<typeof schema>;
