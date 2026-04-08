/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { 
  Stethoscope, 
  Activity, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Menu, 
  X, 
  MessageCircle,
  Syringe,
  Microscope,
  HeartPulse,
  Dna,
  CheckCircle2,
  Navigation,
  Instagram,
  Linkedin,
  Facebook,
  Loader2
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setFormStatus('loading');

    try {
      // Note: These IDs should be configured in EmailJS dashboard
      const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || 'service_default';
      const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || 'template_default';
      const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

      if (!publicKey) {
        throw new Error('EmailJS Public Key is missing');
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      
      setFormStatus('success');
      formRef.current.reset();
      
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  const diffBgY = useTransform(scrollYProgress, [0.4, 0.8], [-50, 50]);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Especialidades', href: '#specialties' },
    { name: 'Procedimentos', href: '#procedures' },
    { name: 'Diferenciais', href: '#differentials' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled 
            ? 'py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-white/20' 
            : 'py-6 bg-transparent'
        }`}
      >
        {/* Animated Background Lighting Effect */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-50/30 via-white/40 to-medical-50/30" />
          
          {/* Soft Glow Animation */}
          <motion.div 
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.1, 1],
              x: ['-10%', '10%', '-10%']
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-[-50%] left-[20%] w-[60%] h-[200%] bg-accent-400/10 blur-[100px] rounded-full pointer-events-none"
          />
        </div>

        <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
          <a href="#home" className="flex flex-col group">
            <span className="font-display font-bold text-xl tracking-tight text-medical-900 group-hover:text-accent-600 transition-colors duration-500">
              DR. HONÓRIO ONOFRE
            </span>
            <span className={`text-[9px] uppercase tracking-[0.3em] font-bold transition-all duration-500 ${scrolled ? 'text-accent-500' : 'text-medical-500'}`}>
              Cirurgião Especialista
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="relative px-5 py-2 text-[13px] font-bold text-medical-600 hover:text-accent-600 transition-all duration-300 tracking-wide group"
              >
                <span className="relative z-10">{link.name}</span>
                <motion.span 
                  className="absolute inset-0 bg-medical-50/50 rounded-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="navHover"
                />
              </a>
            ))}
            <div className="pl-4">
              <a 
                href="#contact" 
                className="bg-medical-900 text-white px-8 py-3 rounded-full text-[13px] font-bold hover:bg-accent-600 transition-all duration-500 shadow-lg shadow-medical-900/10 hover:shadow-accent-500/20 active:scale-95"
              >
                Agendar Consulta
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-medical-900 p-2 relative z-50" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-medical-100 md:hidden overflow-hidden z-40 pt-24"
            >
              <div className="flex flex-col p-8 space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-bold text-medical-900 hover:text-accent-600 transition-colors py-2 border-b border-medical-50 last:border-0"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-6 bg-medical-900 text-white p-5 rounded-2xl text-center font-bold text-lg shadow-xl shadow-medical-900/20"
                >
                  Agendar Consulta
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-medical-50">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-medical-50/20 via-white/40 to-white z-10" />
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920" 
            alt="Ambiente Médico Moderno" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-5 py-1.5 bg-accent-50 text-accent-700 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase mb-8"
            >
              Excelência e Inovação Cirúrgica
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-display font-bold text-medical-900 leading-[1.05] mb-8 tracking-tight">
              Dr. Honório <br className="hidden md:block" /> Onofre
            </h1>
            <p className="text-lg md:text-2xl text-medical-600 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
              Cirurgia Geral, Laparoscópica e Especialista em Fígado e Vias Biliares.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a 
                href="#contact" 
                className="bg-medical-900 text-white px-10 py-4 rounded-full text-base font-bold hover:bg-accent-600 transition-all duration-500 shadow-xl hover:shadow-accent-500/20 flex items-center justify-center gap-3 active:scale-95"
              >
                Agendar Consulta
                <ChevronRight size={18} />
              </a>
              <a 
                href="#specialties" 
                className="glass text-medical-800 px-10 py-4 rounded-full text-base font-bold hover:bg-white transition-all duration-500 flex items-center justify-center active:scale-95"
              >
                Ver Especialidades
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-[26px] h-[42px] border-2 border-medical-200 rounded-full flex justify-center p-1.5"
          >
            <div className="w-1 h-1.5 bg-medical-300 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-accent-50 rounded-full blur-3xl opacity-60 -z-10" />
              <div className="relative overflow-hidden rounded-apple-lg shadow-2xl group">
                <img 
                  src="input_file_0.png" 
                  alt="Dr. Honório Onofre" 
                  className="w-full object-cover aspect-[4/5] object-top scale-105 group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 glass p-8 m-6 rounded-apple shadow-lg">
                  <div className="flex items-center gap-5">
                    <div className="bg-medical-900 p-3.5 rounded-2xl text-white shadow-lg">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-medical-500 uppercase tracking-widest mb-0.5">Registro Profissional</p>
                      <p className="text-medical-900 font-bold text-lg">CRM 232.127 | RQE 105.960</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] font-bold text-accent-600 uppercase tracking-[0.3em] mb-6 block">Trajetória e Dedicação</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-medical-900 mb-10 leading-tight tracking-tight">
                Medicina de Precisão com <br /> Foco no Ser Humano
              </h2>
              <div className="space-y-8 text-medical-600 leading-relaxed text-lg font-medium">
                <p>
                  O Dr. Honório Onofre de Medeiro Júnior é referência em cirurgia geral e procedimentos minimamente invasivos, com expertise em patologias complexas do fígado e vias biliares.
                </p>
                <p>
                  Sua prática clínica é pautada pela inovação tecnológica constante, buscando sempre as técnicas mais avançadas para garantir segurança máxima e recuperação acelerada.
                </p>
                <p>
                  Mais do que técnica, o Dr. Honório prioriza o acolhimento, entendendo que cada paciente é único e merece um plano de cuidado personalizado e transparente.
                </p>
              </div>
              
              <div className="mt-14 grid grid-cols-2 gap-12 border-t border-medical-100 pt-10">
                <div>
                  <p className="text-4xl font-display font-bold text-medical-900 mb-2 tracking-tighter">15+</p>
                  <p className="text-xs text-medical-500 font-bold uppercase tracking-widest">Anos de Experiência</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-medical-900 mb-2 tracking-tighter">5k+</p>
                  <p className="text-xs text-medical-500 font-bold uppercase tracking-widest">Cirurgias Realizadas</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-32 bg-medical-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[11px] font-bold text-accent-600 uppercase tracking-[0.3em] mb-6 block">Especialidades</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-medical-900 mb-8 tracking-tight">Áreas de Atuação</h2>
            <p className="text-medical-600 text-lg font-medium">
              Soluções cirúrgicas avançadas com foco em mínima invasão e máxima eficácia terapêutica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Cirurgia do Fígado', 
                desc: 'Tratamento de tumores, cistos e transplantes hepáticos.', 
                icon: <Activity className="w-7 h-7" />,
                items: ['Transplante hepático', 'Ressecções tumorais'],
                img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400'
              },
              { 
                title: 'Vesícula Biliar', 
                desc: 'Cirurgias para cálculos e doenças inflamatórias.', 
                icon: <Syringe className="w-7 h-7" />,
                items: ['Colecistectomia', 'Vias biliares'],
                img: 'https://images.unsplash.com/photo-1579154235602-3c2c2446117b?auto=format&fit=crop&q=80&w=400'
              },
              { 
                title: 'Pâncreas', 
                desc: 'Intervenções oncológicas e tratamentos complexos.', 
                icon: <Microscope className="w-7 h-7" />,
                items: ['Duodenopancreatectomia', 'Cistos'],
                img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=400'
              },
              { 
                title: 'Hepatologia', 
                desc: 'Acompanhamento clínico de doenças do fígado.', 
                icon: <HeartPulse className="w-7 h-7" />,
                items: ['Esteatose', 'Cirrose', 'Hepatites'],
                img: 'https://images.unsplash.com/photo-1505751172107-129658a2d716?auto=format&fit=crop&q=80&w=400'
              }
            ].map((spec, index) => (
              <motion.div 
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white p-0 rounded-apple shadow-sm border border-medical-100 hover:shadow-xl hover:shadow-medical-200/50 transition-all duration-500 group overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={spec.img} 
                    alt={spec.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-10">
                  <div className="bg-medical-50 text-accent-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-medical-900 group-hover:text-white transition-all duration-500 shadow-sm">
                    {spec.icon}
                  </div>
                  <h4 className="text-xl font-bold text-medical-900 mb-4 tracking-tight">{spec.title}</h4>
                  <p className="text-medical-500 mb-8 text-sm leading-relaxed font-medium">{spec.desc}</p>
                  <ul className="space-y-3">
                    {spec.items.map(item => (
                      <li key={item} className="flex items-center gap-3 text-[11px] font-bold text-medical-700 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-white p-12 rounded-apple-lg shadow-sm border border-medical-100"
          >
            <h4 className="text-2xl font-bold text-medical-900 mb-12 text-center tracking-tight">Tratamento de Doenças Hepáticas</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                'Esteatose Hepática',
                'Fibrose Hepática',
                'Cirrose Hepática',
                'Hepatite Viral',
                'Hepatite Autoimune',
                'Hepatocarcinoma'
              ].map((disease) => (
                <div key={disease} className="flex flex-col items-center text-center group cursor-default">
                  <div className="w-14 h-14 bg-medical-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent-50 transition-all duration-500">
                    <Dna size={22} className="text-medical-400 group-hover:text-accent-600 transition-colors" />
                  </div>
                  <span className="text-[11px] font-bold text-medical-600 uppercase tracking-wider">{disease}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Procedures Section */}
      <section id="procedures" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold text-accent-600 uppercase tracking-[0.3em] mb-6 block">Procedimentos</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-medical-900 tracking-tight">Técnicas de Vanguarda</h3>
            </div>
            <p className="text-medical-500 max-w-sm text-lg font-medium leading-relaxed">
              Equipamentos de última geração para resultados superiores e menor trauma cirúrgico.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-6 bg-accent-50 rounded-apple-lg rotate-1 group-hover:rotate-0 transition-transform duration-700 -z-10" />
              <div className="relative overflow-hidden rounded-apple shadow-2xl border-[12px] border-white">
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200" 
                  alt="Equipe Cirúrgica em Centro Cirúrgico" 
                  className="w-full h-full object-cover aspect-square object-top scale-105 group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-900/40 to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-white font-display font-bold text-3xl tracking-tight">Excelência Cirúrgica</p>
                  <p className="text-accent-100 text-sm font-bold uppercase tracking-[0.2em] mt-1">Tecnologia e Precisão</p>
                </div>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { title: 'Hérnias', desc: 'Correção de hérnias inguinais e umbilicais com reforço de tela e mínima incisão.' },
                { title: 'Vesícula Biliar', desc: 'Colecistectomia laparoscópica: padrão ouro com rápida alta hospitalar.' },
                { title: 'Aparelho Digestivo', desc: 'Cirurgias de estômago e intestino com foco em oncologia e funcionalidade.' },
                { title: 'Minimamente Invasivas', desc: 'Vídeocirurgia avançada para menor dor pós-operatória e estética preservada.' },
              ].map((proc, index) => (
                <motion.div 
                  key={proc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-medical-50/50 p-8 rounded-apple border border-medical-100 hover:border-accent-200 hover:bg-white hover:shadow-xl hover:shadow-medical-200/30 transition-all duration-500"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle2 size={20} className="text-accent-600" />
                  </div>
                  <h4 className="text-lg font-bold text-medical-900 mb-3 tracking-tight">{proc.title}</h4>
                  <p className="text-medical-500 text-sm leading-relaxed font-medium">
                    {proc.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section id="differentials" className="py-32 bg-medical-900 text-white overflow-hidden relative">
        <motion.div 
          style={{ y: diffBgY }}
          className="absolute top-0 right-0 w-full h-full opacity-10"
        >
          <img 
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1920" 
            alt="Tecnologia Médica Avançada" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-[11px] font-bold text-accent-500 uppercase tracking-[0.3em] mb-6 block">Diferenciais</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-12 leading-tight tracking-tight">
                Por que confiar sua saúde <br /> ao Dr. Honório?
              </h3>
              
              <div className="space-y-10">
                {[
                  { title: 'Atendimento Humanizado', desc: 'Escuta ativa e acolhimento em todas as etapas do tratamento.', icon: <HeartPulse /> },
                  { title: 'Mínima Invasão', desc: 'Técnicas que priorizam a rápida recuperação e menor desconforto.', icon: <Stethoscope /> },
                  { title: 'Segurança Absoluta', desc: 'Protocolos internacionais de segurança do paciente e precisão cirúrgica.', icon: <ShieldCheck /> },
                  { title: 'Suporte Completo', desc: 'Acompanhamento pré e pós-operatório dedicado e transparente.', icon: <Activity /> },
                ].map((item, index) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex gap-8 group"
                  >
                    <div className="bg-white/5 p-5 rounded-2xl text-accent-500 shrink-0 group-hover:bg-accent-500 group-hover:text-white transition-all duration-500 border border-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3 tracking-tight">{item.title}</h4>
                      <p className="text-medical-200/60 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white/5 backdrop-blur-md p-16 rounded-apple-lg border border-white/10 shadow-2xl"
              >
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-10">
                    <div className="bg-white/5 p-10 rounded-apple border border-white/5 hover:bg-white/10 transition-colors duration-500">
                      <Clock className="text-accent-500 mb-6" size={36} />
                      <p className="text-2xl font-bold tracking-tight">Agilidade</p>
                      <p className="text-medical-300 text-xs font-bold uppercase tracking-widest mt-2">Alta precoce</p>
                    </div>
                    <div className="bg-accent-600 p-10 rounded-apple shadow-xl shadow-accent-600/20">
                      <CheckCircle2 className="text-white mb-6" size={36} />
                      <p className="text-2xl font-bold tracking-tight">Precisão</p>
                      <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-2">Tecnologia 4K</p>
                    </div>
                  </div>
                  <div className="pt-16 space-y-10">
                    <div className="bg-white/5 p-10 rounded-apple border border-white/5 hover:bg-white/10 transition-colors duration-500">
                      <ShieldCheck className="text-accent-500 mb-6" size={36} />
                      <p className="text-2xl font-bold tracking-tight">Segurança</p>
                      <p className="text-medical-300 text-xs font-bold uppercase tracking-widest mt-2">Risco Zero</p>
                    </div>
                    <div className="bg-white/5 p-10 rounded-apple border border-white/5 hover:bg-white/10 transition-colors duration-500">
                      <HeartPulse className="text-accent-500 mb-6" size={36} />
                      <p className="text-2xl font-bold tracking-tight">Cuidado</p>
                      <p className="text-medical-300 text-xs font-bold uppercase tracking-widest mt-2">Personalizado</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] font-bold text-accent-600 uppercase tracking-[0.3em] mb-6 block">Contato e Localização</span>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-medical-900 mb-10 tracking-tight">Agende sua Consulta</h3>
              <p className="text-medical-600 text-lg mb-12 font-medium leading-relaxed">
                Atendimento especializado em diversas cidades do Litoral Norte e Vale do Paraíba.
              </p>
              
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="bg-medical-50 p-4 rounded-2xl text-accent-600 group-hover:bg-medical-900 group-hover:text-white transition-all duration-500 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-medical-400 uppercase tracking-widest mb-1">Unidade Principal</p>
                    <p className="text-medical-900 font-bold text-lg">Casa de Saúde Stella Maris</p>
                    <p className="text-medical-500 font-medium">Av. Miguel Varlez 980, Caraguatatuba, SP</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="bg-medical-50 p-4 rounded-2xl text-accent-600 group-hover:bg-medical-900 group-hover:text-white transition-all duration-500 shadow-sm">
                    <Navigation size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-medical-400 uppercase tracking-widest mb-1">Outras Cidades de Atendimento</p>
                    <p className="text-medical-900 font-bold text-lg">Ubatuba, São Sebastião, Ilhabela</p>
                    <p className="text-medical-500 font-medium">Consulte locais específicos via WhatsApp</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <a href="tel:+5591988821349" className="bg-medical-50 p-4 rounded-2xl text-accent-600 group-hover:bg-medical-900 group-hover:text-white transition-all duration-500 shadow-sm">
                    <Phone size={24} />
                  </a>
                  <div>
                    <p className="text-xs font-bold text-medical-400 uppercase tracking-widest mb-1">Telefone e WhatsApp</p>
                    <a href="tel:+5591988821349" className="text-medical-900 font-bold text-lg hover:text-accent-600 transition-colors">+55 91 98882-1349</a>
                    <p className="text-medical-500 font-medium">Segunda a Sexta, das 08h às 18h</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <a href="mailto:dr.honoriomedeiro@gmail.com" className="bg-medical-50 p-4 rounded-2xl text-accent-600 group-hover:bg-medical-900 group-hover:text-white transition-all duration-500 shadow-sm">
                    <Mail size={24} />
                  </a>
                  <div>
                    <p className="text-xs font-bold text-medical-400 uppercase tracking-widest mb-1">E-mail Profissional</p>
                    <a href="mailto:dr.honoriomedeiro@gmail.com" className="text-medical-900 font-bold text-lg hover:text-accent-600 transition-colors">dr.honoriomedeiro@gmail.com</a>
                    <p className="text-medical-500 font-medium">Resposta em até 24h úteis</p>
                  </div>
                </div>
              </div>

              <motion.a 
                href="https://wa.me/5591988821349"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-14 inline-flex items-center gap-4 bg-[#25D366] text-white px-10 py-5 rounded-apple font-bold text-lg shadow-xl shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-500"
              >
                <MessageCircle size={24} />
                Agendar via WhatsApp
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-medical-50/50 p-12 rounded-apple-lg border border-medical-100 shadow-sm relative overflow-hidden"
            >
              <h4 className="text-2xl font-bold text-medical-900 mb-10 tracking-tight">Envie uma Mensagem</h4>
              
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h5 className="text-2xl font-bold text-medical-900 mb-4">Mensagem enviada!</h5>
                    <p className="text-medical-600 font-medium">Mensagem enviada com sucesso! Em breve entraremos em contato.</p>
                  </motion.div>
                ) : (
                  <form ref={formRef} className="space-y-8" onSubmit={handleFormSubmit}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-medical-400 uppercase tracking-widest ml-1">Nome Completo</label>
                        <input 
                          required
                          name="user_name"
                          type="text" 
                          placeholder="Seu nome"
                          className="w-full bg-white border border-medical-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all font-medium text-medical-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-medical-400 uppercase tracking-widest ml-1">Telefone</label>
                        <input 
                          required
                          name="user_phone"
                          type="tel" 
                          placeholder="(00) 00000-0000"
                          className="w-full bg-white border border-medical-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all font-medium text-medical-900"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-medical-400 uppercase tracking-widest ml-1">E-mail</label>
                      <input 
                        required
                        name="user_email"
                        type="email" 
                        placeholder="seu@email.com"
                        className="w-full bg-white border border-medical-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all font-medium text-medical-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-medical-400 uppercase tracking-widest ml-1">Mensagem</label>
                      <textarea 
                        required
                        name="message"
                        rows={4} 
                        placeholder="Como podemos ajudar?"
                        className="w-full bg-white border border-medical-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all font-medium text-medical-900 resize-none"
                      ></textarea>
                    </div>

                    {formStatus === 'error' && (
                      <p className="text-red-500 text-sm font-bold text-center">Ocorreu um erro ao enviar. Tente novamente mais tarde.</p>
                    )}

                    <motion.button 
                      disabled={formStatus === 'loading'}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-medical-900 text-white py-5 rounded-apple font-bold text-lg shadow-xl shadow-medical-900/20 hover:bg-medical-800 transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Enviando...
                        </>
                      ) : 'Enviar Mensagem'}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-medical-50/50 pt-24 pb-12 border-t border-medical-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-medical-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Activity size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-display font-bold text-medical-900 tracking-tight">Dr. Honório Onofre</h4>
                  <p className="text-[10px] font-bold text-accent-600 uppercase tracking-[0.3em]">Cirurgia Geral e Hepatologia</p>
                </div>
              </div>
              <p className="text-medical-500 max-w-sm leading-relaxed font-medium">
                Comprometido com a excelência médica e o cuidado humanizado, trazendo as mais avançadas técnicas cirúrgicas para o Litoral Norte.
              </p>
              <p className="text-sm font-bold text-accent-600 mt-6 tracking-widest">CRM 232.127 | RQE 105.960</p>
            </div>
            
            <div>
              <h5 className="text-sm font-bold text-medical-900 uppercase tracking-widest mb-8">Links Rápidos</h5>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-medical-500 hover:text-accent-600 transition-colors font-medium">{link.name}</a>
                  </li>
                ))}
                <li>
                  <a href="tel:+5591988821349" className="text-medical-500 hover:text-accent-600 transition-colors font-medium">+55 91 98882-1349</a>
                </li>
                <li>
                  <a href="mailto:dr.honoriomedeiro@gmail.com" className="text-medical-500 hover:text-accent-600 transition-colors font-medium">dr.honoriomedeiro@gmail.com</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-bold text-medical-900 uppercase tracking-widest mb-8">Redes Sociais</h5>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 bg-white border border-medical-100 rounded-2xl flex items-center justify-center text-medical-400 hover:text-accent-600 hover:border-accent-200 transition-all duration-500 shadow-sm">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-white border border-medical-100 rounded-2xl flex items-center justify-center text-medical-400 hover:text-accent-600 hover:border-accent-200 transition-all duration-500 shadow-sm">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-white border border-medical-100 rounded-2xl flex items-center justify-center text-medical-400 hover:text-accent-600 hover:border-accent-200 transition-all duration-500 shadow-sm">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-medical-100 flex flex-col md:flex-row justify-between items-center gap-8 text-medical-400 text-sm font-medium">
            <p>© 2026 Dr. Honório Onofre de Medeiro Júnior. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-accent-600 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-accent-600 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
