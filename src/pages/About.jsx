import { useFetch } from '../hooks/useFetch';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const About = () => {
  const { data: about, loading, error } = useFetch(() => apiService.getAbout(), { 
    enableRealtime: true, 
    modelName: 'about' 
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32">
        <div className="absolute inset-0">
          <div 
            className="absolute bg-blue-600 opacity-20"
            style={{
              width: '500px',
              height: '500px',
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              transform: 'translate(-20%, -10%)',
              filter: 'blur(80px)',
            }}
          ></div>
          <div 
            className="absolute bg-blue-500 opacity-15"
            style={{
              width: '400px',
              height: '400px',
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              transform: 'translate(80%, 20%)',
              filter: 'blur(70px)',
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Me</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate about creating exceptional digital experiences
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {about && Object.keys(about).length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {about.image && (
              <div className="relative">
                <div className="relative z-10">
                  <img 
                    src={about.image} 
                    alt={about.title || "About"} 
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
                <div 
                  className="absolute -bottom-6 -right-6 bg-blue-600 opacity-20 -z-10"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '40% 60% 70% 30%',
                    filter: 'blur(40px)',
                  }}
                ></div>
              </div>
            )}
            <div className="space-y-8">
              {about.title && (
                <h2 className="text-4xl font-bold text-gray-900">{about.title}</h2>
              )}
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {about.description || about.content}
                </p>
              </div>
              
              {about.skills && about.skills.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {about.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {about.highlights && about.highlights.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h3>
                  <div className="space-y-3">
                    {about.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900">Welcome to My Portfolio</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  I'm a passionate web designer dedicated to creating beautiful and functional digital experiences that make a difference.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With years of experience in web development and design, I specialize in creating user-friendly interfaces that combine aesthetics with functionality.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I'm constantly learning and adapting to new technologies and design trends to deliver the best possible results for my clients.
                </p>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative z-10 w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <span className="text-8xl text-blue-600">👨‍💻</span>
              </div>
              <div 
                className="absolute bg-blue-600 opacity-20"
                style={{
                  width: '300px',
                  height: '300px',
                  borderRadius: '40% 60% 70% 30%',
                  transform: 'translate(20%, 10%)',
                  filter: 'blur(60px)',
                }}
              ></div>
            </div>
          </div>
        )}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default About;