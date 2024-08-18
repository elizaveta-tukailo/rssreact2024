import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setData } from '../../store/slices/formsDataSlice';
import AllFormFields from '../../interfaces/form';
import formSchema from '../../utils/validateForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { convertImage } from '../../utils/convertImage';
import { ValidationError } from 'yup';
import { calcPasswordStrength } from '../../utils/calcPasswordStrength';

export default function UncontrolledForm() {
  const countriesList = useSelector(
    (state: RootState) => state.countries.countries
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState<string>('');
  const [ageError, setAgeError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  const [countryError, setCountryError] = useState<string>('');
  const [termsError, setTermsError] = useState<string>('');

  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let convertedFile = '';
    const pictureFile = fileRef.current?.files?.[0];
    if (pictureFile) {
      convertedFile = (await convertImage(pictureFile)) as string;
    }
    const formData: AllFormFields = {
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      country: countryRef.current?.value,
      picture: pictureFile,
      terms: termsRef.current?.checked,
    };
    if (formData.password) {
      const strength = calcPasswordStrength(formData.password);
      setPasswordStrength(String(strength));
    }

    const formDataToSave = { ...formData, picture: convertedFile };
    delete formDataToSave.confirmPassword;
    try {
      await formSchema.validate(formData, { abortEarly: false });
      dispatch(setData(formDataToSave));
      if (nameRef.current) {
        nameRef.current.value = '';
      }
      if (ageRef.current) {
        ageRef.current.value = '';
      }
      if (emailRef.current) {
        emailRef.current.value = '';
      }
      if (passwordRef.current) {
        passwordRef.current.value = '';
      }
      if (confirmPasswordRef.current) {
        confirmPasswordRef.current.value = '';
      }
      if (genderRef.current) {
        genderRef.current.value = '';
      }
      if (termsRef.current) {
        termsRef.current.checked = false;
      }
      if (fileRef.current) {
        fileRef.current.value = '';
      }
      if (countryRef.current) {
        countryRef.current.value = '';
      }

      navigate('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.inner.reduce(
          (acсumulator, validationError) => ({
            ...acсumulator,
            [validationError.path as keyof typeof formData]:
              validationError.message,
          }),
          {} as Record<keyof typeof formData, string>
        );

        setNameError(errors.name || '');
        setAgeError(errors.age || '');
        setEmailError(errors.email || '');
        setPasswordError(errors.password || '');
        setConfirmPasswordError(errors.confirmPassword || '');
        setGenderError(errors.gender || '');
        setFileError(errors.picture || '');
        setCountryError(errors.country || '');
        setTermsError(errors.terms || '');
      }
    }
  };

  return (
    <>
      <h1 className="title">Uncontrolled form</h1>
      <form className="form" method="post" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-wrap">
          <label htmlFor="name">Name:</label>
          {nameError ? (
            <div className="error-block">
              <div className="error-text">{nameError}</div>
            </div>
          ) : null}
          <input
            name="name"
            type="text"
            placeholder="name"
            autoComplete="name"
            ref={nameRef}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="age">Age:</label>
          {ageError ? (
            <div className="error-block">
              <div className="error-text">{ageError}</div>
            </div>
          ) : null}
          <input
            id="age"
            name="age"
            type="text"
            placeholder="age"
            autoComplete="age"
            ref={ageRef}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="email">Email:</label>
          {emailError ? (
            <div className="error-block">
              <div className="error-text">{emailError}</div>
            </div>
          ) : null}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            autoComplete="email"
            ref={emailRef}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="password">Password:</label>
          {passwordError ? (
            <div className="error-block">
              <div className="error-text">{passwordError}</div>
            </div>
          ) : null}
          <div className="password-wrap">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="****"
              autoComplete="new-password"
              ref={passwordRef}
            />
            {passwordStrength && passwordError ? (
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
          <label htmlFor="confirm_password">Confirm password:</label>
          {confirmPasswordError ? (
            <div className="error-block">
              <div className="error-text">{confirmPasswordError}</div>
            </div>
          ) : null}
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder="****"
            autoComplete="confirmPassword"
            ref={confirmPasswordRef}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="gender">Gender</label>
          {genderError ? (
            <div className="error-block">
              <div className="error-text">{genderError}</div>
            </div>
          ) : null}
          <select
            id="gender"
            name="gender"
            autoComplete="gender"
            ref={genderRef}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-wrap">
          <label htmlFor="upload-file">Upload picture file</label>
          {fileError ? (
            <div className="error-block">
              <div className="error-text">{fileError}</div>
            </div>
          ) : null}
          <input
            type="file"
            name="picture"
            id="upload-file"
            placeholder="Enter Upload File"
            autoComplete="file"
            ref={fileRef}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="country">Country</label>
          {countryError ? (
            <div className="error-block">
              <div className="error-text">{countryError}</div>
            </div>
          ) : null}
          <input
            id="country"
            name="country"
            list="country-options"
            autoComplete="country"
            ref={countryRef}
          />
          <datalist id="country-options">
            {countriesList.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </div>
        <div className="input-wrap">
          <label htmlFor="terms">Accept Terms & Conditions</label>
          {termsError ? (
            <div className="error-block">
              <div className="error-text">{termsError}</div>
            </div>
          ) : null}
          <input id="terms" ref={termsRef} name="terms" type="checkbox" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
