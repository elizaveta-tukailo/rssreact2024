import { object, string, number, mixed, ref, boolean } from 'yup';
import FormFields from '../interfaces/form';

const formSchema = object<FormFields>().shape({
  name: string()
    .required('Name is required field')
    .min(1, 'Write at least one letter')
    .matches(/^[A-ZА-ЯЁ]/, 'The first letter of the name must be capital')
    .typeError('The first letter of the name must be capital'),
  age: number()
    .required('Age is required field')
    .positive('Age must be positive')
    .typeError('Age must be positive'),
  email: string()
    .required('Email is required field')
    .email('The email format should be test@example.com')
    .typeError('The email format should be test@example.com'),
  password: string()
    .required('Password is required')
    .matches(
      /[A-ZА-ЯЁ]/,
      'Password strength: must have at least one uppercase letter'
    )
    .matches(
      /[a-zа-яё]/,
      'Password strength: must have at least one lowercase letter'
    )
    .matches(/[0-9]/, 'Password strength: must have at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Pas must contain at least one special character(!@#$%^&*)'
    ),
  confirmedPassword: string()
    .required('Passwords confirmation is required')
    .oneOf([ref('password')], 'Passwords must match'),
  gender: string().required('Choose gender'),
  picture: mixed<File>()
    .required('You need to provide a file')
    .test('fileSize', 'The file is too large', (value) => {
      return value && value.size <= 2000000;
    })
    .test('type', 'Accepted only: .jpeg, .png', (value) => {
      if (value) {
        const fileType: string = value.type;
        return fileType === 'image/png' || fileType === 'image/jpeg';
      }
      return false;
    }),
  acceptTerms: boolean()
    .required('Accept T&C is required')
    .oneOf([true], 'Accept T&C'),
  country: string().required('Country is required!'),
});

export default formSchema;
