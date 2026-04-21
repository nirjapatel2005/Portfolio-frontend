import { useFetch } from '../hooks/useFetch';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const parseDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatMonthYear = (value) => {
  const parsed = parseDate(value);
  if (!parsed) return value || '';
  return parsed.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const getDurationLabel = (startValue, endValue) => {
  const startDate = parseDate(startValue);
  const endDate = parseDate(endValue) || new Date();
  if (!startDate) return '';

  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months += endDate.getMonth() - startDate.getMonth();
  if (endDate.getDate() < startDate.getDate()) months -= 1;
  if (months < 0) return '';

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (remainingMonths > 0 || parts.length === 0) parts.push(`${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`);
  return parts.join(' ');
};

const Experience = () => {
  const { data: experiences, loading, error } = useFetch(() => apiService.getExperience(), { 
    enableRealtime: true, 
    modelName: 'experience' 
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-10 lg:py-14">
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              My <span className="text-blue-600">Experience</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              A journey of growth, learning, and professional achievements
            </p>
          </div>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="relative">
          {/* Enhanced Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-300 rounded-full"></div>
          
          {experiences && experiences.length > 0 ? (
            experiences.map((exp, index) => {
              const startValue = exp.startDate || exp.start;
              const endValue = exp.endDate || exp.end;
              const duration = getDurationLabel(startValue, endValue);
              const periodLabel = `${formatMonthYear(startValue)} - ${endValue ? formatMonthYear(endValue) : 'Present'}`;

              return (
              <div key={exp._id || exp.id} className="relative flex items-start mb-12 group">
                {/* Enhanced Timeline dot */}
                <div className="absolute left-6 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 group-hover:scale-125 transition-transform duration-300">
                  <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20"></div>
                </div>
                
                {/* Enhanced Content Card */}
                <div className="ml-20 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 w-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {exp.title || exp.position}
                        </h3>
                        <p className="text-xl text-blue-600 font-semibold mt-1">
                          {exp.company || exp.organization}
                        </p>
                      </div>
                      <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium inline-flex flex-col leading-tight w-fit">
                        <span>{periodLabel}</span>
                        {duration && <span className="text-blue-100 text-xs mt-0.5">{duration}</span>}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                      {exp.description || exp.content}
                    </p>
                    
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )})
          ) : (
            <div className="ml-20">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                <div className="text-6xl text-blue-600 mb-4">💼</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience Coming Soon</h3>
                <p className="text-gray-600 text-lg">
                  Professional experience details will be updated here.
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Experience;