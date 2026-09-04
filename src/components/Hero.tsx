import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CalendarBlank } from '@phosphor-icons/react'
import heroFacadeBg from '../assets/fachada-picotti-169-2.jpg'

interface HeroProps {
  activeCity: 'goioere' | 'nova_aurora'
  isPreloaderFinished: boolean
}

export function Hero({ activeCity, isPreloaderFinished }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineLine1Ref = useRef<HTMLSpanElement>(null)
  const headlineLine2Ref = useRef<HTMLSpanElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)

  const whatsappUrl =
    activeCity === 'goioere'
      ? 'https://wa.me/5544999499438?text=Olá!%20Gostaria%20de%20agendar%20um%20exame%20na%20unidade%20de%20Goioerê.'
      : 'https://wa.me/5544999499438?text=Olá!%20Gostaria%20de%20agendar%20um%20exame%20na%20unidade%20de%20Nova%20Aurora.'

  useEffect(() => {
    if (!isPreloaderFinished) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Text Mask Reveal: headlines rise seamlessly from behind overflow-hidden masks
      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current],
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.12 }
      )

      // CTAs fade in with subtle physical rise
      tl.fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.45'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [isPreloaderFinished])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-start overflow-hidden bg-[#0C2B4E]"
    >
      {/* 1. Un-zoomed Authentic Facade Photography (Foco na Fachada Picotti 169 2.jpg, 75-85% de cobertura) */}
      <div className="absolute inset-0 select-none pointer-events-none overflow-hidden flex items-center justify-end">
        <div className="relative w-full lg:w-[82%] xl:w-[85%] 2xl:w-[85%] h-full flex items-center justify-end">
          <img
            src={heroFacadeBg}
            alt="Fachada moderna da clínica Picotti Radiodiagnóstico Odontológico"
            fetchPriority="high"
            className="w-full h-full object-cover object-[67%_38%] select-none pointer-events-none"
          />

          {/* Leve camada azul por cima da imagem com ~15% de opacidade para equilíbrio cromático */}
          <div className="absolute inset-0 bg-[#0C2B4E]/15 pointer-events-none z-[1]" />

          {/* Desktop Left-to-Right Degradê: fusão suave do azul para garantir leitura impecável do texto */}
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-72 sm:w-84 xl:w-[420px] pointer-events-none z-[2]"
            style={{
              background:
                'linear-gradient(90deg, #0C2B4E 0%, rgba(12, 43, 78, 0.95) 30%, rgba(12, 43, 78, 0.55) 65%, rgba(12, 43, 78, 0.15) 85%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* 2. Mobile & Tablet Scrim (Equilibrado para manter a fachada visível e o texto legível) */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(180deg, rgba(12, 43, 78, 0.88) 0%, rgba(12, 43, 78, 0.68) 42%, rgba(12, 43, 78, 0.30) 75%, #0C2B4E 100%)',
        }}
      />

      {/* Top Ambient Vignette in Picotti Sapphire (Secures navbar contrast) */}
      <div
        className="absolute top-0 left-0 right-0 h-28 sm:h-36 pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12, 43, 78, 0.80) 0%, rgba(12, 43, 78, 0.35) 60%, transparent 100%)',
        }}
      />

      {/* Bottom Broad Linear Degradê (~200px) in Picotti Sapphire: dissolves pavement seamlessly into #0C2B4E */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 lg:h-60 pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(to top, #0C2B4E 0%, rgba(12, 43, 78, 0.92) 28%, rgba(12, 43, 78, 0.45) 65%, transparent 100%)',
        }}
      />

      {/* 2. Hero Content Container (Stays on the solid navy left half) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24 sm:pt-36 sm:pb-28 lg:py-36 relative z-10">
        <div className="max-w-xl lg:max-w-lg xl:max-w-xl text-left">
          
          {/* High-Impact Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-bold text-white tracking-[-0.03em] leading-[1.12] font-sans">
            <span className="block overflow-hidden pb-1 sm:pb-2">
              <span ref={headlineLine1Ref} className="block will-change-transform">
                Precisão e Tecnologia
              </span>
            </span>
            <span className="block overflow-hidden pb-1 sm:pb-2">
              <span ref={headlineLine2Ref} className="block will-change-transform text-white">
                para seu Sorriso
              </span>
            </span>
          </h1>

          {/* Action Buttons Group */}
          <div
            ref={ctaGroupRef}
            className="flex flex-row flex-wrap items-center gap-3.5 sm:gap-4 pt-8 sm:pt-10 w-full sm:w-auto"
          >
            {/* Primary Action Button (Picotti Blue Solid + Calendar Icon) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-[6px] text-sm sm:text-base font-semibold transition-all shadow-sm hover:shadow-md hover:shadow-sky-950/30 active:scale-[0.98] cursor-pointer"
            >
              <CalendarBlank size={20} weight="bold" />
              <span>Agendar Exame</span>
            </a>

            {/* Secondary Action Button (Restrained Surgical Glassmorphism) */}
            <a
              href="#unidades"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/35 hover:border-white/60 px-6 sm:px-7 py-3.5 sm:py-4 rounded-[6px] text-sm sm:text-base font-medium backdrop-blur-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Nossas Unidades</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
