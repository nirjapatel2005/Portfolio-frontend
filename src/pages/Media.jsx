import { useFetch } from '../hooks/useFetch';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Media = () => {
  const { data: media, loading, error } = useFetch(() => apiService.getMedia());

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">Media</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media && media.length > 0 ? (
            media.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {item.type === 'image' ? (
                  <div className="w-full h-48 bg-gray-200 overflow-hidden">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200">
                    <video src={item.url} controls className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-gray-600">No media available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Media;