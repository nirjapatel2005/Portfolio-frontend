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
    <div className="min-h-[calc(100vh-200px)] bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">Blog</h1>
        <div className="space-y-6">
          {blogs && blogs.length > 0 ? (
            blogs.filter(blog => blog.published).map((blog) => (
              <article key={blog._id || blog.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 lg:p-8 hover:shadow-md transition-shadow">
                {blog.coverImage && (
                  <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">{blog.excerpt || blog.content?.substring(0, 200) + '...'}</p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-md font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))
          ) : (
            <div className="text-gray-600">No blog posts available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;