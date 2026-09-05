import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, Lightning, ShieldCheck, Scan, Crosshair, Sparkle } from '@phosphor-icons/react'
import patientSmileImg from '../assets/patient_smile.jpg'
import patientScanImg from '../assets/patient_scan.jpg'

gsap.registerPlugin(ScrollTrigger)

const ANATOMICAL_ZONES = [
  { title: 'Coroas & Esmalte Dental', detail: 'Avaliação microestrutural de superfície e alinhamento' },
  { title: 'Canais Radiculares & Polpa', detail: 'Mapeamento 3D de raízes e condutos endodônticos' },
  { title: 'Nervo Mandibular & Osso Alveolar', detail: 'Medição de altura óssea para planejamento de implantes' },
  { title: 'Densidade Óssea Basal', detail: 'Análise quantitativa de densidade e rebordo alveolar' },
]

export function ScanViewer() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const visualChamberRef = useRef<HTMLDivElement>(null)
  const laserRef = useRef<HTMLDivElement>(null)
  const laserTagRef = useRef<HTMLSpanElement>(null)
  const scanOverlayRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const corteValRef = useRef<HTMLSpanElement>(null)
  const profundidadeValRef = useRef<HTMLSpanElement>(null)
  const progressPctRef = useRef<HTMLSpanElement>(null)
  const focusScanTagRef = useRef<HTMLSpanElement>(null)

  const [activeZone, setActiveZone] = useState<number>(0)
  const [activeLayer, setActiveLayer] = useState<'both' | 'smile' | 'cbct'>('both')

  const activeLayerRef = useRef<'both' | 'smile' | 'cbct'>('both')
  const lastProgressRef = useRef<number>(0)
  const currentZoneRef = useRef<number>(0)

  useEffect(() => {
    activeLayerRef.current = activeLayer
  }, [activeLayer])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Proxy unificado para controle estrito de progresso sem dessincronia
      const scanProxy = { progress: 0 }

      // Timeline com pin no stageContainer logo abaixo da navbar para enquadramento perfeito sem cortes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: () => (window.innerWidth < 640 ? 'top 72px' : 'top 80px'),
          end: '+=2200', // Curso de rolagem estendido para controle milimétrico e confortável
          pin: true,
          pinSpacing: true,
          scrub: 1.2, // Inércia física aveludada
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(scanProxy, {
        progress: 100,
        ease: 'none',
        duration: 1,
        onUpdate: () => {
          const pct = scanProxy.progress
          lastProgressRef.current = pct

          // 1. Sincronização matemática da imagem e do feixe laser no mesmo frame exato
          if (activeLayerRef.current === 'both') {
            if (scanOverlayRef.current) {
              scanOverlayRef.current.style.clipPath = `inset(0% 0% ${100 - pct}% 0%)`
            }
            if (laserRef.current) {
              laserRef.current.style.top = `${pct}%`
            }
          }

          // 2. Barra de progresso interativa inferior
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${pct / 100})`
          }

          // 3. Atualizações diretas no DOM para performance cirúrgica a 60/120 FPS
          const rounded = Math.round(pct)
          if (laserTagRef.current) {
            laserTagRef.current.textContent = `SCAN: ${rounded}%`
          }
          if (focusScanTagRef.current) {
            focusScanTagRef.current.textContent = `${rounded}% SCAN`
          }
          if (progressPctRef.current) {
            progressPctRef.current.textContent = `${rounded}%`
          }
          if (corteValRef.current) {
            const sliceNum = String(Math.min(180, Math.max(1, Math.round(pct * 1.8)))).padStart(3, '0')
            corteValRef.current.textContent = `AX_${sliceNum}/180`
          }
          if (profundidadeValRef.current) {
            profundidadeValRef.current.textContent = `${(pct * 0.42).toFixed(1)} mm`
          }

          // 4. Mudança de zona anatômica apenas ao cruzar limiares (sem re-renderizar a cada frame)
          const newZone = pct < 25 ? 0 : pct < 55 ? 1 : pct < 80 ? 2 : 3
          if (newZone !== currentZoneRef.current) {
            currentZoneRef.current = newZone
            setActiveZone(newZone)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Troca de visualização sem destruir nem desestabilizar o ScrollTrigger
  const handleLayerChange = (layer: 'both' | 'smile' | 'cbct') => {
    setActiveLayer(layer)
    activeLayerRef.current = layer

    if (!scanOverlayRef.current) return

    if (layer === 'smile') {
      scanOverlayRef.current.style.opacity = '0'
      if (laserRef.current) laserRef.current.style.opacity = '0'
    } else if (layer === 'cbct') {
      scanOverlayRef.current.style.opacity = '1'
      scanOverlayRef.current.style.clipPath = 'inset(0% 0% 0% 0%)'
      if (laserRef.current) laserRef.current.style.opacity = '0'
    } else {
      // Modo 'both' (corte no scroll restaurado à posição atual)
      const pct = lastProgressRef.current
      scanOverlayRef.current.style.opacity = '1'
      scanOverlayRef.current.style.clipPath = `inset(0% 0% ${100 - pct}% 0%)`
      if (laserRef.current) {
        laserRef.current.style.opacity = '1'
        laserRef.current.style.top = `${pct}%`
      }
    }
  }

  const currentFocus = ANATOMICAL_ZONES[activeZone]

  return (
    <>
      <section
        id="tecnologia"
        ref={sectionRef}
        className="relative bg-[#0B1120] text-white overflow-hidden select-none"
      >
        {/* Precision Diagnostic Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(56,189,248,0.12)_1px,transparent_1px)] [background-size:28px_28px] opacity-60 pointer-events-none" />
        
        {/* Ambient Radial Surgical Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Intro Section Header: Introduces the technology cleanly as the user scrolls into the section */}
        <div className="max-w-7xl mx-auto w-full px-3 xs:px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-6 sm:pb-8 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-[4px] bg-sky-950/80 border border-sky-800/80 text-sky-400 text-[10px] sm:text-xs font-mono tracking-wider uppercase mb-2 sm:mb-3">
            <Scan size={14} weight="bold" />
            <span>TOMOGRAFIA COMPUTADORIZADA CONE BEAM 3D</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans leading-tight mb-2 sm:mb-3">
            Diagnóstico Além da Superfície
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-[65ch] font-normal leading-relaxed">
            Role a página para ver a tomografia revelar a anatomia óssea, raízes e condutos nervosos em alta definição.
          </p>
        </div>

        {/* Pinned Interactive Stage: Anchors right below navbar and fits 100% inside viewport without cropping */}
        <div
          ref={stageRef}
          className="relative w-full h-[calc(100dvh-4.5rem)] sm:h-[calc(100dvh-5rem)] flex flex-col justify-center px-3 xs:px-4 sm:px-6 lg:px-8 py-2 sm:py-3 z-10"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full">
            
            {/* Top HUD Strip Row (Aligned with Image 2 specification) */}
            <div className="border-b border-slate-800/80 pb-2 sm:pb-3 mb-2 sm:mb-3 shrink-0">
              <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-sky-950/80 border border-sky-800/80 text-sky-400 text-[10px] sm:text-xs font-mono tracking-wider uppercase">
                    <Scan size={13} weight="bold" />
                    <span>CONE BEAM 3D</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                    Diagnóstico Além da Superfície
                  </span>
                  <span className="hidden md:inline text-xs text-slate-400">
                    • Tomografia em alta definição
                  </span>
                </div>

                {/* Status Display: Sleek HUD strip (Desktop & Mobile) */}
                <div className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-6 bg-slate-900/90 border border-slate-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-[6px] sm:rounded-[8px] text-[10px] sm:text-xs font-mono shadow-lg backdrop-blur-md shrink-0">
                  <div>
                    <span className="text-slate-500 block text-[9px] sm:text-[10px]">CORTE</span>
                    <span ref={corteValRef} className="text-sky-400 font-bold">
                      AX_001/180
                    </span>
                  </div>
                  <div className="h-4 sm:h-6 w-[1px] bg-slate-800" />
                  <div>
                    <span className="text-slate-500 block text-[9px] sm:text-[10px]">PROFUNDIDADE</span>
                    <span ref={profundidadeValRef} className="text-emerald-400 font-bold">
                      0.0 mm
                    </span>
                  </div>
                  <div className="h-4 sm:h-6 w-[1px] bg-slate-800" />
                  <div>
                    <span className="text-slate-500 block text-[9px] sm:text-[10px]">SCAN</span>
                    <span ref={progressPctRef} className="text-sky-300 font-bold">
                      0%
                    </span>
                  </div>
                </div>
              </div>
            </div>

          {/* Main Visualizer Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-center flex-grow my-auto">
            
            {/* Desktop Left Column: Real-time Specifications & Features */}
            <div className="hidden lg:flex lg:col-span-5 flex-col gap-3.5 xl:gap-4">
              
              {/* Dynamic Focus Card (Desktop) */}
              <div className="bg-gradient-to-br from-sky-950/40 to-slate-900/80 border border-sky-500/30 p-4 xl:p-5 rounded-[10px] shadow-lg backdrop-blur-sm relative overflow-hidden transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Crosshair size={14} weight="bold" />
                    Estrutura em Foco
                  </span>
                  <span
                    ref={focusScanTagRef}
                    className="text-[10px] font-mono bg-sky-900/60 text-sky-300 px-2 py-0.5 rounded border border-sky-700/50"
                  >
                    0% SCAN
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1 font-sans transition-all duration-200">
                  {currentFocus.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed transition-all duration-200">
                  {currentFocus.detail}
                </p>
              </div>

              {/* Desktop Feature Card 1 */}
              <div className="bg-slate-900/70 border border-slate-800/80 p-3.5 xl:p-4 rounded-[8px] transition-all hover:border-slate-700">
                <div className="flex items-center gap-2.5 text-sky-400 mb-1">
                  <Lightning size={16} weight="fill" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Adeus à Moldagem com Massa
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  O escaneamento intraoral óptico captura mais de 3.000 fotos/s, criando o mapa 3D imediato sem enjoo.
                </p>
              </div>

              {/* Desktop Feature Card 2 */}
              <div className="bg-slate-900/70 border border-slate-800/80 p-3.5 xl:p-4 rounded-[8px] transition-all hover:border-slate-700">
                <div className="flex items-center gap-2.5 text-sky-400 mb-1">
                  <Eye size={16} weight="fill" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Exclusividade Goioerê & Região
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Visualização 3D milimétrica de nervos mandibulares, espessura óssea e dentes inclusos para cirurgias guiadas.
                </p>
              </div>

              {/* Desktop Feature Card 3 */}
              <div className="bg-slate-900/70 border border-slate-800/80 p-3.5 xl:p-4 rounded-[8px] transition-all hover:border-slate-700">
                <div className="flex items-center gap-2.5 text-emerald-400 mb-1">
                  <ShieldCheck size={16} weight="fill" />
                  <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    Ultra-Low Dose (Segurança Total)
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Até 80% menos exposição radiológica que tomografias tradicionais, com máxima proteção e nitidez.
                </p>
              </div>

            </div>

            {/* Right Column (Desktop) / Primary View (Mobile): Large, Prominent 3D Chamber */}
            <div className="w-full lg:col-span-7 flex flex-col items-center justify-center">
              <div
                ref={visualChamberRef}
                className="relative w-full max-w-[390px] xs:max-w-[430px] sm:max-w-[500px] lg:max-w-[min(540px,calc(100dvh-175px))] xl:max-w-[min(580px,calc(100dvh-175px))] aspect-square max-h-[46dvh] xs:max-h-[50dvh] sm:max-h-[56dvh] lg:max-h-[min(540px,calc(100dvh-175px))] xl:max-h-[min(580px,calc(100dvh-175px))] mx-auto bg-slate-950 rounded-[12px] sm:rounded-[14px] border border-slate-800 p-2.5 sm:p-4 flex flex-col items-center justify-center overflow-hidden shadow-2xl backdrop-blur-xl shrink-0"
              >
                {/* Technical Header Badges */}
                <div className="absolute top-2 sm:top-4 left-2.5 sm:left-4 font-mono text-[9px] sm:text-[10px] text-slate-400 bg-slate-900/85 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-slate-800 z-20">
                  FOV: 120 x 100 mm • CONE BEAM 3D
                </div>
                <div className="absolute top-2 sm:top-4 right-2.5 sm:right-4 font-mono text-[9px] sm:text-[10px] text-emerald-400 bg-slate-900/85 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-slate-800 z-20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  SENSOR ATIVO
                </div>

                {/* Central Visual Dual-Layer Container */}
                <div className="relative w-full h-full rounded-[6px] sm:rounded-[8px] overflow-hidden border border-slate-800/60 shadow-inner bg-[#030712] flex items-center justify-center">
                  
                  {/* LAYER 1 (Base): Natural Patient Smile */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      activeLayer === 'cbct' ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <img
                      src={patientSmileImg}
                      alt="Sorriso natural do paciente"
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 pointer-events-none" />
                  </div>

                  {/* LAYER 2 (Overlay): Cone Beam Tomography 3D Scan */}
                  <div
                    ref={scanOverlayRef}
                    className="absolute inset-0 transition-opacity duration-300 will-change-[clip-path]"
                    style={{
                      clipPath: 'inset(0% 0% 100% 0%)',
                    }}
                  >
                    <img
                      src={patientScanImg}
                      alt="Tomografia Cone Beam 3D e estrutura óssea"
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                    />
                    
                    {/* Neon Grid Overlay on Scan */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.15)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] pointer-events-none mix-blend-screen opacity-40" />
                  </div>

                  {/* Laser Scanning Beam (Strictly Synchronized with Scroll Reveal) */}
                  <div
                    ref={laserRef}
                    className={`absolute left-0 right-0 h-[2px] sm:h-[2.5px] bg-sky-400 z-30 pointer-events-none -translate-y-1/2 will-change-[top,transform] shadow-[0_0_12px_#38bdf8,0_0_24px_#0284c7] transition-opacity duration-200 ${
                      activeLayer === 'both' ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ top: '0%' }}
                  >
                    {/* Laser Beam Highlight */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-100 to-transparent opacity-80" />

                    {/* Laser Center Reticle */}
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-sky-300 bg-sky-400/40 flex items-center justify-center backdrop-blur-sm shadow-[0_0_10px_#38bdf8]">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    </div>

                    {/* Laser Scan Coordinates Tag */}
                    <div className="absolute right-2 sm:right-3 -top-4 sm:-top-5 font-mono text-[8px] sm:text-[9px] text-sky-300 bg-slate-950/95 px-1 sm:px-1.5 py-0.5 rounded border border-sky-500/50 shadow-md">
                      <span ref={laserTagRef}>SCAN: 0%</span>
                    </div>
                  </div>

                  {/* Interactive Mode Switcher at bottom inside chamber */}
                  <div className="absolute bottom-1.5 sm:bottom-3 left-1.5 sm:left-3 right-1.5 sm:right-3 flex items-center justify-between z-20 bg-slate-950/90 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-2 rounded-[5px] sm:rounded-[6px] border border-slate-800/90">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                      <Sparkle size={12} className="text-sky-400 shrink-0" />
                      <span className="hidden sm:inline">MODO:</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleLayerChange('both')}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-mono rounded transition-colors cursor-pointer min-h-[30px] ${
                          activeLayer === 'both'
                            ? 'bg-sky-500/25 text-sky-300 border border-sky-500/50 font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Corte no Scroll
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLayerChange('smile')}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-mono rounded transition-colors cursor-pointer min-h-[30px] ${
                          activeLayer === 'smile'
                            ? 'bg-sky-500/25 text-sky-300 border border-sky-500/50 font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Sorriso
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLayerChange('cbct')}
                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-mono rounded transition-colors cursor-pointer min-h-[30px] ${
                          activeLayer === 'cbct'
                            ? 'bg-sky-500/25 text-sky-300 border border-sky-500/50 font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Tomografia 3D
                      </button>
                    </div>
                  </div>

                </div>

                {/* Bottom Interactive Track */}
                <div className="w-full flex items-center justify-between pt-2 sm:pt-4 mt-1 sm:mt-2 border-t border-slate-900/90 z-10 shrink-0">
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-500">
                    CORTE TOMOGRÁFICO INTERATIVO
                  </span>
                  <div className="w-28 xs:w-36 sm:w-48 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      ref={progressBarRef}
                      className="w-full h-full bg-gradient-to-r from-sky-500 to-emerald-400 origin-left will-change-transform"
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-sky-400">
                    SCROLL ↓
                  </span>
                </div>

              </div>

              {/* Mobile Dynamic Focus Card (Under Chamber on Mobile for Real-Time Feedback) */}
              <div className="lg:hidden w-full max-w-[390px] xs:max-w-[430px] sm:max-w-[500px] bg-gradient-to-br from-sky-950/60 to-slate-900/90 border border-sky-500/35 p-2.5 xs:p-3 sm:p-4 rounded-[8px] mt-2 sm:mt-3 backdrop-blur-md shadow-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-wider flex items-center gap-1">
                    <Crosshair size={12} weight="bold" />
                    Estrutura em Foco
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">
                    Sincronizado com o Laser
                  </span>
                </div>
                <h3 className="text-xs xs:text-sm font-bold text-white mb-0.5 font-sans">
                  {currentFocus.title}
                </h3>
                <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                  {currentFocus.detail}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>

      {/* Mobile-Only Feature Cards (Scrollable directly after pin release) */}
      <section className="lg:hidden bg-[#0B1120] text-white py-12 px-4 border-t border-slate-850 relative z-20">
        <div className="max-w-md mx-auto flex flex-col gap-3.5">
          <div className="text-center mb-2">
            <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block mb-1">
              DIFERENCIAIS PICOTTI
            </span>
            <h3 className="text-xl font-bold text-white">
              Tecnologia & Conforto Clínico
            </h3>
          </div>

          {/* Card 1 */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-[8px] flex items-start gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-sky-950/80 border border-sky-800/80 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
              <Lightning size={16} weight="fill" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Adeus à Moldagem com Massa
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                O escaneamento intraoral óptico captura mais de 3.000 fotos por segundo, gerando o mapa 3D instantâneo sem enjoo.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-[8px] flex items-start gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-sky-950/80 border border-sky-800/80 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
              <Eye size={16} weight="fill" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Exclusividade Goioerê & Região
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visualização 3D milimétrica de nervos mandibulares, espessura óssea e dentes inclusos para cirurgias 100% seguras.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-[8px] flex items-start gap-3">
            <div className="w-8 h-8 rounded-[6px] bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck size={16} weight="fill" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">
                Ultra-Low Dose (Segurança Total)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Até 80% menos exposição radiológica que tomografias hospitalares, garantindo imagens nítidas com máxima biossegurança.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
