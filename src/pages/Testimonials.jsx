import { useFetch } from '../hooks/useFetch';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Testimonials = () => {
  const { data: testimonials, loading, error } = useFetch(() => apiService.getTestimonials(), { 
    enableRealtime: true, 
    modelName: 'testimonial' 
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
              Client <span className="text-blue-600">Testimonials</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What clients say about working with me and the results we've achieved together
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div key={testimonial._id || testimonial.id} className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="text-blue-600 text-4xl mb-6">“</div>
                  
                  <p className="text-gray-700 mb-8 italic leading-relaxed text-lg font-medium">
                    {testimonial.text || testimonial.content}
                  </p>
                  
                  <div className="flex items-center">
                    {testimonial.avatar ? (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full mr-4 object-cover border-4 border-white shadow-lg" 
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full mr-4 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-blue-600 text-xl font-bold">
                          {testimonial.name ? testimonial.name.charAt(0) : '?'}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-600 font-medium">
                        {testimonial.role || testimonial.position}
                      </p>
                    </div>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-16">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                  <div className="text-8xl text-blue-600 mb-6">💬</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Testimonials Coming Soon</h3>
                  <p className="text-gray-600 text-lg max-w-md mx-auto">
                    I'm working with amazing clients and will be sharing their feedback here soon.
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

export default Testimonials;