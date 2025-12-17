import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDropdownPageActive = dropdownPages.some(page => location.pathname === page.path);
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 cursor-pointer"
            >
              Portfolio
            </button>
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* Home Link - Only visible when NOT on home page */}
            {!isHomePage && (
              <Link
                to="/"
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}

            {/* Direct Links Before Dropdown */}
            {directPagesBeforeDropdown.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                  location.pathname === page.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {page.name}
                {location.pathname === page.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                )}
                {location.pathname !== page.path && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            ))}

            {/* Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center relative group ${
                  isDropdownPageActive
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
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
                {isDropdownPageActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                )}
                {!isDropdownPageActive && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                )}
              </button>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden animate-fadeIn">
                  {dropdownPages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      onClick={handlePageClick}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-all duration-200 block ${
                        location.pathname === page.path
                          ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-blue-600'
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
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                  location.pathname === page.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {page.name}
                {location.pathname === page.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                )}
                {location.pathname !== page.path && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;