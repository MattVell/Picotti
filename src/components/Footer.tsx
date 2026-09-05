import { DownloadSimple, FacebookLogo, Envelope, Phone } from '@phosphor-icons/react'

export function Footer() {
  return (
    <footer className="relative bg-[#F8FAFC] border-t border-slate-200/90 pt-20 pb-12 overflow-hidden select-none">
      
      {/* Monumental Watermark Background Logo */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[120px] sm:text-[180px] md:text-[230px] font-black text-slate-900/[0.025] font-sans tracking-tighter leading-none pointer-events-none -z-0">
        PICOTTI
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Brand & Units */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-200/80">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-[6px] bg-[#0284C7] text-white flex items-center justify-center shadow-sm">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
                  <path d="M12 3v18" strokeOpacity="0.6" strokeDasharray="2 2" />
                  <path d="M3 12h18" strokeOpacity="0.6" strokeDasharray="2 2" />
                  <rect x="9" y="9" width="6" height="6" rx="1.5" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-[#0F172A] leading-none font-sans">
                  PICOTTI
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] text-[#0284C7] uppercase mt-0.5">
                  RADIODIAGNÓSTICO
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[42ch] mb-6 font-normal">
              Referência regional em imaginologia odontológica de alta resolução, tomografia computadorizada Cone Beam 3D e escaneamento intraoral no interior do Paraná.
            </p>

            {/* Cadastral Data */}
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <p>PICOTTI RADIODIAGNOSTICO ODONTOLOGICO LTDA</p>
              <p>CNPJ: 38.422.373/0001-23 • SITUAÇÃO ATIVA</p>
            </div>
          </div>

          {/* Goioerê Unit */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-3.5">
              SEDE GOIOERÊ
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              Rua José Bonifácio, nº 1085, Sala 02<br />
              Centro, Goioerê – PR<br />
              CEP 87360-000
            </p>
            <p className="text-xs font-mono text-[#0284C7] font-semibold">
              (44) 99949-9438
            </p>
          </div>

          {/* Nova Aurora Unit */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-3.5">
              FILIAL NOVA AURORA
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              Centro<br />
              Nova Aurora – PR<br />
              Região Oeste
            </p>
            <p className="text-xs font-mono text-[#0284C7] font-semibold">
              (44) 99949-9438
            </p>
          </div>

          {/* Channels & Social */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 mb-3.5">
              CANAIS
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a
                  href="mailto:picottirodontologico@gmail.com"
                  className="flex items-center gap-2 hover:text-[#0284C7] transition-colors"
                >
                  <Envelope size={15} />
                  <span>E-mail Oficial</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/picottiradiologia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[#0284C7] transition-colors"
                >
                  <FacebookLogo size={15} />
                  <span>Facebook Oficial</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:44999499438"
                  className="flex items-center gap-2 hover:text-[#0284C7] transition-colors"
                >
                  <Phone size={15} />
                  <span>Telefone Geral</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Dedicated Discreet Strip for Cirurgiões-Dentistas (Approved Decision) */}
        <div className="py-6 border-b border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full bg-[#0284C7] shrink-0" />
            <span>
              <strong>Área do Profissional Prescritor:</strong> Você é cirurgião-dentista ou clínica parceira?
            </span>
          </div>

          <a
            href="/requisicao-picotti.pdf"
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-white border border-slate-300 hover:border-[#0284C7] text-slate-700 hover:text-[#0284C7] text-xs font-semibold transition-all shadow-sm active:scale-[0.98] cursor-pointer min-h-[44px]"
          >
            <DownloadSimple size={16} className="text-[#0284C7]" weight="bold" />
            <span>Baixar Receituário de Exames (PDF)</span>
          </a>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Picotti Radiodiagnóstico Odontológico. Todos os direitos reservados.</p>
          <p>Responsáveis Técnicas: Dra. Camila Picotti & Dra. Beatriz Picotti</p>
        </div>

      </div>
    </footer>
  )
}
