export default interface FormFields {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  gender?: string;
  picture?: File | FileList | string;
  country?: string;
  terms?: boolean;
}

export default interface AllFormFields {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  picture?: File | FileList | string;
  country?: string;
  terms?: boolean;
}
