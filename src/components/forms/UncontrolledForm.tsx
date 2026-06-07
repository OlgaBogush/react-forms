export const UncontrolledForm = () => {
  return (
    <>
      <h1 className="uppercase">Uncontrolled Form</h1>
      <div className="flex flex-col flex-grow w-full p-6 bg-gray-100 rounded shadow">
        <div className="flex flex-col gap-4 flex-grow">
          <div className="flex justify-between items-center">
            <label htmlFor="name">Name</label>
            <input
              className="min-w-64 h-8 px-2 rounded shadow"
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <label htmlFor="age">Age</label>
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
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="email">Email</label>
            <input
              className="min-w-64 h-8 px-2 rounded shadow"
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <p>Gender</p>
            <div className="min-w-64 h-8 flex justify-end items-center gap-2">
              <div className="flex justify-center items-center">
                <input
                  className="mr-1"
                  type="radio"
                  name="gender"
                  id="mail"
                  value="mail"
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
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="file">Upload File</label>
            <input
              className="w-64 h-8 px-2 rounded shadow"
              type="file"
              id="file"
              name="file"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="password">Password</label>
            <input
              className="min-w-64 h-8 px-2 rounded shadow"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="id-country">Country</label>
            <select
              name="country"
              id="id-country"
              defaultValue="Belarus"
              className="min-w-64 h-8 px-2 rounded shadow"
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
        </div>

        <div className="flex justify-center items-center gap-2">
          <label htmlFor="terms">Terms & Conditions</label>
          <input
            className="cursor-pointer"
            type="checkbox"
            id="terms"
            name="terms"
            required
          />
        </div>
      </div>
      <button
        className="min-w-64 bg-cyan-500 text-white p-2 cursor-pointer hover:bg-cyan-400 focus:outline-2 transition-bg duration-200 linear rounded shadow"
        type="submit"
      >
        Submit
      </button>
    </>
  );
};
