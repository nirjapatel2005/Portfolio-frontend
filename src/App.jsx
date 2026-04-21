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
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const RouteScrollNavigator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCooldown = useRef(false);
  const wheelAccumulator = useRef(0);
  const resetTimerRef = useRef(null);
  const routeSequence = [
    '/',
    '/about',
    '/skills',
    '/experience',
    '/services',
    '/projects',
    '/blog',
    '/testimonials',
    '/contact'
  ];

  useEffect(() => {
    const handleWheel = (event) => {
      const currentIndex = routeSequence.indexOf(location.pathname);
      if (currentIndex === -1 || isCooldown.current || Math.abs(event.deltaY) < 4) {
        return;
      }

      // Only allow route switch when user is near page edges,
      // so regular content reading scroll does not jump routes.
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const edgeOffset = 90;
      const nearTop = scrollY <= edgeOffset;
      const nearBottom = scrollY + viewportHeight >= documentHeight - edgeOffset;
      const footerElement = document.querySelector('footer');
      const footerRect = footerElement?.getBoundingClientRect();
      const isFooterVisible = footerRect ? footerRect.top < viewportHeight : false;

      if (event.deltaY > 0 && (!nearBottom || !isFooterVisible)) {
        wheelAccumulator.current = 0;
        return;
      }

      if (event.deltaY < 0 && !nearTop) {
        wheelAccumulator.current = 0;
        return;
      }

      // Accumulate wheel intent so navigation feels natural
      wheelAccumulator.current += event.deltaY;

      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = setTimeout(() => {
        wheelAccumulator.current = 0;
      }, 180);

      const threshold = 80;
      if (wheelAccumulator.current >= threshold && currentIndex < routeSequence.length - 1) {
        isCooldown.current = true;
        wheelAccumulator.current = 0;
        navigate(routeSequence[currentIndex + 1]);
        setTimeout(() => {
          isCooldown.current = false;
        }, 650);
      }

      if (wheelAccumulator.current <= -threshold && currentIndex > 0) {
        isCooldown.current = true;
        wheelAccumulator.current = 0;
        navigate(routeSequence[currentIndex - 1]);
        setTimeout(() => {
          isCooldown.current = false;
        }, 650);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, [location.pathname, navigate]);

  return null;
};

const App = () => {
  return (
    <SocketProvider>
      <BrowserRouter>
        <ScrollToTop />
        <RouteScrollNavigator />
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
          <Navigation />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SocketProvider>
  );
};

export default App;