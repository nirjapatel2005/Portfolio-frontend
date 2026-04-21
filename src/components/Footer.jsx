const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        <p className="text-sm text-slate-600 font-medium">Built with React and Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;

