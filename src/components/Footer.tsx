export const Footer = () => {
  return (
    <div className="flex justify-between items-center gap-6 w-full max-w-[1240px] mx-auto p-6 bg-gray-100 rounded shadow">
      <h1>React Forms</h1>
      <p>
        Developed by{' '}
        <a
          href={'https://github.com/OlgaBogush'}
          target="_blank"
          rel="noreferrer"
          className="text-gray-700 italic"
        >
          OlgaBogush
        </a>
      </p>
      <a
        href={'https://rs.school/courses/reactjs'}
        target="_blank"
        rel="noreferrer"
        className="text-gray-700 italic"
      >
        RS School
      </a>
    </div>
  );
};
