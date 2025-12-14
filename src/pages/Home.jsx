import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  
  const handleContactClick = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hi,
              </h1>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                I'am <span className="text-blue-600">Nirja Patel</span>
              </h1>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2">
                 Full Stack Developer
              </h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleContactClick}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors mt-6"
              >
                Contact Me
              </button>
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4 mt-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-blue-600 transition-colors font-semibold text-lg"
                  aria-label="LinkedIn"
                >
                  in
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-blue-600 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.532 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Image with Blue Blob */}
          <div className="relative flex justify-center items-center min-h-[400px] lg:min-h-[500px]">
            <div className="relative z-10 w-full max-w-md">
              {/* Large Blue Blob Background - Organic Shape */}
              <div className="absolute inset-0 -z-10">
                <div 
                  className="absolute bg-blue-600 opacity-40"
                  style={{
                    width: '400px',
                    height: '400px',
                    borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                    transform: 'translate(20%, 10%)',
                    filter: 'blur(60px)',
                  }}
                ></div>
                <div 
                  className="absolute bg-blue-500 opacity-30"
                  style={{
                    width: '350px',
                    height: '350px',
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    transform: 'translate(-10%, -5%)',
                    filter: 'blur(50px)',
                  }}
                ></div>
              </div>
              
              {/* Profile Image Container */}
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 mx-auto rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-2xl relative z-20">
                  {/* Placeholder for profile image - replace with actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-6xl lg:text-8xl text-gray-600">👤</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Extra spacing to ensure scrollability */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Home;