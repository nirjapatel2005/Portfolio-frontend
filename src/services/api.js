// Normalize API URL - remove trailing slashes and ensure it doesn't include /api
const getApiUrl = () => {
  let url = import.meta.env.VITE_API_URL || "http://localhost:5000"
  // Remove trailing slashes
  url = url.replace(/\/+$/, '')
  // Remove /api if it's at the end (some users might set VITE_API_URL=http://localhost:5000/api)
  url = url.replace(/\/api$/, '')
  return url
}

const API_URL = getApiUrl()

export const fetchFromCMS = async (endpoint) => {
  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${API_URL}${normalizedEndpoint}`
  
  // Log in development for debugging
  if (import.meta.env.DEV) {
    console.log(`[API] Fetching: ${url}`)
  }
  
  try {
    const res = await fetch(url)

    if (!res.ok) {
      // Provide more detailed error information
      const errorText = await res.text().catch(() => 'No error details')
      const errorMessage = `API error: ${res.status} - ${res.statusText} (${url})`
      
      // Log in development
      if (import.meta.env.DEV) {
        console.error(`[API] ${errorMessage}`, errorText)
      }
      
      throw new Error(errorMessage)
    }

    const data = await res.json()
    
    // Log in development
    if (import.meta.env.DEV) {
      console.log(`[API] Success: ${url}`, data)
    }
    
    return data
  } catch (err) {
    // If it's already our formatted error, rethrow it
    if (err.message.includes('API error:')) {
      throw err
    }
    // Otherwise, provide more context
    const errorMessage = `Network error: ${err.message} (tried to fetch: ${url})`
    
    // Log in development
    if (import.meta.env.DEV) {
      console.error(`[API] ${errorMessage}`, err)
    }
    
    throw new Error(errorMessage)
  }
}

// Helper function to extract items from paginated or array response
const extractItems = (data) => {
  // If data is already an array, return it
  if (Array.isArray(data)) {
    if (import.meta.env.DEV) {
      console.log('[API] extractItems: Data is already an array, returning as-is', data.length, 'items');
    }
    return data;
  }
  
  // If data has an items property that is an array, return it
  if (data && typeof data === 'object' && data.items && Array.isArray(data.items)) {
    if (import.meta.env.DEV) {
      console.log('[API] extractItems: Extracted items from paginated response', data.items.length, 'items');
    }
    return data.items;
  }
  
  // If data is null/undefined, return empty array to prevent errors
  if (!data) {
    if (import.meta.env.DEV) {
      console.warn('[API] extractItems: Data is null/undefined, returning empty array');
    }
    return [];
  }
  
  // If data is an object but not an array and doesn't have items, return empty array
  // (This handles edge cases where the response structure is unexpected)
  if (import.meta.env.DEV) {
    console.warn('[API] extractItems: Unexpected data structure, returning empty array', data);
  }
  return [];
}

const apiService = {
  getHome: async () => {
    const data = await fetchFromCMS('/api/home')
    return data || {}
  },

  getAbout: async () => {
    const data = await fetchFromCMS('/api/about')
    return data || {}
  },
  
  getSkills: async () => {
    const data = await fetchFromCMS('/api/skills')
    return extractItems(data)
  },
  
  getExperience: async () => {
    const data = await fetchFromCMS('/api/experience')
    return extractItems(data)
  },
  
  getServices: async () => {
    const data = await fetchFromCMS('/api/services')
    return extractItems(data)
  },
  
  getProjects: async () => {
    const data = await fetchFromCMS('/api/projects')
    return extractItems(data)
  },
  
  getBlogs: async () => {
    const data = await fetchFromCMS('/api/blogs')
    return extractItems(data)
  },
  
  getTestimonials: async () => {
    const data = await fetchFromCMS('/api/testimonials')
    return extractItems(data)
  },
  
  getMedia: async () => {
    const data = await fetchFromCMS('/api/upload')
    return extractItems(data)
  },
  
  submitContact: async (formData) => {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'No error details')
      throw new Error(`API error: ${res.status} - ${res.statusText} (${API_URL}/api/contact)`)
    }

    return res.json()
  },
}

export default apiService;
