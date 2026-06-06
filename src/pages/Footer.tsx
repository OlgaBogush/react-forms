import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <div className="flex justify-between items-center gap-6 w-full max-w-[1240px] mx-auto p-6 bg-gray-100 shadow">
      <h1>React Forms</h1>
      <p>
        Developed by{' '}
        <a
          href={'https://github.com/OlgaBogush'}
          className="text-gray-700 italic"
        >
          OlgaBogush
        </a>
      </p>
      <a
        href={'https://rs.school/courses/reactjs'}
        className="text-gray-700 italic"
      >
        RS School
      </a>
    </div>
  );
};
