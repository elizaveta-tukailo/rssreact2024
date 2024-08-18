import { object, string, number, ref, boolean, mixed } from 'yup';
import { countriesList } from './../utils/countriesList';
import AllFormFields from '../interfaces/form';

const formSchema = object<AllFormFields>().shape({
  name: string()
    .required('Name is required')
    .matches(/^[A-ZА-ЯЁ]/, 'The first letter of the name must be capital'),
  age: number()
    .required('Age is required field')
    .positive('Age must be positive')
    .integer('Age must be integer')
    .typeError('Age must be a number'),
  email: string()
    .required('Email is required field')
    .email('The email format should be test@example.com'),
  password: string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters long')
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
      'Password must contain at least one special character(!@#$%^&*)'
    ),
  confirmPassword: string()
    .required('Password confirmation is required')
    .oneOf([ref('password')], 'Passwords must match'),
  gender: string().required('Choose gender'),
  picture: mixed<File | FileList>()
    .required('Picture is required')
    .test('isAllowedFileSize', 'Max file size 5MB is allowed', (value) => {
      let file: File | undefined;
      if (value instanceof FileList) {
        file = value[0];
      } else if (value instanceof File) {
        file = value;
      }
      if (!file) {
        return false;
      }
      return file.size <= 5 * 1024 * 1024;
    })
    .test(
      'isAllowedFileType',
      'Only PNG and JPEG file types are allowed',
      (value) => {
        let file: File | undefined;
        if (value instanceof FileList) {
          file = value[0];
        } else if (value instanceof File) {
          file = value;
        }
        if (!file) {
          return false;
        }
        const allowedTypes = ['image/png', 'image/jpeg'];
        return allowedTypes.includes(file.type);
      }
    ),
  terms: boolean()
    .required('Accept Terms&Conditions is required')
    .oneOf([true], 'Accept Terms&Concitions'),
  country: string()
    .test(
      'isValidCountry',
      'Invalid country name',
      (value) => value === '' || countriesList.includes(value || '')
    )
    .required('Country is required'),
});
export default formSchema;
