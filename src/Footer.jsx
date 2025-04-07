export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          {/* Left - Brand Name */}
          <h2 className="text-xl font-semibold">VN</h2>
  
          {/* Center - Navigation Links */}
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <a href="#home" className="hover:text-blue-400">Home</a>
            <a href="#features" className="hover:text-blue-400">Features</a>
            <a href="#projects" className="hover:text-blue-400">Projects</a>
            <a href="#resume" className="hover:text-blue-400">Resume</a>
            <a href="#contact" className="hover:text-blue-400">Contact</a>
          </nav>
  
          {/* Right - Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/vishu1803" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/vishwanath-nishad-69b047233/" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-400">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
  
        {/* Bottom - Copyright */}
        <div className="text-center text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} Vishwanath Nishad. All rights reserved.
        </div>
      </footer>
    );
  }
  