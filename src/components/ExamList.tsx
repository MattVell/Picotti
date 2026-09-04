import { useState } from 'react'
import { ArrowRight, CheckCircle, Clock, ShieldCheck, WhatsappLogo } from '@phosphor-icons/react'

interface ExamItem {
  id: string
  number: string
  title: string
  subtitle: string
  tag: string
  description: string
  duration: string
  indications: string[]
  accentColor: string
  isExclusiveGoioere?: boolean
}

const EXAMS: ExamItem[] = [
  {
    id: 'cone-beam',
    number: '01',
    title: 'Tomografia Cone Beam 3D',
    subtitle: 'Reconstrução volumétrica milimétrica com feixe cônico',
    tag: 'EXCLUSIVIDADE GOIOERÊ',
    description:
      'Exame tridimensional de altíssima fidelidade. Permite avaliar a espessura óssea em milímetros, localizar dentes inclusos, mapear canais complexos e planejar implantes com cirurgia guiada sem surpresas.',
    duration: 'Aprox. 15 a 20 segundos de escaneamento',
    indications: [
      'Planejamento de implantes dentários',
      'Localização de dentes inclusos e sisos',
      'Endodontia avançada e fraturas radiculares',
      'Avaliação da articulação têmporo-mandibular (ATM)',
    ],
    accentColor: '#0284C7',
    isExclusiveGoioere: true,
  },
  {
    id: 'scanner-3d',
    number: '02',
    title: 'Escaneamento Intraoral 3D',
    subtitle: 'Digitalização óptica direta das arcadas dentárias',
    tag: '100% DIGITAL • SEM MASSINHA',
    description:
      'Substitui completamente a moldagem antiga com alginato e gesso que causava ânsia e desconforto. Uma câmera de alta precisão gera um modelo digital 3D (.STL) perfeito em minutos para aparelhos e próteses.',
    duration: 'Apenas 3 a 5 minutos na cadeira',
    indications: [
      'Alinhadores invisíveis e aparelhos ortodônticos',
      'Próteses digitais fresadas em CAD/CAM',
      'Acompanhamento do desgaste e posição dos dentes',
    ],
    accentColor: '#0284C7',
  },
  {
    id: 'panoramica',
    number: '03',
    title: 'Radiografia Panorâmica Digital',
    subtitle: 'Visão completa das estruturas bucomaxilofaciais',
    tag: 'CHECK-UP GERAL RÁPIDO',
    description:
      'Uma única tomada rápida e indolor que registra todos os dentes superiores e inferiores, mandíbula, maxila e articulações. Essencial para diagnósticos preventivos, cáries ocultas e dentes que ainda vão nascer.',
    duration: 'Apenas 12 segundos de exposição',
    indications: [
      'Avaliação odontológica de rotina',
      'Pesquisa de lesões e infecções ósseas',
      'Acompanhamento do desenvolvimento dos dentes em jovens',
    ],
    accentColor: '#0369A1',
  },
  {
    id: 'cefalometria',
    number: '04',
    title: 'Telerradiografia & Cefalometria',
    subtitle: 'Tomadas de perfil com traçados computadorizados',
    tag: 'PLANEJAMENTO ORTODÔNTICO',
    description:
      'Radiografia lateral da face com medidas angulares e lineares traçadas em software. É o mapa que o ortodontista utiliza para planejar a correção do perfil facial e o movimento exato de cada dente.',
    duration: 'Rápido, estático e indolor',
    indications: [
      'Início de tratamentos com aparelho ortodôntico',
      'Cirurgia ortognática e correção de mordida',
      'Análise do crescimento esquelético da face',
    ],
    accentColor: '#0284C7',
  },
  {
    id: 'documentacao',
    number: '05',
    title: 'Documentação Ortodôntica Completa',
    subtitle: 'Dossiê completo para início do seu tratamento',
    tag: 'PACOTE INTEGRADO',
    description:
      'Protocolo padronizado completo contendo fotos profissionais intra e extraorais, radiografias panorâmicas, telerradiografia com traçado e modelos digitais/impressos prontos para o seu dentista.',
    duration: 'Tudo realizado em uma única visita',
    indications: [
      'Pacientes encaminhados para colocar aparelho',
      'Histórico e registro legal da evolução do sorriso',
    ],
    accentColor: '#0F172A',
  },
  {
    id: 'impressao-3d',
    number: '06',
    title: 'Impressão 3D e Modelos Odontológicos',
    subtitle: 'Materialização física de biomodelos a partir do 3D',
    tag: 'TECNOLOGIA DE PROTOTIPAGEM',
    description:
      'A partir do arquivo gerado pelo scanner ou tomógrafo, imprimimos a réplica exata da sua arcada em resina de alta definição para confecção precisa de guias cirúrgicos e placas.',
    duration: 'Disponibilizado rapidamente para o profissional',
    indications: [
      'Guias cirúrgicos para implantes sem corte extenso',
      'Placas de mordida e planejamento protético',
    ],
    accentColor: '#0369A1',
  },
  {
    id: 'periapicais',
    number: '07',
    title: 'Radiografias Periapicais & Interproximais',
    subtitle: 'Detecção pontual de altíssima resolução',
    tag: 'PRECISÃO MILIMÉTRICA',
    description:
      'Exames focados em um dente ou pequeno grupo dentário com sensor digital de baixa radiação. Detecta cáries interdentais no estágio inicial e acompanha a saúde da raiz e do canal.',
    duration: 'Disparo instantâneo em segundos',
    indications: [
      'Detecção de cáries entre os dentes (Bite-wing)',
      'Avaliação de canal tratado e dor localizada',
      'Controle pós-tratamento periodontal',
    ],
    accentColor: '#0284C7',
  },
]

