import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";

import Button from "./Button";

const Navbar = ({ user = null, onLogin, onLogout, onCreateAccount }) => {
  const location = useLocation();

  return (
    <nav className="bg-black text-white">
      <div className="container-fluid mx-auto">
        <div className="grid grid-cols-6 items-center py-6">
          {/* Left Section - Hamburger Menu */}
          <div className="flex items-center space-x-4 pl-4 lg:pl-0">
            <Disclosure>
              {({ open }) => (
                <>
                  {/* Mobile menu button */}
                  <DisclosureButton className="text-gray-400 hover:text-white lg:hidden">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </DisclosureButton>

                  {/* Mobile Menu - Authentication Buttons */}
                  <DisclosurePanel className="lg:hidden absolute top-0 left-0 w-full bg-black text-white p-4">
                    {user ? (
                      <>
                        <span className="text-gray-400">
                          Welcome, <b>{user.name}</b>!
                        </span>
                        <Button
                          size="small"
                          onClick={onLogout}
                          label="LOG OUT"
                          className="text-gray-400 hover:text-white text-sm w-full"
                        />
                      </>
                    ) : (
                      <>
                        <Link to="/login">
                          <Button
                            size="small"
                            onClick={onLogin}
                            label="LOG IN"
                            className="text-gray-400 hover:text-white text-sm w-full"
                          />
                        </Link>
                        <Link to="/signup">
                          <Button
                            size="small"
                            onClick={onCreateAccount}
                            label="SIGN UP"
                            className="text-gray-400 hover:text-white text-sm w-full"
                          />
                        </Link>
                      </>
                    )}
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          </div>

          {/* Centered Star Wars Logo */}
          <div className="flex justify-center col-span-4">
            <img
              src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
              alt="Star Wars"
              className="h-16"
            />
          </div>

          {/* Right Section - Login Links (hidden on mobile when menu is open) */}
          <div className="flex justify-center space-x-4 lg:flex hidden">
            {user ? (
              <>
                <span className="text-gray-400">
                  Welcome, <b>{user.name}</b>!
                </span>
                <Button
                  size="small"
                  onClick={onLogout}
                  label="LOG OUT"
                  className="text-gray-400 hover:text-white text-sm"
                />
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    size="small"
                    onClick={onLogin}
                    label="LOG IN"
                    className="text-gray-400 hover:text-white text-sm"
                  />
                </Link>
                <Link to="/signup">
                  <Button
                    size="small"
                    onClick={onCreateAccount}
                    label="SIGN UP"
                    className="text-gray-400 hover:text-white text-sm"
                  />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Navigation Links */}
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
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  onCreateAccount: PropTypes.func,
};

export default Navbar;
