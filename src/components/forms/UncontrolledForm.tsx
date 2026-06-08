import { ValidationError } from 'yup';
import { useState } from 'react';

import type { IUserData } from '../../types/user';
import { schema, type User } from './schema';

export const UncontrolledForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormAction = async (formData: FormData) => {
    setErrors({});
    const userData: IUserData = {
      name: formData.get('name') as string,
      age: formData.get('age') as string,
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      country: formData.get('country') as string,
      file: formData.get('file') as File,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      terms: formData.has('terms'),
    };

    try {
      const user: User = await schema.validate(userData, { abortEarly: false });
      console.log(user);
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

  return (
    <form
      className="flex flex-col items-center flex-grow w-full gap-6"
      noValidate
      action={handleFormAction}
    >
      <h1 className="uppercase">Uncontrolled Form</h1>
      <div className="flex flex-col flex-grow w-full pt-4 pl-4 pr-4 bg-gray-100 rounded shadow">
        <div className="flex flex-col gap-3 flex-grow">
          <div className="flex justify-between items-center">
            <label htmlFor="name">
              Name<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="h-12">
              <input
                className="min-w-64 h-8 px-2 rounded shadow"
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                required
              />
              <p className="text-red-500 text-[12px]">{errors.name}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="age">
              Age<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="h-12">
              <input
                className="min-w-64 h-8 px-2 rounded shadow"
                type="number"
                id="age"
                name="age"
                min="1"
                max="120"
                placeholder="Enter Your Age"
                required
              />
              <p className="text-red-500 text-[12px]">{errors.age}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="email">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="h-12">
              <input
                className="min-w-64 h-8 px-2 rounded shadow"
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                required
              />
              <p className="text-red-500 text-[12px]">{errors.email}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p>
              Gender<span className="text-red-500 ml-1">*</span>
            </p>
            <div className="min-w-64 h-8 flex items-center gap-3">
              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  id="mail"
                  value="mail"
                  defaultChecked
                  required
                />
                <label htmlFor="mail">Mail</label>
              </div>
              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  id="femail"
                  value="femail"
                  required
                />
                <label htmlFor="femail">Femail</label>
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

          <div className="flex justify-between items-center">
            <label htmlFor="id-country">
              Country<span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="country"
              id="id-country"
              defaultValue="Belarus"
              className="min-w-64 h-8 px-2 rounded shadow"
              required
            >
              <option value="" disabled>
                Select Your Country
              </option>
              <option value="Belarus">Belarus</option>
              <option value="Germany">Germany</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="Great Britain">Great Britain</option>
            </select>
          </div>

          <div className="h-12 flex justify-between items-center">
            <label htmlFor="file">Upload File</label>
            <input
              className="w-64 h-8 px-2 rounded shadow"
              type="file"
              id="file"
              name="file"
            />
          </div>

          <div className="flex justify-between items-center">
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
              />
              <p className="w-64 text-red-500 text-[12px]">{errors.password}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
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
