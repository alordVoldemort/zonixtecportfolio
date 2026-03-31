import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Counter ─────────────────────────────────────────── */
function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 }
        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: value, duration: 2.2, ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.floor(obj.val) + suffix
            },
          }
        )
      },
    })
    return () => st.kill()
  }, [value, suffix])
  return <span ref={ref}>0{suffix}</span>
}

/* ─── Data ────────────────────────────────────────────── */
const stats = [
  { label: 'Projects Delivered', value: 10, suffix: '+' },
  { label: 'Happy Clients',      value: 10,  suffix: '+' },
  { label: 'Years Experience',   value: 1,   suffix: '+' },
  { label: 'Team Members',      value: 15,  suffix: '+' },
]

const images = [
  { src: '/office.png',  caption: 'Our Creative Workspace',  tag: 'Est. 2025'               },
  { src: '/office2.png', caption: 'The Zonixtec Team',       tag: '15+ Experts'             },
  { src: '/office3.png', caption: 'Innovation Hub',          tag: 'Where Ideas Come Alive'  },
  { src: '/office4.png', caption: 'Building the Future',     tag: '10+ Projects Delivered' },
]

/* Framer Motion variants for the wipe transition */
const imgVariants = {
  enter: { clipPath: 'inset(0% 0% 100% 0%)', opacity: 1 },
  center: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: 'inset(0% 0% 0% 100%)',
    opacity: 1,
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  },
}

/* ─── Component ───────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const statsRef   = useRef(null)
  const timerRef   = useRef(null)
  const videoRef   = useRef(null)
  const isVisibleRef = useRef(false)

  const [activeIdx, setActiveIdx] = useState(0)
  const [started,   setStarted]   = useState(false)

  /* Start auto-cycling once section enters viewport */
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 65%',
      once: true,
      onEnter: () => setStarted(true),
    })
    return () => st.kill()
  }, [])

  const advance = useCallback(() => {
    setActiveIdx(prev => (prev + 1) % images.length)
  }, [])

  useEffect(() => {
    if (!started) return
    if (!isVisibleRef.current) return
    timerRef.current = setInterval(advance, 3200)
    return () => clearInterval(timerRef.current)
  }, [started, advance])

  /* Pause interval + video when offscreen */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
      if (entry.isIntersecting) {
        if (started) {
          clearInterval(timerRef.current)
          timerRef.current = setInterval(advance, 3200)
        }
        videoRef.current?.play().catch(() => {})
      } else {
        clearInterval(timerRef.current)
        videoRef.current?.pause()
      }
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [started, advance])

  /* Jump to dot — reset timer so it doesn't collide */
  const goTo = (i) => {
    setActiveIdx(i)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(advance, 3200)
  }

  /* GSAP entry — left text + stats */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -56, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
      if (statsRef.current) {
        gsap.fromTo(
          Array.from(statsRef.current.children),
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'back.out(1.3)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  /* ─── JSX ──────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex flex-col justify-center py-16 sm:py-20 md:py-12 overflow-hidden"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/aboutusvedio.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        style={{ zIndex: 0 }}
      />
      {/* Dark overlay to keep content readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(2,11,20,0.88) 0%, rgba(2,11,20,0.72) 50%, rgba(2,11,20,0.88) 100%)',
          zIndex: 1,
        }}
      />

      {/* top divider */}
      <div className="section-divider mb-0" style={{ zIndex: 2 }} />

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 50%, rgba(79,195,247,0.06) 0%, transparent 70%)',
          zIndex: 2,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12" style={{ zIndex: 3 }}>

        {/* ── Section label ── */}
        <div className="flex items-center gap-4 mb-5">
          <span className="font-mono text-sm text-accent-blue select-none">01</span>
          <div className="w-14 h-px bg-accent-blue/40" />
          <span className="text-xs font-medium tracking-[0.22em] uppercase text-gray-400">About Us</span>
        </div>

        {/* ── Two-column grid ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ════ LEFT ════ */}
          <div ref={leftRef}>

            <h2 className="font-display font-bold leading-[1.0] mb-4 text-white"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}>
              We craft digital{' '}
              <span className="gradient-text">experiences</span>{' '}
              that&nbsp;leave&nbsp;a&nbsp;mark.
            </h2>

            <p className="text-gray-400 leading-relaxed mb-3"
               style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}>
            At Zonixtec, we are more than a tech company—we are your trusted digital innovation partner.
            Our mission is simple: to build solutions that solve real problems, deliver measurable results, 
            and drive growth
            </p>

            <p className="text-gray-500 leading-relaxed mb-6"
               style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>
              With expertise in CRM, ERP, Billing Software, Website Development, and Mobile Applications, 
              we design and develop platforms that make businesses smarter, faste r, and future-ready


            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-bold gradient-text mb-1"
                     style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 tracking-wide uppercase leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT ════ */}
          <div className="relative">

            {/* ── Image frame ── */}
            <div
              className="relative rounded-2xl overflow-hidden w-full shadow-2xl"
              style={{ aspectRatio: '4 / 3', maxHeight: '60vh' }}
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={activeIdx}
                  src={images[activeIdx].src}
                  alt={images[activeIdx].caption}
                  className="absolute inset-0 w-full h-full object-cover"
                  variants={imgVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ willChange: 'clip-path' }}
                  draggable={false}
                />
              </AnimatePresence>

              {/* gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(2,11,20,0.82) 0%, rgba(2,11,20,0.15) 52%, transparent 100%)',
                  zIndex: 2,
                }}
              />

              {/* Caption */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx + '-cap'}
                  className="absolute bottom-5 left-5 right-5"
                  style={{ zIndex: 3 }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.55 } }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
                >
                  <p className="font-mono text-[10px] text-accent-blue tracking-[0.2em] uppercase mb-1">
                    {images[activeIdx].tag}
                  </p>
                  <p className="text-white font-semibold text-base leading-snug">
                    {images[activeIdx].caption}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Counter top-right */}
              <div
                className="absolute top-4 right-4 font-mono text-[11px] text-white/50"
                style={{ zIndex: 3 }}
              >
                {String(activeIdx + 1).padStart(2, '0')}&nbsp;/&nbsp;0{images.length}
              </div>
            </div>

            {/* ── Progress dots (clickable) ── */}
            <div className="flex items-center gap-2 mt-5 justify-end pr-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className="rounded-full bg-accent-blue transition-all duration-300 focus:outline-none"
                  style={{
                    height: '3px',
                    width: i === activeIdx ? '28px' : '8px',
                    opacity: i === activeIdx ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* ── Floating badge ── */}

          </div>
        </div>
      </div>
    </section>
  )
}