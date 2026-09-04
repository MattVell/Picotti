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

      // Timeline com pin estendido (2200px) e scrub inercial (1.2s) para sensação tátil e suave
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2200', // Curso de rolagem estendido para controle milimétrico e confortável
          pin: true,
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
    <section
      id="tecnologia"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center bg-[#0B1120] text-white py-10 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Precision Diagnostic Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(56,189,248,0.12)_1px,transparent_1px)] [background-size:28px_28px] opacity-60 pointer-events-none" />
      
      {/* Ambient Radial Surgical Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Top Header Information */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800/80 pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-sky-950/80 border border-sky-800/80 text-sky-400 text-xs font-mono tracking-wider uppercase mb-2.5">
              <Scan size={15} weight="bold" />
              <span>TOMOGRAFIA COMPUTADORIZADA CONE BEAM 3D</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-sans">
              Diagnóstico Além da Superfície do Sorriso
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-[58ch] mt-1.5 font-normal leading-relaxed">
              Role a página para ver a tomografia revelar a anatomia óssea, raízes e canais nervosos em alta definição milimétrica.
            </p>
          </div>

          {/* Interactive Status Display */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-slate-900/90 border border-slate-800 px-4 py-3 rounded-[8px] text-xs font-mono shadow-xl backdrop-blur-md">
            <div>
              <span className="text-slate-500 block text-[10px]">CORTE TOMOGRÁFICO</span>
              <span ref={corteValRef} className="text-sky-400 font-bold">
                AX_001/180
              </span>
            </div>
            <div className="h-6 w-[1px] bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">PROFUNDIDADE</span>
              <span ref={profundidadeValRef} className="text-emerald-400 font-bold">
                0.0 mm
              </span>
            </div>
            <div className="h-6 w-[1px] bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[10px]">PROTOCOLO</span>
              <span className="text-sky-300 font-bold">FEIXE CÔNICO 3D</span>
            </div>
          </div>
        </div>

        {/* Main Visualizer & Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Real-time Specifications */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Dynamic Focus Card */}
            <div className="bg-gradient-to-br from-sky-950/40 to-slate-900/80 border border-sky-500/30 p-5 rounded-[10px] shadow-lg backdrop-blur-sm relative overflow-hidden transition-all duration-300">
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

            {/* Card 1: Escaneamento Óptico & Conforto */}
            <div className="bg-slate-900/70 border border-slate-800/80 p-4 sm:p-5 rounded-[8px] transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 text-sky-400 mb-1.5">
                <Lightning size={18} weight="fill" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Adeus à Moldagem com Massa
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                O escaneamento intraoral óptico captura mais de 3.000 fotos/s, criando o mapa 3D imediato sem enjoo ou desconforto.
              </p>
            </div>

            {/* Card 2: Tomografia Cone Beam */}
            <div className="bg-slate-900/70 border border-slate-800/80 p-4 sm:p-5 rounded-[8px] transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 text-sky-400 mb-1.5">
                <Eye size={18} weight="fill" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Exclusividade Goioerê & Região
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visualização 3D milimétrica de nervos mandibulares, espessura óssea e dentes inclusos para cirurgias 100% guiadas.
              </p>
            </div>

            {/* Card 3: Baixa Radiação */}
            <div className="bg-slate-900/70 border border-slate-800/80 p-4 sm:p-5 rounded-[8px] transition-all hover:border-slate-700">
              <div className="flex items-center gap-3 text-emerald-400 mb-1.5">
                <ShieldCheck size={18} weight="fill" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Ultra-Low Dose (Segurança Total)
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Até 80% menos exposição radiológica que tomografias hospitalares, garantindo imagens nítidas com máxima proteção.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Anatomical Cross-Section Chamber */}
          <div className="lg:col-span-7">
            <div
              ref={visualChamberRef}
              className="relative w-full aspect-square max-w-[540px] mx-auto bg-slate-950 rounded-[12px] border border-slate-800 p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden shadow-2xl backdrop-blur-xl"
            >
              {/* Technical Header Badges */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 z-20">
                FOV: 120 x 100 mm • CONE BEAM 3D
              </div>
              <div className="absolute top-4 right-4 font-mono text-[10px] text-emerald-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 z-20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                SENSOR ATIVO
              </div>

              {/* Central Visual Dual-Layer Container */}
              <div className="relative w-full h-full rounded-[8px] overflow-hidden border border-slate-800/60 shadow-inner bg-[#030712] flex items-center justify-center">
                
                {/* LAYER 1 (Base): High-Res Natural Patient Smile */}
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
                  {/* Subtle vignette */}
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
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.15)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none mix-blend-screen opacity-40" />
                </div>

                {/* Laser Scanning Beam (Strictly Synchronized with Scroll Reveal) */}
                <div
                  ref={laserRef}
                  className={`absolute left-0 right-0 h-[2.5px] bg-sky-400 z-30 pointer-events-none -translate-y-1/2 will-change-[top,transform] shadow-[0_0_12px_#38bdf8,0_0_24px_#0284c7] transition-opacity duration-200 ${
                    activeLayer === 'both' ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ top: '0%' }}
                >
                  {/* Laser Beam Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-100 to-transparent opacity-80" />

                  {/* Laser Center Reticle */}
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-sky-300 bg-sky-400/40 flex items-center justify-center backdrop-blur-sm shadow-[0_0_10px_#38bdf8]">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>

                  {/* Laser Scan Coordinates Tag */}
                  <div className="absolute right-3 -top-5 font-mono text-[9px] text-sky-300 bg-slate-950/95 px-1.5 py-0.5 rounded border border-sky-500/50 shadow-md">
                    <span ref={laserTagRef}>SCAN: 0%</span>
                  </div>
                </div>

                {/* Interactive Mode Switcher at bottom inside chamber */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-[6px] border border-slate-800/90">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <Sparkle size={13} className="text-sky-400" />
                    <span className="hidden sm:inline">MODO:</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleLayerChange('both')}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded transition-colors cursor-pointer ${
                        activeLayer === 'both'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Corte no Scroll
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLayerChange('smile')}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded transition-colors cursor-pointer ${
                        activeLayer === 'smile'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Sorriso
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLayerChange('cbct')}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded transition-colors cursor-pointer ${
                        activeLayer === 'cbct'
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Tomografia 3D
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Interactive Track */}
              <div className="w-full flex items-center justify-between pt-4 mt-2 border-t border-slate-900/90 z-10">
                <span className="text-[10px] font-mono text-slate-500">
                  CORTE TOMOGRÁFICO INTERATIVO
                </span>
                <div className="w-36 sm:w-48 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    ref={progressBarRef}
                    className="w-full h-full bg-gradient-to-r from-sky-500 to-emerald-400 origin-left will-change-transform"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
                <span ref={progressPctRef} className="text-[11px] font-mono text-sky-400 font-bold">
                  0%
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
