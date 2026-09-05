import { MapPin, Phone, Clock, WhatsappLogo, Check, ArrowSquareOut } from '@phosphor-icons/react'

interface UnitSelectorProps {
  activeCity: 'goioere' | 'nova_aurora'
  onSelectCity: (city: 'goioere' | 'nova_aurora') => void
}

export function UnitSelector({ activeCity, onSelectCity }: UnitSelectorProps) {
  const isGoioere = activeCity === 'goioere'

  const goioereWhatsapp =
    'https://wa.me/5544999499438?text=Olá!%20Gostaria%20de%20agendar%20um%20exame%20na%20unidade%20de%20Goioerê.'
  const novaAuroraWhatsapp =
    'https://wa.me/5544999499438?text=Olá!%20Gostaria%20de%20agendar%20um%20exame%20na%20unidade%20de%20Nova%20Aurora.'

  return (
    <section id="unidades" className="py-24 bg-[#FBFBFD] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0284C7] block mb-2">
            ATENDIMENTO REGIONAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] font-sans">
            Nossas Unidades no Paraná
          </h2>
          <p className="text-base text-slate-500 mt-2.5 font-normal">
            Escolha a cidade mais próxima para ver o endereço completo e iniciar seu atendimento direto.
          </p>
        </div>

        {/* City Toggle Buttons (Responsive grid on mobile, inline-flex on desktop) */}
        <div className="flex justify-center mb-10 max-w-md mx-auto sm:max-w-none">
          <div className="grid grid-cols-2 sm:inline-flex w-full sm:w-auto bg-slate-200/80 p-1 rounded-[6px] border border-slate-300/80 text-xs sm:text-sm font-medium gap-1">
            <button
              onClick={() => onSelectCity('goioere')}
              className={`px-3 sm:px-5 py-2.5 rounded-[4px] transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] ${
                isGoioere
                  ? 'bg-white text-[#0F172A] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin size={16} weight="fill" className={isGoioere ? 'text-[#0284C7]' : 'text-slate-400'} />
              <span>Goioerê (Sede)</span>
            </button>
            <button
              onClick={() => onSelectCity('nova_aurora')}
              className={`px-3 sm:px-5 py-2.5 rounded-[4px] transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] ${
                !isGoioere
                  ? 'bg-white text-[#0F172A] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin size={16} weight="fill" className={!isGoioere ? 'text-[#0284C7]' : 'text-slate-400'} />
              <span>Nova Aurora</span>
            </button>
          </div>
        </div>

        {/* Dynamic Unit Card Container */}
        <div className="max-w-4xl mx-auto">
          <div className="double-bezel shadow-xl shadow-slate-900/5">
            <div className="double-bezel-inner p-5 sm:p-10 bg-white">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Left: Location & Contact Details */}
                <div className="md:col-span-7 flex flex-col text-left">
                  
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#F0F9FF] border border-[#BAE6FD] text-[#0369A1] text-xs font-mono font-semibold tracking-wider w-fit mb-4">
                    {isGoioere ? 'SEDE & POLO TECNOLÓGICO' : 'FILIAL DESCENTRALIZADA'}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mb-4 font-sans">
                    {isGoioere ? 'Unidade Goioerê' : 'Unidade Nova Aurora'}
                  </h3>

                  {/* Address Block */}
                  <div className="flex items-start gap-3 text-slate-600 mb-4">
                    <MapPin size={20} weight="fill" className="text-[#0284C7] shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {isGoioere
                          ? 'Rua José Bonifácio, nº 1085, Sala 02 – Centro'
                          : 'Centro – Nova Aurora – PR'}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isGoioere ? 'Goioerê – PR, CEP 87360-000' : 'Região Oeste Paranaense'}
                      </p>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-center gap-3 text-slate-600 mb-4">
                    <Clock size={20} weight="fill" className="text-[#0284C7] shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      Segunda a Sexta: 08h às 12h e 13h30 às 18h
                    </p>
                  </div>

                  {/* Phone & WhatsApp */}
                  <div className="flex items-center gap-3 text-slate-600 mb-8">
                    <Phone size={20} weight="fill" className="text-[#0284C7] shrink-0" />
                    <p className="text-xs sm:text-sm font-mono font-medium text-slate-800">
                      (44) 99949-9438
                    </p>
                  </div>

                  {/* Action Group (Full-width responsive stack on mobile) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={isGoioere ? goioereWhatsapp : novaAuroraWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#0284C7] hover:bg-[#0369A1] text-white px-5 py-3 rounded-[6px] text-sm font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer min-h-[44px]"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      <span>Falar com {isGoioere ? 'Goioerê' : 'Nova Aurora'}</span>
                    </a>

                    <a
                      href={
                        isGoioere
                          ? 'https://maps.google.com/?q=Rua+Jose+Bonifacio+1085+Goioere+PR'
                          : 'https://maps.google.com/?q=Nova+Aurora+PR'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium px-3 py-3 rounded-[6px] transition-colors min-h-[44px]"
                    >
                      <span>Abrir no Google Maps</span>
                      <ArrowSquareOut size={14} />
                    </a>
                  </div>

                </div>

                {/* Right: Available Technologies at this Unit */}
                <div className="md:col-span-5 bg-[#F8FAFC] border border-slate-200/80 rounded-[6px] p-6 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 font-mono">
                    INFRAESTRUTURA DA UNIDADE
                  </h4>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check size={16} weight="bold" className="text-[#0284C7] shrink-0 mt-0.5" />
                      <span>
                        {isGoioere ? (
                          <>
                            <strong>Tomógrafo Cone Beam 3D</strong> (Instalado na sede)
                          </>
                        ) : (
                          <>
                            Encaminhamento direto para Tomografia 3D
                          </>
                        )}
                      </span>
                    </li>

                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check size={16} weight="bold" className="text-[#0284C7] shrink-0 mt-0.5" />
                      <span>
                        <strong>Escaneamento Intraoral 3D</strong> sem moldagem com massa
                      </span>
                    </li>

                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check size={16} weight="bold" className="text-[#0284C7] shrink-0 mt-0.5" />
                      <span>
                        <strong>Radiografia Panorâmica Digital</strong>
                      </span>
                    </li>

                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <Check size={16} weight="bold" className="text-[#0284C7] shrink-0 mt-0.5" />
                      <span>
                        Documentação Ortodôntica Completa
                      </span>
                    </li>
                  </ul>

                  <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 leading-normal">
                    {isGoioere
                      ? 'Unidade polo com estrutura cirúrgica para exames tridimensionais complexos.'
                      : 'Atendimento e triagem para pacientes de toda a microrregião de Nova Aurora.'}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
