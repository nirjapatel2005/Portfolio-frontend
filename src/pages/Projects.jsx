import { useFetch } from '../hooks/useFetch';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Projects = () => {
  const { data: projects, loading, error } = useFetch(() => apiService.getProjects(), { 
    enableRealtime: true, 
    modelName: 'project' 
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id || project.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {project.coverImage && (
                  <div className="w-full h-48 bg-gray-200 overflow-hidden">
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{project.shortDescription || project.description}</p>
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-md font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {(project.link || project.repo) && (
                    <div className="mt-4 flex gap-2">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Live Demo →
                        </a>
                      )}
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                          GitHub →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <>
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Project {index}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">Project description goes here.</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-md font-medium">React</span>
                      <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-md font-medium">Node.js</span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {/* Extra spacing to ensure scrollability */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Projects;