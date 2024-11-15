import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout, setCredentials } from "../redux/authSlice";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      const user = users.find((u) => u.id === parseInt(userId, 10));
      dispatch(setCredentials({ userId: userId, user: user, token: token }));
    }
  }, [dispatch, users]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Disclosure as="header" className="bg-black py-6 min-h-36 sm:min-h-16">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
          <div className="relative flex h-16 justify-between">
            <div className="relative z-10 flex px-2 lg:px-0">
              <div className="flex flex-col sm:flex-row shrink-0 items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaFacebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaTwitter className="h-4 w-4" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaYoutube className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
              <div className="w-full sm:max-w-xs flex justify-center">
                <img
                  src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
                  alt="Star Wars"
                  className="h-16"
                />
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex">
              {user ? (
                <div className="flex items-center">
                  <span>Hello {user.first_name}</span>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt={user.first_name}
                          src={user.avatar}
                          className="size-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem>
                        <a
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none cursor-pointer"
                        >
                          Sign out
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              ) : (
                <>
                  <div className="absolute right-0 hidden sm:flex space-x-4">
                    <Link to="/login">
                      <div className="block w-full text-left text-gray-400 hover:text-white text-sm mt-2">
                        LOG IN
                      </div>
                    </Link>

                    <Link to="/signup">
                      <div className="block w-full text-left text-gray-400 hover:text-white text-sm mt-2">
                        SIGN UP
                      </div>
                    </Link>
                  </div>
                </>
              )}
            </div>
            <div className="-mr-2 flex sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden mt-16">
          <div className="border-t border-gray-700 pb-3 pt-4">
            {user ? (
              <>
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <img
                      alt={user.first_name}
                      src={user.avatar}
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.first_name}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <DisclosureButton
                    as="a"
                    onClick={handleLogout}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    LOG OUT
                  </DisclosureButton>
                </div>
              </>
            ) : (
              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton
                  as="a"
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  SIGN IN
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/signup"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  SIGN UP
                </DisclosureButton>
              </div>
            )}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <nav className="flex justify-center border-y border-gray-800">
        <Link
          to="/"
          className={`text-gray-400 hover:text-white px-6 py-3 border-x border-gray-800 transition-colors duration-200 ${
            location.pathname === "/" ? "border-b-2 border-b-blue-500" : ""
          }`}
        >
          HOME
        </Link>
        <Link
          to="/starships"
          className={`text-gray-400 hover:text-white px-6 py-3 border-e border-gray-800 transition-colors duration-200 ${
            location.pathname === "/starships"
              ? "border-b-2 border-b-blue-500"
              : ""
          }`}
        >
          STARSHIPS
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
