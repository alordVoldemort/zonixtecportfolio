import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INTERVAL = 5000

const testimonials = [
  {
    name: 'EasyEAuction',
    role: 'Auction Platform',
    text: 'Their auction system automated 80% of our processes and saved 30+ working hours weekly with smooth real-time bidding.',
    avatar: 'EA',
    gradient: 'from-emerald-400 to-teal-500',
    accent: '#34d399',
    stars: 5,
    metric: '80% automation',
  },
  {
    name: 'Morya Cars',
    role: 'Car CRM User',
    text: 'With Zonixtec CRM, our sales efficiency improved by 45% and saved more than ₹1 lakh in operational costs.',
    avatar: 'MC',
    gradient: 'from-violet-400 to-purple-500',
    accent: '#a78bfa',
    stars: 5,
    metric: '45% efficiency boost',
  },
  {
    name: 'Shri. Krishnal Maharaj',
    role: 'Founder, Kaleshwari Temple',
    text: 'Zonixtec helped us increase website traffic by 150% and online donations by 40% using a clean and responsive website.',
    avatar: 'KM',
    gradient: 'from-blue-400 to-cyan-500',
    accent: '#4FC3F7',
    stars: 5,
    metric: '150% more traffic',
  },
  {
    name: 'Cobbler Services',
    role: 'CRM Business',
    text: 'Customer follow-ups improved by 50% and manual work reduced by 40% thanks to their automated CRM platform.',
    avatar: 'CS',
    gradient: 'from-amber-400 to-orange-500',
    accent: '#fbbf24',
    stars: 5,
    metric: '50% better follow-ups',
  },
]

