import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HiOutlineCode,
  HiOutlineDeviceMobile,
  HiOutlineCube,
  HiOutlineChartBar,
  HiOutlineLightningBolt,
  HiOutlineGlobe,
} from 'react-icons/hi'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: HiOutlineCode,
    number: '01',
    title: 'Web Development',
    description:
      'Modern, performant web applications built with cutting-edge technologies. From single-page apps to enterprise full-stack platforms that scale.',
    accent: '#4FC3F7',
    gradient: 'from-blue-400 to-cyan-400',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
    preview: 'https://kaleshwarimandirannadanchhatra.org/',
    previewImage: '/kaleshwari.png',
  },
  {
    icon: HiOutlineDeviceMobile,
    number: '02',
    title: 'Mobile Apps',
    description:
      'Native and cross-platform mobile experiences that users love. Seamless performance on iOS, Android, and beyond.',
    accent: '#a78bfa',
    gradient: 'from-violet-400 to-purple-400',
    tags: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
    preview: 'https://flutter.dev',
  },
  {
    icon: HiOutlineCube,
    number: '03',
    title: 'UI / UX Design',
    description:
      'Award-worthy interfaces that balance aesthetics with usability. Every pixel placed with purpose, every interaction designed with intent.',
    accent: '#34d399',
    gradient: 'from-emerald-400 to-teal-400',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Motion'],
    preview: 'https://dribbble.com',
  },
  {
    icon: HiOutlineChartBar,
    number: '04',
    title: 'HRMS & Analytics',
    description:
      'Data-driven insights and intelligent dashboards that empower smarter decisions. Transform raw data into actionable business value.',
    accent: '#fbbf24',
    gradient: 'from-amber-400 to-orange-400',
    tags: ['Dashboards', 'React', 'Angular', 'SQL'],
    preview: 'https://team.zonixtec.com/login',
    previewImage: '/HRMS_Zonixtec.png',
  },
  {
    icon: HiOutlineLightningBolt,
    number: '05',
    title: 'CRM',
    description:
      'Customer Relationship Management - Streamline your sales, marketing, and customer service processes with our comprehensive CRM solution.',
    accent: '#f472b6',
    gradient: 'from-pink-400 to-rose-400',
    tags: ['React', 'Nodejs', 'SQL', 'Angular'],
    preview: 'https://business.zonixtec.com/',
    previewImage: '/CRM_Bussiness.png', // Added CRM image
  },
  
]

const N = services.length

