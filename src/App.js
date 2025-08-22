import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// Lucide-react icons for a modern look
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

  // Mouse follower effect (inspired by hamzanaseem.vercel.app)
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

  // Contact form submission handler (agora apenas para feedback visual)
  const handleContactSubmit = (e) => {
    // Mantém o comportamento nativo de envio do formulário, mas adiciona feedback
    const submitButton = e.currentTarget.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'Enviando...';
    }

    // Este timeout simula o tempo de resposta do servidor
    setTimeout(() => {
      if (submitButton) {
        submitButton.textContent = 'Enviado!';
        submitButton.classList.add('bg-green-600');
        
        setTimeout(() => {
          submitButton.textContent = 'Enviar Mensagem';
          submitButton.classList.remove('bg-green-600');
          if (contactFormRef.current) {
            contactFormRef.current.reset();
          }
        }, 2000);
      }
    }, 1000);
  };
    
  // Array de Certificados
  const certificates = [
    {
      title: "Software Engineering - PROFESSIONAL DIPLOMA PROGRAM",
      issuer: "European Open University",
      date: "Setembro 23, 2024",
      link: "#",
      imageUrl: "/images/diploma.jpg" // Adicione a imagem do seu diploma
    },
    {
      title: "Create a Lead Generation Messenger Chatbot using Chatfuel",
      issuer: "Coursera Project Network",
      date: "Agosto 20, 2024",
      link: "https://coursera.org/verify/8M05XMEJU265",
      imageUrl: "/images/coursera.jpg" // Adicione a imagem do seu certificado da Coursera
    },
    {
      title: "Fundamentos do Python 1",
      issuer: "Cisco Networking Academy",
      date: "Dezembro 02, 2024",
      link: "#",
      imageUrl: "/images/python_cisco.jpg" // Adicione a imagem do seu certificado da Cisco
    },
    {
      title: "Odoo Functional Certification - SAMPLE",
      issuer: "Odoo S.A.",
      date: "Março 07, 2025", // Data de Conclusão do certificado da Odoo
      link: "#", // URL não disponível nos arquivos
      imageUrl: "/images/odoo.jpg" // Adicione a imagem do seu certificado da Odoo
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
      color: 'text-green-400',
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
      color: 'text-purple-400',
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
      color: 'text-blue-400',
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
      color: 'text-yellow-400',
      skills: [
        'RESTful APIs',
        'GraphQL'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-gray-100 font-inter relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src="/images/video.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Custom Mouse Follower */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 opacity-0 transition-all duration-100 ease-out mix-blend-screen shadow-glow"
        style={{ width: '25px', height: '25px', filter: 'blur(12px)' }}
      ></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-900 bg-opacity-90 backdrop-blur-sm p-4 shadow-2xl border-b border-cyan-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-cyan-400 font-mono tracking-wide">Gelson do Souto</div>
          <ul className="flex space-x-4 sm:space-x-6">
            <li>
              <button
                onClick={() => scrollToSection('home')}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeSection === 'home' ? 'text-cyan-400 bg-gray-700 shadow-lg border border-cyan-600' : 'text-gray-300 hover:text-cyan-300 hover:bg-gray-700'
                }`}
              >
                <Home size={20} />
                <span className="hidden sm:inline">Início</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeSection === 'about' ? 'text-cyan-400 bg-gray-700 shadow-lg border border-cyan-600' : 'text-gray-300 hover:text-cyan-300 hover:bg-gray-700'
                }`}
              >
                <User size={20} />
                <span className="hidden sm:inline">Sobre Mim</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('projects')}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeSection === 'projects' ? 'text-cyan-400 bg-gray-700 shadow-lg border border-cyan-600' : 'text-gray-300 hover:text-cyan-300 hover:bg-gray-700'
                }`}
              >
                <Code size={20} />
                <span className="hidden sm:inline">Projetos</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('certificates')}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeSection === 'certificates' ? 'text-cyan-400 bg-gray-700 shadow-lg border border-cyan-600' : 'text-gray-300 hover:text-cyan-300 hover:bg-gray-700'
                }`}
              >
                <Award size={20} />
                <span className="hidden sm:inline">Certificados</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeSection === 'contact' ? 'text-cyan-400 bg-gray-700 shadow-lg border border-cyan-600' : 'text-gray-300 hover:text-cyan-300 hover:bg-gray-700'
                }`}
              >
                <Mail size={20} />
                <span className="hidden sm:inline">Contato</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="pt-20"> {/* Padding top to account for fixed nav */}
        {/* Home Section */}
        <motion.section
          id="home"
          className="h-screen flex items-center justify-center text-center p-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
              Olá, eu sou <span className="text-cyan-400 text-shadow-neon">
                <AnimatedText text="Gelson do Souto" delay={70} />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-mono">
              <span className="font-semibold text-cyan-300">&gt;</span> Um <span className="font-semibold text-cyan-300">Desenvolvedor Backend</span> apaixonado por construir soluções robustas e escaláveis.
            </p>
            <div className="flex justify-center space-x-4">
              <motion.a
                href="#projects"
                onClick={() => scrollToSection('projects')}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 shadow-lg shadow-cyan-500/50 button-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Projetos
              </motion.a>
              <motion.a
                href="#contact"
                onClick={() => scrollToSection('contact')}
                className="border border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105 shadow-lg shadow-cyan-500/30 button-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Entrar em Contato
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          className="py-20 bg-gray-900 p-4 border-t border-b border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12">
              <AnimatedText text="Sobre Mim" delay={70} />
            </h2>
            <div className="flex flex-col md:flex-row md:items-start md:space-x-10">
              <motion.div
                className="md:w-1/3 mb-8 md:mb-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              >
                <img
                  src="/images/img.jpg"
                  alt="Gelson do Souto"
                  className="rounded-full w-64 h-64 object-cover mx-auto shadow-xl border-4 border-cyan-500 animate-pulse-border"
                />
              </motion.div>
              <motion.div
                className="md:w-2/3 text-lg text-gray-300 leading-relaxed font-mono"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              >
                <p className="mb-4">
                  <span className="text-cyan-300">&gt;</span> Sou um desenvolvedor backend com 3 anos de experiência na criação e manutenção de sistemas robustos e de alta performance. Minha paixão reside em resolver problemas complexos e otimizar processos para garantir a escalabilidade e a segurança das aplicações.
                </p>
                <p className="mb-4">
                  <span className="text-cyan-300">&gt;</span> Possuo proficiência nas principais linguagens e frameworks da área, incluindo:
                </p>

                {/* Skills/Habilidades Section - Tabbed Interface */}
                <div className="mt-8">
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {skillCategories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setActiveSkillCategory(category.id)}
                        className={`flex items-center space-x-2 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 button-glow ${
                          activeSkillCategory === category.id
                            ? `bg-cyan-600 text-white shadow-lg border border-cyan-600 ${category.color}`
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-cyan-300 border border-gray-700'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category.icon}
                        <span>{category.name}</span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-inner shadow-cyan-500/10 border border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                  >
                    <h3 className="text-xl font-semibold text-cyan-300 mb-4 text-shadow-neon">
                      {skillCategories.find(cat => cat.id === activeSkillCategory)?.name}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
                      {skillCategories.find(cat => cat.id === activeSkillCategory)?.skills.map((skill, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="text-cyan-400">&gt;</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
                {/* End Skills/Habilidades Section */}

                <p className="mt-8">
                  <span className="text-cyan-300">&gt;</span> Estou sempre em busca de novos desafios e oportunidades para aprender e aplicar as melhores práticas de desenvolvimento.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section with Carousel */}
        <motion.section
          id="projects"
          className="py-20 bg-gray-950 p-4 border-t border-b border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12">
              <AnimatedText text="Meus Projetos" delay={70} />
            </h2>
            <div className="relative w-full overflow-hidden">
              <div
                className="flex space-x-8 animate-scroll"
                style={{ animationDuration: `${projects.length * 8}s` }}
              >
                {duplicatedProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-80 bg-gray-800 rounded-lg shadow-xl shadow-purple-500/20 overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-purple-700 project-card-hover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover border-b border-gray-700"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-purple-300 mb-2 font-mono">{project.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-600 tag-glow">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end space-x-3">
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 hover:underline">
                            <Github size={20} />
                            <span className="font-mono">GitHub</span>
                          </a>
                        )}
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 hover:underline">
                            <ExternalLink size={20} />
                            <span className="font-mono">Demo</span>
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
          className="py-20 bg-gray-900 p-4 border-t border-b border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-purple-400 mb-12">
              <AnimatedText text="Meus Certificados" delay={70} />
            </h2>
            <div className="relative w-full overflow-hidden">
              <div
                className="flex space-x-8 animate-scroll"
                style={{ animationDuration: `${certificates.length * 8}s` }}
              >
                {duplicatedCertificates.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-80 bg-gray-800 rounded-lg shadow-xl shadow-purple-500/20 overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-purple-700 certificate-card-hover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                  >
                    {/* Adiciona a imagem do certificado */}
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-full h-48 object-cover object-top border-b border-gray-700"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-purple-300 mb-2 font-mono">{cert.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">Emitido por: <span className="font-semibold text-gray-300">{cert.issuer}</span></p>
                      <p className="text-gray-400 text-sm mb-4">Data: <span className="font-semibold text-gray-300">{cert.date}</span></p>
                      {cert.link && cert.link !== '#' && (
                        <div className="flex justify-end">
                          <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center space-x-1 hover:underline">
                            <ExternalLink size={18} />
                            <span className="font-mono">Ver Certificado</span>
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
          className="py-20 bg-gray-800 p-4 relative overflow-hidden border-t border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Subtle background animation */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 animate-gradientShift"></div>
          </div>

          <div className="container mx-auto max-w-2xl relative z-10">
            <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12">
              <AnimatedText text="Entre em Contato" delay={70} />
            </h2>
            <motion.div
              className="bg-gray-900 rounded-xl shadow-2xl shadow-cyan-500/30 p-8 md:p-12 border border-cyan-700 contact-form-border-glow"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-gray-300 text-center mb-8 text-lg font-mono">
                <span className="text-cyan-300">&gt;</span> Ficarei feliz em discutir novas oportunidades ou responder a quaisquer perguntas.
              </p>
              {/* ATENÇÃO: Substitua a URL abaixo pela sua URL do Formspree */}
              <form 
                ref={contactFormRef} 
                onSubmit={handleContactSubmit} 
                action="https://formspree.io/f/mjkonrvk" 
                method="POST" 
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2 font-mono">
                    Nome Completo <span className="text-cyan-400">_</span>
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-700 transition-all duration-300 input-focus-glow"
                    placeholder="Seu Nome"
                    required
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
                <div>
                  <label htmlFor="_replyto" className="block text-gray-300 text-sm font-bold mb-2 font-mono">
                    Email <span className="text-cyan-400">_</span>
                  </label>
                  {/* Formspree usa '_replyto' para o email de resposta */}
                  <motion.input
                    type="email"
                    id="email"
                    name="_replyto"
                    className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-700 transition-all duration-300 input-focus-glow"
                    placeholder="seu.email@exemplo.com"
                    required
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 text-sm font-bold mb-2 font-mono">
                    Mensagem <span className="text-cyan-400">_</span>
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows="6"
                    className="shadow appearance-none border border-gray-700 rounded-lg w-full py-3 px-4 text-gray-100 leading-tight focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-700 transition-all duration-300 input-focus-glow"
                    placeholder="Sua mensagem..."
                    required
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                  ></motion.textarea>
                </div>
                <div className="flex justify-center">
                  <motion.button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 button-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                  >
                    Enviar Mensagem
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 py-8 text-center text-gray-500 text-sm border-t border-cyan-700 font-mono">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Gelson do Souto. Todos os direitos reservados.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://www.linkedin.com/in/gelson-do-souto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/Gelson-do-Souto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </footer>

      {/* Global Styles (Tailwind CSS is assumed to be available) */}
      <style>{`
        /* Font import for Inter and Roboto Mono (for hacker aesthetic) */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Roboto+Mono:wght@400;500;700&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .font-mono {
          font-family: 'Roboto Mono', monospace;
        }

        /* Custom Animations */
        @keyframes fadeInChar {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInChar {
          animation: fadeInChar 0.5s ease-out forwards;
        }

        @keyframes pulse-border {
          0% {
            box-shadow: 0 0 0 0px rgba(6, 182, 212, 0.7);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(6, 182, 212, 0);
          }
          100% {
            box-shadow: 0 0 0 0px rgba(6, 182, 212, 0);
          }
        }

        .animate-pulse-border {
          animation: pulse-border 2s infinite ease-out;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradientShift {
          background-size: 200% 200%;
          animation: gradientShift 10s ease-in-out infinite;
        }

        /* Hover effects with pseudo-elements */
        .project-card-hover:hover {
          box-shadow: 0 20px 25px -5px rgb(168 85 247 / 0.5), 0 8px 10px -6px rgb(168 85 247 / 0.5);
        }

        .certificate-card-hover:hover {
          box-shadow: 0 20px 25px -5px rgb(168 85 247 / 0.5), 0 8px 10px -6px rgb(168 85 247 / 0.5);
        }

        .tag-glow {
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
        }

        .button-glow:hover {
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.8), 0 0 10px rgba(6, 182, 212, 0.5);
        }

        /* Custom scroll animation for carousels */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 16px)); /* 50% for one set, 16px for half of the space */
          }
        }

        .animate-scroll {
          animation: scroll linear infinite;
        }
        
        /* Video Background */
        .background-video {
          position: fixed;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          z-index: -1;
          transform: translate(-50%, -50%);
          filter: brightness(25%) blur(1px); /* Darken and blur the video */
        }

        /* Style for the Contact Form border glow on hover */
        @keyframes contactFormGlow {
          from {
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.1);
          }
          to {
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2);
          }
        }

        .contact-form-border-glow:hover {
          animation: contactFormGlow 1.5s infinite alternate;
        }
        
        /* Input field glow on focus */
        .input-focus-glow:focus {
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.6), 0 0 5px rgba(6, 182, 212, 0.4);
        }
      `}</style>
    </div>
  );
};

export default App;
