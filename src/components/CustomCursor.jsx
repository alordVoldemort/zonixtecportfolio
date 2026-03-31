import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    let rafId = null

    const moveCursor = (e) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        if (!visibleRef.current) {
          visibleRef.current = true
          setVisible(true)
        }
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
        follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
      })
    }

    const handleMouseEnter = () => { visibleRef.current = true; setVisible(true) }
    const handleMouseLeave = () => { visibleRef.current = false; setVisible(false) }

    // Event delegation — detect hover on interactive elements via bubbling
    const interactiveSelector = 'a, button, input, textarea, [role="button"]'
    const handleOverOut = (e) => {
      if (e.target.closest(interactiveSelector)) {
        setHovered(e.type === 'mouseover')
      }
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleOverOut, { passive: true })
    document.addEventListener('mouseout', handleOverOut, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleOverOut)
      document.removeEventListener('mouseout', handleOverOut)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="custom-cursor hidden md:block"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#4FC3F7',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Follower ring */}
      <div
        ref={followerRef}
        className="custom-cursor hidden md:block"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(79, 195, 247, 0.4)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.15s ease-out, opacity 0.3s ease, width 0.3s ease, height 0.3s ease, margin 0.3s ease',
          ...(hovered && {
            width: 60,
            height: 60,
            marginLeft: -10,
            marginTop: -10,
            borderColor: 'rgba(79, 195, 247, 0.6)',
          }),
        }}
      />
    </>
  )
}
