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
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">About Me</h1>
        {about && Object.keys(about).length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 lg:p-12 mb-8">
            {about.title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{about.title}</h2>
            )}
            {about.image && (
              <div className="mb-6">
                <img src={about.image} alt={about.title || "About"} className="w-full max-w-md mx-auto rounded-lg" />
              </div>
            )}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{about.description || about.content}</p>
              {about.skills && about.skills.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {about.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {about.highlights && about.highlights.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Highlights</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {about.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : null}
        {!about && !loading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 lg:p-12 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to my portfolio! I'm a passionate web designer dedicated to creating beautiful and functional digital experiences.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              With years of experience in web development and design, I specialize in creating user-friendly interfaces that combine aesthetics with functionality. My approach focuses on understanding user needs and translating them into intuitive digital solutions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm constantly learning and adapting to new technologies and design trends to deliver the best possible results for my clients.
            </p>
          </div>
        )}
        {/* Extra spacing to ensure scrollability */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default About;