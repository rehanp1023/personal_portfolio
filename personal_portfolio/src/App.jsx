import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Phone, ChevronDown } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = ['Student', 'Computer Science + Data Science', 'Sophomore'];

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-teal-900 text-white">
      <style>{`
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-in.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Sidebar/Dropdown */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Rehan Patel
            </h1>
            
            {/* Desktop */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('education')} className="hover:text-cyan-400 transition-colors">
                Education
              </button>
              <button onClick={() => scrollToSection('experience')} className="hover:text-cyan-400 transition-colors">
                Experience
              </button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-400 transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors">
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-cyan-500/20">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 hover:bg-cyan-500/20 rounded transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('education')} className="block w-full text-left px-4 py-2 hover:bg-cyan-500/20 rounded transition-colors">
                Education
              </button>
              <button onClick={() => scrollToSection('experience')} className="block w-full text-left px-4 py-2 hover:bg-cyan-500/20 rounded transition-colors">
                Experience
              </button>
              <button onClick={() => scrollToSection('projects')} className="block w-full text-left px-4 py-2 hover:bg-cyan-500/20 rounded transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 hover:bg-cyan-500/20 rounded transition-colors">
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            {/* Profile Picture - Replace with your actual image */}
            <div className="fade-in w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-lg shadow-cyan-500/50">
              <img 
                src="./profile.jpeg" 
                alt="RP" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="fade-in text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Rehan Patel
            </h2>
            <p className="fade-in text-xl md:text-2xl text-cyan-300 mb-8">
              <span className="text-cyan-400">{displayText}</span>
              <span className="animate-pulse">|</span> at Yale University
            </p>
          </div>

          <div className="fade-in bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <h3 className="text-2xl font-semibold mb-4 text-cyan-300">About Me</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Hi! I'm Rehan, a student at Yale University with a passion for leveraging technology to solve real-world problems and deliver meaningful insights. My interests include software development, machine learning, data science, and data analysis. I'm excited to connect with like-minded individuals and explore new opportunities in the tech world!
            </p>
          </div>

          <div className="fade-in flex flex-wrap justify-center gap-4">
            <a href="mailto:rehan.patel1023@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-lg hover:bg-cyan-500/20 transition-all hover:scale-105">
              <Mail size={20} />
              <span>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/rehanpatel1023/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-lg hover:bg-cyan-500/20 transition-all hover:scale-105">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/rehanp1023" className="flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-lg hover:bg-cyan-500/20 transition-all hover:scale-105">
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </div>

          <button 
            onClick={() => scrollToSection('education')}
            className="mt-9 animate-bounce"
          >
            <ChevronDown size={32} className="text-cyan-400" />
          </button>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="fade-in text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Education
          </h2>
          
          <div className="space-y-6">
            <div className="fade-in bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:scale-[1.02] group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-cyan-300 group-hover:text-teal-400 transition-colors">B.S. Computer Science; Certificate in Data Science</h3>
                  <p className="text-xl text-gray-300">Yale University</p>
                </div>
                <span className="text-gray-400 text-right whitespace-nowrap ml-4">Expected May 2028</span>
              </div>
              <p className="text-gray-300 mb-2">GPA: 3.94</p>
              <p className="text-gray-300">Relevant Coursework: Data Structures (In progress), Introduction to Data Science, Discrete Mathematics (In progress), Introduction to Computer Science, Calculus I and II</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="fade-in text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Experience
          </h2>
          
          <div className="space-y-6">
            <div className="fade-in bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:scale-[1.02] group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-cyan-300 group-hover:text-teal-400 transition-colors">Lead Software Developer</h3>
                  <p className="text-xl text-gray-300">OWW Agency</p>
                </div>
                <span className="text-gray-400 text-right whitespace-nowrap ml-4">August 2025 - Present</span>
              </div>
            </div>

            <div className="fade-in bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:scale-[1.02] group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-cyan-300 group-hover:text-teal-400 transition-colors">AI Software Engineering / Machine Learning Intern</h3>
                  <p className="text-xl text-gray-300">Yale School of Medicine</p>
                </div>
                <span className="text-gray-400 text-right whitespace-nowrap ml-4">May 2025 - August 2025</span>
              </div>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  <span>Qingyu Chen Lab</span>
                </li>
              </ul>
            </div>

            <div className="fade-in bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:scale-[1.02] group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-cyan-300 group-hover:text-teal-400 transition-colors">Computer Science College Ambassador</h3>
                  <p className="text-xl text-gray-300">Harmony Public Schools</p>
                </div>
                <span className="text-gray-400 text-right whitespace-nowrap ml-4">May 2025 - Present</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="fade-in text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="fade-in bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:scale-[1.02] group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-cyan-300 group-hover:text-teal-400 transition-colors">
                  GDP v.s. Life Expectancy
                </h3>
                <span className="text-gray-400 text-right whitespace-nowrap ml-4 text-sm">April 2025</span>
              </div>
              <p className="text-gray-300 mb-4">
                A data-driven analysis of global inequality to uncover which countries face the harshest economic and health outcomes.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Python</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Pandas</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">NumPy</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">SciKit-Learn</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Jupyter</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Seaborn</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Matplotlib</span>
              </div>
            </div>

            <div className="fade-in bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:scale-[1.02] group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-cyan-300 group-hover:text-teal-400 transition-colors">
                  Stock Trading Simulator
                </h3>
                <span className="text-gray-400 text-right whitespace-nowrap ml-4 text-sm">December 2024</span>
              </div>
              <p className="text-gray-300 mb-4">
                Engineered a dynamic web application to simulate real-time portfolio management and stock trading behavior.              
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Python</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">SQL</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Flask</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">HTML</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">CSS</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">JavaScript</span> 
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/rehanp1023/projects/tree/main/stock-trading-simulator" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                  <Github size={18} />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>

            <div className="fade-in bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:scale-[1.02] group md:col-span-2 md:w-1/2 md:mx-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-cyan-300 group-hover:text-teal-400 transition-colors">
                  Recipe Finder
                </h3>
                <span className="text-gray-400 text-right whitespace-nowrap ml-4 text-sm">November 2024</span>
              </div>
              <p className="text-gray-300 mb-4">
                Developed a responsive platform that dynamically delivers detailed, ingredient-driven recipe recommendations.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Python</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">SQL</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">Flask</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">HTML</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">CSS</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-sm text-cyan-300">JavaScript</span> 
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/rehanp1023/projects/tree/main/recipe-finder" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                  <Github size={18} />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="fade-in text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <div className="fade-in bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-cyan-500/20">
            <p className="text-xl text-gray-300 mb-8">
              I'm happy to connect and discuss new opportunities!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <a href="mailto:rehan.patel1023@gmail.com" className="bg-slate-900/50 p-6 rounded-xl hover:bg-cyan-500/10 transition-all cursor-pointer">
                <Mail className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="font-semibold mb-2 text-cyan-300">Email</h3>
                <p className="text-gray-300 hover:text-cyan-400 transition-colors break-all text-sm">
                  rehan.patel1023@gmail.com
                </p>
              </a>
  
              <a href="https://www.linkedin.com/in/rehanpatel1023/" target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 p-6 rounded-xl hover:bg-cyan-500/10 transition-all cursor-pointer">
                <Linkedin className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="font-semibold mb-2 text-cyan-300">LinkedIn</h3>
                <p className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  rehanpatel1023
                </p>
              </a>
  
              <a href="https://github.com/rehanp1023" target="_blank" rel="noopener noreferrer" className="bg-slate-900/50 p-6 rounded-xl hover:bg-cyan-500/10 transition-all cursor-pointer">
                <Github className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <h3 className="font-semibold mb-2 text-cyan-300">GitHub</h3>
                <p className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  rehanp1023
                </p>
              </a>
            </div>
          </div>

          <p className="mt-12 text-gray-400">
            © 2025 Rehan Patel. Built with React and Tailwind CSS.
          </p>
        </div>
      </section>
    </div>
  );
}