export function ExamList() {
  const [activeId, setActiveId] = useState<string>('cone-beam')
  const activeExam = EXAMS.find((e) => e.id === activeId) || EXAMS[0]

  return (
    <section id="exames" className="py-24 bg-[#FBFBFD] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0284C7] block mb-2">
              PORTFÓLIO DE EXAMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] font-sans">
              Diagnóstico Completo para Qualquer Procedimento
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-[45ch] font-normal">
            Passe o mouse ou toque nos exames para conhecer os detalhes, indicações e tempos de realização.
          </p>
        </div>

        {/* Editorial Interactive Two-Column Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Vertical Fine-Line Menu */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-slate-200 border-y border-slate-200">
            {EXAMS.map((exam) => {
              const isSelected = exam.id === activeId

              return (
                <button
                  key={exam.id}
                  onClick={() => setActiveId(exam.id)}
                  onMouseEnter={() => setActiveId(exam.id)}
                  className={`w-full py-5 px-3 sm:px-4 flex items-center justify-between text-left transition-all duration-200 cursor-pointer group ${
                    isSelected ? 'bg-white shadow-sm -mx-1 px-4 sm:px-5 rounded-[6px]' : 'hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-mono transition-colors ${
                        isSelected ? 'text-[#0284C7] font-semibold' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    >
                      {exam.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-base sm:text-lg transition-colors font-sans ${
                            isSelected ? 'font-bold text-[#0F172A]' : 'font-medium text-slate-700 group-hover:text-[#0F172A]'
                          }`}
                        >
                          {exam.title}
                        </span>
                        {exam.isExclusiveGoioere && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded-[4px] bg-sky-100 text-sky-800 text-[10px] font-mono font-medium">
                            GOIOERÊ
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {exam.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={16}
                    className={`transition-all duration-200 shrink-0 ${
                      isSelected
                        ? 'text-[#0284C7] translate-x-1 opacity-100'
                        : 'text-slate-300 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* Right Column: Dynamic Editorial Preview Stage */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="double-bezel shadow-lg shadow-slate-900/5">
              <div className="double-bezel-inner p-6 sm:p-8 flex flex-col bg-white">
                
                {/* Badge and Number Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <span className="px-2.5 py-1 rounded-[4px] bg-[#F0F9FF] border border-[#BAE6FD] text-[#0369A1] text-xs font-mono font-semibold tracking-wider">
                    {activeExam.tag}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock size={15} className="text-[#0284C7]" />
                    <span>{activeExam.duration}</span>
                  </div>
                </div>

                {/* Exam Title & Deep Description */}
                <h3 className="text-2xl font-bold text-[#0F172A] tracking-tight mb-3 font-sans">
                  {activeExam.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {activeExam.description}
                </p>

                {/* Indications Checklist */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-[6px] p-4 sm:p-5 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5 font-sans">
                    <ShieldCheck size={16} className="text-[#0284C7]" weight="fill" />
                    Quando este exame é indicado:
                  </h4>
                  <ul className="space-y-2">
                    {activeExam.indications.map((ind, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <CheckCircle size={16} className="text-[#0284C7] shrink-0 mt-0.5" weight="fill" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Row for the specific exam */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-400 font-mono">
                    LAUDOS EM ALTA DEFINIÇÃO
                  </span>
                  <a
                    href={`https://wa.me/5544999499438?text=Olá!%20Gostaria%20de%20saber%20mais%20e%20agendar%20o%20exame%20de%20${encodeURIComponent(
                      activeExam.title
                    )}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2 rounded-[6px] text-xs font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    <WhatsappLogo size={16} weight="fill" />
                    <span>Agendar este Exame</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
