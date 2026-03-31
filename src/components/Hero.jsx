import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

// Particle field background
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let isVisible = true

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    let resizeTimer
    const debouncedResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200) }
    window.addEventListener('resize', debouncedResize)

    // Pause when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible && !animationId) animate()
    }, { threshold: 0 })
    observer.observe(canvas)

    class Particle {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.1
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(79, 195, 247, ${this.opacity})`
        ctx.fill()
      }
    }

    const count = Math.min(40, Math.floor(window.innerWidth / 25))
    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }

    function connectParticles() {
      const maxDist = 120
      const maxDistSq = maxDist * maxDist
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(79, 195, 247, ${0.08 * (1 - dist / maxDist)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!isVisible) { animationId = null; return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      connectParticles()
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimer)
      observer.disconnect()
      window.removeEventListener('resize', debouncedResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" />
}

// All 8 letters of ZONIXTEC — alternating above/below like the reference
const letterSpots = [
  { letter: 'Z', centerPct: '13%',   heading: 'Zero',       para: 'Compromise on Quality',            position: 'above' },
  { letter: 'O', centerPct: '26%',  heading: 'Ownership',  para: 'of Customer Success',              position: 'below' },
  { letter: 'N', centerPct: '36%',  heading: 'Next',       para: 'Generation Innovation',            position: 'above' },
  { letter: 'I', centerPct: '45%',  heading: 'Integrity',  para: 'in Action',                        position: 'below' },
  { letter: 'X', centerPct: '56%',  heading: 'X-Factor',   para: 'Mindset in Action',                position: 'above' },
  { letter: 'T', centerPct: '67%',  heading: 'Trust',      para: 'Consistent Delivery', position: 'below' },
  { letter: 'E', centerPct: '76%',  heading: 'Empowering', para: 'Businesses',                       position: 'above' },
  { letter: 'C', centerPct: '93%',  heading: 'Commitment', para: 'to Continuous Improvement',         position: 'below' },
]

function LogoWithLetterInfo() {
  return (
    <motion.div
      className="relative inline-block my-10 sm:my-12 md:my-14"
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 1, ease: [0.23, 1, 0.32, 1] }}
    >
      {letterSpots.map((spot, i) => {
        const baseDelay = 1.3 + i * 0.12
        const isAbove = spot.position === 'above'

        return (
          <div
            key={spot.letter}
            className="absolute z-10 hidden md:flex flex-col items-center"
            style={{
              left: spot.centerPct,
              transform: 'translateX(-50%)',
              ...(isAbove
                ? { bottom: 'calc(80%)' }
                : { top: 'calc(100%)' }),
            }}
          >
            {isAbove ? (
              /* ── ABOVE: card → line → dot ── */
              <>
                <motion.div
                  className="text-center whitespace-nowrap mb-1.5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: baseDelay + 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="text-white text-xs sm:text-sm md:text-base font-display font-bold tracking-wide italic">
                    {spot.heading}
                  </div>
                  <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs leading-snug mt-0.5">
                    {spot.para}
                  </div>
                </motion.div>
                <motion.div
                  className="w-px bg-white/30"
                  initial={{ height: 0 }}
                  animate={{ height: 50 }}
                  transition={{ delay: baseDelay, duration: 0.5, ease: 'easeOut' }}
                />
              </>
            ) : (
              /* ── BELOW: line → card ── */
              <>
                <motion.div
                  className="w-px bg-white/30"
                  initial={{ height: 0 }}
                  animate={{ height: 50 }}
                  transition={{ delay: baseDelay, duration: 0.5, ease: 'easeOut' }}
                />
                <motion.div
                  className="text-center whitespace-nowrap mt-1.5"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: baseDelay + 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="text-white text-xs sm:text-sm md:text-base font-display font-bold tracking-wide italic">
                    {spot.heading}
                  </div>
                  <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs leading-snug mt-0.5">
                    {spot.para}
                  </div>
                </motion.div>
              </>
            )}
          </div>
        )
      })}

      {/* Logo image */}
      <img
        src="/zonixtec_logo.png"
        alt="Zonixtec"
        className="w-auto max-h-14 sm:max-h-20 md:max-h-40 lg:max-h-52 xl:max-h-60 object-contain drop-shadow-[0_0_30px_rgba(79,195,247,0.3)] block"
        draggable={false}
      />
    </motion.div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const bgVideoRef = useRef(null)

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.playbackRate = 0.5
    }
  }, [])

  useEffect(() => {
    // Parallax — move only inner content, section stays fixed so it
    // never visually bleeds into the next section.
    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 80,
      opacity: 0.2,
    })
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 md:pt-0"
    >
      {/* Background layers */}
      {/* Video background */}
      <video
        ref={bgVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/bgvedio.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{ zIndex: 0 }}
      />
      {/* Dark overlay so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(2,11,20,0.72) 0%, rgba(2,11,20,0.55) 50%, rgba(2,11,20,0.82) 100%)',
          zIndex: 1,
        }}
      />
      <ParticleCanvas />
      <div className="absolute inset-0 bg-grid opacity-20" style={{ zIndex: 2 }} />
      <div className="noise-overlay absolute inset-0" style={{ zIndex: 2 }} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] animate-pulse-slow" style={{ zIndex: 2 }} />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-slow" style={{ zIndex: 2 }} />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Main heading — Logo with interactive letter meanings */}
        <div className="flex justify-center items-center">
          <LogoWithLetterInfo />
        </div>

        {/* Mobile letter meanings grid */}
        <motion.div
          className="md:hidden grid grid-cols-2 gap-3 mt-6 max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {letterSpots.map((spot) => (
            <div key={spot.letter} className="flex items-start gap-2 text-left">
              <span className="text-accent-blue font-display font-bold text-base leading-none mt-0.5">{spot.letter}</span>
              <div>
                <div className="text-white text-xs font-display font-bold italic leading-tight">{spot.heading}</div>
                <div className="text-gray-500 text-[10px] leading-tight">{spot.para}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
     
    </section>
  )
}
