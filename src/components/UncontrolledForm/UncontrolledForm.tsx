
import { useRef, useState } from "react";
import { addData } from '../../store/slices/formsDataSlice.ts';
import FormFields from "../../interfaces/form";
import formSchema from "../../utils/validateForm";
import { useDispatch } from "react-redux";
import "./UncontrolledForm.css";


const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'India',
    'China',
    'Japan',
    'Brazil',
    // Add more countries as needed
  ];
  

export default function UncontrolledForm() {
    const dispatch = useDispatch();
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef1 = useRef<HTMLInputElement>(null);
    const passwordRef2 = useRef<HTMLInputElement>(null);
    const genderRef1 = useRef<HTMLInputElement>(null);
    const genderRef2 = useRef<HTMLInputElement>(null);
    const pictureRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement | null>(null);
    const acceptRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);


  const handleInputChange = () => {
    const value = countryRef.current?.value;
    if (value) {
      const filtered = countries.filter(country =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCountries(filtered);
      setShowDropdown(true);
    } else {
      setFilteredCountries([]);
      setShowDropdown(false);
    }
  };

  const handleCountrySelect = (country:string) => {
    if (countryRef.current) {
        countryRef.current.value = country;
    }
    setShowDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100); 
  };

  const handleFocus = () => {
    //if (countryRef.current?.value) {
      setShowDropdown(true);
    //}
    console.log("focus");
  };


  const handleSubmit = (event : React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault();
    //if (submitRef.current) {submitRef.current.disabled = true; }
    

    const formData: FormFields = {
        name: nameRef.current?.value || '',
        age: Number(ageRef.current?.value) || 0,
        email: emailRef.current?.value || '',
        password: passwordRef1.current?.value || '',
        gender: genderRef1.current?.checked ? "Male" : "Female",
        country: 1,
        picture: pictureRef.current?.value || '',
    };
    const errors = formSchema.validate(formData);
    console.log(errors);
    
    console.log(errors);
    dispatch(addData(formData));
    //const expenseDetails = Object.fromEntries(expense);
    //
    //console.log(pictureRef.current.files[0].name);
    //const form = e.target;
   //console.log(formData);

  };

  return (
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <div>
            <label htmlFor="name">Name:</label>
            <input name="name" type="text" placeholder="name" ref={nameRef} />
            {/* {errors.email && <p>Please enter a valid email</p>} */}
        </div>
        <div>
            <label htmlFor="age">Age:</label>
            <input name="age" type="text" placeholder="age" ref={ageRef}/>
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input name="email" type="email" placeholder="email" ref={emailRef}/>
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input name="password" type="password" placeholder="****" ref={passwordRef1}/>
        </div>
        <div>
            <label htmlFor="password2">Confirm password:</label>
            <input name="password2" type="password" placeholder="****" ref={passwordRef2}/>
        </div>
        <div>
            <label>
            Gender
            <input type="radio" name="gender" value="male" id="male" ref={genderRef1}/>
            <label htmlFor="regular">Male</label>
            <input type="radio" name="gender" value="female" id="female" ref={genderRef2}/>
            <label htmlFor="medium">Female</label>
            </label>
        </div>
        <div>
        <label htmlFor="file">Upload Picture</label>
        <input
          type="file"
          name="file"
          id="upload-file"
          placeholder="Enter Upload File"
          ref={pictureRef}
        />
        </div>
        <div>
        <input
        ref={countryRef}
        type="text"
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Select a country"
      />
      {showDropdown}
      {/* && filteredCountries.length > 0 */}
      {showDropdown  && (
        <ul className="dropdown-list">
          {filteredCountries.map((country, index) => (
            <li key={index} onClick={() => handleCountrySelect(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}
        </div>
        <div>
            <label><input name="rules" type="checkbox" placeholder="" ref={acceptRef}/>I accept rules</label>
        </div>
        <button type="submit" ref={submitRef}>
          Submit
        </button>
    </form>
  );
}
