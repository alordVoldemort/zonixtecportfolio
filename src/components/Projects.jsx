import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const projects = [
  {
    title: 'Kaleshwari Mandir',
    url: 'https://kaleshwarimandirannadanchhatra.org/',
    category: 'Religious · Web',
    description: 'Live darshan, online pooja slot booking and Annadan Chhatra donations — connecting devotees digitally.',
    tags: ['React', 'Node.js'],
    accent: '#4FC3F7',
    gradient: 'from-blue-500 to-cyan-400',
    previewImage: '/kaleshwari.png', 
  },
  {
    title: 'Nirmal Health Care',
    url: 'https://nirmalhealthcare.co.in/',
    category: 'Healthcare',
    description: 'Doctor appointment booking with real-time slot availability and patient management.',
    tags: ['React', 'PHP'],
    accent: '#34d399',
    gradient: 'from-emerald-500 to-teal-400',
    previewImage: '/Nirmal-Health-Care.png',
  },
  {
    title: 'Morya Cars',
    category: 'Car CRM User',
    url: 'https://moryacarswakad.com/',
    description: 'With Zonixtec CRM, our sales efficiency improved by 45% and saved more than ₹1 lakh in operational costs.',
    tags: ['Reactjs', 'Php', 'SQL'],
    accent: '#a78bfa',
    gradient: 'from-purple-500 to-pink-500',
    previewImage: '/Morya_Cars.png', 
  },
  {
    title: 'EasyEAuction',
    category: 'Auction Platform',
    url: 'https://easyeauction.com/',
    description: 'Their auction system automated 80% of our processes and saved 30+ working hours weekly with smooth real-time bidding.',
    tags: ['Vue.js', 'D3.js', 'Python'],
    accent: '#6ee7b7',
    gradient: 'from-green-500 to-emerald-400',
    previewImage: '/Easyeauction.png', 
  },
  {
    title: 'HRMS Platform',
    url: 'https://team.zonixtec.com/',
    category: 'HRMS Software',
    description: 'HRMS platform with employee self-service, attendance tracking, and payroll management for streamlined HR operations.',
    tags: ['Reactjs', 'Nodejs', 'SQL'],
    accent: '#fbbf24',
    gradient: 'from-amber-400 to-orange-500',
    previewImage: '/HRMS_Zonixtec.png', 
  },
  {
    title: 'CRM Platform',
    url: 'https://business.zonixtec.com/',
    category: 'CRM Software',
    description: 'CRM platform with customer relationship management, sales automation, and analytics for improved business operations. ',
    tags: ['Next.js', 'OpenAI', 'PostgreSQL'],
    accent: '#f472b6',
    gradient: 'from-rose-500 to-red-400',
    previewImage: '/CRM_Bussiness.png',
  },
  {
    title: 'Kalakruti Studio',
    url: 'https://interior-design-website-umber.vercel.app/',
    category: 'Interior Design',
    description: 'A visually stunning website for an interior design studio, showcasing their portfolio and services with a modern aesthetic.',
    tags: ['React', 'Tailwind CSS'],
    accent: '#f43f5e',
    gradient: 'from-pink-500 to-red-500',
    previewImage: '/Kalakruti_Studio.png',
  },
  {
    title: 'Billing Software',
    url: 'https://billing-software-self.vercel.app/dashboard',
    category: 'Billing Software',
    description: 'A modern and efficient billing software that simplifies invoice generation, payment tracking, and sales management with a user-friendly interface and real-time insights.',
    tags: ['React', 'Tailwind CSS'],
    accent: '#72f43f',
    gradient: 'from-green-500 to-emerald-400',
    previewImage: '/billing.png',
  },
  {
    title: 'Real Estate website',
    url: 'https://real-estate-three-ruby.vercel.app/',
    category: 'Real Estate',
    description: 'A modern real estate website for showcasing properties, facilitating listings, and providing a seamless user experience.',
    tags: ['React', 'Tailwind CSS'],
    accent: '#f59e0b',
    gradient: 'from-amber-500 to-yellow-400',
    previewImage: '/Real_Estate_Website.png',
  },
  {
    title: 'Swami Cabs',
    url: '',
    category: 'Car Booking Application',
    description: 'A modern mobile application for booking car rentals with a user-friendly interface and real-time availability updates.',
    tags: ['React Native', 'Node.js', 'MongoDB'],
    accent: '#f59e0b',
    gradient: 'from-amber-500 to-yellow-400',
    previewImage: '/car.png',
  }
]


