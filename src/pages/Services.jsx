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
    <div className="min-h-[calc(100vh-200px)] bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services && services.length > 0 ? (
            services.map((service) => (
              <div key={service._id || service.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title || service.name}</h3>
                <p className="text-gray-700 leading-relaxed">{service.description || service.content}</p>
                {service.icon && (
                  <div className="mt-4 text-4xl">{service.icon}</div>
                )}
              </div>
            ))
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Web Design</h3>
                <p className="text-gray-700 leading-relaxed">Creating beautiful and functional websites that engage users and drive results.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">UI/UX Design</h3>
                <p className="text-gray-700 leading-relaxed">Designing intuitive user interfaces and exceptional user experiences.</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Branding</h3>
                <p className="text-gray-700 leading-relaxed">Developing strong brand identities that resonate with your target audience.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;