export interface StudyPlanDay {
  id: string;
  dayName: string;
  focusSubject: string;
  hours: number;
  tasks: string[];
  completed?: boolean;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  badge?: string;
}

export interface MentorshipPlan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pricing: string;
  features: string[];
  expandedFeatures: string[];
  ctaText: string;
  colorTheme: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "LOAS (Lei Orgânica da Assistência Social)",
    question: "De acordo com a Lei Orgânica da Assistência Social (LOAS - Lei nº 8.742/1993), o Benefício de Prestação Continuada (BPC) consiste na garantia de um salário-mínimo mensal à pessoa com deficiência e ao idoso que comprovem não possuir meios para prover a própria manutenção. Qual a idade mínima para o idoso ter direito a esse benefício?",
    options: [
      "60 (sessenta) anos de idade.",
      "62 (sessenta e dois) anos de idade.",
      "65 (sessenta e cinco) anos de idade.",
      "70 (setenta) anos de idade."
    ],
    correctAnswer: 2,
    explanation: "Alternativa Correta: 65 anos de idade. Conforme o Artigo 20 da LOAS, o benefício é devido à pessoa com deficiência e ao idoso com idade de 65 anos ou mais, que comprovem não possuir meios de prover a própria manutenção, nem de tê-la provida por sua família."
  },
  {
    id: 2,
    category: "SUAS (Sistema Único de Assistência Social)",
    question: "No âmbito da organização do Sistema Único de Assistência Social (SUAS), as ações afiançadas pela assistência social dividem-se em proteção social básica e proteção social especial. Qual das alternativas a seguir apresenta um equipamento estatal correspondente à Proteção Social Básica?",
    options: [
      "CREAS (Centro de Referência Especializado de Assistência Social).",
      "CRAS (Centro de Referência de Assistência Social).",
      "Centro Pop (Centro de Referência Especializado para População em Situação de Rua).",
      "Unidade de Acolhimento Institucional (Abrigo)."
    ],
    correctAnswer: 1,
    explanation: "Alternativa Correta: CRAS. O CRAS é a unidade pública estatal descentralizada e responsável pela execução de serviços e programas de Proteção Social Básica, visando à prevenção de situações de risco social. Os demais (CREAS, Centro Pop e Abrigos) pertencem à Proteção Social Especial de Média ou Alta Complexidade."
  },
  {
    id: 3,
    category: "Código de Ética do Assistente Social",
    question: "O Código de Ética Profissional do Assistente Social de 1993 estabelece uma série de princípios fundamentais que regem a categoria profissional. Qual dos itens abaixo NÃO constitui um princípio fundamental desse código?",
    options: [
      "Reconhecimento da liberdade como valor ético central.",
      "Defesa intransigente dos direitos humanos e recusa do arbítrio e do autoritarismo.",
      "Opção por uma prática profissional corporativista, isenta de posicionamento político.",
      "Garantia do pluralismo, por meio do respeito às correntes profissionais democráticas existentes."
    ],
    correctAnswer: 2,
    explanation: "Alternativa Correta: Opção por uma prática profissional corporativista... Na verdade, o Código estimula o compromisso com a democracia, a autonomia e a participação social, rejeitando posturas corporativistas isoladas ou neutras, pois o assistente social atua politicamente alinhado às demandas da classe trabalhadora."
  },
  {
    id: 4,
    category: "Políticas Públicas & Atuação no Serviço Social",
    question: "No processo de planejamento no Serviço Social, a etapa voltada para o levantamento sistemático e crítico da realidade social de um território, identificando suas vulnerabilidades e potencialidades, denomina-se:",
    options: [
      "Intervenção Executiva.",
      "Diagnóstico Social.",
      "Avaliação de Impacto.",
      "Estudos de Viabilidade Financeira."
    ],
    correctAnswer: 1,
    explanation: "Alternativa Correta: Diagnóstico Social. É no diagnóstico que o profissional compreende as expressões da questão social de modo qualificado para propor respostas teóricas e práticas eficientes, servindo de base lógica para o plano de ação."
  },
  {
    id: 5,
    category: "Legislação Social - Estatuto da Criança e do Adolescente (ECA)",
    question: "O Estatuto da Criança e do Adolescente (ECA) consagra a doutrina da proteção integral. Nos termos da legislação vigente, considera-se criança, para os efeitos desta Lei, a pessoa:",
    options: [
      "Até 10 (dez) anos incompletos.",
      "Até 12 (doze) anos incompletos.",
      "Até 14 (quatorze) anos incompletos.",
      "Até 15 (quinze) anos e 11 meses de idade."
    ],
    correctAnswer: 1,
    explanation: "Alternativa Correta: Até 12 anos incompletos. Segundo o Art. 2º do ECA, considera-se criança a pessoa até doze anos de idade incompletos, e adolescente aquela entre doze e dezoito anos de idade."
  }
];