function MockPreview({ project }) {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: '#0d1526' }}>
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-[0.14] pointer-events-none`} />
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{ background: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="h-1.5 w-10 rounded-full" style={{ background: project.accent + '55' }} />
        <div className="flex-1 flex justify-end gap-1.5">
          {[28, 22, 26].map((w, i) => (
            <div key={i} className="h-1 rounded-full" style={{ width: w, background: 'rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      </div>
      
      <div className="px-3 pt-3 pb-1">
        <div className="h-2.5 w-3/4 rounded-full mb-1.5" style={{ background: project.accent + '60' }} />
        <div className="h-1.5 w-1/2 rounded-full mb-2.5" style={{ background: 'rgba(255,255,255,0.13)' }} />
        <div className="flex gap-2">
          <div className="h-4 w-14 rounded" style={{ background: project.accent + '40' }} />
          <div className="h-4 w-10 rounded" style={{ background: 'rgba(255,255,255,0.07)' }} />
        </div>
      </div>
     
      <div className="px-3 pt-2.5 grid grid-cols-3 gap-1.5">
        {[60, 45, 70].map((pct, i) => (
          <div
            key={i}
            className="rounded"
            style={{ height: 42, background: project.accent + '10', border: '1px solid ' + project.accent + '1a' }}
          >
            <div className="h-1.5 mx-1.5 mt-2 rounded-full" style={{ width: pct + '%', background: project.accent + '45' }} />
            <div className="h-1 mx-1.5 mt-1 rounded-full" style={{ width: '45%', background: 'rgba(255,255,255,0.08)' }} />
          </div>
        ))}
      </div>
      
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0d1526)' }}
      />
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] },
  }),
}

function ProjectCard({ project, index, visible }) {
  const hasUrl = Boolean(project.url)

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Subtle hover glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${project.gradient} transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-[0.06] z-0`}
      />
      {/* Top shimmer on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
        style={{ background: `linear-gradient(to right, transparent, ${project.accent}90, transparent)` }}
      />

      {/* ── BROWSER CHROME ── */}
      <div
        className="relative z-10 flex items-center gap-2 px-3 py-2 flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.055)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-red-400/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
          <div className="w-2 h-2 rounded-full bg-green-400/70" />
        </div>
        {/* URL pill */}
        <div
          className="flex-1 flex items-center gap-1.5 rounded px-2 py-0.5 min-w-0"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <svg className="w-2.5 h-2.5 flex-shrink-0" style={{ color: project.accent + 'aa' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="font-mono text-[9px] text-gray-500 truncate select-none">
            {hasUrl
              ? project.url.replace('https://', '').replace(/\/$/, '')
              : project.title.toLowerCase().replace(/[^a-z0-9]/g, '') + '.app'}
          </span>
        </div>
        {/* Live / Demo badge */}
        {hasUrl ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold font-mono flex-shrink-0 hover:opacity-80 transition-opacity"
            style={{ background: project.accent + '22', color: project.accent }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: project.accent }} />
            LIVE
          </a>
        ) : (
          <span
            className="text-[9px] font-mono px-2 py-0.5 rounded flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.22)' }}
          >
            DEMO
          </span>
        )}
      </div>

      {/* ── PREVIEW AREA ── */}
      <div
        className="relative z-10 flex-shrink-0"
        style={{ height: 200, overflow: 'hidden' }}
      >
        {project.previewImage ? (
          /* Show project image if available */
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={project.previewImage}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover object-top"
              style={{ opacity: 0.85 }}
              onError={(e) => {
                console.error('Image failed to load:', project.previewImage);
                e.target.style.display = 'none';
                // Show fallback content
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'absolute inset-0 flex flex-col items-center justify-center';
                fallbackDiv.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))';
                fallbackDiv.innerHTML = `
                  <svg class="w-10 h-10 mb-2 opacity-30" style="color: ${project.accent}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>
                  </svg>
                  <span class="font-mono text-[10px] text-gray-500 text-center px-4 break-all leading-tight">${project.url}</span>
                `;
                e.target.parentElement.appendChild(fallbackDiv);
              }}
            />
          </div>
        ) : hasUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))' }}>
            <svg className="w-10 h-10 mb-2 opacity-30" style={{ color: project.accent }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>
            </svg>
            <span className="font-mono text-[10px] text-gray-500 text-center px-4 break-all leading-tight">{project.url}</span>
          </div>
        ) : (
          <MockPreview project={project} />
        )}
        {/* Bottom fade into card body */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,21,38,0.75))' }}
        />
      </div>

      {/* ── CARD INFO ── */}
      <div className="relative z-10 p-4 flex flex-col flex-1">
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-4 bottom-4 w-[2px] rounded-r-full transition-all duration-500 group-hover:top-2 group-hover:bottom-2"
          style={{ background: project.accent }}
        />

        {/* Category + index */}
        <div className="flex items-center justify-between mb-2 pl-3">
          <span
            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full tracking-wider uppercase"
            style={{ background: project.accent + '18', color: project.accent }}
          >
            {project.category}
          </span>
          <span className="font-mono text-lg font-bold select-none" style={{ color: 'rgba(255,255,255,0.05)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Animated accent line */}
        <div
          className="h-[2px] w-6 rounded-full transition-all duration-500 group-hover:w-10 mb-2 ml-3"
          style={{ background: `linear-gradient(to right, ${project.accent}, transparent)` }}
        />

        {/* Title */}
        <h3 className="font-display font-bold text-white text-sm sm:text-base leading-snug mb-1.5 pl-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-xs leading-relaxed flex-1 pl-3 mb-3">
          {project.description}
        </p>

        {/* Tags + visit arrow */}
        <div className="flex items-center justify-between gap-2 pl-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          {hasUrl ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ background: project.accent + '20', border: '1px solid ' + project.accent + '44' }}
              onClick={e => e.stopPropagation()}
            >
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H5M11 1V7" stroke={project.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ background: project.accent + '20', border: '1px solid ' + project.accent + '44' }}
            >
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H5M11 1V7" stroke={project.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-12%' })
  // phase: 'idle' | 'playing' | 'cards'
  const [phase, setPhase] = useState('idle')
  const [progress, setProgress] = useState(0)
  const started = useRef(false)

  // Trigger video when section enters viewport
  useEffect(() => {
    if (isInView && !started.current) {
      started.current = true
      setPhase('playing')
      const vid = videoRef.current
      if (vid) {
        vid.currentTime = 0
        vid.playbackRate = 2.5
        vid.play().catch(() => setPhase('cards'))
      }
    }
  }, [isInView])

  const reveal = useCallback(() => setPhase('cards'), [])

  const lastProgressRef = useRef(0)
  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current
    if (vid && vid.duration) {
      const p = vid.currentTime / vid.duration
      if (p - lastProgressRef.current > 0.02) {
        lastProgressRef.current = p
        setProgress(p)
      }
    }
  }, [])

  const cardsVisible = phase === 'cards'

  return (
    <section ref={sectionRef} id="projects" className="relative bg-navy-900 overflow-hidden">
      <div className="section-divider" />

      <AnimatePresence mode="wait">

        {/* ── VIDEO INTRO ── */}
        {!cardsVisible && (
          <motion.div
            key="video-stage"
            className="relative w-full overflow-hidden"
            style={{ height: '100svh', minHeight: 'min(480px, 100vw)' }}
            exit={{
              opacity: 0,
              scale: 1.12,
              filter: 'blur(20px)',
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            {/* Video */}
            <video
              ref={videoRef}
              src="/ourprojects.mp4"
              muted
              playsInline
              preload="none"
              onEnded={reveal}
              onTimeUpdate={handleTimeUpdate}
              onError={reveal}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />

            {/* Bottom-to-top dark gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to top, #020B14 0%, rgba(2,11,20,0.25) 50%, rgba(2,11,20,0.55) 100%)',
              }}
            />
            {/* Edge vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 120% 100% at 50% 50%, transparent 50%, rgba(2,11,20,0.65) 100%)',
              }}
            />

            {/* Corner bracket — top left */}
            <motion.div
              className="absolute top-6 left-6 pointer-events-none"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: phase === 'playing' ? 1 : 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <div className="w-8 h-px bg-accent-blue/70" />
              <div className="w-px h-8 bg-accent-blue/70" />
            </motion.div>
            {/* Corner bracket — top right */}
            <motion.div
              className="absolute top-6 right-6 flex flex-col items-end pointer-events-none"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: phase === 'playing' ? 1 : 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <div className="w-8 h-px bg-accent-blue/70" />
              <div className="w-px h-8 bg-accent-blue/70" />
            </motion.div>

            {/* Scan-line accent (decorative) */}
            <motion.div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ top: '38%', background: 'linear-gradient(to right, transparent, rgba(79,195,247,0.2), transparent)' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: phase === 'playing' ? 1 : 0, opacity: phase === 'playing' ? 1 : 0 }}
              transition={{ delay: 0.9, duration: 1.2, ease: 'easeOut' }}
            />

            {/* Bottom content overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-10 pb-4 sm:pb-8 md:pb-14 z-10"
              initial={{ opacity: 0, y: 36 }}
              animate={{
                opacity: phase === 'playing' ? 1 : 0,
                y: phase === 'playing' ? 0 : 36,
              }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="max-w-7xl mx-auto">
                {/* Label */}
                <div className="hidden sm:flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="text-accent-blue font-mono text-xs tracking-widest">03</span>
                  <div className="w-8 h-px bg-accent-blue/50" />
                  <span className="text-[11px] font-medium text-gray-400 tracking-[0.2em] uppercase">
                    Selected Work
                  </span>
                </div>

                {/* Heading with letter-by-letter reveal via staggered spans */}
                <h2
                  className="font-display font-bold text-white leading-tight mb-3 sm:mb-6"
                  style={{ fontSize: 'clamp(1.25rem, 4.5vw, 3.8rem)' }}
                >
                  Projects that{' '}
                  <br className="sm:hidden" />
                  <span className="gradient-text">speak volumes</span>
                </h2>

                {/* Buttons */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    onClick={reveal}
                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      background: 'rgba(79,195,247,0.14)',
                      border: '1px solid rgba(79,195,247,0.35)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span className="hidden sm:inline">View All Projects</span>
                    <span className="sm:hidden">View Projects</span>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1 12L12 1M12 1H5.5M12 1V7.5" stroke="#4FC3F7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={reveal}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors duration-200 font-mono tracking-wider"
                  >
                    Skip intro →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Progress bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            >
              <motion.div
                className="h-full"
                style={{
                  background: 'linear-gradient(to right, #4FC3F7, #7C4DFF)',
                  width: `${progress * 100}%`,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* ── CARDS SECTION ── */}
        {cardsVisible && (
          <motion.div
            key="cards-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="py-14 sm:py-20 md:py-28 relative"
          >
            {/* Ambient top glow */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-56"
              style={{
                background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(79,195,247,0.07) 0%, transparent 70%)',
              }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
              {/* Header */}
              <motion.div
                className="flex items-center gap-4 mb-5"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <span className="text-accent-blue font-mono text-sm">03</span>
                <div className="w-14 h-px bg-accent-blue/50" />
                <span className="text-xs font-medium text-gray-400 tracking-widest uppercase">
                  Selected Work
                </span>
              </motion.div>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-14">
                <motion.h2
                  className="font-display font-bold text-white leading-[1.06] mb-4 md:mb-0"
                  style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)' }}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  Projects that <br />
                  <span className="gradient-text">speak volumes</span>
                </motion.h2>

                <motion.p
                  className="text-gray-400 max-w-xs text-sm leading-relaxed"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.22 }}
                >
                  Innovation, design excellence, and technical mastery — delivered.
                </motion.p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {projects.map((project, i) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={i}
                    visible={cardsVisible}
                  />
                ))}
              </div>

              {/* CTA */}
              <motion.div
                className="flex justify-center mt-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
              >
                <a
                  href="#contact"
                  className="flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  Start your project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M1 7h12M8 2l5 5-5 5" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </section>
  )
}