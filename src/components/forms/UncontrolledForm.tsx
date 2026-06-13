import { ValidationError } from 'yup';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch } from '../../store/hooks';

import type { HandleCloseModalProps, IUserData } from '../../types/user';
import { uncontrolledSchema } from './schema';
import { COUNTRIES_LIST } from '../../utils/constants';
import { getPasswordSymbols } from '../../utils/getPasswordSymbols';
import { addUserForm } from '../../store/userSlice';
import { fileToBase64 } from '../../utils/fileToBase64';
import { InputBase } from './InputBase';

export const UncontrolledForm = ({
  handleCloseModal,
}: HandleCloseModalProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordValue, setPasswordValue] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleFormAction = async (data: FormData) => {
    const fileInput = document.getElementById('file') as HTMLInputElement;
    const fileObject = fileInput?.files?.[0] || null;

    let fileBase64 = '';

    if (fileObject && fileObject.size > 0) {
      fileBase64 = await fileToBase64(fileObject);
    }

    const userData: IUserData = {
      name: data.get('name') as string,
      age: data.get('age') as string,
      email: data.get('email') as string,
      gender: data.get('gender') as string,
      country: data.get('country') as string,
      file: fileBase64,
      password: data.get('password') as string,
      confirmPassword: data.get('confirmPassword') as string,
      terms: data.has('terms'),
    };

    try {
      await uncontrolledSchema.validate(
        { ...userData, file: fileObject },
        {
          abortEarly: false,
          context: { countries: COUNTRIES_LIST },
        }
      );
      dispatch(addUserForm(userData));

      handleCloseModal();
    } catch (err) {
      if (ValidationError.isError(err)) {
        const objError: Record<string, string> = {};
        err.inner.forEach((item) => {
          if (item.path) {
            objError[item.path] = item.message;
          }
        });
        setErrors(objError);
      } else {
        console.error('Unknown error', err);
      }
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleFormAction(formData);
  };

  const handlerChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const counterPasswordSymbols = getPasswordSymbols(passwordValue);

  return (
    <form
      className="flex flex-col items-center flex-grow w-full gap-6"
      noValidate
      onSubmit={handleFormSubmit}
    >
      <h1 className="uppercase">Uncontrolled Form</h1>
      <div className="flex flex-col flex-grow w-full pt-4 pl-4 pr-4 bg-gray-100 rounded shadow">
        <div className="flex flex-col gap-3 flex-grow">
          <InputBase
            id="name"
            name="name"
            title="Name"
            type="text"
            required
            error={errors.name}
          />

          <InputBase
            id="age"
            name="age"
            title="Age"
            type="number"
            min={1}
            max={120}
            required
            error={errors.age}
          />

          <InputBase
            id="email"
            name="email"
            title="Email"
            type="email"
            required
            error={errors.email}
          />

          <div className="h-12 flex justify-between">
            <p>
              Gender<span className="text-red-500 ml-1">*</span>
            </p>
            <div className="min-w-64 h-8 flex items-center gap-3">
              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  defaultChecked
                  required
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  required
                />
                <label htmlFor="female">Female</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  id="other"
                  value="other"
                  required
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          <div className="h-12 flex justify-between">
            <label htmlFor="id-country">
              Country<span className="text-red-500 ml-1">*</span>
            </label>
            <div>
              <input
                id="id-country"
                type="text"
                name="country"
                list="country-options"
                defaultValue="Belarus"
                className="min-w-64 h-8 px-2 rounded shadow"
                placeholder="Select Your Country"
                required
              />
              <p className="text-red-500 text-[12px]">{errors.country}</p>
              <datalist id="country-options">
                {COUNTRIES_LIST.map((item) => {
                  return <option key={item} value={item} />;
                })}
              </datalist>
            </div>
          </div>

          <div className=" flex justify-between">
            <label htmlFor="file">Upload File</label>
            <div className="h-12">
              <input
                className="w-64 h-8 px-2 rounded shadow"
                type="file"
                id="file"
                name="file"
              />
              <p className="w-64 text-red-500 text-[12px]">{errors.file}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <label htmlFor="password">
              Password<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="h-16">
              <input
                className="min-w-64 h-8 px-2 rounded shadow"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                required
                onChange={handlerChangePassword}
              />
              <p className="w-64 text-red-500 text-[12px]">{errors.password}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <label htmlFor="confirmPassword">
              Confirm Password<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="h-16">
              <input
                className="min-w-64 h-8 px-2 rounded shadow"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repeat Your Password"
                required
              />
              <p className="w-64 text-red-500 text-[12px]">
                {errors.confirmPassword}
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end mt-1 px-1">
            <div
              className={`w-3 h-3 rounded-full ${
                counterPasswordSymbols >= 1 ? 'bg-blue-200' : 'bg-gray-200'
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full ${
                counterPasswordSymbols >= 2 ? 'bg-blue-300' : 'bg-gray-200'
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full ${
                counterPasswordSymbols >= 3 ? 'bg-blue-400' : 'bg-gray-200'
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full ${
                counterPasswordSymbols >= 4 ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          </div>
        </div>

        <div className="h-12 flex flex-col items-center">
          <div className="flex justify-center items-center gap-2">
            <label htmlFor="terms">
              Terms & Conditions<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              className="cursor-pointer "
              type="checkbox"
              id="terms"
              name="terms"
              required
            />
          </div>
          <p className="text-red-500 text-[12px]">{errors.terms}</p>
        </div>
      </div>
      <button
        className="min-w-64 bg-blue-500 text-white p-2 cursor-pointer hover:bg-blue-600 focus:outline-2 transition-bg duration-200 linear rounded shadow"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
