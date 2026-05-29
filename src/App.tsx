import { useState } from 'react';
import { 
  Instagram, 
  Youtube, 
  Send, 
  HelpCircle, 
  Briefcase, 
  Users, 
  Clock, 
  FileText, 
  BookOpen, 
  Clipboard, 
  Gauge, 
  Bookmark, 
  Award,
  Sparkles,
  Phone,
  Mail,
  CheckCircle,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Modular interactive components
import WeeklyPlanner from './components/WeeklyPlanner';
import ReviewQuiz from './components/ReviewQuiz';
import PerformanceDashboard from './components/PerformanceDashboard';
import MentorshipPlans from './components/MentorshipPlans';

import { TESTIMONIALS } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'planner' | 'quiz' | 'dashboard'>('planner');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick inquiry formulation for custom WhatsApp messages
  const handleContactWhatsApp = (serviceName: string, textMessage: string) => {
    const encodedMsg = encodeURIComponent(textMessage);
    const phoneNumber = "5531999999999"; // Fictional BH number requested
    const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMsg}`;
    window.open(waUrl, '_blank');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("contato@metodoaprovacaosocial.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const faqs = [
    {
      q: "Como funciona o acompanhamento individual na Mentoria?",
      a: "A mentoria individual é iniciada com uma sessão de diagnóstico de 60 minutos. A partir dela, o professor Marcos Vinícius estuda seu edital, seus horários e suas fraquezas cognitivas para desenhar um cronograma estratégico verticalizado. Você tem reuniões quinzenais ao vivo para ajuste de rumos."
    },
    {
      q: "O curso preparatório aborda discursivas?",
      a: "Sim! No Curso Preparatório Método Aprovação Social, temos um módulo completo ensinando as bases estruturais para fundamentar pareceres e laudos periciais de forma coerente com as exigências dos maiores examinadores públicos."
    },
    {
      q: "Estou começando do zero absoluto no Serviço Social. O Método serve para mim?",
      a: "Com certeza. O Método se diferencia por sua 'linguagem simples e objetiva', despida de jargões desnecessários, focando estritamente em simplificar conteúdos espinhosos para que você acerte a bolinha no gabarito."
    },
    {
      q: "Qual a diferença entre a mentoria e os simulados?",
      a: "Os Simulados são pacotes de fixação avançada prontos para baixar e cronometrar em casa. A Mentoria é o programa premium de acompanhamento próximo e estratégico individualizado junto ao Professor Marcos."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-650 selection:text-white antialiased">
      
      {/* Top Banner with Alert/Info */}
      <div className="bg-slate-950 text-white py-2 px-4 border-b border-slate-800 text-center text-xs font-medium tracking-tight">
        ✨ Vagas para Mentoria Individual de Junho estão com processo seletivo aberto! <button onClick={() => handleContactWhatsApp("Inscrições", "Olá Prof. Marcos! Quero participar do processo seletivo para as vagas de mentoria individual.")} className="underline text-indigo-300 font-bold hover:text-indigo-200 cursor-pointer">Candidatar-me na Lista de Espera →</button>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm" id="nav-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-650 text-white rounded-xl shadow-md flex items-center justify-center font-black tracking-tighter text-sm font-sans">
              MAS
            </span>
            <div>
              <span className="text-sm font-extrabold text-slate-900 tracking-tight block leading-none font-sans">
                Método Aprovação Social
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Mentoria Marcos Vinícius</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#about-section" className="hover:text-indigo-650 transition-colors">Sobre o Professor</a>
            <a href="#interactive-suite" className="hover:text-indigo-650 transition-colors">Estudo Interativo</a>
            <a href="#plans-section" className="hover:text-indigo-650 transition-colors bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100">Serviços & Planos</a>
            <a href="#testimonials-section" className="hover:text-indigo-650 transition-colors">Depoimentos</a>
            <a href="#faq-section" className="hover:text-indigo-650 transition-colors">Dúvidas</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-nav-primary-wa"
              onClick={() => handleContactWhatsApp("Geral", "Olá Prof. Marcos! Acessei seu site e gostaria de tirar dúvidas sobre as mentorias de Serviço Social.")}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm shadow-emerald-100 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-16 md:py-24 text-white relative overflow-hidden" id="hero-banner">
        {/* Background ambient details */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Serviço Social para Concursos
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans tracking-tight text-white leading-[1.1]">
              Estratégia, disciplina e prática para conquistar sua <span className="bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">aprovação.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-serif italic">
              “Sua aprovação começa com estratégia. Estude com direção e transforme esforço em resultado com quem já trilhou esse caminho.”
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-left">
              <div className="border-l-2 border-teal-400 pl-3">
                <div className="text-lg font-bold font-mono">8+ Anos</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mt-1">De Experiência</div>
              </div>
              <div className="border-l-2 border-teal-400 pl-3">
                <div className="text-lg font-bold font-mono">100%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mt-1">Foco Serviço Social</div>
              </div>
              <div className="border-l-2 border-teal-400 pl-3">
                <div className="text-lg font-bold font-mono">Linguagem</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mt-1">Simples & Objetiva</div>
              </div>
              <div className="border-l-2 border-teal-400 pl-3">
                <div className="text-lg font-bold font-mono">Simulados</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mt-1">Sempre Atualizados</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#interactive-suite"
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black transition-all duration-150 text-center shadow-lg shadow-indigo-500/20"
              >
                Gerar Cronograma de Estudos
              </a>
              <a 
                href="#plans-section"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-semibold transition-all duration-150 text-center"
              >
                Conhecer Nossos Planos
              </a>
            </div>
          </div>

          {/* Hero visual / profile photo card (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-slate-950 p-4 rounded-2xl border border-slate-800/80 max-w-sm">
                
                {/* Profile Shot Asset with referrerPolicy */}
                <img 
                  src="/src/assets/images/marcos_profile_1780074069894.png"
                  alt="Marcos Vinícius Almeida"
                  referrerPolicy="no-referrer"
                  className="rounded-xl w-full h-auto object-cover aspect-square shadow-inner mb-4 transition-transform duration-300 group-hover:scale-[1.01]"
                />

                <div className="space-y-1">
                  <div className="text-sm font-extrabold tracking-tight text-white">Marcos Vinícius Almeida</div>
                  <div className="text-xs text-teal-400 font-medium">Assistente Social e Mentor de Concursos</div>
                  <div className="text-[11px] text-slate-400 leading-normal pt-1 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    Atuação há mais de 8 anos auxiliando concurseiros
                  </div>
                </div>

                {/* Micro social metrics */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between text-center">
                  <div>
                    <div className="text-xs font-extrabold text-white font-mono">1.2k+</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">Alunos</div>
                  </div>
                  <div className="h-6 w-[1.5px] bg-slate-800" />
                  <div>
                    <div className="text-xs font-extrabold text-white font-mono">8+</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">Provas Feitas</div>
                  </div>
                  <div className="h-6 w-[1.5px] bg-slate-800" />
                  <div>
                    <div className="text-xs font-extrabold text-white font-mono">94%</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">Satisfação</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* About Section - Brief Story */}
      <section className="py-20 bg-white" id="about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Static study representation banner with referrerPolicy (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute top-4 left-4 w-full h-full bg-slate-100 rounded-2xl -z-10" />
              <img 
                src="/src/assets/images/study_banner_1780074087002.png" 
                alt="Organização de Estudos Método Aprovação Social" 
                referrerPolicy="no-referrer"
                className="rounded-2xl shadow-xl w-full h-64 sm:h-80 object-cover border border-slate-200"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm px-4 py-3 rounded-lg text-white text-xs border border-slate-800 flex items-center justify-between">
                <span>Plano Estruturado = Menos Ansiedade</span>
                <span className="font-bold text-teal-400 font-mono">100% Prático</span>
              </div>
            </div>
          </div>

          {/* Biography text & high emphasis features (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Quem é o seu Mentor?
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              Especialista em preparação para concursos públicos na área de Serviço Social
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed font-serif">
              Marcos Vinícius Almeida é assistente social de carreira, mentor educacional e possui vasta experiência prática em políticas públicas, assistência social e educação legislativa. 
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Atua há mais de 8 anos auxiliando estudantes e profissionais na construção de estratégias eficientes de estudo, cronograma de rotina, interpretação minuciosa de editais de prefeituras, tribunais e órgãos federais, e domínio absoluto das principais legislações cobradas em concursos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg h-fit">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Domínio de Legislações</h4>
                  <p className="text-xs text-slate-500 leading-normal mt-0.5">Teoria simplificada de LOAS, SUAS, ECA, Estatuto do Idoso e LBI.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg h-fit">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Pédagogia Baseada em Erros</h4>
                  <p className="text-xs text-slate-500 leading-normal mt-0.5">Encontre padrões em pegadinhas clássicas das bancas examinadoras brasileiras.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 mt-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-700 block">Nossos Diferenciais de Ensino:</span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-550 rounded-full" />
                  Linguagem simples e objetiva;
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-550 rounded-full" />
                  Estratégias práticas de estudo;
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-550 rounded-full" />
                  Experiência consolidada na área pública;
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-550 rounded-full" />
                  Método focado em aprovação.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Suite Tools (Tabs Section) */}
      <section className="py-20 bg-slate-100/65 border-y border-slate-200/50" id="interactive-suite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Indicator */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="inline-block text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Sua Área do Aluno - Gratuito
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
              Pratique e planeje agora mesmo
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
              Desenvolvemos 3 módulos interativos para você simular sua rotina acadêmica, avaliar seu conhecimento legislativo imediato e traçar metas de autodesempenho.
            </p>
          </div>

          {/* Toggle Tab bar */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-8 bg-slate-200/50 p-1.5 rounded-2xl w-fit mx-auto border border-slate-200">
            <button
              id="tab-btn-planner"
              onClick={() => setActiveTab('planner')}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                activeTab === 'planner'
                  ? 'bg-white text-indigo-950 shadow-md shadow-slate-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Clipboard className="w-4 h-4" />
              1. Gerador de Cronograma
            </button>
            <button
              id="tab-btn-quiz"
              onClick={() => setActiveTab('quiz')}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-white text-indigo-950 shadow-md shadow-slate-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              2. Simulado Rápido (5 Questões)
            </button>
            <button
              id="tab-btn-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-indigo-950 shadow-md shadow-slate-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Gauge className="w-4 h-4" />
              3. Autodiagnóstico de Desempenho
            </button>
          </div>

          {/* Render Tab Panel with responsive wrapper */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'planner' && (
                <motion.div
                  key="planner"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <WeeklyPlanner onContactRequest={handleContactWhatsApp} />
                </motion.div>
              )}

              {activeTab === 'quiz' && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <ReviewQuiz onContactRequest={handleContactWhatsApp} />
                </motion.div>
              )}

              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <PerformanceDashboard onContactRequest={handleContactWhatsApp} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Services and Pricing Plans */}
      <section className="py-20 bg-white" id="plans-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-block text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Mentorias & Treinamentos
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
              Serviços sob medida para a sua vitória
            </h2>
            
            <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
              Trabalhamos com vagas restritas e acompanhamento intensivo para assegurar que você receba materiais atualizados e feedback individual.
            </p>
          </div>

          <MentorshipPlans onContactRequest={handleContactWhatsApp} />

        </div>
      </section>

      {/* Success Proof & Testimonials */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="testimonials-section">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
            <span className="text-[10px] font-extrabold uppercase tracking-wide bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/15">
              Resultados Práticos Reais
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-sans text-white tracking-tight">
              O que dizem os aprovados no Serviço de Acolhimento e Órgãos Estaduais
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div 
                id={`testimonial-card-${t.id}`}
                key={t.id}
                className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* Stars bar */}
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className="text-amber-400 font-bold text-sm">★</span>
                      ))}
                    </div>
                    {t.badge && (
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-black px-2 py-0.5 rounded border border-indigo-500/20">
                        {t.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-300 text-xs font-serif leading-relaxed italic mb-6">
                    “{t.text}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-indigo-650 text-white font-extrabold flex items-center justify-center text-xs">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-tight">{t.name}</h5>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              id="btn-whatsapp-testimonials-cta"
              onClick={() => handleContactWhatsApp("Histórias de Sucesso", "Professor Marcos, li os depoimentos da Juliana e da Renata. Gostaria de saber se o meu caso (meu edital em vista) também é viável com a sua metodologia individual de cronograma.")}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-sm shadow-indigo-500/20"
            >
              Quero Ser o Próximo Aprovado
            </button>
          </div>

        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-20 bg-white" id="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
            <span className="inline-block text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Sua Aprovação Sem Dúvidas
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              Perguntas Frequentes
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((f, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  id={`faq-item-${index}`}
                  key={index} 
                  className="border border-slate-150 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    id={`faq-btn-trigger-${index}`}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-slate-800 text-sm cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-2 leading-snug">
                      <HelpCircle className="w-4 h-4 text-indigo-650 shrink-0" />
                      {f.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-serif">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer Section with Social Badges and contact forms */}
      <footer className="bg-slate-900 text-white py-16 border-t border-slate-850" id="contact-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo & Slogan (col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-indigo-650 text-white rounded-lg font-black text-xs">
                MAS
              </span>
              <span className="text-sm font-black text-white uppercase tracking-wider font-sans">
                Método Aprovação Social
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-normal max-w-sm">
                Material de preparação e orientações didáticas focadas exclusivamente na capacitação teórica e instrumental de Assistentes Sociais para seleções municipais e federais.
            </p>

            {/* Fictional credentials footer credits warning required by law or standards */}
            <p className="text-[10px] text-slate-500 font-mono">
              BH / MG e atuação digital nacional. Responsável técnico: Marcos Vinícius Almeida (Assistente Social e Educador).
            </p>

            {/* Social Grid icons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                id="footer-btn-instagram"
                onClick={() => window.open('https://instagram.com/metodoaprovacaosocial', '_blank')}
                className="p-2.5 bg-slate-800 hover:bg-slate-755 text-slate-300 hover:text-pink-400 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs"
              >
                <Instagram className="w-4 h-4" />
                <span className="font-semibold text-[10px]">@metodoaprovacaosocial</span>
              </button>

              <button
                id="footer-btn-youtube"
                onClick={() => window.open('https://youtube.com', '_blank')}
                className="p-2.5 bg-slate-800 hover:bg-slate-755 text-slate-300 hover:text-rose-500 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs"
              >
                <Youtube className="w-4 h-4" />
                <span className="font-semibold text-[10px]">Método Aprovação Social</span>
              </button>
            </div>
          </div>

          {/* Quick links directory (col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Atalhos Úteis</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#hero-banner" className="hover:text-white transition-colors">Voltar ao topo</a>
              </li>
              <li>
                <a href="#about-section" className="hover:text-white transition-colors">Quem é o Mentor</a>
              </li>
              <li>
                <a href="#interactive-suite" className="hover:text-white transition-colors">Gerador de Roteiro Acadêmico</a>
              </li>
              <li>
                <a href="#pricing-plans-grid" className="hover:text-white transition-colors">Vagas e Planos Disponíveis</a>
              </li>
            </ul>
          </div>

          {/* Real email click actions and contacts (col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Contatos Diretos</h4>
            
            <div className="space-y-2 text-xs">
              
              {/* WhatsApp direct element */}
              <button
                id="footer-action-whatsapp"
                onClick={() => handleContactWhatsApp("Rodapé", "Olá Professor! Gostaria de conversar sobre seu curso ou mentoria.")}
                className="w-full p-3 bg-slate-800/80 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 border border-slate-805 rounded-xl transition-all flex items-center gap-2.5 font-bold cursor-pointer hover:shadow-inner"
              >
                <Phone className="w-4 h-4 fill-current shrink-0" />
                <span>WhatsApp: (31) 99999-9999</span>
              </button>

              {/* Email direct click */}
              <div className="w-full p-3 bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-slate-300 truncate">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">contato@metodoaprovacaosocial.com</span>
                </div>
                <button
                  id="btn-copy-email-footer"
                  onClick={copyEmail}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold rounded transition-colors cursor-pointer"
                >
                  {copiedEmail ? "Copiado!" : "Copiar"}
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Outer bottom credits segment */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-850 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <span>&copy; {new Date().getFullYear()} Método Aprovação Social. Todos os direitos reservados.</span>
          <span>Desenvolvido para Assistentes Sociais Concurseiros</span>
        </div>
      </footer>

    </div>
  );
}
