import { useFetch } from '../hooks/useFetch';
import apiService from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Blog = () => {
  const { data: blogs, loading, error } = useFetch(() => apiService.getBlogs(), { 
    enableRealtime: true, 
    modelName: 'blog' 
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
              My <span className="text-blue-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on web development and design
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="space-y-12">
          {blogs && blogs.length > 0 ? (
            blogs.filter(blog => blog.published).map((blog) => (
              <article key={blog._id || blog.id} className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="lg:flex">
                  {blog.coverImage ? (
                    <div className="lg:w-1/3">
                      <div className="h-64 lg:h-full bg-gray-200 overflow-hidden">
                        <img 
                          src={blog.coverImage} 
                          alt={blog.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="lg:w-1/3">
                      <div className="h-64 lg:h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <span className="text-6xl text-blue-600">📝</span>
                      </div>
                    </div>
                  )}
                  <div className="lg:w-2/3 p-8 lg:p-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 text-sm">5 min read</span>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                      {blog.excerpt || blog.content?.substring(0, 200) + '...'}
                    </p>
                    
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
                <div className="text-8xl text-blue-600 mb-6">📝</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Blog Coming Soon</h3>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                  I'm working on some exciting content. Check back soon for insights on web development, design, and technology.
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

export default Blog;