export default function Services() {
  const pinRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const el = pinRef.current
        if (!el) return

        const obj = { val: 0 }
        const tween = gsap.to(obj, {
          val: N - 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            pin: true,
            start: 'top top',
            end: '+=' + ((N - 1) * 100) + '%',
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const i = Math.round(self.progress * (N - 1))
              setActive(prev => prev !== i ? i : prev)
            },
          },
        })

        return () => tween.kill()
      })

      return () => mm.revert()
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  const svc = services[active]

  return (
    <section id="services" className="relative">

      {/* DESKTOP */}
      <div
        ref={pinRef}
        className="hidden lg:block relative bg-navy-900 overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-700"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 75% 50%, ' + svc.accent + '0A, transparent 70%),' +
              'radial-gradient(ellipse 50% 50% at 10% 60%, rgba(79,195,247,0.06) 0%, transparent 55%)',
          }}
        />
        <div className="section-divider" />

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {services.map((s, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === active ? 28 : 6,
                height: 4,
                background: i === active ? svc.accent : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
          <span className="font-mono text-[10px] text-gray-600 ml-2">
            {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
          </span>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-16 flex flex-col">

          {/* Header */}
          <div className="pt-12 pb-4 flex-shrink-0">
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-sm text-accent-blue select-none">02</span>
              <div className="w-12 h-px bg-accent-blue/40" />
              <span className="text-xs font-medium tracking-[0.22em] uppercase text-gray-400">
                Our Services
              </span>
            </div>
            <div className="flex items-end justify-between">
              <h2
                className="font-display font-bold text-white leading-[1.06]"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                What we <span className="gradient-text">do best</span>
              </h2>
              <div className="flex items-center gap-3 pb-1 text-gray-600">
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  Scroll to explore
                </span>
                <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
                  <path d="M0 5H22M22 5L18 1M22 5L18 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main: left tracker + right card */}
          <div className="flex-1 grid grid-cols-[220px_1fr] xl:grid-cols-[300px_1fr] gap-6 xl:gap-14 min-h-0 pb-16 overflow-hidden">

            {/* LEFT: service list */}
            <div className="flex flex-col justify-center">
              <div className="space-y-1 mb-8">
                {services.map((s, i) => {
                  const isActive = i === active
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2 transition-all duration-400 cursor-default"
                      style={{ opacity: isActive ? 1 : 0.3 }}
                    >
                      <div
                        className="rounded-full flex-shrink-0 transition-all duration-500"
                        style={{
                          width: isActive ? 28 : 8,
                          height: 3,
                          background: isActive ? s.accent : 'rgba(255,255,255,0.2)',
                        }}
                      />
                      <span
                        className="font-mono text-xs tracking-wide transition-all duration-400"
                        style={{
                          color: isActive ? s.accent : 'rgba(255,255,255,0.4)',
                          fontWeight: isActive ? 700 : 400,
                        }}
                      >
                        {s.number}
                      </span>
                      <span
                        className="text-sm font-medium transition-all duration-400 truncate"
                        style={{ color: isActive ? 'white' : 'rgba(255,255,255,0.25)' }}
                      >
                        {s.title}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Active description + tags */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-[240px] xl:max-w-[280px]">
                    {svc.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {svc.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                        style={{
                          background: svc.accent + '15',
                          color: svc.accent,
                          border: '1px solid ' + svc.accent + '28',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: phone mockup (Mobile Apps) or browser preview (others) */}
            <div className="flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 60, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={['02','03'].includes(svc.number) ? 'relative flex items-center justify-center' : 'relative w-full max-w-full rounded-2xl overflow-hidden'}
                  style={['02','03'].includes(svc.number) ? {} : {
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid ' + svc.accent + '25',
                  }}
                >
                  {svc.number === '02' ? (
                    /* ===== PHONE MOCKUP ===== */
                    <div className="relative flex flex-col items-center">
                      {/* Ambient glow */}
                      <div
                        className="pointer-events-none absolute rounded-full blur-[100px]"
                        style={{
                          width: '220px', height: '400px',
                          background: svc.accent,
                          opacity: 0.14,
                          top: '50%', left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />

                      {/* iPhone body */}
                      <div
                        className="relative overflow-hidden"
                        style={{
                          width: 'clamp(200px, 22vw, 248px)',
                          height: 'clamp(400px, 50vh, 520px)',
                          background: '#0c0c18',
                          borderRadius: '3rem',
                          border: '5px solid rgba(255,255,255,0.12)',
                          boxShadow:
                            '0 0 0 1px rgba(255,255,255,0.05),' +
                            'inset 0 0 0 1px rgba(255,255,255,0.04),' +
                            '0 40px 80px -12px rgba(0,0,0,0.75),' +
                            '0 0 60px -8px ' + svc.accent + '35',
                        }}
                      >
                        {/* Dynamic Island */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30">
                          <div
                            className="rounded-full flex items-center gap-2 px-3"
                            style={{ width: '88px', height: '28px', background: '#000' }}
                          >
                            <div className="w-2 h-2 rounded-full bg-gray-900" />
                            <div className="flex-1 h-1.5 rounded-full bg-gray-900" />
                          </div>
                        </div>

                        {/* Status bar */}
                        <div
                          className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-7 pt-1.5"
                          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)' }}
                        >
                          <span className="font-mono text-[10px] text-white/80 font-semibold">9:41</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                            </svg>
                            <svg className="w-3.5 h-3.5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                              <rect x="2" y="7" width="20" height="11" rx="2" fillOpacity="0.3" />
                              <rect x="2" y="7" width="14" height="11" rx="2" />
                              <path d="M23 11v3a1 1 0 01-1 1h-1V10h1a1 1 0 011 1z" />
                            </svg>
                          </div>
                        </div>

                        {/* Video fills the screen */}
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                          src="/MoblieApplication.mp4"
                        />

                        {/* Home indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30">
                          <div
                            className="rounded-full"
                            style={{ width: '100px', height: '4px', background: 'rgba(255,255,255,0.28)' }}
                          />
                        </div>
                      </div>

                      {/* Phone side buttons (decorative) */}
                      <div
                        className="absolute"
                        style={{
                          left: '-7px', top: '90px',
                          width: '4px', height: '32px',
                          background: 'rgba(255,255,255,0.08)',
                          borderRadius: '2px',
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          left: '-7px', top: '132px',
                          width: '4px', height: '56px',
                          background: 'rgba(255,255,255,0.08)',
                          borderRadius: '2px',
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          left: '-7px', top: '198px',
                          width: '4px', height: '56px',
                          background: 'rgba(255,255,255,0.08)',
                          borderRadius: '2px',
                        }}
                      />
                      <div
                        className="absolute"
                        style={{
                          right: '-7px', top: '140px',
                          width: '4px', height: '80px',
                          background: 'rgba(255,255,255,0.08)',
                          borderRadius: '2px',
                        }}
                      />

                      {/* Label below */}
                      <div className="mt-7 flex items-center gap-2">
                        <div className={'w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br ' + svc.gradient}>
                          <svc.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-white text-sm font-semibold">{svc.title}</span>
                        {svc.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                            style={{ background: svc.accent + '18', color: svc.accent, border: '1px solid ' + svc.accent + '28' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : svc.number === '03' ? (
                    /* ===== LAPTOP / TABLET MOCKUP (UI/UX) ===== */
                    <div className="relative flex flex-col items-center">
                      {/* Ambient glow */}
                      <div
                        className="pointer-events-none absolute rounded-full blur-[120px]"
                        style={{
                          width: '400px', height: '220px',
                          background: svc.accent,
                          opacity: 0.1,
                          top: '40%', left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />

                      {/* Laptop lid (screen) */}
                      <div
                        className="relative"
                        style={{
                          width: 'clamp(280px, 38vw, 500px)',
                          background: '#111827',
                          borderRadius: '12px 12px 0 0',
                          border: '4px solid rgba(255,255,255,0.1)',
                          borderBottom: 'none',
                          padding: '6px',
                          boxShadow:
                            '0 -4px 30px -4px ' + svc.accent + '28,' +
                            '0 20px 60px -10px rgba(0,0,0,0.7)',
                        }}
                      >
                        {/* Camera dot */}
                        <div className="flex justify-center mb-1.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }} />
                        </div>
                        {/* Screen bezel + video */}
                        <div
                          className="relative overflow-hidden"
                          style={{
                            borderRadius: '6px',
                            aspectRatio: '16/10',
                          }}
                        >
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="none"
                            className="w-full h-full object-cover"
                            src="/uiuxvedio.mp4"
                          />
                          {/* Screen glare overlay */}
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
                            }}
                          />
                        </div>
                      </div>

                      {/* Laptop base */}
                      <div
                        style={{
                          width: 'clamp(300px, 41vw, 530px)',
                          height: '14px',
                          background: 'linear-gradient(to bottom, #1f2937, #111827)',
                          borderRadius: '0 0 6px 6px',
                          border: '4px solid rgba(255,255,255,0.08)',
                          borderTop: '1px solid rgba(255,255,255,0.06)',
                        }}
                      />
                      {/* Hinge shadow */}
                      <div
                        style={{
                          width: 'clamp(280px, 38vw, 500px)',
                          height: '4px',
                          background: 'rgba(0,0,0,0.5)',
                          borderRadius: '0 0 4px 4px',
                          filter: 'blur(4px)',
                        }}
                      />

                      {/* Label below */}
                      <div className="mt-6 flex items-center gap-2">
                        <div className={'w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br ' + svc.gradient}>
                          <svc.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-white text-sm font-semibold">{svc.title}</span>
                        {svc.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                            style={{ background: svc.accent + '18', color: svc.accent, border: '1px solid ' + svc.accent + '28' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* ===== BROWSER MOCKUP ===== */
                    <>
                      {/* Glow */}
                      <div
                        className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] z-0"
                        style={{ background: svc.accent, opacity: 0.1 }}
                      />

                      {/* Browser chrome */}
                      <div
                        className="relative z-10 px-4 pt-2.5 pb-2"
                        style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        {/* Row 1: traffic lights + service badge */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                          </div>
                          <div
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md"
                            style={{ background: svc.accent + '18' }}
                          >
                            <svc.icon className="w-3.5 h-3.5" style={{ color: svc.accent }} />
                            <span className="font-mono text-[10px] font-bold" style={{ color: svc.accent }}>
                              {svc.number}
                            </span>
                          </div>
                        </div>
                        {/* Row 2: full-width address bar — URL never clips */}
                        <div
                          className="flex items-center gap-2 rounded-md px-3 py-1.5 w-full"
                          style={{ background: 'rgba(255,255,255,0.06)' }}
                        >
                          <svg className="w-3 h-3 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="font-mono text-[11px] text-gray-400 select-none break-all leading-tight">
                            {svc.preview}
                          </span>
                        </div>
                      </div>

                      {/* Preview placeholder with conditional image rendering */}
                      <div
                        className="relative z-10 flex flex-col items-center justify-center"
                        style={{
                          height: 'clamp(300px, 48vh, 460px)',
                          overflow: 'hidden',
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                        }}
                      >
                        {(svc.number === '01' || svc.number === '04' || svc.number === '05') && svc.previewImage ? (
                          /* Show image for Web Development (01), HRMS (04), and CRM (05) */
                          <img 
                            src={svc.previewImage}
                            alt={
                              svc.number === '01' ? "Kaleshwari Mandir Preview" :
                              svc.number === '04' ? "HRMS Dashboard Preview" :
                              "CRM Business Preview"
                            }
                            className="w-full h-full object-cover object-top"
                            style={{ opacity: 0.9 }}
                            onError={(e) => {
                              console.error('Image failed to load:', svc.previewImage);
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div class="flex flex-col items-center gap-4 opacity-60"><svg class="w-12 h-12" style="color: ' + svc.accent + '80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg><span class="font-mono text-xs text-gray-500 text-center px-4">' + svc.preview + '</span></div>';
                            }}
                          />
                        ) : (
                          /* Default placeholder for other services */
                          <div className="flex flex-col items-center gap-4 opacity-60">
                            <HiOutlineGlobe className="w-12 h-12" style={{ color: svc.accent + '80' }} />
                            <span className="font-mono text-xs text-gray-500 text-center px-4">{svc.preview}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 60%, ${svc.accent}08, transparent 70%)` }} />
                      </div>

                      {/* Bottom info bar */}
                      <div
                        className="relative z-10 flex items-center justify-between px-4 py-2.5"
                        style={{ background: 'rgba(255,255,255,0.04)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div className="flex items-center gap-2">
                          <div className={'w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br ' + svc.gradient}>
                            <svc.icon className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-white text-xs font-medium">{svc.title}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {svc.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                              style={{ background: svc.accent + '14', color: svc.accent }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE + TABLET — one service at a time, tap to navigate */}
      <MobileServices />

    </section>
  )
}

function MobileServices() {
  const [idx, setIdx]   = useState(0)
  const [dir, setDir]   = useState(1)
  const wrapRef         = useRef(null)
  const panelRef        = useRef(null)
  const touchStartX     = useRef(null)
  const lastProgress    = useRef(0)

  useEffect(() => {
    let ctx
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia()
        mm.add('(max-width: 1023px)', () => {
          if (!wrapRef.current || !panelRef.current) return
          const st = ScrollTrigger.create({
            trigger: wrapRef.current,
            start: 'top top',
            end: () => `+=${(N - 1) * window.innerHeight}`,
            pin: panelRef.current,
            pinSpacing: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const d = self.progress >= lastProgress.current ? 1 : -1
              lastProgress.current = self.progress
              const i = Math.min(N - 1, Math.round(self.progress * (N - 1)))
              setDir(d)
              setIdx(prev => prev !== i ? i : prev)
            },
          })
          return () => st.kill()
        })
        return () => mm.revert()
      })
    }, 200)
    return () => { clearTimeout(timer); if (ctx) ctx.revert() }
  }, [])

  const navigate = useCallback((next) => {
    if (!wrapRef.current) { setIdx(next); return }
    setDir(next > idx ? 1 : -1)
    const wrapTop = wrapRef.current.getBoundingClientRect().top + window.scrollY
    const dest    = wrapTop + (next / (N - 1)) * (N - 1) * window.innerHeight
    window.scrollTo({ top: dest, behavior: 'smooth' })
  }, [idx])

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40)
      navigate(diff > 0 ? Math.min(N - 1, idx + 1) : Math.max(0, idx - 1))
    touchStartX.current = null
  }

  const s = services[idx]

  const variants = {
    enter:  (d) => ({ opacity: 0, y: d > 0 ?  40 : -40, scale: 0.97 }),
    center:       ({ opacity: 1, y: 0,              scale: 1    }),
    exit:   (d) => ({ opacity: 0, y: d > 0 ? -40 :  40, scale: 0.97 }),
  }

  return (
    <div ref={wrapRef} className="lg:hidden relative bg-navy-900">
      <div
        ref={panelRef}
        className="relative flex flex-col bg-navy-900"
        style={{ height: '100vh' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-700"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 20%, ' + s.accent + '0D, transparent 65%),' +
              'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(79,195,247,0.05) 0%, transparent 60%)',
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-[3px] z-30" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            className="h-full rounded-r-full"
            animate={{ width: `${(idx / (N - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: `linear-gradient(to right, ${s.accent}, ${s.accent}70)` }}
          />
        </div>

        <div className="section-divider" />

        <div className="relative flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 sm:px-6 pt-4 sm:pt-6 pb-3 min-h-0">
          <div className="flex-shrink-0 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-sm text-accent-blue">02</span>
              <div className="w-8 h-px bg-accent-blue/40" />
              <span className="text-[10px] tracking-[0.22em] uppercase text-gray-400">Our Services</span>
            </div>
            <div className="flex items-end justify-between">
              <h2
                className="font-display font-bold text-white leading-[1.08]"
                style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)' }}
              >
                What we <span className="gradient-text">do best</span>
              </h2>
              <span className="font-mono text-[10px] text-gray-600 pb-1">↕ scroll</span>
            </div>
          </div>

          <div className="flex-1 relative min-h-0 flex flex-col justify-center">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={idx}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col gap-3 sm:gap-5 justify-center overflow-y-auto"
                style={{ scrollbarWidth: 'none', paddingTop: 4, paddingBottom: 4 }}
              >
                <div
                  className="rounded-2xl overflow-hidden flex-shrink-0"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid ' + s.accent + '28',
                    boxShadow: '0 0 40px -8px ' + s.accent + '20',
                  }}
                >
                  <div
                    className="px-3.5 pt-2.5 pb-2"
                    style={{ background: 'rgba(255,255,255,0.055)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                      </div>
                      <div
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded-md"
                        style={{ background: s.accent + '18' }}
                      >
                        <s.icon className="w-3 h-3" style={{ color: s.accent }} />
                        <span className="font-mono text-[9px] font-bold" style={{ color: s.accent }}>{s.number}</span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-2 rounded px-2.5 py-1"
                      style={{ background: 'rgba(0,0,0,0.25)' }}
                    >
                      <svg className="w-2.5 h-2.5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="font-mono text-[10px] text-gray-500 break-all select-none leading-tight">
                        {s.preview}
                      </span>
                    </div>
                  </div>

                  {s.number === '02' ? (
                    <div className="flex items-center justify-center py-5" style={{ background: '#080b14', height: 170 }}>
                      <div
                        className="relative overflow-hidden"
                        style={{
                          width: 84, height: 148,
                          background: '#0c0c18',
                          borderRadius: '1.6rem',
                          border: '3px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 0 30px -4px ' + s.accent + '50',
                        }}
                      >
                        <video autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" src="/MoblieApplication.mp4" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center justify-center" style={{ height: 170, overflow: 'hidden', background: 'rgba(255,255,255,0.015)' }}>
                      {(s.number === '01' || s.number === '04' || s.number === '05') && s.previewImage ? (
                        <img 
                          src={s.previewImage}
                          alt={
                            s.number === '01' ? "Kaleshwari Mandir Preview" :
                            s.number === '04' ? "HRMS Dashboard Preview" :
                            "CRM Business Preview"
                          }
                          className="w-full h-full object-cover object-top"
                          style={{ opacity: 0.9 }}
                          onError={(e) => {
                            console.error('Mobile image failed to load:', s.previewImage);
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="flex flex-col items-center gap-4 opacity-60"><svg class="w-8 h-8 mb-2 opacity-30" style="color: ' + s.accent + '" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg><span class="font-mono text-[9px] text-gray-600 text-center px-3 break-all leading-tight">' + s.preview + '</span></div>';
                          }}
                        />
                      ) : (
                        <>
                          <HiOutlineGlobe className="w-8 h-8 mb-2 opacity-30" style={{ color: s.accent }} />
                          <span className="font-mono text-[9px] text-gray-600 text-center px-3 break-all leading-tight">{s.preview}</span>
                        </>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-10"
                        style={{ background: 'linear-gradient(to bottom, transparent, rgba(8,11,20,0.92))' }} />
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={'w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ' + s.gradient + ' flex-shrink-0'}>
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] block" style={{ color: s.accent }}>{s.number}</span>
                      <h3 className="font-display font-bold text-white text-base sm:text-lg leading-tight">{s.title}</h3>
                    </div>
                  </div>
                  <div className="h-[2px] w-8 rounded-full mb-2.5" style={{ background: 'linear-gradient(to right,' + s.accent + ', transparent)' }} />
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{s.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-full"
                        style={{ background: s.accent + '16', color: s.accent, border: '1px solid ' + s.accent + '28' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex-shrink-0 pt-3 pb-1 flex items-center justify-between">
            <span className="font-mono text-xs text-gray-600">
              {String(idx + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(N).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              {services.map((sv, i) => (
                <button
                  key={i}
                  onClick={() => navigate(i)}
                  aria-label={'Go to ' + sv.title}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width: i === idx ? 24 : 5,
                    height: 4,
                    background: i === idx ? s.accent : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-gray-600">swipe ↔</span>
          </div>

        </div>
      </div>
    </div>
  )
}