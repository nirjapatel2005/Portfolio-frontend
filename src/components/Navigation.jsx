import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dropdownPages = [
    { name: 'Experience', path: '/experience' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Testimonials', path: '/testimonials' }
  ];
  const directPagesBeforeDropdown = [
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' }
  ];
  const directPagesAfterDropdown = [
    { name: 'Contact Me', path: '/contact' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePageClick = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo(0, 0);
  };

  const isDropdownPageActive = dropdownPages.some(page => location.pathname === page.path);
  const isHomePage = location.pathname === '/';
  const combinedPages = [
    ...directPagesBeforeDropdown,
    ...dropdownPages,
    ...directPagesAfterDropdown
  ];

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogoClick}
              className="bg-transparent border-none outline-none transition-all duration-300 cursor-pointer hover:scale-105 p-1.5 rounded-xl hover:bg-slate-100"
            >
              <img
                src="/big_logo.png"
                alt="Portfolio logo"
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain"
              />
            </button>
            <div className="hidden sm:block">
              <p className="text-sm text-slate-500 leading-none">Portfolio</p>
              <p className="text-base font-semibold text-slate-900 leading-tight">Frontend Developer</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {/* Home Link - Only visible when NOT on home page */}
            {!isHomePage && (
              <Link
                to="/"
                className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-slate-100"
              >
                Home
              </Link>
            )}

            {/* Direct Links Before Dropdown */}
            {directPagesBeforeDropdown.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                  location.pathname === page.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                {page.name}
              </Link>
            ))}

            {/* Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center rounded-lg ${
                  isDropdownPageActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                More
                <svg
                  className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 overflow-hidden">
                  {dropdownPages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      onClick={handlePageClick}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-all duration-200 block ${
                        location.pathname === page.path
                          ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                      }`}
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links After Dropdown */}
            {directPagesAfterDropdown.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                  location.pathname === page.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                {page.name}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-2 space-y-1">
              {!isHomePage && (
                <Link
                  to="/"
                  onClick={handlePageClick}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100 hover:text-blue-600"
                >
                  Home
                </Link>
              )}
              {combinedPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  onClick={handlePageClick}
                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg ${
                    location.pathname === page.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
                  }`}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;