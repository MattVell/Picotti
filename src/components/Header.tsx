import { useEffect, useState } from 'react'
import { MapPin, WhatsappLogo } from '@phosphor-icons/react'

import logoPicottiColor from '../assets/logo-picotti-color.png'
import logoPicottiWhite from '../assets/logo-picotti-white.png'

interface HeaderProps {
  onSelectCity?: (city: 'goioere' | 'nova_aurora') => void
  activeCity?: 'goioere' | 'nova_aurora'
}

export function Header({ onSelectCity, activeCity = 'goioere' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  const whatsappUrl =
    activeCity === 'goioere'
      ? 'https://wa.me/5544999499438?text=Olá!%20Gostaria%20de%20agendar%20um%20exame%20na%20unidade%20de%20Goioerê.'
      : 'https://wa.me/5544999499438?text=Olá!%20Gostaria%20de%20agendar%20um%20exame%20na%20unidade%20de%20Nova%20Aurora.'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBFBFD]/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-0'
          : 'bg-gradient-to-b from-[rgba(9,35,63,0.85)] via-[rgba(9,35,63,0.4)] to-transparent border-b border-white/10 py-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: The Target Anchor for Preloader Logo Morph using Official Picotti Logo */}
        <a
          href="#"
          id="header-logo-target"
          className="flex items-center group focus:outline-none py-1 relative"
        >
          {/* Official Picotti Logo - Color on light scrolled header */}
          <img
            src={logoPicottiColor}
            alt="Picotti Radiodiagnóstico Odontológico"
            className={`h-9 sm:h-10 w-auto object-contain transition-opacity duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
            }`}
          />
          {/* Official Picotti Logo - White typography on dark transparent header */}
          <img
            src={logoPicottiWhite}
            alt="Picotti Radiodiagnóstico Odontológico"
            className={`h-9 sm:h-10 w-auto object-contain transition-opacity duration-300 ${
              isScrolled ? 'opacity-0 absolute pointer-events-none' : 'opacity-100'
            }`}
          />
        </a>

        {/* Center: Clean Nav Links (Desktop) */}
        <nav
          className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${
            isScrolled ? 'text-slate-600' : 'text-white/90'
          }`}
        >
          <a
            href="#tecnologia"
            className="hover:text-[#38BDF8] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0284C7] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            A Tecnologia
          </a>
          <a
            href="#exames"
            className="hover:text-[#38BDF8] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0284C7] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Exames
          </a>
          <a
            href="#preparo"
            className="hover:text-[#38BDF8] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0284C7] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Preparo
          </a>
          <a
            href="#unidades"
            className="hover:text-[#38BDF8] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0284C7] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Unidades
          </a>
          <a
            href="#doutoras"
            className="hover:text-[#38BDF8] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0284C7] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Corpo Clínico
          </a>
        </nav>

        {/* Right: City Quick Switcher & Primary Action */}
        <div className="flex items-center gap-3">
          {/* Quick city toggle */}
          <div
            className={`hidden sm:flex items-center p-1 rounded-[6px] text-xs font-medium transition-all duration-300 ${
              isScrolled
                ? 'bg-slate-100/90 border border-slate-200/80'
                : 'bg-white/15 backdrop-blur-md border border-white/20'
            }`}
          >
            <button
              onClick={() => onSelectCity?.('goioere')}
              className={`px-2.5 py-1 rounded-[4px] transition-all cursor-pointer flex items-center gap-1 ${
                activeCity === 'goioere'
                  ? 'bg-white text-[#0F172A] shadow-sm font-semibold'
                  : isScrolled
                  ? 'text-slate-500 hover:text-slate-800'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <MapPin
                size={13}
                className={activeCity === 'goioere' ? 'text-[#0284C7]' : isScrolled ? 'text-slate-400' : 'text-white/60'}
                weight="fill"
              />
              Goioerê
            </button>
            <button
              onClick={() => onSelectCity?.('nova_aurora')}
              className={`px-2.5 py-1 rounded-[4px] transition-all cursor-pointer flex items-center gap-1 ${
                activeCity === 'nova_aurora'
                  ? 'bg-white text-[#0F172A] shadow-sm font-semibold'
                  : isScrolled
                  ? 'text-slate-500 hover:text-slate-800'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <MapPin
                size={13}
                className={activeCity === 'nova_aurora' ? 'text-[#0284C7]' : isScrolled ? 'text-slate-400' : 'text-white/60'}
                weight="fill"
              />
              Nova Aurora
            </button>
          </div>

          {/* Primary CTA (Rectangular solid, 6px radius) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white px-4 py-2.5 rounded-[6px] text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer shrink-0"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>Agendar Exame</span>
          </a>
        </div>

      </div>
    </header>
  )
}
