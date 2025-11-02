import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Lucide-react icons for a modern look (mantidos, mas estilizados para o tema)
import { Home, User, Code, Mail, Linkedin, Github, ExternalLink, Award, Database, Cloud, Terminal, GitBranch } from 'lucide-react';

// Helper component for letter-by-letter animation
const AnimatedText = ({ text, delay = 50, className = '' }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{ animationDelay: `${index * delay}ms` }}
          className="inline-block opacity-0 animate-fadeInChar"
        >
          {char === ' ' ? '\u00A0' : char} {/* Preserve spaces */}
        </span>
      ))}
    </span>
  );
};

// Main App component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeSkillCategory, setActiveSkillCategory] = useState('languages');
  const cursorRef = useRef(null);
  const contactFormRef = useRef(null);

  // --- 1. Mouse follower effect (Ajustado para o tema Terminal) ---
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = '1';
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    ['home', 'about', 'projects', 'certificates', 'contact'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      ['home', 'about', 'projects', 'certificates', 'contact'].forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  // --- 2. Contact form submission handler (Corrigido para usar fetch/Formspree de forma estável) ---
  const handleContactSubmit = async (e) => {
    e.preventDefault(); 
    const form = contactFormRef.current;
    const submitButton = e.currentTarget.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    if (!form || !submitButton) return;

    // Estado de envio
    submitButton.textContent = 'A Enviar...';
    submitButton.disabled = true;
    submitButton.classList.remove('bg-cyan-600', 'hover:bg-cyan-700');
    submitButton.classList.add('bg-gray-600', 'cursor-not-allowed');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        submitButton.textContent = 'Enviado! ✅';
        submitButton.classList.remove('bg-gray-600');
        submitButton.classList.add('bg-green-600');
        form.reset();
      } else {
        submitButton.textContent = 'Falha! ❌';
        submitButton.classList.remove('bg-gray-600');
        submitButton.classList.add('bg-red-600');
      }
    } catch (error) {
      submitButton.textContent = 'Erro de Rede! 📶';
      submitButton.classList.remove('bg-gray-600');
      submitButton.classList.add('bg-red-600');
    }

    // Volta ao estado original após 3 segundos
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      submitButton.classList.remove('bg-green-600', 'bg-red-600', 'bg-gray-600', 'cursor-not-allowed');
      submitButton.classList.add('bg-cyan-600', 'hover:bg-cyan-700');
    }, 3000);
  };
    
  // Array de Certificados
  const certificates = [
    {
      title: "Software Engineering - PROFESSIONAL DIPLOMA PROGRAM",
      issuer: "European Open University",
      date: "Setembro 23, 2024",
      link: "#",
      imageUrl: "/images/diploma.jpg"
    },
    {
      title: "Create a Lead Generation Messenger Chatbot using Chatfuel",
      issuer: "Coursera Project Network",
      date: "Agosto 20, 2024",
      link: "https://coursera.org/verify/8M05XMEJU265",
      imageUrl: "/images/coursera.jpg"
    },
    {
      title: "Fundamentos do Python 1",
      issuer: "Cisco Networking Academy",
      date: "Dezembro 02, 2024",
      link: "#",
      imageUrl: "/images/python_cisco.jpg"
    },
    {
      title: "Odoo Functional Certification - SAMPLE",
      issuer: "Odoo S.A.",
      date: "Março 07, 2025",
      link: "#",
      imageUrl: "/images/odoo.jpg"
    },
    {
      title: "Odoo DevOps Crash Course",
      issuer: "Udemy",
      date: "Outubro 31, 2025",
      link: "ude.my/UC-047c5f07-8b94-45ed-981e-5e5ee4f31702",
      imageUrl: "/images/Devs.jpg",
    },
  ];

  // Adicione seus projetos aqui
  const projects = [
    {
      title: "KzEduca APP",
      description: "Uma app para educação financeira, focado no mercado Angolano, com o objectivo de resolver problemas de Finança pessoal e empresarial.",
      imageUrl: "images/Kz.png",
      tags: ["Flutter", "Dart", "Farebase"],
      githubUrl: "https://github.com/Gelson-do-Souto/KzEduca-app"
    },
    {
      title: "Gson Creativity Site",
      description: "Focado para uma empresa de prestação de serviços.",
      imageUrl: "images/Gson.png",
      tags: ["Html", "CSS", "JavaSript"],
      githubUrl: "https://github.com/Gelson-do-Souto/Site_Gson_Creativity",
      demoUrl: "https://gson-creativity.vercel.app/"
    },
    {
      title: "Modulo de Localização - Odoo",
      description: "Focados nos planos de contas Angolano, as Taxas e Localização. E maisssssss....",
      imageUrl: "images/projecto.png",
      tags: ["Python", "XML", "PostgreSQL", "CSV"],
    },
    {
      title: "Nany App",
      description: "Uma rede Social. Feito por Hobby.",
      imageUrl: "images/nan.png",
      tags: ["Flutter", "Dart", "Farebase", "Python"],
      githubUrl: "https://github.com/Gelson-do-Souto/App_nany",
      demoUrl: "#"
    },
  ];

  // Duplicar a lista de projetos e certificados para o carrossel infinito
  const duplicatedProjects = [...projects, ...projects];
  const duplicatedCertificates = [...certificates, ...certificates];

  const skillCategories = [
    {
      id: 'languages',
      name: 'Linguagens',
      icon: <Terminal size={20} />,
      color: 'text-green-400', // Mudei para green para mais "terminal"
      skills: [
        'Python (Django, Flask)',
        'Node.js (Express)',
        'Java (Spring Boot)',
        'Go',
        'PHP (Laravel)'
      ]
    },
    {
      id: 'databases',
      name: 'Bancos de Dados',
      icon: <Database size={20} />,
      color: 'text-yellow-400',
      skills: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'Redis'
      ]
    },
    {
      id: 'cloud-devops',
      name: 'Cloud & DevOps',
      icon: <Cloud size={20} />,
      color: 'text-cyan-400',
      skills: [
        'AWS',
        'Docker',
        'Kubernetes',
        'CI/CD'
      ]
    },
    {
      id: 'apis',
      name: 'APIs',
      icon: <GitBranch size={20} />,
      color: 'text-pink-400',
      skills: [
        'RESTful APIs',
        'GraphQL'
      ]
    }
  ];

  return (
    // Aplicamos a fonte mono a toda a aplicação e cores de terminal
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      
      {/* --- EFEITO: Scanline/CRT Overlay --- */}
      <div className="scanline-overlay"></div>

      {/* Background Video (mantido, mas estilizado para ser mais escuro) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video-terminal" // Nova classe para escurecer o vídeo
      >
        <source src="/images/video.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Custom Mouse Follower (ajustado para um "cursor" mais simples) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-green-400 opacity-0 transition-all duration-150 ease-out mix-blend-screen shadow-green-400/80 cursor-terminal-glow"
        style={{ width: '8px', height: '8px', filter: 'blur(1px)', transitionDuration: '150ms' }}
      ></div>

      {/* Navigation Bar - Mais terminal/sólida */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-90 backdrop-blur-sm p-4 border-b border-green-600 shadow-xl shadow-green-900/50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-green-400 tracking-wider">
            $ Gelson <span className="text-gray-500">_</span>
          </div>
          <ul className="flex space-x-2 sm:space-x-4">
            {/* Componente de navegação mais simples e sólido */}
            {['home', 'about', 'projects', 'certificates', 'contact'].map(id => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-1 p-2 rounded-none transition-all duration-150 border-b-2 
                    ${activeSection === id 
                      ? 'text-green-400 border-green-400 bg-gray-900/50' 
                      : 'text-gray-400 border-transparent hover:text-green-300 hover:border-green-600'
                    }`}
                >
                  {id === 'home' && <Home size={18} />}
                  {id === 'about' && <User size={18} />}
                  {id === 'projects' && <Code size={18} />}
                  {id === 'certificates' && <Award size={18} />}
                  {id === 'contact' && <Mail size={18} />}
                  <span className="hidden md:inline capitalize">{id === 'home' ? 'Início' : id === 'about' ? 'Sobre' : id === 'projects' ? 'Projetos' : id === 'certificates' ? 'Certificados' : 'Contato'}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="pt-20"> {/* Padding top to account for fixed nav */}
        
        {/* Home Section */}
        <motion.section
          id="home"
          className="h-screen flex items-center justify-center text-center p-4 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5 }} // Transição mais lenta para simular a carga
        >
          <div className="max-w-4xl border-2 border-green-600 p-8 bg-black/50 backdrop-blur-sm shadow-xl shadow-green-900/30">
            <p className="text-sm text-green-500 mb-2">
              <span className="text-pink-400">root@portifolio</span>:<span className="text-cyan-400">/home/backend-dev</span>$
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              <span className="text-green-400 text-shadow-terminal">
                <AnimatedText text="[SYSTEM_ONLINE]" delay={70} />
              </span>
              <br/>
              A Developer Backend is here
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 font-mono">
              <span className="font-semibold text-green-300">$ Welcome!</span> Construindo infraestruturas robustas desde 20XX.
            </p>
            <div className="flex justify-center space-x-6">
              <motion.a
                href="#projects"
                onClick={() => scrollToSection('projects')}
                className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-5 transition-transform transform border border-green-400 terminal-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                $ execute: 'Projetos'
              </motion.a>
              <motion.a
                href="#contact"
                onClick={() => scrollToSection('contact')}
                className="border border-green-600 text-green-400 hover:bg-green-700 hover:text-black font-bold py-2 px-5 transition-transform transform terminal-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                $ call: 'Contato'
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-20 bg-gray-950 p-4 border-t border-b border-green-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto max-w-4xl border-2 border-green-600 p-8 bg-black/70">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-10">
              <span className="text-cyan-400">&gt;</span> Sobre Mim <span className="text-cyan-400">&lt;</span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-start md:space-x-10">
              <motion.div
                className="md:w-1/3 mb-8 md:mb-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {/* Imagem com filtro monocromático para tema terminal */}
                <img
                  src="/images/ICONE.png"
                  alt="Gelson do Souto"
                  className="rounded-none w-64 h-64 object-cover mx-auto border-2 border-green-500 filter grayscale contrast-120 hover:filter-none transition-filter duration-500"
                />
              </motion.div>
              <motion.div
                className="md:w-2/3 text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <p className="mb-4">
                  <span className="text-green-300"># Perfil:</span> Sou um desenvolvedor backend com 3 anos de experiência em sistemas robustos e escaláveis. Minha paixão é otimizar performance e garantir a segurança dos dados.
                </p>

                {/* Skills/Habilidades Section - Tabbed Interface */}
                <div className="mt-8">
                  <div className="flex flex-wrap justify-center gap-2 mb-6 border-b border-green-700 pb-2">
                    {skillCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setActiveSkillCategory(category.id)}
                        className={`flex items-center space-x-1 px-4 py-1 rounded-none font-bold text-sm border-2 transition-all duration-150 
                          ${activeSkillCategory === category.id
                            ? `bg-green-600 text-black border-green-400 ${category.color} shadow-lg shadow-green-700/50`
                            : 'bg-black text-gray-400 border-green-900 hover:text-green-400 hover:border-green-600'
                          }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {category.icon}
                        <span>{category.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    className="bg-black p-5 rounded-none border-2 border-green-800 shadow-inner shadow-green-900/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold text-green-400 mb-3">
                      $ {skillCategories.find(cat => cat.id === activeSkillCategory)?.name} <span className="animate-pulse">_</span>
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                      {skillCategories.find(cat => cat.id === activeSkillCategory)?.skills.map((skill, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm">
                          <span className="text-green-400">$</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
                
                <p className="mt-8">
                  <span className="text-green-300"># Status:</span> Sempre em busca do próximo desafio de arquitetura e das melhores práticas de DevOps.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section with Carousel - Ajuste para estética terminal */}
        <motion.section
          id="projects"
          className="py-20 bg-black p-4 border-t border-b border-green-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-10">
              $ cat /Projects/List <span className="animate-pulse">_</span>
            </h2>
            <div className="relative w-full overflow-hidden border-2 border-green-600 p-4 bg-gray-900/50">
              {/* Ajuste de animação para ser menos suave e mais "digital" */}
              <div
                className="flex space-x-8 animate-scroll-terminal" // Nova classe de animação
                style={{ animationDuration: `${projects.length * 5}s` }} // Velocidade ajustada
              >
                {duplicatedProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-80 bg-black/80 rounded-none border border-green-700 overflow-hidden transform hover:scale-[1.01] transition-transform duration-150 shadow-lg shadow-green-900/50"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-40 object-cover border-b border-green-700 filter grayscale-80 contrast-150"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-green-300 mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-3 text-sm">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-green-900 text-green-300 text-xs px-2 py-0.5 rounded-none border border-green-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end space-x-3">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 text-sm">
                            <Github size={16} />
                            <span>Código</span>
                          </a>
                        )}
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 text-sm">
                            <ExternalLink size={16} />
                            <span>Deploy</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Certificates Section with Carousel */}
        <motion.section
          id="certificates"
          className="py-20 bg-gray-950 p-4 border-t border-b border-green-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-10">
              $ ls /Certificates <span className="animate-pulse">_</span>
            </h2>
            <div className="relative w-full overflow-hidden border-2 border-green-600 p-4 bg-black/70">
              <div
                className="flex space-x-8 animate-scroll-terminal"
                style={{ animationDuration: `${certificates.length * 6}s` }}
              >
                {duplicatedCertificates.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-80 bg-black/80 rounded-none border border-green-700 overflow-hidden transform hover:scale-[1.01] transition-transform duration-150 shadow-lg shadow-green-900/50"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-40 object-cover object-top border-b border-green-700 filter grayscale-80 contrast-150"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-green-300 mb-2">{cert.title}</h3>
                      <p className="text-gray-400 text-sm mb-1">Emitido: <span className="font-semibold text-gray-300">{cert.issuer}</span></p>
                      <p className="text-gray-400 text-sm mb-4">Data: <span className="font-semibold text-gray-300">{cert.date}</span></p>
                      {cert.link && cert.link !== '#' && (
                        <div className="flex justify-end">
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 text-sm">
                            <ExternalLink size={16} />
                            <span>Ver Ficheiro</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-20 bg-black p-4 border-t border-green-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto max-w-2xl relative">
            <h2 className="text-3xl font-bold text-center text-green-400 mb-10">
              $ ssh Gelson-do-Souto@contact <span className="animate-pulse">_</span>
            </h2>
            <motion.div
              className="bg-black rounded-none border-2 border-green-600 p-8 md:p-10 shadow-xl shadow-green-900/50"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-gray-300 text-center mb-8 text-sm">
                <span className="text-green-300"># Enviar Pacote:</span> Utilize o formulário abaixo ou envie um telegrama digital.
              </p>
              {/* Usando o handler corrigido */}
              <form 
                ref={contactFormRef} 
                onSubmit={handleContactSubmit} 
                action="https://formspree.io/f/mjkonrvk" // MANTENHA O SEU LINK
                method="POST" 
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-green-400 text-sm font-bold mb-1">
                    Nome: <span className="text-gray-500">_</span>
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow appearance-none border border-green-700 rounded-none w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-1 focus:ring-green-400 bg-gray-900 input-terminal-glow"
                    placeholder="Nome de Utilizador"
                    required
                    transition={{ duration: 0.4, delay: 0.3 }}
                  />
                </div>
                <div>
                  <label htmlFor="_replyto" className="block text-green-400 text-sm font-bold mb-1">
                    Email: <span className="text-gray-500">_</span>
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="_replyto"
                    className="shadow appearance-none border border-green-700 rounded-none w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-1 focus:ring-green-400 bg-gray-900 input-terminal-glow"
                    placeholder="endereço@servidor.com"
                    required
                    transition={{ duration: 0.4, delay: 0.4 }}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-green-400 text-sm font-bold mb-1">
                    Mensagem: <span className="text-gray-500">_</span>
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="shadow appearance-none border border-green-700 rounded-none w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:ring-1 focus:ring-green-400 bg-gray-900 input-terminal-glow"
                    placeholder="Comando a ser executado..."
                    required
                    transition={{ duration: 0.4, delay: 0.5 }}
                  ></motion.textarea>
                </div>
                <div className="flex justify-center pt-4">
                  <motion.button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 transition-transform transform border border-green-400 terminal-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    $ run: Enviar Mensagem
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-6 text-center text-gray-500 text-xs border-t border-green-700">
        <div className="container mx-auto">
          <p>CMD: <span className="text-green-400">STATUS: OK</span> | Versão 1.0.0 (Terminal Mode)</p>
          <p>&copy; {new Date().getFullYear()} Gelson do Souto. Direitos de código reservados.</p>
          <div className="flex justify-center space-x-4 mt-3">
            <a
              href="https://www.linkedin.com/in/gelson-do-souto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/Gelson-do-Souto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* --- Global Styles for Terminal Aesthetic --- */}
      <style>{`
        /* 1. Importação de Fontes */
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
        
        /* 2. Aplicação da Fonte Monospace */
        .font-mono, .bg-black {
            font-family: 'Roboto Mono', monospace !important;
        }

        /* 3. Efeitos de Terminal */
        @keyframes fadeInChar {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeInChar {
            animation: fadeInChar 0.1s forwards;
        }

        /* Efeito de brilho para texto/elementos-chave */
        .text-shadow-terminal {
            text-shadow: 0 0 5px rgba(0, 255, 0, 0.7), 0 0 10px rgba(0, 255, 0, 0.5);
        }
        .cursor-terminal-glow {
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }
        .input-terminal-glow:focus {
            box-shadow: 0 0 0 2px #00FF00, 0 0 10px rgba(0, 255, 0, 0.5);
        }

        /* 4. Background Video Terminal Style (Escurecer/Contraste) */
        .background-video-terminal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -2;
            opacity: 0.1; /* Escurece bastante */
            filter: grayscale(100%) contrast(150%);
        }

        /* 5. EFEITO SCANLINE/GRELA CRT */
        .scanline-overlay {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 50; 
            /* Grid subtle para simular pixel art / terminal */
            background-image: 
                linear-gradient(to right, rgba(0, 255, 0, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 255, 0, 0.05) 1px, transparent 1px);
            background-size: 15px 15px;
            mix-blend-mode: overlay;
        }

        /* 6. Carrossel - Animação mais 'robótica' e com pausa no hover */
        @keyframes scroll-terminal {
            to {
                transform: translateX(calc(-50% - 16px)); /* 16px para space-x-8 */
            }
        }
        .animate-scroll-terminal {
            animation: scroll-terminal linear infinite;
        }
        .animate-scroll-terminal:hover {
            animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default App;
