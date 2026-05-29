import { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, ChevronRight, RotateCcw, Award, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../types';

interface ReviewQuizProps {
  onContactRequest: (subject: string, message: string) => void;
}

export default function ReviewQuiz({ onContactRequest }: ReviewQuizProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answersLog, setAnswersLog] = useState<{ questionId: number; chosen: number; correct: boolean }[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setAnswersLog(prev => [
      ...prev,
      { questionId: currentQuestion.id, chosen: selectedOption, correct: isCorrect }
    ]);
    
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setAnswersLog([]);
    setQuizFinished(false);
  };

  const scoreLabel = () => {
    if (score === 5) return { text: "Excelente! Gabaritou 🎯", desc: "Você domina a legislação e o SUAS. Está em nível avançado, pronto para disputar vagas de elite e tribunais!" };
    if (score >= 3) return { text: "Bom Desempenho! 📈", desc: "Você tem uma boa base conceitual de Serviço Social, mas perde pontos importantes em pegadinhas de lei seca. A mentoria pode ajustar isso." };
    return { text: "Estação de Alerta! ⚠️", desc: "Há lacunas graves na LOAS, SUAS e ECA. Estudar sem direção vai prolongar sua aprovação. Comece a mentoria agora para reverter este cenário." };
  };

  const shareScoreOnWhatsApp = () => {
    const textMsg = `Olá Marcos! Fiz o Simulado Rápido de Serviço Social no seu site e acertei ${score} de 5 questões (${scoreLabel().text}). Quero entender como seu método pode me ajudar a gabaritar as provas!`;
    onContactRequest("Resultado do Simulado", textMsg);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden" id="interactive-quiz-section">
      {/* Quiz Top bar header */}
      <div className="bg-slate-900 px-6 py-5 border-b border-slate-800 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-sans text-white tracking-tight">Simulado Exclusivo: Teste seus Conhecimentos</h4>
            <p className="text-[11px] text-slate-400">Questões reais de Serviço Social comentadas passo a passo</p>
          </div>
        </div>
        {!quizFinished && (
          <span className="text-xs font-mono font-bold bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-full border border-slate-700">
            {currentIdx + 1} / {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {!quizFinished && (
        <div className="w-full bg-slate-100 h-1.5">
          <div 
            className="bg-indigo-600 h-full transition-all duration-300" 
            style={{ width: `${((currentIdx) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      )}

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Question Area */}
              <div>
                <span className="inline-block text-[10px] font-bold tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 uppercase px-2.5 py-1 rounded-full mb-3">
                  {currentQuestion.category}
                </span>
                <h5 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                  {currentIdx + 1}. {currentQuestion.question}
                </h5>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  let buttonStyle = "border-slate-200 hover:bg-slate-50 text-slate-800 hover:border-slate-300 bg-white";
                  let indicatorStyle = "border-slate-300 text-slate-400 font-bold bg-slate-50";

                  if (selectedOption === idx) {
                    buttonStyle = "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-medium ring-2 ring-indigo-100";
                    indicatorStyle = "border-indigo-600 bg-indigo-600 text-white";
                  }

                  if (isSubmitted) {
                    if (idx === currentQuestion.correctAnswer) {
                      buttonStyle = "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold";
                      indicatorStyle = "border-emerald-500 bg-emerald-500 text-white";
                    } else if (selectedOption === idx) {
                      buttonStyle = "border-rose-300 bg-rose-50/50 text-rose-950";
                      indicatorStyle = "border-rose-400 bg-rose-400 text-white";
                    } else {
                      buttonStyle = "border-slate-100 opacity-60 text-slate-400 bg-slate-50/40";
                      indicatorStyle = "border-slate-200 text-slate-300 bg-slate-100";
                    }
                  }

                  return (
                    <button
                      id={`quiz-option-${currentIdx}-${idx}`}
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 cursor-pointer text-sm ${buttonStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 text-xs font-semibold ${indicatorStyle}`}>
                        {isSubmitted && idx === currentQuestion.correctAnswer ? (
                          "✓"
                        ) : isSubmitted && selectedOption === idx ? (
                          "✗"
                        ) : (
                          String.fromCharCode(65 + idx)
                        )}
                      </span>
                      <span className="flex-1 mt-0.5">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action and feedback area */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 italic">
                  {selectedOption === null 
                    ? "Selecione uma das opções para responder"
                    : isSubmitted 
                      ? "Confira o comentário do professor Marcos abaixo"
                      : "Clique no botão para confirmar a resposta"
                  }
                </div>

                {!isSubmitted ? (
                  <button
                    id="btn-submit-answer"
                    onClick={handleAnswerSubmit}
                    disabled={selectedOption === null}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-lg text-xs transition-all duration-150 cursor-pointer shadow-sm shadow-indigo-100"
                  >
                    Confirmar Resposta
                  </button>
                ) : (
                  <button
                    id="btn-next-question"
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-900 hover:bg-slate-950 text-white font-bold rounded-lg text-xs transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {currentIdx + 1 === QUIZ_QUESTIONS.length ? "Finalizar Simulado" : "Próxima Questão"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Explanatory text (Questão Comentada) */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-slate-50 border border-slate-200/60 p-5 rounded-xl space-y-3 mt-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-full ${
                        selectedOption === currentQuestion.correctAnswer 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-rose-100 text-rose-700'
                      }`}>
                        {selectedOption === currentQuestion.correctAnswer ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        Gabarito Comentado pelo Professor Marcos:
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-serif">
                      {currentQuestion.explanation}
                    </p>
                    <div className="text-[11px] text-slate-400 pt-1.5 border-t border-slate-200 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Estudo de caso típico cobrado por bancas como FCC, VUNESP e FGV.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Quiz Results Block */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-6 max-w-xl mx-auto space-y-6"
            >
              <div className="inline-flex p-4 bg-indigo-50 text-indigo-600 rounded-full">
                <Award className="w-12 h-12" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Simulado Concluído!</h4>
                <p className="text-slate-500 text-xs mt-1">Sua pontuação na avaliação rápida de Serviço Social:</p>
              </div>

              {/* Big Score Bubble */}
              <div className="flex items-center justify-center">
                <div className="w-28 h-28 bg-indigo-50 border-4 border-indigo-600 rounded-full flex flex-col items-center justify-center shadow-lg shadow-indigo-100">
                  <span className="text-4xl font-extrabold text-indigo-950 font-mono">
                    {score}
                  </span>
                  <span className="text-xs text-indigo-500 uppercase font-semibold">de 5 acertos</span>
                </div>
              </div>

              {/* Category Breakdown & Performance Assessment */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 text-left space-y-3">
                <h5 className="text-sm font-bold text-slate-800">{scoreLabel().text}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {scoreLabel().desc}
                </p>
                
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Diretrizes recomendadas:</div>
                  <ul className="text-xs space-y-1 text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                      Mapear os artigos-problema de leis orgânicas.
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                      Praticar com provas passadas em simuladores programados.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="btn-whatsapp-score"
                  onClick={shareScoreOnWhatsApp}
                  className="flex-1 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all duration-150 shadow-md shadow-emerald-100 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Analisar Erros com o Marcos
                </button>
                <button
                  id="btn-restart-quiz"
                  onClick={restartQuiz}
                  className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Tentar Novamente
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
