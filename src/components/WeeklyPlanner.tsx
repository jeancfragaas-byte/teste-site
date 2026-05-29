import { useState, useEffect } from 'react';
import { Calendar, CheckSquare, Sparkles, BookOpen, Clock, AlertCircle, Share2, ClipboardCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StudyPlanDay } from '../types';

interface WeeklyPlannerProps {
  onContactRequest: (subject: string, message: string) => void;
}

export default function WeeklyPlanner({ onContactRequest }: WeeklyPlannerProps) {
  const [targetHours, setTargetHours] = useState<number>(20);
  const [priorityArea, setPriorityArea] = useState<string>("LOAS & SUAS");
  const [days, setDays] = useState<StudyPlanDay[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate dynamic study plan structure based on targetHours and priorityArea
  useEffect(() => {
    const dailyHours = Math.round((targetHours / 6) * 10) / 10;
    
    const basePlan: StudyPlanDay[] = [
      {
        id: 'seg',
        dayName: 'Segunda-feira',
        focusSubject: 'Legislação Social ' + (priorityArea === "LOAS & SUAS" ? "(LOAS)" : `(${priorityArea})`),
        hours: Math.ceil(dailyHours * 0.9),
        tasks: [
          'Leitura da Lei Federal Seca (Art. 1º ao 15)',
          'Resumo estruturado por mapas mentais',
          'Resolução de 10 questões de concursos anteriores'
        ],
        completed: false
      },
      {
        id: 'ter',
        dayName: 'Terça-feira',
        focusSubject: 'Código de Ética do Assistente Social (1993)',
        hours: Math.floor(dailyHours * 0.9),
        tasks: [
          'Detalhamento dos Princípios Fundamentais',
          'Leitura comentada do Cap. II (Deveres e Prerrogativas)',
          'Revisão rápida de súmulas do CFESS'
        ],
        completed: false
      },
      {
        id: 'qua',
        dayName: 'Quarta-feira',
        focusSubject: priorityArea === "LOAS & SUAS" ? 'SUAS (Proteção Social Básica & Especial)' : priorityArea,
        hours: Math.ceil(dailyHours * 1.1),
        tasks: [
          'Diferenciação operacional entre CRAS e CREAS',
          'Estudo de fluxo de encaminhamentos assistenciais',
          'Resolvendo 15 questões inéditas comentadas'
        ],
        completed: false
      },
      {
        id: 'qui',
        dayName: 'Quinta-feira',
        focusSubject: 'Políticas Públicas e Questão Social',
        hours: Math.floor(dailyHours * 0.9),
        tasks: [
          'Gênese do Serviço Social no Brasil: Contexto histórico',
          'Fatores estruturais da precarização e assistência',
          'Criação de fichamento de conceitos chave'
        ],
        completed: false
      },
      {
        id: 'sex',
        dayName: 'Sexta-feira',
        focusSubject: 'Instrumentalidade e Prática Profissional',
        hours: Math.floor(dailyHours * 0.8),
        tasks: [
          'Estudo do Estudo Social, Parecer e Laudo Pericial',
          'Análise de estudo de caso prático para Tribunais',
          'Técnicas de elaboração de relatórios técnicos'
        ],
        completed: false
      },
      {
        id: 'sab',
        dayName: 'Sábado',
        focusSubject: 'Simulado de Revisão Semanal',
        hours: Math.ceil(dailyHours * 1.4),
        tasks: [
          'Simulação de tempo de prova (20 questões)',
          'Análise detalhada de erros com gabarito comentado',
          'Mapear dúvidas para tirar com o Mentor Marcos'
        ],
        completed: false
      },
      {
        id: 'dom',
        dayName: 'Domingo',
        focusSubject: 'Descanso Ativo & Mental',
        hours: 0,
        tasks: [
          'Planejar a próxima semana de estudos',
          'Leitura leve ou podcast informativo sobre políticas sociais',
          'Recuperar energia e descansar a mente'
        ],
        completed: true // Sunday is free/done by default!
      }
    ];

    setDays(basePlan);
  }, [targetHours, priorityArea]);

  const toggleTask = (dayId: string, taskIndex: number) => {
    setDays(prevDays => 
      prevDays.map(day => {
        if (day.id === dayId) {
          // Because Sundays or days might have no individual checkboxes directly, let's toggle overall day completeness or handle check state
        }
        return day;
      })
    );
  };

  const toggleDayComplete = (dayId: string) => {
    setDays(prevDays => 
      prevDays.map(day => 
        day.id === dayId ? { ...day, completed: !day.completed } : day
      )
    );
  };

  const completedDaysCount = days.filter(d => d.completed).length;
  const progressPercent = Math.round((completedDaysCount / days.length) * 100);

  const getSubtextRecommendation = () => {
    if (targetHours < 15) {
      return "Ótimo para quem trabalha em período integral. Foco extremo em resumos direcionados e revisões ativas.";
    } else if (targetHours >= 15 && targetHours < 30) {
      return "Rendimento equilibrado de alta performance. Permite aprofundar em leis secas e fixar simulados aos sábados.";
    } else {
      return "Estudo intensivo / Pós-Edital. Cuidado com o esgotamento (burnout). O descanso aos domingos é obrigatório!";
    }
  };

  const copyToClipboard = () => {
    const summary = `📅 *Meu Cronograma Rápido de Estudos (Método Aprovação Social)*
🎯 Foco Principal: ${priorityArea}
⏱️ Carga Horária Semanal: ${targetHours}h (${(targetHours / 6).toFixed(1)}h/dia)

Dias Planejados:
${days.map(d => `- ${d.dayName}: ${d.focusSubject} (${d.hours}h) -> ${d.tasks[0]}`).join('\n')}

💬 Quero validar esse roteiro na Mentoria Individual do Prof. Marcos.`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendToWhatsApp = () => {
    const textMsg = `Olá Prof. Marcos! Preenchi o simulador de cronograma no seu site. 
Foco: ${priorityArea}
Horas disponíveis: ${targetHours}h por semana.
Gostaria de saber como a Mentoria Individual pode me ajudar a otimizar e cumprir esse planejamento!`;
    
    onContactRequest("Mentoria Individual", textMsg);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden" id="weekly-study-planner">
      {/* Planner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold mb-2 uppercase tracking-wider border border-indigo-400/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Ferramenta Exclusiva
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-sans tracking-tight text-white mb-2">
              Gerador de Cronograma Inteligente
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Insira sua rotina de estudos atual e veja a divisão sugerida de matérias segundo a metodologia exclusiva do Marcos Vinícius.
            </p>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 p-4 rounded-xl flex items-center gap-4 self-start md:self-auto min-w-[200px]">
            <div className="p-3 bg-indigo-600/30 rounded-lg text-indigo-400">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Meta Semanal</div>
              <div className="text-lg font-bold text-white tracking-tight">{targetHours} horas estudadas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Controls Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-slate-100">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Quantas Horas semanais você pode estudar?
            </label>
            <div className="flex items-center gap-4">
              <input
                id="hours-range-input"
                type="range"
                min="10"
                max="44"
                step="2"
                value={targetHours}
                onChange={(e) => setTargetHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
              />
              <span className="text-lg font-extrabold text-indigo-950 font-mono bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 min-w-[50px] text-center">
                {targetHours}h
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-serif italic">
              {getSubtextRecommendation()}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-400" />
              Sua maior fraqueza ou foco legislativo:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {["LOAS & SUAS", "Código de Ética", "Políticas de Saúde", "ECA & Criança", "Idoso & PCD", "Instrumentais"].map((area) => (
                <button
                  id={`btn-area-${area.replace(/\s+/g, '-').toLowerCase()}`}
                  key={area}
                  onClick={() => setPriorityArea(area)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-center border transition-all duration-200 cursor-pointer ${
                    priorityArea === area
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="my-6 bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
            </span>
            <span className="text-sm font-semibold text-slate-800">
              Progresso do seu Ciclo Semanal: <span className="text-indigo-600 font-bold">{progressPercent}%</span> ({completedDaysCount} de 7 dias)
            </span>
          </div>
          <div className="w-full sm:w-1/3 bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-indigo-600 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Weekly Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-6">
          <AnimatePresence mode="popLayout">
            {days.map((day, idx) => (
              <motion.div
                key={day.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={`flex flex-col justify-between border rounded-xl p-4 transition-all duration-300 relative ${
                  day.completed
                    ? 'bg-emerald-50/70 border-emerald-200 shadow-sm opacity-90'
                    : 'bg-white border-slate-150 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {day.hours === 0 && (
                  <div className="absolute top-3 right-3 bg-sky-100 text-sky-800 text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded">
                    OFF
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">{day.dayName}</h4>
                    {day.hours > 0 && (
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" /> {day.hours}h
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs font-semibold text-slate-600 bg-slate-100 rounded px-2.5 py-1 mb-3 line-clamp-1">
                    {day.focusSubject}
                  </div>

                  <ul className="space-y-2 mb-4">
                    {day.tasks.map((task, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0" />
                        <span className={day.completed ? "line-through text-slate-400" : ""}>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between mt-auto">
                  <span className="text-[11px] text-slate-400">
                    {day.completed ? "Ciclo Feito 🎉" : "Meta Pendente"}
                  </span>
                  <button
                    id={`btn-toggle-day-${day.id}`}
                    onClick={() => toggleDayComplete(day.id)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                      day.completed
                        ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    <CheckSquare className="w-3 h-3" />
                    {day.completed ? 'Concluído' : 'Concluir'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Footer inside Planner */}
        <div className="bg-slate-50 rounded-xl p-5 md:p-6 border border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600 shrink-0 hidden sm:block">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-slate-900 mb-1">
                Gostou deste rascunho de cronograma estratégico?
              </h5>
              <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
                Cada edital de concurso possui pesos diferentes para SUAS, LOAS e Prática Profissional. Marcos Vinícius pode desenhar um plano definitivo otimizado para o seu edital específico.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto self-end md:self-center">
            <button
              id="btn-copy-planner-clipboard"
              onClick={copyToClipboard}
              className="flex-1 md:flex-initial py-2.5 px-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 hover:bg-slate-100 cursor-pointer"
            >
              {copied ? (
                <>
                  <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                  Copiado!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-500" />
                  Copiar Cronograma
                </>
              )}
            </button>
            <button
              id="btn-whatsapp-planner"
              onClick={handleSendToWhatsApp}
              className="flex-1 md:flex-initial py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-extrabold transition-all duration-150 flex items-center justify-center gap-2 shadow-sm shadow-emerald-200 cursor-pointer"
            >
              Falar com o Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
