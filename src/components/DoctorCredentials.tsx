import { Certificate, ShieldPlus } from '@phosphor-icons/react'

export function DoctorCredentials() {
  return (
    <section id="doutoras" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#0284C7] block mb-2">
            RESPONSABILIDADE TÉCNICA & RIGOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] font-sans">
            Direção Técnica Especializada
          </h2>
          <p className="text-base text-slate-500 mt-2.5 font-normal">
            A garantia do laudo exato e do suporte diagnóstico direto a pacientes e cirurgiões-dentistas da região.
          </p>
        </div>

        {/* Doctor Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Dra. Camila da Rocha Picotti */}
          <div className="double-bezel shadow-sm">
            <div className="double-bezel-inner p-8 bg-[#FBFBFD] flex flex-col items-center text-center">
              
              {/* Studio Portrait Placeholder Frame */}
              <div className="w-28 h-28 rounded-[6px] bg-gradient-to-tr from-slate-200 to-slate-100 border border-slate-300/80 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
                <span className="font-serif text-3xl font-bold text-[#0284C7]/40 select-none">
                  CP
                </span>
                <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-[4px] bg-[#0284C7] text-white flex items-center justify-center shadow">
                  <Certificate size={13} weight="fill" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-1 font-sans">
                Dra. Camila da Rocha Picotti
              </h3>
              <span className="text-xs font-mono text-[#0284C7] font-semibold tracking-wider uppercase mb-4">
                Cirurgiã-Dentista • Radiologista
              </span>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Especialista em radiologia odontológica e imaginologia diagnóstica. Atuação dedicada à acurácia de tomografias Cone Beam e ao planejamento digital milimétrico para reabilitação oral.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200/80 w-full flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                <ShieldPlus size={15} className="text-[#0284C7]" weight="fill" />
                <span>RESPONSÁVEL TÉCNICA</span>
              </div>

            </div>
          </div>

          {/* Dra. Beatriz da Rocha Picotti */}
          <div className="double-bezel shadow-sm">
            <div className="double-bezel-inner p-8 bg-[#FBFBFD] flex flex-col items-center text-center">
              
              {/* Studio Portrait Placeholder Frame */}
              <div className="w-28 h-28 rounded-[6px] bg-gradient-to-tr from-slate-200 to-slate-100 border border-slate-300/80 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
                <span className="font-serif text-3xl font-bold text-[#0284C7]/40 select-none">
                  BP
                </span>
                <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-[4px] bg-[#0284C7] text-white flex items-center justify-center shadow">
                  <Certificate size={13} weight="fill" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#0F172A] tracking-tight mb-1 font-sans">
                Dra. Beatriz da Rocha Picotti
              </h3>
              <span className="text-xs font-mono text-[#0284C7] font-semibold tracking-wider uppercase mb-4">
                Cirurgiã-Dentista • Radiologista
              </span>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Especialista em diagnóstico por imagem bucomaxilofacial e documentação ortodôntica digital. Foco na precisão de laudos de cefalometria, escaneamento intraoral 3D e conforto do paciente.
              </p>

              <div className="mt-6 pt-4 border-t border-slate-200/80 w-full flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
                <ShieldPlus size={15} className="text-[#0284C7]" weight="fill" />
                <span>RESPONSÁVEL TÉCNICA</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
