import { FC } from "react";

interface HeaderProps {
  isBorderBlock?: boolean;
}

const Header: FC<HeaderProps> = ({ isBorderBlock }) => {
  return (
    <header className="h-60 sm:h-80 relative">
      <img
        className="h-full max-h-60 sm:max-h-80 w-full object-cover "
        src="/bg-main.webp"
        alt="Image Background"
      />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/4 w-full">
        <h1 className="text-4xl sm:font-bold text-white text-center">
          The Cat Gallery 😺
        </h1>
      </div>
      {isBorderBlock && (
        <div className="absolute bottom-0 left-0 rounded-t-[60px] sm:rounded-t-full bg-zinc-900 h-24  sm:h-32 w-full">
          <div className="bg-gradient-to-r overflow-hidden w-full h-full max-h-28 leading-7	 sm:leading-8	 sm:h-auto sm:w-auto text-center content-center px-10 py-2 rounded-t-[60px] sm:rounded-md  from-indigo-500 absolute text-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white">
            The web application that displays a gallery of cat images fetched
            from the{" "}
            {
              <a className="underline" href="https://thecatapi.com/">
                TheCatAPI.
              </a>
            }
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
