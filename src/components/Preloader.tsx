import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import logoPicottiColor from '../assets/logo-picotti-color.png'

interface PreloaderProps {
  onLoaded: () => void
}

export function Preloader({ onLoaded }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  
  const onLoadedRef = useRef(onLoaded)
  useEffect(() => {
    onLoadedRef.current = onLoaded
  }, [onLoaded])

  const isFinishedRef = useRef(false)

  const finishImmediately = () => {
    if (isFinishedRef.current) return
    isFinishedRef.current = true
    if (overlayRef.current) {
      overlayRef.current.style.display = 'none'
    }
    onLoadedRef.current()
  }

  useEffect(() => {
    if (isFinishedRef.current) return

    // Safety failsafe: under no circumstances should the preloader stay stuck
    const failsafe = setTimeout(() => {
      finishImmediately()
    }, 2200)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          isFinishedRef.current = true
          clearTimeout(failsafe)
          if (overlayRef.current) {
            overlayRef.current.style.display = 'none'
          }
          onLoadedRef.current()
        },
      })

      // 1. Initial State Setup
      gsap.set(logoWrapperRef.current, { opacity: 0, scale: 0.92, y: 8 })
      gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: 'left center' })

      // 2. Fade in central logo smoothly
      tl.to(logoWrapperRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })

      // 3. Number Counter & Progress Bar (0% -> 100%)
      const counterObj = { val: 0 }
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 0.7,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counterObj.val)}%`
            }
          },
        },
        '-=0.2'
      )
      tl.to(
        progressLineRef.current,
        {
          scaleX: 1,
          duration: 0.7,
          ease: 'power2.inOut',
        },
        '<'
      )

      // 4. Fade out progress bar & ticker
      tl.to([counterRef.current, progressLineRef.current], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      }, '+=0.05')

      // 5. Morph / Move logo towards header target and dissolve
      tl.to(logoWrapperRef.current, {
        x: () => {
          const headerLogo = document.getElementById('header-logo-target')
          if (!headerLogo || !logoWrapperRef.current) return 0
          const hr = headerLogo.getBoundingClientRect()
          const lr = logoWrapperRef.current.getBoundingClientRect()
          return hr.left + hr.width / 2 - (lr.left + lr.width / 2)
        },
        y: () => {
          const headerLogo = document.getElementById('header-logo-target')
          if (!headerLogo || !logoWrapperRef.current) return 0
          const hr = headerLogo.getBoundingClientRect()
          const lr = logoWrapperRef.current.getBoundingClientRect()
          return hr.top + hr.height / 2 - (lr.top + lr.height / 2)
        },
        scale: () => {
          const headerLogo = document.getElementById('header-logo-target')
          if (!headerLogo || !logoWrapperRef.current) return 0.7
          const hr = headerLogo.getBoundingClientRect()
          const lr = logoWrapperRef.current.getBoundingClientRect()
          return hr.height / lr.height || 0.7
        },
        opacity: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      })

      // 6. Dissolve white curtain
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '-=0.4'
      )
    }, overlayRef)

    return () => {
      clearTimeout(failsafe)
      if (!isFinishedRef.current) {
        ctx.revert()
      }
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      onClick={finishImmediately}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FBFBFD] px-6 select-none transition-opacity cursor-default"
    >
      {/* Central Moving Logo Container using Official Picotti Logo */}
      <div
        ref={logoWrapperRef}
        className="flex items-center justify-center origin-center will-change-transform"
      >
        <img
          src={logoPicottiColor}
          alt="Picotti Radiodiagnóstico Odontológico"
          className="h-20 sm:h-24 md:h-28 w-auto object-contain select-none"
        />
      </div>

      {/* Numerical Ticker & Track */}
      <div className="mt-8 w-52 sm:w-60 flex flex-col items-center gap-2">
        <div className="w-full h-[2px] bg-slate-200 overflow-hidden rounded-full">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-[#0284C7]"
          />
        </div>
        <span
          ref={counterRef}
          className="text-xs font-mono text-slate-400 font-medium tracking-wider"
        >
          0%
        </span>
      </div>
    </div>
  )
}
