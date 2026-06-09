export interface IUserData {
  name: string;
  age: string;
  email: string;
  gender: string;
  country: string;
  file: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface HandleCloseModalProps {
  handleCloseModal: () => void;
}