export const MENTORSHIP_PLANS: MentorshipPlan[] = [
  {
    id: "mentoria",
    name: "Mentoria Individual",
    tagline: "Acompanhamento 100% Personalizado",
    description: "Ideal para concurseiros que buscam máxima eficiência, rotinas blindadas e ajuste preciso de desempenho com o mentor.",
    pricing: "Vagas Limitadas / Mês",
    features: [
      "Cronograma personalizado alinhado ao seu edital",
      "Sessões individuais quinzenais de mentoria (videochamada)",
      "Análise de desempenho contínua por simulados",
      "Suporte prioritário e direto no WhatsApp",
      "Orientação emocional e controle de ansiedade profissional"
    ],
    expandedFeatures: [
      "Entrevista diagnóstica profunda para mapear pontos fracos legislativos",
      "Metodologia de ciclo de estudos para Serviço Social",
      "Adequação do ritmo de vida e trabalho aos estudos",
      "Acesso completo ao banco de simulados comentados",
      "Feedback detalhado sobre discursivas e estudos de caso"
    ],
    ctaText: "Garantir Minha Vaga",
    colorTheme: "emerald"
  },
  {
    id: "curso",
    name: "Curso Preparatório",
    tagline: "Teoria Sistematizada e Prática",
    description: "Domine as principais legislações (LOAS, SUAS, Ética e ECA) de forma simples, objetiva e focada na aprovação.",
    pricing: "Acesso Imediato",
    features: [
      "Videoaulas dinâmicas de toda a legislação social",
      "Resumos e apostilas focados em concursos públicos",
      "Videoaulas exclusivas sobre o Código de Ética de 1993",
      "Mais de 500 questões comentadas item a item",
      "Fórum de dúvidas respondido pelo Prof. Marcos Vinícius"
    ],
    expandedFeatures: [
      "Módulos atualizados com as últimas diretrizes do SUAS",
      "Técnicas de memorização por repetição espaçada",
      "Mapas mentais focados em aprovação",
      "Aulas ao vivo de revisão de editais de prefeituras e tribunais",
      "Materiais complementares atualizados em PDF para download"
    ],
    ctaText: "Inscrever-me Agora",
    colorTheme: "navy"
  },
  {
    id: "simulados",
    name: "Simulados e Revisões",
    tagline: "Afie sua Pontaria nas Questões",
    description: "Materiais diretos ao ponto focados em te treinar para errar menos e dominar as maiores bancas de concurso do Brasil.",
    pricing: "Pronto para Download",
    features: [
      "Simulados inéditos com peso real de provas",
      "Gabarito altamente comentado e fundamentado",
      "Mapas mentais esquematizados para revisão de véspera",
      "Caderno de resumos estratégicos em PDF",
      "Guia prático de interpretação de pegadinhas de bancas"
    ],
    expandedFeatures: [
      "Treinamento de velocidade por simulação cronometrada",
      "Checklists de revisão periódica de conteúdo",
      "Estatísticas de erros por subtema para guiar seus rumos",
      "Modelos de mapas mentais em cores e preto-e-branco para impressão",
      "Atualizações de jurisprudência do Serviço Social inclusas por 1 ano"
    ],
    ctaText: "Baixar Simulados",
    colorTheme: "teal"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "juliana",
    name: "Juliana Ferreira",
    role: "Aprovada no Concurso Municipal",
    text: "Depois da mentoria com o Prof. Marcos, consegui organizar meus estudos de forma lógica. Deixei de estudar sem rumo e conquistei minha colocação no serviço de acolhimento!",
    badge: "1º Lugar"
  },
  {
    id: "renata",
    name: "Renata Souza",
    role: "Aprovada em Tribunal de Justiça (TJ)",
    text: "Os simulados focados em Serviço Social do Método Aprovação Social ajudaram muito na memorização da LOAS de forma intuitiva. Fazer a prova sabendo o que a banca queria foi libertador.",
    badge: "TJ Assistente Social"
  },
  {
    id: "felipe",
    name: "Felipe Martins",
    role: "Aprovado em Concurso Federal",
    text: "Conteúdo direto ao ponto e extremamente atualizado. O cronograma estratégico do Método reduziu pela metade minhas horas perdidas no estudo sem direção.",
    badge: "Aprovado INSS"
  }
];
