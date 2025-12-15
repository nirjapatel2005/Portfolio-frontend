import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { SocketProvider } from './context/SocketContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Testimonials from './pages/Testimonials';
import Media from './pages/Media';
import Contact from './pages/Contact';

// Component to handle scroll-based navigation (optional feature)
const ScrollNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollCooldown = useRef(false);
  const lastScrollTime = useRef(0);

  // Define the scroll sequence with routes
  const scrollSequence = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/skills', name: 'Skills' },
    { path: '/projects', name: 'Projects' }
  ];

  // Handle wheel scroll for smooth page transitions
  useEffect(() => {
    const handleWheel = (e) => {
      const currentPath = location.pathname;
      const currentRoute = scrollSequence.find(r => r.path === currentPath);
      
      // Only handle scroll for pages in the sequence
      if (!currentRoute) {
        return;
      }

      // Cooldown to prevent rapid page changes
      const now = Date.now();
      if (scrollCooldown.current || now - lastScrollTime.current < 600) {
        return;
      }

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;

      const deltaY = e.deltaY;
      const currentIndex = scrollSequence.findIndex(r => r.path === currentPath);

      // Only trigger at top (scroll down) or bottom (scroll up) of page
      const isNearTop = scrollPercentage <= 5 || scrollY < 100;
      const isNearBottom = scrollPercentage >= 95 || (documentHeight - windowHeight - scrollY) < 100;

      // Scroll down - go to next page
      if (deltaY > 30 && (isNearBottom || isNearTop) && currentIndex < scrollSequence.length - 1) {
        scrollCooldown.current = true;
        lastScrollTime.current = now;
        const nextRoute = scrollSequence[currentIndex + 1];
        navigate(nextRoute.path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          scrollCooldown.current = false;
        }, 800);
      }
      // Scroll up - go to previous page
      else if (deltaY < -30 && (isNearTop || isNearBottom) && currentIndex > 0) {
        scrollCooldown.current = true;
        lastScrollTime.current = now;
        const prevRoute = scrollSequence[currentIndex - 1];
        navigate(prevRoute.path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          scrollCooldown.current = false;
        }, 800);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [location.pathname, navigate]);

  // Reset scroll position when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
};

const App = () => {
  return (
    <SocketProvider>
      <BrowserRouter>
        <ScrollNavigation />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navigation />
        <main className="flex-grow">
          <div className="page-transition">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/media" element={<Media />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SocketProvider>
  );
};

export default App;