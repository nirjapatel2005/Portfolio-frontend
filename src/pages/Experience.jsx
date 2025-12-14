import { useFetch } from '../hooks/useFetch';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Experience = () => {
  const { data: experiences, loading, error } = useFetch(() => apiService.getExperience(), { 
    enableRealtime: true, 
    modelName: 'experience' 
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">Experience</h1>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {experiences && experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={exp._id || exp.id} className="relative flex items-start mb-8">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm z-10"></div>
                
                {/* Content */}
                <div className="ml-16 bg-white rounded-lg shadow-sm border border-gray-100 p-6 w-full hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.title || exp.position}</h3>
                      <p className="text-lg text-blue-600 font-medium">{exp.company || exp.organization}</p>
                    </div>
                    <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-md inline-block w-fit">
                      {exp.startDate || exp.start} - {exp.endDate || exp.end || 'Present'}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">{exp.description || exp.content}</p>
                  
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-600">No experience entries available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;