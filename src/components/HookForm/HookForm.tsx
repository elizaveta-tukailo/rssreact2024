import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../store/slices/formsDataSlice';
import formSchema from '../../utils/validateForm';
import AllFormFields from '../../interfaces/form';
import { convertImage } from '../../utils/convertImage';
import { RootState } from '../../store/store';
import { calcPasswordStrength } from '../../utils/calcPasswordStrength';
import { useEffect, useState } from 'react';

export default function HookForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, watch } = useForm<AllFormFields>({
    resolver: yupResolver<AllFormFields>(formSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      picture: undefined,
      country: '',
      terms: false,
    },
  });

  const { errors, isValid } = formState;
  const countriesList = useSelector(
    (state: RootState) => state.countries.countries
  );
  const dispatch = useDispatch();
  const watchedPasswordInput = watch('password');
  const [passwordStrength, setPasswordStrength] = useState(0);
  useEffect(() => {
    if (watchedPasswordInput) {
      const strength = calcPasswordStrength(watchedPasswordInput);
      setPasswordStrength(strength);
    }
  }, [watchedPasswordInput]);

  const submit: SubmitHandler<AllFormFields> = async (data: AllFormFields) => {
    const file = data.picture;
    let convertedImage = '';
    if (file instanceof File) {
      convertedImage = (await convertImage(file)) as string;
    } else if (file instanceof FileList) {
      if (file.length > 0) {
        convertedImage = (await convertImage(file[0])) as string;
      }
    }
    const formData = { ...data, picture: convertedImage };
    dispatch(setData(formData));
    navigate('/');
  };

  return (
    <>
      <h1 className="title">Hook form</h1>
      <form className="form" onSubmit={handleSubmit(submit)}>
        <div className="input-wrap">
          <label htmlFor="name">Name</label>
          {errors.name ? (
            <div className="error-block">
              <div className="error-text">{errors.name.message}</div>
            </div>
          ) : null}
          <input
            {...register('name')}
            type="text"
            placeholder="name"
            autoComplete="name"
          />
        </div>

        <div className="input-wrap">
          <label htmlFor="age">Age</label>
          {errors.age ? (
            <div className="error-block">
              <div className="error-text">{errors.age.message}</div>
            </div>
          ) : null}
          <input {...register('age')} type="text" autoComplete="age" />
        </div>

        <div className="input-wrap">
          <label htmlFor="email">Email</label>
          {errors.email ? (
            <div className="error-block">
              <div className="error-text">{errors.email.message}</div>
            </div>
          ) : null}
          <input
            id="email"
            {...register('email')}
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="password">Password</label>
          {errors.password ? (
            <div className="error-block">
              <div className="error-text">{errors.password.message}</div>
            </div>
          ) : null}
          <div className="password-wrap">
            <input
              id="password"
              {...register('password')}
              name="password"
              type="password"
              placeholder="****"
              autoComplete="password"
            />
            {passwordStrength && errors.password ? (
              <div className="password-strength">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`password-bar ${index < Number(passwordStrength) ? 'active' : ''}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="input-wrap">
          <label htmlFor="confirmPassword">Confirm password</label>
          {errors.confirmPassword ? (
            <div className="error-block">
              <div className="error-text">{errors.confirmPassword.message}</div>
            </div>
          ) : null}
          <input
            id="confirmPassword"
            {...register('confirmPassword')}
            type="password"
            placeholder="****"
            autoComplete="password"
          />
        </div>

        <div className="input-wrap">
          <label htmlFor="gender">Gender</label>
          {errors.gender ? (
            <div className="error-block">
              <div className="error-text">{errors.gender.message}</div>
            </div>
          ) : null}
          <select id="gender" {...register('gender')} autoComplete="gender">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="input-wrap">
          <label htmlFor="picture">Upload picture</label>
          {errors.picture ? (
            <div className="error-block">
              <div className="error-text">{errors.picture.message}</div>
            </div>
          ) : null}
          <input id="picture" {...register('picture')} type="file" />
        </div>

        <div className="input-wrap">
          <label htmlFor="country">Country</label>
          {errors.country ? (
            <div className="error-block">
              <div className="error-text">{errors.country.message}</div>
            </div>
          ) : null}
          <input
            id="country"
            {...register('country')}
            list="country-options"
            autoComplete="country"
          />
          <datalist id="country-options">
            {countriesList.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </div>

        <div className="input-wrap">
          <label htmlFor="terms">Accept Terms & Conditions</label>
          {errors.terms ? (
            <div className="error-block">
              <div className="error-text">{errors.terms.message}</div>
            </div>
          ) : null}
          <input id="terms" {...register('terms')} type="checkbox" />
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
}
