import { useState } from 'react'
import { SmoothScroll } from './components/SmoothScroll'
import { Preloader } from './components/Preloader'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ScanViewer } from './components/ScanViewer'
import { ExamList } from './components/ExamList'
import { PatientGuide } from './components/PatientGuide'
import { UnitSelector } from './components/UnitSelector'
import { DoctorCredentials } from './components/DoctorCredentials'
import { Footer } from './components/Footer'

export function App() {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false)
  const [activeCity, setActiveCity] = useState<'goioere' | 'nova_aurora'>('goioere')

  return (
    <SmoothScroll>
      {/* Intro Preloader with Logo Morph to Header */}
      <Preloader onLoaded={() => setIsPreloaderFinished(true)} />

      {/* Main Page Layout */}
      <div className="min-h-screen bg-[#FBFBFD] text-[#0F172A] flex flex-col font-sans">
        
        {/* Sticky Header with Logo Morph Target Anchor */}
        <Header activeCity={activeCity} onSelectCity={setActiveCity} />

        {/* Main Content Area */}
        <main className="flex-grow">
          {/* Hero Section with Text Mask Reveals */}
          <Hero activeCity={activeCity} isPreloaderFinished={isPreloaderFinished} />

          {/* Centerpiece: Pinned 3D Tomography & Scan Scroll Scrub */}
          <ScanViewer />

          {/* Editorial Interactive Exam List (No Bento Grid) */}
          <ExamList />

          {/* Patient Prep Guide: 01, 02, 03 Illuminated Steps */}
          <PatientGuide />

          {/* Interactive Unit Selector: Goioerê (Sede) & Nova Aurora */}
          <UnitSelector activeCity={activeCity} onSelectCity={setActiveCity} />

          {/* Doctor Credentials & Medical Authority */}
          <DoctorCredentials />
        </main>

        {/* Editorial Clean Footer with Dentist PDF Download */}
        <Footer />

      </div>
    </SmoothScroll>
  )
}

export default App
