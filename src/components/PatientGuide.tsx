import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ForkKnife, Sparkle, ShieldCheck } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

interface Step {
  number: string
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Não Exige Jejum',
    subtitle: 'Alimentação e rotina normais',
    description:
      'Você pode se alimentar e tomar suas medicações de rotina normalmente antes de comparecer à clínica. Exames odontológicos radiológicos não necessitam de nenhum período em jejum.',
    icon: ForkKnife,
  },
  {
    number: '02',
    title: 'Remoção de Metais',
    subtitle: 'Para máxima nitidez do exame',
    description:
      'Antes de entrar na sala do tomógrafo ou scanner, pediremos para retirar brincos, correntes, presilhas e piercings na cabeça ou pescoço para evitar reflexos metálicos na imagem.',
    icon: Sparkle,
  },
  {
    number: '03',
    title: 'Rápido e Seguro',
    subtitle: 'Baixíssima radiação e sem dor',
    description:
      'O disparo ou escaneamento dura poucos segundos e é totalmente indolor. Nossos sensores digitais emitem até 80% menos radiação e você é liberado imediatamente.',
    icon: ShieldCheck,
  },
]

export function PatientGuide() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal progressive line illumination on scroll
      gsap.fromTo(
        progressLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.5,
          },
        }
      )

      // Step cards illumination with stagger
      stepRefs.current.forEach((el) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0.35, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="preparo"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white border-t border-slate-200/80 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0284C7] block mb-2">
            TRANQUILIDADE & CONFORTO
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] font-sans">
            O Que Saber Antes da Sua Visita
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 sm:mt-3 font-normal">
            Três orientações simples para que o seu atendimento seja rápido, agradável e sem qualquer surpresa.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          
          {/* Subtle Horizontal Connecting Progress Track (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-100 z-0">
            <div
              ref={progressLineRef}
              className="w-full h-full bg-[#0284C7] origin-left"
            />
          </div>

          {/* 3 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 relative z-10">
            {STEPS.map((step, idx) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  ref={(el) => { stepRefs.current[idx] = el }}
                  className="double-bezel transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="double-bezel-inner p-6 sm:p-7 flex flex-col h-full bg-[#FBFBFD]">
                    
                    {/* Top: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-bold font-mono text-[#0284C7]">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-[6px] bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] flex items-center justify-center">
                        <Icon size={20} weight="fill" />
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-lg font-bold text-[#0F172A] mb-1 font-sans">
                      {step.title}
                    </h3>
                    <span className="text-xs font-mono font-medium text-[#0369A1] mb-4 block">
                      {step.subtitle}
                    </span>

                    {/* Step Description */}
                    <p className="text-sm text-slate-600 leading-relaxed font-normal mt-auto">
                      {step.description}
                    </p>

                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
