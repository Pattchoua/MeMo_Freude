import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
import { FiHome, FiFileText, FiUser, FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register'; 
import LogoMeMo from '../assets/LogoMeMo.png';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen); 
    setIsRegistrationModalOpen(false);
    console.log('isLoginModalOpen:', isLoginModalOpen);
  };

  const toggleRegistrationModal = () => {
    setIsRegistrationModalOpen(!isRegistrationModalOpen); 
  };

  return (
    <header>
      <nav className="bg-[#8a55f7] p-4 relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <img src={LogoMeMo} alt="logo.image" className='h-[75px]' />

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Responsive Navigation */}
          <div className="hidden sm:block">
            <ul className="flex space-x-4">
              <li>
                <NavLink to="/" activeClassName="text-yellow-300" className="hover:text-yellow-300">
                  <FiHome className="inline-block text-white mr-1 text-xl" /> Startseite
                </NavLink>
              </li>

              {user && (
                <>
                  <li>
                    <NavLink to="/posts" activeClassName="text-yellow-300" className="hover:text-yellow-300">
                      <FiFileText className="inline-block text-white mr-1 text-xl" /> Beiträge
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/posts/dashboard" activeClassName="text-yellow-300" className="hover:text-yellow-300">
                      <MdDashboard className="inline-block text-white mr-1 text-xl" /> Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <p className="text-white, text-orange-200 text-lg font-bold">{user.username}</p>
                  </li>

                  <li>
                    <button
                      onClick={logout}
                      className="text-white hover:text-yellow-300"
                    >
                      <FiLogOut className="inline-block text-white mr-1 text-xl" /> Abmelden
                    </button>
                  </li>
                </>
              )}

              {!user && (
                <>
                  <li>
                    <button
                      onClick={toggleLoginModal}
                      className="text-white hover:text-yellow-300"
                    >
                      <FiUser className="inline-block text-white mr-1 text-xl" /> Anmelden
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={toggleRegistrationModal}
                      className="text-white hover:text-yellow-300"
                    >
                      <FiUser className="inline-block text-white mr-1 text-xl" /> Registrieren
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="sm:hidden absolute top-16 right-4 bg-white rounded-md shadow-md z-20">
              <ul className="space-y-2 p-4">
                <li>
                  <NavLink
                    to="/"
                    activeClassName="text-purple-600"
                    onClick={toggleMobileMenu}
                    className="hover:text-purple-600"
                  >
                    <FiHome className="inline-block text-gray-800 mr-2 text-xl" />
                    Startseite
                  </NavLink>
                </li>

                {user && (
                  <>
                    <li>
                      <NavLink
                        to="/posts"
                        activeClassName="text-purple-600"
                        onClick={toggleMobileMenu}
                        className="hover:text-purple-600"
                      >
                        <FiFileText className="inline-block text-gray-800 mr-2 text-xl" />
                        Beiträge
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard"
                        activeClassName="text-purple-600"
                        onClick={toggleMobileMenu}
                        className="hover:text-purple-600"
                      >
                        <MdDashboard className="inline-block text-gray-800 mr-2 text-xl" />
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          toggleMobileMenu();
                          logout();
                        }}
                        className="text-gray-800 hover:text-purple-600"
                      >
                        <FiLogOut className="inline-block text-gray-800 mr-2 text-xl" />
                        Abmelden
                      </button>
                    </li>
                  </>
                )}

                {!user && (
                  <>
                    <li>
                      <button
                        onClick={toggleLoginModal}
                        className="text-gray-800 hover:text-purple-600"
                      >
                        <FiUser className="inline-block text-gray-800 mr-2 text-xl" /> Anmelden
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={toggleRegistrationModal}
                        className="text-gray-800 hover:text-purple-600"
                      >
                        <FiUser className="inline-block text-gray-800 mr-2 text-xl" /> Registrieren
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Render the login modal */}
      {isLoginModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Login closeModal={toggleLoginModal} />
        </div>
      )}

      {/* Render the registration modal */}
      {isRegistrationModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Register 
          closeRegistrationModal={toggleRegistrationModal} 
          openLoginModal={toggleLoginModal}
          />
        </div>
      )}
    </header>
  );
};

export default Header;