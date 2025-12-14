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
    <div className="min-h-[calc(100vh-200px)] bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">Testimonials</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials && testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div key={testimonial._id || testimonial.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 lg:p-8 hover:shadow-md transition-shadow">
                <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">"{testimonial.text || testimonial.content}"</p>
                <div className="flex items-center">
                  {testimonial.avatar && (
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role || testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-gray-600">No testimonials available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;