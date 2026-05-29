import { useState } from 'react';
import { AreaChart, TrendingUp, Compass, ShieldAlert, CheckCircle, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

interface PerformanceDashboardProps {
  onContactRequest: (subject: string, message: string) => void;
}

export default function PerformanceDashboard({ onContactRequest }: PerformanceDashboardProps) {
  // Axes representing Social Work contest skills (percentage from 0 to 100)
  const [leisSecas, setLeisSecas] = useState<number>(60);
  const [suasPratica, setSuasPratica] = useState<number>(75);
  const [discursivas, setDiscursivas] = useState<number>(45);
  const [eticaTeoria, setEticaTeoria] = useState<number>(80);

  // Suggested Target Benchmark (typically 85% for winning municipal/federal spots)
  const targetMin = 85;

  const calculateReadyScore = () => {
    return Math.round((leisSecas + suasPratica + discursivas + eticaTeoria) / 4);
  };

  const getAnalysisVerdict = (score: number) => {
    if (score < 60) {
      return {
        label: "Nível Crítico (Fase de Organização)",
        color: "text-amber-600 bg-amber-50 border-amber-200",
        quote: "Sua média indica que você corre sério risco de ficar fora do ponto de corte básico. A maior barreira é a falta de rotina regular e dificuldade com a interpretação técnica da legislação seca."
      };
    } else if (score < 80) {
      return {
        label: "Nível Competitivo (Fase de Lapidação)",
        color: "text-indigo-600 bg-indigo-50 border-indigo-200",
        quote: "Você tem bagagem! O problema principal é a instabilidade e pequenos erros que custam a classificação final. Precisamos focar no aprimoramento das discursivas e jurisprudência do SUAS."
      };
    } else {
      return {
        label: "Excelente! (Pronto para Gabaritar)",
        color: "text-emerald-700 bg-emerald-50 border-emerald-200",
        quote: "Você está no ponto ideal! O trabalho da mentoria será blindar seu tempo e garantir que o fator emocional ou pegadinhas cascas de bala não tirem de você a sua colocação dos sonhos."
      };
    }
  };

  const scoreAverage = calculateReadyScore();
  const verdict = getAnalysisVerdict(scoreAverage);

  // SVG Coordinates for drawing a clean custom radar/polygon map
  // Center is (100, 100), max radius is 75
  const center = 100;
  const maxRadius = 70;

  // Let's calculate the 4 vertices of our quadrilateral:
  // Axis 1: Legislação Seca (Up): Y decreases as value increases. X stays 110. (100, 100 - r)
  // Axis 2: SUAS (Right): X increases as value increases. Y stays 100. (100 + r, 100)
  // Axis 3: Discursivas (Down): Y increases as value increases. X stays 100. (100, 100 + r)
  // Axis 4: Ética (Left): X decreases as value increases. Y stays 100. (100 - r, 100)
  
  const getCoord = (axisIndex: number, val: number) => {
    const radius = (val / 100) * maxRadius;
    if (axisIndex === 0) return { x: center, y: center - radius }; // Up
    if (axisIndex === 1) return { x: center + radius, y: center }; // Right
    if (axisIndex === 2) return { x: center, y: center + radius }; // Down
    return { x: center - radius, y: center }; // Left
  };

  // User Stats Polygon coords
  const p0 = getCoord(0, leisSecas);
  const p1 = getCoord(1, suasPratica);
  const p2 = getCoord(2, discursivas);
  const p3 = getCoord(3, eticaTeoria);

  // Target Baseline Polygon coords (85%)
  const t0 = getCoord(0, targetMin);
  const t1 = getCoord(1, targetMin);
  const t2 = getCoord(2, targetMin);
  const t3 = getCoord(3, targetMin);

  const requestInterpretation = () => {
    const textMsg = `Olá Prof. Marcos! Simulei meu perfil de concurseiro no seu site. Minhas notas percebidas:
- Leis Secas: ${leisSecas}%
- SUAS e Práticas: ${suasPratica}%
- Discursivas/Casos: ${discursivas}%
- Ética e Doutrina: ${eticaTeoria}%
Minha média de prontidão deu: ${scoreAverage}%. Gostaria do seu diagnóstico gratuito inicial sobre por qual disciplina devo acelerar primeiro!`;

    onContactRequest("Análise de Desempenho", textMsg);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden" id="interactive-dashboard-profile">
      {/* Top Banner Accent */}
      <div className="p-6 md:p-8 bg-slate-900 text-white border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-semibold mb-2 uppercase tracking-wider border border-teal-400/20">
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
              Módulo Interativo
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-sans tracking-tight text-white mb-2">
              Autodiagnóstico de Desempenho
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Descubra em qual quadrante você está deixando pontos cruciais e compare com o índice médio exigido de aprovação em concursos altamente disputados.
            </p>
          </div>
          
          <div className="bg-slate-800/60 p-4 rounded-xl flex items-center gap-4 self-start md:self-auto">
            <div className={`p-3 rounded-lg text-white font-mono font-black text-xl bg-gradient-to-br ${
              scoreAverage < 60 ? "from-amber-500 to-orange-600" : scoreAverage < 80 ? "from-indigo-500 to-indigo-700" : "from-emerald-500 to-teal-600"
            }`}>
              {scoreAverage}%
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Aproveitamento Médio</div>
              <div className="text-xs font-bold text-white max-w-[150px] line-clamp-1">Nível Estimado</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Control Board (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-slate-400" />
              Ajuste sua percepção de conhecimento
            </h4>

            {/* Slider 1 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-slate-800">Constituição Federal & Leis Secas (ECA, LOAS, LBI)</span>
                <span className="text-sm font-mono font-extrabold text-indigo-700">{leisSecas}%</span>
              </div>
              <input
                id="slider-leis-secas"
                type="range"
                min="0"
                max="100"
                value={leisSecas}
                onChange={(e) => setLeisSecas(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">Capacidade de memorização de artigos literais cobrados exaustivamente por bancas.</p>
            </div>

            {/* Slider 2 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-slate-800">Diretrizes do SUAS & Políticas Setoriais</span>
                <span className="text-sm font-mono font-extrabold text-indigo-700">{suasPratica}%</span>
              </div>
              <input
                id="slider-suas-pratica"
                type="range"
                min="0"
                max="100"
                value={suasPratica}
                onChange={(e) => setSuasPratica(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">Conhecimento da engenharia do SUAS (Financiamento, NOB-SUAS, Tipificação de serviços).</p>
            </div>

            {/* Slider 3 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-slate-800">Questões Discursivas, Laudos & Estudo de Caso</span>
                <span className="text-sm font-mono font-extrabold text-indigo-700">{discursivas}%</span>
              </div>
              <input
                id="slider-discursivas"
                type="range"
                min="0"
                max="100"
                value={discursivas}
                onChange={(e) => setDiscursivas(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">Técnicas de argumentação escrita e estruturação conforme exigências de avaliação.</p>
            </div>

            {/* Slider 4 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-bold text-slate-800">Código de Ética, Doutrinas & Autores Clássicos</span>
                <span className="text-sm font-mono font-extrabold text-indigo-700">{eticaTeoria}%</span>
              </div>
              <input
                id="slider-etica-teoria"
                type="range"
                min="0"
                max="100"
                value={eticaTeoria}
                onChange={(e) => setEticaTeoria(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1">Princípios do projeto ético-político e marcos de Iamamoto, Netto e Faleiros.</p>
            </div>
          </div>

          {/* Graphical Visualization Board (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
              Polígono de Performance
            </h5>

            {/* Interactive SVG Radar Drawing */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-45">
                {/* Background grids */}
                <circle cx="100" cy="100" r={maxRadius * 0.25} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="100" cy="100" r={maxRadius * 0.5} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="100" cy="100" r={maxRadius * 0.75} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="100" cy="100" r={maxRadius} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                
                {/* Diagonal grid reference axes */}
                <line x1="100" y1="20" x2="100" y2="180" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#e2e8f0" strokeWidth="1" />

                {/* Target Baseline Polygon (85%) */}
                <polygon
                  points={`${t0.x},${t0.y} ${t1.x},${t1.y} ${t2.x},${t2.y} ${t3.x},${t3.y}`}
                  fill="rgba(79, 70, 229, 0.04)"
                  stroke="#4f46e5"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  className="transition-all duration-300"
                />

                {/* User Current Strengths Polygon */}
                <polygon
                  points={`${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
                  fill="rgba(20, 184, 166, 0.25)"
                  stroke="#14b8a6"
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />

                {/* Vertices indicator dots */}
                <circle cx={p0.x} cy={p0.y} r="4" fill="#14b8a6" />
                <circle cx={p1.x} cy={p1.y} r="4" fill="#14b8a6" />
                <circle cx={p2.x} cy={p2.y} r="4" fill="#14b8a6" />
                <circle cx={p3.x} cy={p3.y} r="4" fill="#14b8a6" />
              </svg>

              {/* Outside labels pointing indices */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 text-[10px] font-extrabold text-slate-700 uppercase bg-white px-1.5 py-0.5 shadow-sm rounded border border-slate-150">
                L. Seca ({leisSecas}%)
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 text-[10px] font-extrabold text-slate-700 uppercase bg-white px-1.5 py-0.5 shadow-sm rounded border border-slate-150">
                Discursivas ({discursivas}%)
              </div>
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 text-[10px] font-extrabold text-slate-700 uppercase bg-white px-1.5 py-0.5 shadow-sm rounded border border-slate-150">
                SUAS ({suasPratica}%)
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 text-[10px] font-extrabold text-slate-700 uppercase bg-white px-1.5 py-0.5 shadow-sm rounded border border-slate-150">
                Ética ({eticaTeoria}%)
              </div>
            </div>

            {/* Custom Legend */}
            <div className="mt-4 flex gap-4 text-[10px] font-bold">
              <div className="flex items-center gap-1.5 text-teal-600">
                <span className="w-2.5 h-2.5 bg-teal-500 rounded-sm" />
                Você
              </div>
              <div className="flex items-center gap-1.5 text-indigo-600">
                <span className="w-2.5 h-0.5 bg-indigo-600 border border-dashed" />
                Posse Padrão ({targetMin}%)
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Diagnostic & WhatsApp Action */}
        <div className={`mt-8 p-6 rounded-xl border ${verdict.color || ''} ${
          scoreAverage < 60 ? "bg-amber-50/60" : scoreAverage < 80 ? "bg-indigo-50/60" : "bg-emerald-50/60"
        }`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  scoreAverage < 60 ? "bg-amber-100 text-amber-800" : scoreAverage < 80 ? "bg-indigo-100 text-indigo-800" : "bg-emerald-100 text-emerald-800"
                }`}>
                  {verdict.label}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-serif italic">
                “{verdict.quote}”
              </p>
            </div>

            <button
              id="btn-interpret-whatsapp"
              onClick={requestInterpretation}
              className="w-full md:w-auto self-end md:self-center bg-indigo-900 hover:bg-indigo-950 text-white font-extrabold py-3 px-6 rounded-xl text-xs transition-all duration-150 flex items-center justify-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
            >
              Solicitar Interpretação Gratuita
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
