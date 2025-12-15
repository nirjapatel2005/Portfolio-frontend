import { useFetch } from '../hooks/useFetch';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Services = () => {
  const { data: services, loading, error } = useFetch(() => apiService.getServices(), { 
    enableRealtime: true, 
    modelName: 'service' 
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
              width: '600px',
              height: '600px',
              borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
              transform: 'translate(-30%, -20%)',
              filter: 'blur(100px)',
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              My <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions to bring your digital vision to life
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services && services.length > 0 ? (
            services.map((service) => (
              <div key={service._id || service.id} className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  {service.icon && (
                    <div className="mb-6">
                      {/^https?:\/\//.test(service.icon) ? (
                        <img
                          src={service.icon}
                          alt={service.title || service.name || "Service icon"}
                          className="w-16 h-16 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-5xl text-blue-600">{service.icon}</span>
                      )}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title || service.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {service.description || service.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-6">
                    <span className="text-5xl text-blue-600">🎨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    Web Design
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Creating beautiful and functional websites that engage users and drive results.
                  </p>
                </div>
              </div>
              <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-6">
                    <span className="text-5xl text-blue-600">💡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    UI/UX Design
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Designing intuitive user interfaces and exceptional user experiences.
                  </p>
                </div>
              </div>
              <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-6">
                    <span className="text-5xl text-blue-600">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    Branding
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Developing strong brand identities that resonate with your target audience.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Services;