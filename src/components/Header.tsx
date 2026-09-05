import { useEffect, useState } from 'react'
import { MapPin, WhatsappLogo, List, X, CalendarBlank, Phone } from '@phosphor-icons/react'

import logoPicottiColor from '../assets/logo-picotti-color.png'
import logoPicottiWhite from '../assets/logo-picotti-white.png'

interface HeaderProps {
  onSelectCity?: (city: 'goioere' | 'nova_aurora') => void
  activeCity?: 'goioere' | 'nova_aurora'
}

export function Header({ onSelectCity, activeCity = 'goioere' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  const isDarkTheme = !isScrolled && !isMobileMenuOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#FBFBFD]/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-0'
          : 'bg-gradient-to-b from-[rgba(9,35,63,0.85)] via-[rgba(9,35,63,0.4)] to-transparent border-b border-white/10 py-1'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Left: Target Anchor for Preloader Logo Morph using Official Picotti Logo */}
        <a
          href="#"
          id="header-logo-target"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex items-center group focus:outline-none py-1 relative"
        >
          {/* Official Picotti Logo - Color on light scrolled header */}
          <img
            src={logoPicottiColor}
            alt="Picotti Radiodiagnóstico Odontológico"
            className={`h-8 sm:h-10 w-auto object-contain transition-opacity duration-300 ${
              isDarkTheme ? 'opacity-0 absolute pointer-events-none' : 'opacity-100'
            }`}
          />
          {/* Official Picotti Logo - White typography on dark transparent header */}
          <img
            src={logoPicottiWhite}
            alt="Picotti Radiodiagnóstico Odontológico"
            className={`h-8 sm:h-10 w-auto object-contain transition-opacity duration-300 ${
              isDarkTheme ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
            }`}
          />
        </a>

        {/* Center: Clean Nav Links (Desktop) */}
        <nav
          className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${
            isDarkTheme ? 'text-white/90' : 'text-slate-600'
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick city toggle (Desktop & Tablet) */}
          <div
            className={`hidden sm:flex items-center p-1 rounded-[6px] text-xs font-medium transition-all duration-300 ${
              isDarkTheme
                ? 'bg-white/15 backdrop-blur-md border border-white/20'
                : 'bg-slate-100/90 border border-slate-200/80'
            }`}
          >
            <button
              onClick={() => onSelectCity?.('goioere')}
              className={`px-2.5 py-1 rounded-[4px] transition-all cursor-pointer flex items-center gap-1 min-h-[32px] ${
                activeCity === 'goioere'
                  ? 'bg-white text-[#0F172A] shadow-sm font-semibold'
                  : isDarkTheme
                  ? 'text-white/80 hover:text-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MapPin
                size={13}
                className={activeCity === 'goioere' ? 'text-[#0284C7]' : isDarkTheme ? 'text-white/60' : 'text-slate-400'}
                weight="fill"
              />
              Goioerê
            </button>
            <button
              onClick={() => onSelectCity?.('nova_aurora')}
              className={`px-2.5 py-1 rounded-[4px] transition-all cursor-pointer flex items-center gap-1 min-h-[32px] ${
                activeCity === 'nova_aurora'
                  ? 'bg-white text-[#0F172A] shadow-sm font-semibold'
                  : isDarkTheme
                  ? 'text-white/80 hover:text-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <MapPin
                size={13}
                className={activeCity === 'nova_aurora' ? 'text-[#0284C7]' : isDarkTheme ? 'text-white/60' : 'text-slate-400'}
                weight="fill"
              />
              Nova Aurora
            </button>
          </div>

          {/* Primary CTA (Desktop & Mobile Compact) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-[6px] text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer shrink-0 min-h-[38px] sm:min-h-[42px]"
          >
            <WhatsappLogo size={17} weight="fill" />
            <span className="hidden xs:inline sm:inline">Agendar Exame</span>
            <span className="xs:hidden sm:hidden">Agendar</span>
          </a>

          {/* Mobile Menu Hamburger Trigger (44x44px touch target) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className={`md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[6px] transition-colors cursor-pointer ${
              isDarkTheme
                ? 'text-white hover:bg-white/10'
                : 'text-[#0F172A] hover:bg-slate-100'
            }`}
          >
            {isMobileMenuOpen ? (
              <X size={24} weight="bold" />
            ) : (
              <List size={24} weight="bold" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Drawer / Overlay Sheet */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-18 bottom-0 bg-[#FBFBFD]/98 backdrop-blur-xl border-t border-slate-200/90 z-40 overflow-y-auto px-6 py-8 flex flex-col justify-between"
          style={{ height: 'calc(100dvh - 4.5rem)' }}
        >
          <div className="flex flex-col gap-6">
            
            {/* Quick City Switcher on Mobile Drawer */}
            <div className="bg-slate-100 p-1.5 rounded-[8px] border border-slate-200">
              <span className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-2 pt-1 pb-1.5">
                Selecione a Unidade de Atendimento:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectCity?.('goioere')}
                  className={`py-2.5 px-3 rounded-[6px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all min-h-[44px] cursor-pointer ${
                    activeCity === 'goioere'
                      ? 'bg-white text-[#0F172A] shadow-sm border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  <MapPin size={15} weight="fill" className={activeCity === 'goioere' ? 'text-[#0284C7]' : 'text-slate-400'} />
                  <span>Goioerê (Sede)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectCity?.('nova_aurora')}
                  className={`py-2.5 px-3 rounded-[6px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all min-h-[44px] cursor-pointer ${
                    activeCity === 'nova_aurora'
                      ? 'bg-white text-[#0F172A] shadow-sm border border-slate-200/80 font-bold'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  <MapPin size={15} weight="fill" className={activeCity === 'nova_aurora' ? 'text-[#0284C7]' : 'text-slate-400'} />
                  <span>Nova Aurora</span>
                </button>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col divide-y divide-slate-200/70 border-y border-slate-200/70">
              <a
                href="#tecnologia"
                onClick={handleNavClick}
                className="py-4 text-base font-semibold text-[#0F172A] hover:text-[#0284C7] transition-colors flex items-center justify-between min-h-[48px]"
              >
                <span>A Tecnologia 3D</span>
                <span className="text-xs font-mono text-slate-400">01</span>
              </a>
              <a
                href="#exames"
                onClick={handleNavClick}
                className="py-4 text-base font-semibold text-[#0F172A] hover:text-[#0284C7] transition-colors flex items-center justify-between min-h-[48px]"
              >
                <span>Portfólio de Exames</span>
                <span className="text-xs font-mono text-slate-400">02</span>
              </a>
              <a
                href="#preparo"
                onClick={handleNavClick}
                className="py-4 text-base font-semibold text-[#0F172A] hover:text-[#0284C7] transition-colors flex items-center justify-between min-h-[48px]"
              >
                <span>Preparo do Paciente</span>
                <span className="text-xs font-mono text-slate-400">03</span>
              </a>
              <a
                href="#unidades"
                onClick={handleNavClick}
                className="py-4 text-base font-semibold text-[#0F172A] hover:text-[#0284C7] transition-colors flex items-center justify-between min-h-[48px]"
              >
                <span>Nossas Unidades</span>
                <span className="text-xs font-mono text-slate-400">04</span>
              </a>
              <a
                href="#doutoras"
                onClick={handleNavClick}
                className="py-4 text-base font-semibold text-[#0F172A] hover:text-[#0284C7] transition-colors flex items-center justify-between min-h-[48px]"
              >
                <span>Corpo Clínico Especializado</span>
                <span className="text-xs font-mono text-slate-400">05</span>
              </a>
            </nav>

          </div>

          {/* Bottom Drawer Actions */}
          <div className="pt-6 flex flex-col gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="w-full flex items-center justify-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white py-3.5 px-4 rounded-[6px] text-sm font-semibold shadow-sm transition-all min-h-[48px] cursor-pointer"
            >
              <CalendarBlank size={18} weight="bold" />
              <span>Agendar na Unidade de {activeCity === 'goioere' ? 'Goioerê' : 'Nova Aurora'}</span>
            </a>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 px-1">
              <span className="font-mono">Unidade Ativa: {activeCity === 'goioere' ? 'Goioerê' : 'Nova Aurora'}</span>
              <a href="tel:44999499438" className="flex items-center gap-1 text-[#0284C7] font-semibold">
                <Phone size={13} weight="fill" />
                <span>(44) 99949-9438</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </header>
  )
}

