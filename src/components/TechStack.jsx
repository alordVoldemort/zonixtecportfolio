import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPython, SiDocker, SiFigma, SiMongodb, SiPostgresql, SiGraphql,
  SiVuedotjs, SiFirebase, SiRedis, SiVercel, SiKubernetes, SiFlutter, SiFramer,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const CATEGORIES = [
  {
    id: 'frontend', label: 'Frontend', color: '#61DAFB',
    techs: [
      { name: 'React',        icon: SiReact,       color: '#61DAFB' },
      { name: 'Next.js',      icon: SiNextdotjs,   color: '#e2e2e2' },
      { name: 'TypeScript',   icon: SiTypescript,  color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Vue.js',       icon: SiVuedotjs,    color: '#4FC08D' },
      { name: 'Framer',       icon: SiFramer,      color: '#FF0055' },
    ],
  },
  {
    id: 'backend', label: 'Backend', color: '#68D391',
    techs: [
      { name: 'Node.js',  icon: SiNodedotjs, color: '#339933' },
      { name: 'Python',   icon: SiPython,    color: '#FFD43B' },
      { name: 'GraphQL',  icon: SiGraphql,   color: '#E10098' },
    ],
  },
  {
    id: 'database', label: 'Database', color: '#47A248',
    techs: [
      { name: 'MongoDB',    icon: SiMongodb,    color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Firebase',   icon: SiFirebase,   color: '#FFCA28' },
      { name: 'Redis',      icon: SiRedis,      color: '#DC382D' },
    ],
  },
  {
    id: 'cloud', label: 'Cloud & DevOps', color: '#FF9900',
    techs: [
      { name: 'AWS',        icon: FaAws,        color: '#FF9900' },
      { name: 'Docker',     icon: SiDocker,     color: '#2496ED' },
      { name: 'Vercel',     icon: SiVercel,     color: '#cccccc' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
    ],
  },
  {
    id: 'design', label: 'Design & Mobile', color: '#F24E1E',
    techs: [
      { name: 'Figma',   icon: SiFigma,   color: '#F24E1E' },
      { name: 'Flutter', icon: SiFlutter, color: '#54C5F8' },
    ],
  },
]

const STATS = [
  { value: '19+',  label: 'Technologies' },
  { value: '5+',   label: 'Years Experience' },
  { value: '150+', label: 'Projects Delivered' },
  { value: '99%',  label: 'Client Satisfaction' },
]

const MARQUEE_WORDS = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'MongoDB', 'Figma', 'Flutter']

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('frontend')
  const active = CATEGORIES.find(c => c.id === activeTab)

  return (
    <section
      id="tech"
      className="relative py-20 sm:py-28 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020B14 0%, #040E1B 55%, #020B14 100%)' }}
    >
      <div className="section-divider" />

      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-accent-blue/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[35vw] h-[35vw] max-w-[420px] max-h-[420px] bg-accent-purple/[0.05] rounded-full blur-[110px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-6 sm:w-10 h-px bg-accent-blue/40" />
            <span className="text-accent-blue font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase">Tech Stack</span>
            <div className="w-6 sm:w-10 h-px bg-accent-blue/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-display font-bold leading-tight mb-4">
            Tools we <span className="gradient-text">master</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Battle-tested technologies powering every product we build — from pixel-perfect UIs to scalable cloud infrastructure.
          </p>
        </motion.div>

        {/* ── Category Tabs ─────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300"
              style={{
                color: activeTab === cat.id ? cat.color : 'rgba(156,163,175,0.8)',
                background: activeTab === cat.id ? cat.color + '18' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeTab === cat.id ? cat.color + '55' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: activeTab === cat.id ? `0 0 20px ${cat.color}20` : 'none',
              }}
            >
              {cat.label}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: cat.color + '10' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Tech Cards Grid ───────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5"
          >
            {active.techs.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative flex flex-col items-center justify-center gap-2.5 sm:gap-3 rounded-2xl border border-white/[0.07] hover:border-white/[0.2] cursor-default overflow-hidden transition-all duration-300"
                style={{
                  paddingTop: 'clamp(18px, 3vw, 28px)',
                  paddingBottom: 'clamp(14px, 2.5vw, 22px)',
                  paddingLeft: 'clamp(10px, 2vw, 18px)',
                  paddingRight: 'clamp(10px, 2vw, 18px)',
                  background: `linear-gradient(145deg, ${tech.color}0E 0%, transparent 60%)`,
                }}
              >
                {/* Hover radial glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 50% 30%, ${tech.color}22 0%, transparent 65%)` }}
                />
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: tech.color }}
                />

                {/* Icon */}
                <div
                  className="relative flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    width: 'clamp(38px, 6vw, 52px)',
                    height: 'clamp(38px, 6vw, 52px)',
                    background: `${tech.color}1A`,
                  }}
                >
                  <tech.icon
                    style={{
                      color: tech.color,
                      width: 'clamp(18px, 3vw, 26px)',
                      height: 'clamp(18px, 3vw, 26px)',
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: `0 0 16px ${tech.color}50` }}
                  />
                </div>

                {/* Name */}
                <span
                  className="relative text-center font-semibold text-gray-400 group-hover:text-white transition-colors duration-300 leading-snug"
                  style={{ fontSize: 'clamp(9px, 1.8vw, 12px)' }}
                >
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── All categories overview bar ───────────────────────────────── */}
      

        {/* ── Marquee ──────────────────────────────────────────────────────── */}
        <div className="mt-14 sm:mt-20 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
          <div className="flex whitespace-nowrap marquee-scroll">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-10 sm:gap-16 px-5">
                {MARQUEE_WORDS.map(word => (
                  <span
                    key={`${word}-${i}`}
                    className="text-5xl sm:text-6xl md:text-8xl font-display font-bold select-none"
                    style={{ color: 'rgba(255,255,255,0.025)' }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
