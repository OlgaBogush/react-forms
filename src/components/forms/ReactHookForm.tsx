import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { COUNTRIES_LIST } from '../../utils/constants';
import { getPasswordSymbols } from '../../utils/getPasswordSymbols';
import type { HandleCloseModalProps, IUserData } from '../../types/user';
import { useAppDispatch } from '../../store/hooks';
import { addUserForm } from '../../store/userSlice';
import { controlledSchema, type ControlledSchemaType } from './schema';
import { fileToBase64 } from '../../utils/fileToBase64';

export const ReactHookForm = ({ handleCloseModal }: HandleCloseModalProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ControlledSchemaType>({
    mode: 'onTouched',
    context: { countries: COUNTRIES_LIST },
    resolver: yupResolver(controlledSchema),
    defaultValues: {
      gender: 'male',
      country: 'Belarus',
      file: undefined,
    },
  });

  const passwordValue = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });
  const counterPasswordSymbols = getPasswordSymbols(passwordValue);

  const onSubmit: SubmitHandler<ControlledSchemaType> = async ({
    file,
    name,
    age,
    email,
    gender,
    country,
    password,
    confirmPassword,
    terms,
  }) => {
    let fileBase64 = '';

    if (file && file instanceof FileList && file.length > 0) {
      const fileObject = file[0];
      fileBase64 = await fileToBase64(fileObject);
    }

    const userData: IUserData = {
      name,
      age: String(age),
      email,
      gender,
      country,
      file: fileBase64,
      password,
      confirmPassword,
      terms: terms ?? false,
    };

    dispatch(addUserForm(userData));
    handleCloseModal();
  };

  return (
    <form
      className="flex flex-col items-center flex-grow w-full gap-6"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
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
                {...register('name')}
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
                {...register('age')}
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
                {...register('email')}
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
                  {...register('gender')}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  id="female"
                  value="female"
                  {...register('gender')}
                />
                <label htmlFor="female">Female</label>
              </div>

              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  id="other"
                  value="other"
                  {...register('gender')}
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
                className="min-w-64 h-8 px-2 rounded shadow"
                id="id-country"
                type="text"
                list="country-options"
                {...register('country')}
                defaultValue="Belarus"
                placeholder="Select Your Country"
                required
              />
              {errors.country && (
                <p className="text-red-500 text-[12px]">
                  {errors.country.message}
                </p>
              )}

              <datalist id="country-options">
                {COUNTRIES_LIST.map((item) => {
                  return <option key={item} value={item} />;
                })}
              </datalist>
            </div>
          </div>

          <div className="h-12 flex justify-between">
            <label htmlFor="file">Upload File</label>
            <input
              className="w-64 h-8 px-2 rounded shadow"
              type="file"
              id="file"
              {...register('file')}
            />
            {errors.file && (
              <p className="w-64 text-red-500 text-[12px]">
                {errors.file.message}
              </p>
            )}
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
                placeholder="Enter Your Password"
                {...register('password')}
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
                {...register('confirmPassword')}
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
              {...register('terms')}
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
