import { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, HelpCircle, FileCheck2, UserCheck, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENTORSHIP_PLANS } from '../types';

interface MentorshipPlansProps {
  onContactRequest: (subject: string, message: string) => void;
}

export default function MentorshipPlans({ onContactRequest }: MentorshipPlansProps) {
  const [expandedId, setExpandedId] = useState<string | null>("mentoria");

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'emerald':
        return {
          border: 'border-emerald-200 hover:border-emerald-400',
          accentBg: 'bg-emerald-600',
          hoverBg: 'hover:bg-emerald-700',
          textAccent: 'text-emerald-700',
          lightAccentBg: 'bg-emerald-50 text-emerald-800',
          shadow: 'shadow-emerald-50',
          badgeText: 'Acompanhamento Premium'
        };
      case 'teal':
        return {
          border: 'border-teal-200 hover:border-teal-400',
          accentBg: 'bg-teal-600',
          hoverBg: 'hover:bg-teal-700',
          textAccent: 'text-teal-700',
          lightAccentBg: 'bg-teal-50 text-teal-800',
          shadow: 'shadow-teal-50',
          badgeText: 'Foco Prático'
        };
      default:
        return {
          border: 'border-indigo-200 hover:border-indigo-400',
          accentBg: 'bg-indigo-600',
          hoverBg: 'hover:bg-indigo-700',
          textAccent: 'text-indigo-700',
          lightAccentBg: 'bg-indigo-50 text-indigo-800',
          shadow: 'shadow-indigo-50',
          badgeText: 'Curso Completo'
        };
    }
  };

  const handleCtaClick = (planName: string) => {
    const defaultMessages: Record<string, string> = {
      "Mentoria Individual": "Olá Professor Marcos! Gostaria de entender o funcionamento da sua Mentoria Individual e a disponibilidade de vagas remanescentes para este mês.",
      "Curso Preparatório": "Olá Marcos! Me interessei pelo Curso Preparatório Método Aprovação Social. Como funciona o acesso ao ambiente do estudante, videoaulas e suporte?",
      "Simulados e Revisões": "Olá! Gostaria de receber os packs de Simulados + Caderno de Resumos comentados de Serviço Social do Método Aprovação Social."
    };
    
    onContactRequest(planName, defaultMessages[planName] || `Olá! Tenho interesse no serviço: ${planName}`);
  };

  return (
    <div className="space-y-8" id="pricing-plans-grid">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MENTORSHIP_PLANS.map((plan) => {
          const theme = getThemeClasses(plan.colorTheme);
          const isExpanded = expandedId === plan.id;

          return (
            <motion.div
              id={`plan-card-${plan.id}`}
              key={plan.id}
              layout
              className={`bg-white rounded-2xl border-2 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-lg ${theme.border} ${theme.shadow} relative`}
            >
              {plan.id === 'mentoria' && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  Mais Procurado
                </div>
              )}

              <div>
                {/* Badge Label */}
                <span className={`inline-block text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md mb-4 ${theme.lightAccentBg}`}>
                  {theme.badgeText}
                </span>

                {/* Header */}
                <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-1.5 font-sans">
                  {plan.name}
                </h4>
                <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">{plan.tagline}</p>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[50px] mb-6">
                  {plan.description}
                </p>

                {/* Pricing / Booking slot info */}
                <div className="pb-6 mb-6 border-b border-slate-100 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900 font-sans tracking-tight">{plan.pricing}</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">O que está incluso:</div>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <span className={`p-0.5 rounded-full mt-0.5 shrink-0 text-white ${theme.accentBg}`}>
                        <Check className="w-3 h-3 stroke-[3px]" />
                      </span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Inner Accordion Plan Details */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button
                    id={`btn-accord-details-${plan.id}`}
                    onClick={() => toggleExpand(plan.id)}
                    className={`text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer ${theme.textAccent}`}
                  >
                    {isExpanded ? "Ocultar Vantagens Avançadas ▲" : "Ver Vantagens Avançadas ▼"}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-3 space-y-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200/50"
                      >
                        {plan.expandedFeatures.map((expFeature, eIdx) => (
                          <div key={eIdx} className="flex items-start gap-2 text-[11px] text-slate-600 leading-relaxed">
                            <span className="text-slate-400 font-bold mt-0.5 shrink-0">•</span>
                            <span>{expFeature}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Button */}
              <button
                id={`btn-order-whatsapp-${plan.id}`}
                onClick={() => handleCtaClick(plan.name)}
                className={`w-full mt-8 py-3.5 px-6 text-white font-black text-xs rounded-xl shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${theme.accentBg} ${theme.hoverBg}`}
              >
                {plan.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Trust Badges Bar */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-around gap-6 text-center">
        <div className="flex flex-col items-center max-w-[200px]">
          <ShieldCheck className="w-8 h-8 text-indigo-650 mb-2" />
          <h5 className="text-xs font-bold text-slate-800 mb-1">Garantia de Atualização</h5>
          <p className="text-[10px] text-slate-500 leading-normal">
            Todos os materiais e apostilas são rigorosamente revisados conforme novas resoluções do CNAS e leis do Congresso.
          </p>
        </div>

        <div className="h-10 w-[1px] bg-slate-200 hidden md:block" />

        <div className="flex flex-col items-center max-w-[200px]">
          <UserCheck className="w-8 h-8 text-indigo-650 mb-2" />
          <h5 className="text-xs font-bold text-slate-800 mb-1">Suporte Unificado</h5>
          <p className="text-[10px] text-slate-500 leading-normal">
            As dúvidas são dirimidas pessoalmente pelo Prof. Marcos Vinícius, sem intermediários ou robôs.
          </p>
        </div>

        <div className="h-10 w-[1px] bg-slate-200 hidden md:block" />

        <div className="flex flex-col items-center max-w-[200px]">
          <FileCheck2 className="w-8 h-8 text-indigo-650 mb-2" />
          <h5 className="text-xs font-bold text-slate-800 mb-1">Conteúdo Direto</h5>
          <p className="text-[10px] text-slate-500 leading-normal">
            Linguagem objetiva baseada no que as principais examinadoras realmente cobram em nível nacional.
          </p>
        </div>
      </div>
    </div>
  );
}
