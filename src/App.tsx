/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
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
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex flex-col">
            <span className={`font-display font-bold text-xl tracking-tight ${scrolled ? 'text-primary-800' : 'text-primary-900'}`}>DR. HONÓRIO ONOFRE</span>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${scrolled ? 'text-slate-500' : 'text-slate-600'}`}>Cirurgião Especialista</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${scrolled ? 'text-slate-600' : 'text-slate-700'}`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-primary-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-800 transition-all shadow-md hover:shadow-lg"
            >
              Agendar Consulta
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 md:hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-slate-600 font-medium hover:text-primary-600 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href="#contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-primary-700 text-white px-6 py-3 rounded-xl text-center font-semibold"
                >
                  Agendar Consulta
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <img 
            src="https://picsum.photos/seed/medical-surgery/1920/1080?blur=2" 
            alt="Hospital Moderno" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-800 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Excelência em Cirurgia
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-6">
              Dr. Honório Onofre de Medeiro Júnior
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Cirurgia Geral | Cirurgia Laparoscópica | Cirurgia de Fígado e Vias Biliares
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Agendar Consulta
                <ChevronRight size={20} />
              </a>
              <a 
                href="#specialties" 
                className="bg-white text-primary-800 border border-primary-100 px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-50 transition-all shadow-sm flex items-center justify-center"
              >
                Conheça os Serviços
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-slate-400"
        >
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-300 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-100 rounded-2xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-slate-100 rounded-2xl -z-10" />
              <img 
                src="https://picsum.photos/seed/doctor-portrait/800/1000" 
                alt="Dr. Honório Onofre" 
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-600 p-3 rounded-lg text-white">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Registro Profissional</p>
                    <p className="text-slate-900 font-bold">CRM: 232.127 | RQE: 105.960</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold text-primary-600 uppercase tracking-[0.2em] mb-4">Sobre o Médico</h2>
              <h3 className="text-4xl font-display font-bold text-slate-900 mb-8 leading-tight">
                Dedicação e Tecnologia para sua Saúde
              </h3>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  O Dr. Honório Onofre de Medeiro Júnior é médico especialista em cirurgia geral e procedimentos minimamente invasivos, com atuação nas áreas do fígado, vesícula biliar e aparelho digestivo.
                </p>
                <p>
                  Com anos de experiência e constante atualização em técnicas cirúrgicas avançadas, seu foco está em proporcionar tratamentos precisos e uma recuperação ágil para seus pacientes.
                </p>
                <p>
                  Acredita em um atendimento humanizado, onde a tecnologia de ponta se une ao cuidado individualizado para garantir os melhores resultados em cada procedimento.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-3xl font-display font-bold text-primary-700 mb-1">15+</p>
                  <p className="text-sm text-slate-500 font-medium">Anos de Experiência</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-primary-700 mb-1">5k+</p>
                  <p className="text-sm text-slate-500 font-medium">Procedimentos Realizados</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-primary-600 uppercase tracking-[0.2em] mb-4">Especialidades</h2>
            <h3 className="text-4xl font-display font-bold text-slate-900 mb-6">Áreas de Atuação Especializada</h3>
            <p className="text-slate-600 text-lg">
              Tratamentos avançados para patologias do sistema digestivo e órgãos anexos, utilizando as melhores práticas da medicina moderna.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Cirurgia do Fígado', 
                desc: 'Procedimentos complexos e transplante hepático.', 
                icon: <Activity className="w-8 h-8" />,
                items: ['Transplante hepático', 'Ressecções tumorais']
              },
              { 
                title: 'Vesícula Biliar', 
                desc: 'Tratamento cirúrgico de cálculos e inflamações.', 
                icon: <Syringe className="w-8 h-8" />,
                items: ['Colecistectomia', 'Vias biliares']
              },
              { 
                title: 'Pâncreas', 
                desc: 'Cirurgias oncológicas e tratamentos de pancreatite.', 
                icon: <Microscope className="w-8 h-8" />,
                items: ['Duodenopancreatectomia', 'Cistos']
              },
              { 
                title: 'Doenças do Fígado', 
                desc: 'Tratamento clínico e acompanhamento de hepatopatias.', 
                icon: <HeartPulse className="w-8 h-8" />,
                items: ['Esteatose', 'Cirrose', 'Hepatites']
              }
            ].map((spec, index) => (
              <motion.div 
                key={spec.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className="bg-primary-50 text-primary-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {spec.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{spec.title}</h4>
                <p className="text-slate-500 mb-6 text-sm">{spec.desc}</p>
                <ul className="space-y-2">
                  {spec.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
            <h4 className="text-2xl font-bold text-slate-900 mb-8 text-center">Tratamento de Doenças do Fígado</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                'Esteatose Hepática',
                'Fibrose Hepática',
                'Cirrose Hepática',
                'Hepatite Viral',
                'Hepatite Autoimune',
                'Hepatocarcinoma'
              ].map((disease) => (
                <div key={disease} className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary-50 transition-colors">
                    <Dna size={20} className="text-slate-400 group-hover:text-primary-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{disease}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section id="procedures" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-primary-600 uppercase tracking-[0.2em] mb-4">Procedimentos</h2>
              <h3 className="text-4xl font-display font-bold text-slate-900">Cirurgias e Técnicas Avançadas</h3>
            </div>
            <p className="text-slate-500 max-w-sm">
              Utilizamos as tecnologias mais recentes para garantir procedimentos seguros e minimamente invasivos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Hérnias', img: 'https://picsum.photos/seed/hernia/600/400' },
              { title: 'Vesícula Biliar', img: 'https://picsum.photos/seed/gallbladder/600/400' },
              { title: 'Aparelho Digestivo', img: 'https://picsum.photos/seed/digestive/600/400' },
              { title: 'Minimamente Invasivas', img: 'https://picsum.photos/seed/minimally-invasive/600/400' },
            ].map((proc, index) => (
              <motion.div 
                key={proc.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={proc.img} 
                  alt={proc.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h4 className="text-xl font-bold text-white mb-2">{proc.title}</h4>
                  <div className="flex items-center gap-2 text-primary-400 font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Saiba Mais <ChevronRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section id="differentials" className="py-24 bg-primary-900 text-white overflow-hidden relative">
        <motion.div 
          style={{ y: diffBgY }}
          className="absolute top-0 right-0 w-1/2 h-full opacity-10"
        >
          <img 
            src="https://picsum.photos/seed/tech-medical/1000/1000" 
            alt="Tecnologia" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-primary-400 uppercase tracking-[0.2em] mb-4">Diferenciais</h2>
              <h3 className="text-4xl font-display font-bold mb-8 leading-tight">
                Por que escolher o Dr. Honório Onofre?
              </h3>
              
              <div className="space-y-8">
                {[
                  { title: 'Atendimento Humanizado', desc: 'Foco total no bem-estar e acolhimento do paciente.', icon: <HeartPulse /> },
                  { title: 'Técnicas Minimamente Invasivas', desc: 'Menos dor, cicatrizes menores e recuperação rápida.', icon: <Stethoscope /> },
                  { title: 'Segurança e Precisão', desc: 'Protocolos rigorosos e tecnologia cirúrgica de ponta.', icon: <ShieldCheck /> },
                  { title: 'Estrutura Moderna', desc: 'Atuação nos melhores hospitais com suporte completo.', icon: <Activity /> },
                ].map((item, index) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="bg-white/10 p-4 rounded-2xl text-primary-400 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-primary-100/70 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-12 rounded-[40px] border border-white/10"
              >
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <div className="bg-white/10 p-8 rounded-3xl">
                      <Clock className="text-primary-400 mb-4" size={32} />
                      <p className="text-2xl font-bold">Recuperação</p>
                      <p className="text-primary-200 text-sm">Mais rápida e segura</p>
                    </div>
                    <div className="bg-primary-600 p-8 rounded-3xl">
                      <CheckCircle2 className="text-white mb-4" size={32} />
                      <p className="text-2xl font-bold">Precisão</p>
                      <p className="text-white/80 text-sm">Alta tecnologia</p>
                    </div>
                  </div>
                  <div className="pt-12 space-y-8">
                    <div className="bg-white/10 p-8 rounded-3xl">
                      <ShieldCheck className="text-primary-400 mb-4" size={32} />
                      <p className="text-2xl font-bold">Segurança</p>
                      <p className="text-primary-200 text-sm">Protocolos internacionais</p>
                    </div>
                    <div className="bg-white/10 p-8 rounded-3xl">
                      <HeartPulse className="text-primary-400 mb-4" size={32} />
                      <p className="text-2xl font-bold">Cuidado</p>
                      <p className="text-primary-200 text-sm">Humanizado</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm font-bold text-primary-600 uppercase tracking-[0.2em] mb-4">Contato</h2>
              <h3 className="text-4xl font-display font-bold text-slate-900 mb-8">Agende sua Consulta</h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Endereço</h4>
                    <p className="text-slate-600">Av. das Américas, 500 - Bloco 4, Sala 201<br />Barra da Tijuca, Rio de Janeiro - RJ</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Telefone</h4>
                    <p className="text-slate-600">(21) 3456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Horário de Atendimento</h4>
                    <p className="text-slate-600">Segunda a Sexta: 08:00 às 18:00</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://wa.me/5521999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <MessageCircle size={24} />
                Agendar via WhatsApp
              </a>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 shadow-sm"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nome Completo</label>
                    <input 
                      type="text" 
                      placeholder="Seu nome"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Telefone</label>
                    <input 
                      type="tel" 
                      placeholder="(00) 00000-0000"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mensagem</label>
                  <textarea 
                    rows={4}
                    placeholder="Como podemos ajudar?"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all resize-none"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-primary-700 text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Enviar Mensagem
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <a href="#home" className="flex flex-col mb-6">
                <span className="font-display font-bold text-2xl tracking-tight">DR. HONÓRIO ONOFRE</span>
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-slate-400">Cirurgião Especialista</span>
              </a>
              <p className="text-slate-400 max-w-sm mb-6">
                Especialista em Cirurgia Geral, Laparoscópica e de Fígado e Vias Biliares. Atendimento humanizado e tecnologia de ponta.
              </p>
              <p className="text-sm font-bold text-primary-400">CRM: 232.127 | RQE: 105.960</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Links Rápidos</h4>
              <ul className="space-y-4 text-slate-400">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-primary-400 transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <Mail size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
            <p>© 2026 Dr. Honório Onofre de Medeiro Júnior — Todos os direitos reservados</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
