import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-screen p-4 w-full max-w-[1240px] mx-auto bg-gray-200">
        <Header />
        <Main />
        <Footer />
      </div>
      <div id="portal-modal-root" />
    </>
  );
};