const N = testimonials.length

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5"
          fill={i < count ? '#fbbf24' : 'rgba(255,255,255,0.1)'}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)
  const elapsedRef = useRef(0)
  const lastTickRef = useRef(Date.now())
  const sectionRef = useRef(null)
  const isVisibleRef = useRef(false)

  const go = useCallback((next, direction) => {
    setDir(direction ?? (next > active ? 1 : -1))
    setActive(next)
    elapsedRef.current = 0
    setElapsed(0)
    lastTickRef.current = Date.now()
  }, [active])

  const advance = useCallback(() => {
    setActive(prev => {
      const next = (prev + 1) % N
      setDir(1)
      return next
    })
    elapsedRef.current = 0
    setElapsed(0)
    lastTickRef.current = Date.now()
  }, [])

  // Auto-advance + progress tracking
  useEffect(() => {
    if (paused || !isVisibleRef.current) return
    intervalRef.current = setInterval(() => {
      const now = Date.now()
      elapsedRef.current += now - lastTickRef.current
      lastTickRef.current = now
      if (elapsedRef.current >= INTERVAL) {
        advance()
      } else {
        setElapsed(elapsedRef.current)
      }
    }, 50)
    return () => clearInterval(intervalRef.current)
  }, [paused, advance])

  /* Pause timer when offscreen */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting
      if (entry.isIntersecting) {
        lastTickRef.current = Date.now()
        if (!paused) {
          clearInterval(intervalRef.current)
          intervalRef.current = setInterval(() => {
            const now = Date.now()
            elapsedRef.current += now - lastTickRef.current
            lastTickRef.current = now
            if (elapsedRef.current >= INTERVAL) {
              advance()
            } else {
              setElapsed(elapsedRef.current)
            }
          }, 50)
        }
      } else {
        clearInterval(intervalRef.current)
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [paused, advance])

  const t = testimonials[active]
  const progress = Math.min(elapsed / INTERVAL, 1)

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 50 : -50, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -50 : 50, scale: 0.97 }),
  }

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="section-divider" />

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background:
              `radial-gradient(ellipse 60% 50% at 50% 60%, ${t.accent}08, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/0 via-navy-800/20 to-navy-900/0" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <motion.div
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-blue font-mono text-sm">05</span>
          <div className="w-12 h-px bg-accent-blue/40" />
          <span className="text-[11px] font-medium text-gray-400 tracking-[0.22em] uppercase">Client Stories</span>
        </motion.div>

        <motion.div
          className="mb-10 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h2
            className="font-display font-bold text-white leading-[1.06]"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)' }}
          >
            Words from our{' '}
            <span className="gradient-text">partners</span>
          </h2>
        </motion.div>

        {/* ── Main testimonial area ── */}
        <div
          className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-10 items-start"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          {/* LEFT — active testimonial card */}
          <div className="relative">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${t.accent}22`,
                    boxShadow: `0 0 60px -12px ${t.accent}18`,
                  }}
                >
                  {/* Accent top bar */}
                  <div
                    className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full"
                    style={{ background: `linear-gradient(to right, transparent, ${t.accent}, transparent)` }}
                  />

                  {/* Big decorative quote */}
                  <div
                    className="absolute top-4 right-6 font-display font-bold select-none pointer-events-none leading-none"
                    style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', color: t.accent, opacity: 0.06 }}
                  >
                    "
                  </div>

                  {/* Stars */}
                  <div className="mb-5 sm:mb-6">
                    <StarRating count={t.stars} />
                  </div>

                  {/* Quote text */}
                  <blockquote
                    className="text-gray-200 font-light leading-relaxed mb-7 sm:mb-8 relative z-10"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)' }}
                  >
                    "{t.text}"
                  </blockquote>

                  {/* Author row */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3.5">
                      {/* Avatar */}
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center font-bold text-white text-sm flex-shrink-0`}
                        style={{ boxShadow: `0 0 20px -4px ${t.accent}50` }}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-sm sm:text-base leading-tight">{t.name}</div>
                        <div className="text-xs sm:text-sm text-gray-400 mt-0.5">{t.role}</div>
                      </div>
                    </div>

                    {/* Metric pill */}
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold flex-shrink-0"
                      style={{ background: t.accent + '14', color: t.accent, border: `1px solid ${t.accent}28` }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {t.metric}
                    </div>
                  </div>

                  {/* Auto-advance progress bar */}
                  <div className="mt-6 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(to right, ${t.accent}, ${t.accent}80)` }}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.05, ease: 'linear' }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next arrows */}
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={() => go(active === 0 ? N - 1 : active - 1, -1)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label="Previous"
              >
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => go((active + 1) % N, 1)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: t.accent + '18', border: `1px solid ${t.accent}35` }}
                aria-label="Next"
              >
                <svg className="w-3.5 h-3.5" style={{ color: t.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <span className="font-mono text-xs text-gray-600 ml-1">
                {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
              </span>
              <span className="font-mono text-[10px] text-gray-700 ml-auto">
                {paused ? '⏸ paused' : '▶ auto'}
              </span>
            </div>
          </div>

          {/* RIGHT — stacked mini cards (desktop only) */}
          <div className="hidden lg:flex flex-col gap-3">
            {testimonials.map((item, i) => {
              const isActive = i === active
              return (
                <motion.button
                  key={i}
                  onClick={() => go(i)}
                  className="w-full text-left rounded-2xl p-4 transition-all duration-400 relative overflow-hidden"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isActive ? item.accent + '35' : 'rgba(255,255,255,0.06)'}`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ opacity: isActive ? 1 : 0.55 }}
                  transition={{ duration: 0.3 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="cardHighlight"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full"
                      style={{ background: item.accent }}
                      transition={{ duration: 0.35 }}
                    />
                  )}
                  <div className="flex items-center gap-3 pl-2">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                    >
                      {item.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm truncate">{item.name}</div>
                      <div className="text-[11px] text-gray-500 truncate">{item.role}</div>
                    </div>
                  </div>
                  {isActive && (
                    <p className="text-gray-400 text-xs leading-relaxed mt-2 pl-2 line-clamp-2">
                      {item.text}
                    </p>
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Mobile bottom dots */}
          <div className="flex lg:hidden items-center justify-center gap-2 -mt-2">
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to ${item.name}`}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === active ? 24 : 6,
                  height: 4,
                  background: i === active ? t.accent : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
