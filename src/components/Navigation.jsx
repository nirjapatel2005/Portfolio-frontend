import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
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
    { name: 'Contact', path: '/contact' }
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

  const isDropdownPageActive = dropdownPages.some(page => location.pathname === page.path);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">Portfolio</span>
          </div>
          <div className="flex items-center space-x-8">
            {/* Home Link */}
            <Link
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-gray-900 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Home
            </Link>

            {/* Direct Links Before Dropdown */}
            {directPagesBeforeDropdown.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === page.path
                    ? 'text-gray-900 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {page.name}
              </Link>
            ))}

            {/* Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-3 py-2 text-sm font-medium transition-colors flex items-center ${
                  isDropdownPageActive
                    ? 'text-gray-900 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                More
                <svg
                  className={`ml-1 w-4 h-4 transition-transform ${
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
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  {dropdownPages.map((page) => (
                    <Link
                      key={page.path}
                      to={page.path}
                      onClick={handlePageClick}
                      className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors block ${
                        location.pathname === page.path
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
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
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === page.path
                    ? 'text-gray-900 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;