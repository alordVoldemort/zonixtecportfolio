import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const row1 = ['Web Dev', 'Mobile Apps', 'UI / UX', 'Cloud', 'Data', 'Strategy', 'Innovation', 'Performance']
const row2 = ['Design Systems', 'Automation', 'AI Integration', 'Security', 'Scalability', 'Branding', 'Growth']

// Duplicate for seamless loop
const track1 = [...row1, ...row1, ...row1]
const track2 = [...row2, ...row2, ...row2]

export default function SectionBridge() {
  const wrapRef = useRef(null)
  const r1Ref = useRef(null)
  const r2Ref = useRef(null)
  const slashRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: moves LEFT as you scroll down (velocity marquee)
      gsap.to(r1Ref.current, {
        x: '-33.33%',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      // Row 2: moves RIGHT (opposite) — creates kinetic depth
      gsap.to(r2Ref.current, {
        x: '33.33%',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })

      // Diagonal slash reveals upward
      gsap.fromTo(
        slashRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      )
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="relative overflow-hidden py-8 select-none">
      {/* Top accent line */}
      <div className="section-divider mb-0" />

      {/* Dark angled background */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg, #020B14 0%, #071525 50%, #020B14 100%)' }}
      />

      {/* Diagonal slash accent */}
      <div
        ref={slashRef}
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(79,195,247,0.5) 30%, rgba(124,77,255,0.5) 70%, transparent)' }}
      />

      {/* Row 1 — scrolls LEFT */}
      <div className="overflow-hidden mb-3">
        <div
          ref={r1Ref}
          className="flex gap-0 whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {track1.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 pr-3">
              <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] uppercase text-gray-500 hover:text-accent-blue transition-colors duration-300">
                {item}
              </span>
              <span className="text-accent-blue/30 text-[8px]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls RIGHT, slightly larger, different color */}
      <div className="overflow-hidden">
        <div
          ref={r2Ref}
          className="flex gap-0 whitespace-nowrap"
          style={{ width: 'max-content', marginLeft: '-10%' }}
        >
          {track2.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 pr-3">
              <span className="text-[10px] sm:text-[11px] font-display font-bold tracking-[0.2em] uppercase text-gray-600 hover:text-accent-purple/70 transition-colors duration-300">
                {item}
              </span>
              <span className="text-accent-purple/20 text-[8px]">●</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="section-divider mt-0" />
    </div>
  )
}
