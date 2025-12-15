import { useFetch } from "../hooks/useFetch"
import apiService from "../services/api"
import LoadingSpinner from "../components/LoadingSpinner"
import ErrorMessage from "../components/ErrorMessage"

export default function Skills() {
  const { data: skills, loading, error } = useFetch(() => apiService.getSkills(), { 
    enableRealtime: true, 
    modelName: 'skill' 
  })

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
              My <span className="text-blue-600">Skills</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technical expertise and creative abilities that drive exceptional results
            </p>
          </div>
        </div>
      </div>

      {/* Skills Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {skills && skills.length > 0 ? (
          <div className="space-y-16">
            {(() => {
              const categories = [...new Set(skills.map(s => s.category || 'Other'))];
              return categories.map(category => {
                const categorySkills = skills.filter(s => (s.category || 'Other') === category);
                return (
                  <div key={category} className="relative">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">{category}</h2>
                      <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {categorySkills.map(skill => (
                        <div key={skill._id || skill.id} className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                          {skill.icon && (
                            <div className="mb-4">
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-12 h-12 object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{skill.name}</h3>
                            <span className="text-lg font-semibold text-blue-600">{skill.level}%</span>
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${skill.level || 0}%` }}
                              ></div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        ) : (
          <div className="space-y-16">
            {/* Frontend Skills */}
            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Frontend Development</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[{name: 'React', level: 95}, {name: 'JavaScript', level: 90}, {name: 'HTML/CSS', level: 98}].map((skill, index) => (
                  <div key={index} className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{skill.name}</h3>
                      <span className="text-lg font-semibold text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Skills */}
            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Design</h2>
                <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[{name: 'UI/UX Design', level: 92}, {name: 'Web Design', level: 95}, {name: 'Branding', level: 85}].map((skill, index) => (
                  <div key={index} className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{skill.name}</h3>
                      <span className="text-lg font-semibold text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="h-20"></div>
      </div>
    </div>
  )
}