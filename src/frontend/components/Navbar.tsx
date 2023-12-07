import { ReactNode, useContext } from "react";
import vite from "/vite.svg";
import { AuthContext, AuthContextModel } from "../Layout";

type Location = {
  path: string;
  name: string;
};

interface Props {
  items: Location[];
}

export default function Navbar({ items }: Readonly<Props>): ReactNode {
  const { currentUser, logout } = useContext<AuthContextModel>(AuthContext);

  return (
    <nav className="w-full bg-gray-800">
      <article className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <section className="relative flex h-16 items-center justify-center">
          <article className="absolute y-0 left-0 sm:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <i className="block h-6 w-6 bi bi-list"></i>
            </button>
          </article>
          <article className="flex flex-1 items-center sm:items-stretch justify-center">
            <section className="flex flex-shrink-0 gap-4 items-center">
              <img
                className="block h-8 w-auto lg:hidden"
                src={vite}
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src={vite}
                alt="Your Company"
              />

              <h1 className="text-white" id="shop-name">
                Shopperators
              </h1>
            </section>

            <section className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4" id="desktop-nav">
                <a
                  href="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </a>

                {items.map((location) => (
                  <a
                    key={location.path}
                    href={location.path}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    {location.name}
                  </a>
                ))}
                <a
                  href="/shoppinglist"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Shopping List
                </a>

                <a
                  href="/cart"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Shopping Cart
                </a>
              </div>
            </section>
          </article>

          <article
            className="relative inline-block"
            id="cart-dropdown-container"
          ></article>

          <article className="flex flex-1 items-center sm:items-stretch justify-center">
            <section className="flex flex-shrink-0 gap-4 items-center">
              {currentUser && (
                <p className="text-white">Hello, {currentUser.username}</p>
              )}
            </section>

            <section className="hidden sm:ml-6 sm:block">
              {(currentUser && (
                <button
                  onClick={logout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Logout
                </button>
              )) || (
                <a
                  href="login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Login
                </a>
              )}
            </section>
          </article>
        </section>
      </article>
      <ul
        className="bg-gray-800 transition-all h-0 overflow-hidden"
        id="mobile-menu"
        aria-expanded="false"
      >
        <a
          href="#"
          className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          aria-current="page"
        >
          Shop
        </a>
      </ul>
    </nav>
  );
}
