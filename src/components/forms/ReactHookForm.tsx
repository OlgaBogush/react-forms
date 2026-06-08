import { COUNTRIES_LIST } from '../../utils/constants';
import { useForm, useWatch } from 'react-hook-form';
import { getPasswordSymbols } from '../../utils/getPasswordSymbols';

type Inputs = {
  name: string;
  age: string;
  email: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export const ReactHookForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: 'onTouched',
    defaultValues: {
      gender: 'male',
      country: 'Belarus',
    },
  });

  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });
  const counterPasswordSymbols = getPasswordSymbols(passwordValue);

  return (
    <form
      className="flex flex-col items-center flex-grow w-full gap-6"
      noValidate
      onSubmit={handleSubmit(() => {})}
    >
      <h1 className="uppercase">React Hook Form</h1>
      <div className="flex flex-col flex-grow w-full pt-4 pl-4 pr-4 bg-gray-100 rounded shadow">
        <div className="flex flex-col gap-3 flex-grow">
          <div className="flex justify-between">
            <label htmlFor="name">
              Name<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="h-12">
              <input
                className="min-w-64 h-8 px-2 rounded shadow"
                type="text"
                id="name"
                placeholder="Enter Your Name"
                {...register('name', {
                  required: 'Name is required',
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-[12px]">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <label htmlFor="age">
              Age<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="h-12">
              <input
                className="min-w-64 h-8 px-2 rounded shadow"
                type="number"
                id="age"
                placeholder="Enter Your Age"
                {...register('age', {
                  required: 'Age is required',
                  min: { value: 1, message: 'Min age is 1' },
                  max: { value: 120, message: 'Max age is 120' },
                })}
              />
              {errors.age && (
                <p className="text-red-500 text-[12px]">{errors.age.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <label htmlFor="email">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="h-12">
              <input
                className="min-w-64 h-8 px-2 rounded shadow"
                type="email"
                id="email"
                placeholder="Enter email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email format',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-[12px]">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="h-12 flex justify-between">
            <p>
              Gender<span className="text-red-500 ml-1">*</span>
            </p>
            <div className="min-w-64 h-8 flex items-center gap-3">
              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  id="male"
                  value="male"
                  {...register('gender', {
                    required: 'Please select your gender',
                  })}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  id="female"
                  value="female"
                  {...register('gender', {
                    required: 'Please select your gender',
                  })}
                />
                <label htmlFor="female">Female</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  id="other"
                  value="other"
                  {...register('gender', {
                    required: true,
                  })}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          <div className="h-12 flex justify-between">
            <label htmlFor="id-country">
              Country<span className="text-red-500 ml-1">*</span>
            </label>
            <select
              id="id-country"
              className="min-w-64 h-8 px-2 rounded shadow"
              {...register('country', { required: true })}
            >
              <option value="" disabled>
                Select Your Country
              </option>
              {COUNTRIES_LIST.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          {/* <div className="h-12 flex justify-between">
            <label htmlFor="file">Upload File</label>
            <input
              className="w-64 h-8 px-2 rounded shadow"
              type="file"
              id="file"
              name="file"
            />
          </div> */}

          <div className="flex justify-between">
            <label htmlFor="password">
              Password<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="h-16">
              <input
                className="min-w-64 h-8 px-2 rounded shadow"
                type="password"
                id="password"
                placeholder="Enter Your Password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />

              {errors.password && (
                <p className="w-64 text-red-500 text-[12px]">
                  {errors.password.message}
                </p>
              )}
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
                placeholder="Repeat Your Password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',

                  validate: (value) =>
                    value === passwordValue || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="w-64 text-red-500 text-[12px]">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {!errors.password && passwordValue && (
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
          )}
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
              {...register('terms', { required: 'You must accept the terms' })}
            />
          </div>
          {errors.terms && (
            <p className="text-red-500 text-[12px]">{errors.terms.message}</p>
          )}
        </div>
      </div>
      <button
        disabled={!isValid}
        className={`min-w-64  p-2 focus:outline-2 transition-bg duration-200 linear rounded shadow ${isValid ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
