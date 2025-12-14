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
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">Skills</h1>

        {skills && skills.length > 0 ? (
          <div className="space-y-8">
            {/* Group skills by category */}
            {(() => {
              const categories = [...new Set(skills.map(s => s.category || 'Other'))];
              return categories.map(category => {
                const categorySkills = skills.filter(s => (s.category || 'Other') === category);
                return (
                  <div key={category} className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorySkills.map(skill => (
                        <div key={skill._id || skill.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{skill.name}</h3>
                            <span className="text-sm text-gray-600">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${skill.level || 0}%` }}
                            ></div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {['Web Design', 'UI/UX Design', 'Frontend Development', 'Responsive Design', 'Branding', 'Prototyping', 'JavaScript', 'React', 'Node.js'].map((skill, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{skill}</h3>
                <p className="text-sm text-gray-600">Expert</p>
              </div>
            ))}
          </div>
        )}
        {/* Extra spacing to ensure scrollability */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}
