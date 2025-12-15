import { useFetch } from '../hooks/useFetch';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Media = () => {
  const { data: media, loading, error } = useFetch(() => apiService.getMedia());

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
              Media <span className="text-blue-600">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of visual content showcasing my work and creativity
            </p>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {media && media.length > 0 ? (
            media.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                {item.type === 'image' ? (
                  <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gray-200 relative overflow-hidden">
                    <video 
                      src={item.url} 
                      controls 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                  <div className="text-8xl text-blue-600 mb-6">🎨</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Media Gallery Coming Soon</h3>
                  <p className="text-gray-600 text-lg max-w-md mx-auto">
                    I'm curating a collection of visual content to showcase here. Stay tuned for updates!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Media;