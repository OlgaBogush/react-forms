import type { FC } from 'react';

import { Header } from './pages/Header';
import { Main } from './pages/Main';
import { Footer } from './pages/Footer';

export const App: FC = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen p-4 w-full max-w-[1240px] mx-auto bg-gray-200">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
