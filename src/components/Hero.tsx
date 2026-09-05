import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CalendarBlank } from '@phosphor-icons/react'
import heroFacadeBg from '../assets/fachada-picotti-169-2.jpg'
import heroFacadeMobile from '../assets/fachada-picotti-mobile.jpg'

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
      className="relative min-h-[100dvh] flex flex-col justify-between lg:justify-center overflow-hidden bg-[#0C2B4E]"
    >
      {/* 1. Desktop Authentic Facade Photography (Widescreen right-half layout) */}
      <div className="hidden lg:flex absolute inset-0 select-none pointer-events-none overflow-hidden items-center justify-end z-0">
        <div className="relative w-full lg:w-[82%] xl:w-[85%] 2xl:w-[85%] h-full flex items-center justify-end">
          <img
            src={heroFacadeBg}
            alt="Fachada moderna da clínica Picotti Radiodiagnóstico Odontológico"
            fetchPriority="high"
            className="w-full h-full object-cover object-[67%_38%] select-none pointer-events-none"
          />

          {/* Leve camada azul por cima da imagem para equilíbrio cromático */}
          <div className="absolute inset-0 bg-[#0C2B4E]/15 pointer-events-none z-[1]" />

          {/* Desktop Left-to-Right Degradê: fusão suave do azul para leitura 100% limpa */}
          <div
            className="absolute inset-y-0 left-0 w-72 sm:w-84 xl:w-[420px] pointer-events-none z-[2]"
            style={{
              background:
                'linear-gradient(90deg, #0C2B4E 0%, rgba(12, 43, 78, 0.95) 30%, rgba(12, 43, 78, 0.55) 65%, rgba(12, 43, 78, 0.15) 85%, transparent 100%)',
            }}
          />
        </div>
      </div>

      {/* Top Ambient Vignette in Picotti Sapphire (Protege contraste da navbar) */}
      <div
        className="absolute top-0 left-0 right-0 h-24 sm:h-32 pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(12, 43, 78, 0.90) 0%, rgba(12, 43, 78, 0.4) 60%, transparent 100%)',
        }}
      />

      {/* Desktop Bottom Degradê */}
      <div
        className="hidden lg:block absolute bottom-0 left-0 right-0 h-40 sm:h-52 lg:h-60 pointer-events-none z-[2]"
        style={{
          background:
            'linear-gradient(to top, #0C2B4E 0%, rgba(12, 43, 78, 0.92) 28%, rgba(12, 43, 78, 0.45) 65%, transparent 100%)',
        }}
      />

      {/* 2. Hero Content Container (No mobile, ocupa a metade superior limpa com clearance perfeito da navbar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[88px] xs:pt-[96px] sm:pt-28 pb-3 sm:pb-5 lg:py-36 relative z-10 flex-none">
        <div className="max-w-xl lg:max-w-lg xl:max-w-xl text-left">
          
          {/* Subtle Technical Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-white/10 border border-white/20 text-sky-300 text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-3 sm:mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>Imaginologia Odontológica • PR</span>
          </div>

          {/* High-Impact Headline */}
          <h1 className="text-[30px] xs:text-[34px] sm:text-5xl lg:text-[54px] xl:text-[62px] font-bold text-white tracking-[-0.03em] leading-[1.14] sm:leading-[1.12] font-sans">
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

          <p className="text-[13px] xs:text-sm sm:text-base text-slate-300 max-w-[48ch] mt-2.5 sm:mt-4 font-normal leading-relaxed">
            Tomografia Cone Beam 3D, escaneamento intraoral digital e radiologia especializada com rigor técnico em Goioerê e Nova Aurora.
          </p>

          {/* Action Buttons Group (Full-width responsive stack on mobile, inline on desktop) */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-4 sm:pt-8 w-full sm:w-auto"
          >
            {/* Primary Action Button (Picotti Blue Solid + Calendar Icon) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white px-6 sm:px-7 py-3 sm:py-4 rounded-[6px] text-sm sm:text-base font-semibold transition-all shadow-sm hover:shadow-md hover:shadow-sky-950/30 active:scale-[0.98] cursor-pointer min-h-[46px] sm:min-h-[48px]"
            >
              <CalendarBlank size={20} weight="bold" />
              <span>Agendar Exame</span>
            </a>

            {/* Secondary Action Button (Restrained Surgical Glassmorphism) */}
            <a
              href="#unidades"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/35 hover:border-white/60 px-6 sm:px-7 py-3 sm:py-4 rounded-[6px] text-sm sm:text-base font-medium backdrop-blur-sm transition-all active:scale-[0.98] cursor-pointer min-h-[46px] sm:min-h-[48px]"
            >
              <span>Nossas Unidades</span>
            </a>
          </div>

        </div>
      </div>

      {/* 3. Mobile & Tablet Facade (Ocupa toda a parte restante da hero com enquadramento focado na clínica Picotti) */}
      <div className="lg:hidden relative w-full flex-1 min-h-[340px] sm:min-h-[420px] pointer-events-none select-none overflow-hidden z-0 mt-3 sm:mt-6">
        <img
          src={heroFacadeMobile}
          alt="Fachada moderna da clínica Picotti em Goioerê"
          className="absolute inset-0 w-full h-full object-cover object-[50%_18%] select-none"
        />

        {/* Leve tonalização azul para harmonia com a paleta Picotti */}
        <div className="absolute inset-0 bg-[#0C2B4E]/10" />

        {/* Fusão Superior Suave: Dissolve a foto suavemente para o azul marinho a partir da linha dos botões */}
        <div
          className="absolute inset-x-0 top-0 h-16 sm:h-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, #0C2B4E 0%, rgba(12, 43, 78, 0.85) 30%, rgba(12, 43, 78, 0.25) 70%, transparent 100%)',
          }}
        />

      </div>
    </section>
  )
}
