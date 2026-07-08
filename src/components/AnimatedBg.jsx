import { motion } from 'framer-motion'

const PATHS = [
  { x: [0, 34, -22, 28, -14, 0], y: [0, -26, 22, -32, 16, 0] },
  { x: [0, -28, 22, -34, 18, 0], y: [0, 30, -20, 28, -12, 0] },
  { x: [0, 20, -32, 16, -26, 0], y: [0, -34, 16, -24, 30, 0] },
]

const SCALE = [1, 1.08, 0.95, 1.05, 0.97, 1]

const config = {
  about: [
    { left: '8%', top: '18%', size: 500, color: 'rgba(37,99,235,0.09)', dur: 20, del: 0 },
    { left: '88%', top: '74%', size: 390, color: 'rgba(59,130,246,0.07)', dur: 26, del: 4 },
  ],
  expertise: [
    { left: '5%', top: '55%', size: 520, color: 'rgba(37,99,235,0.07)', dur: 22, del: 0 },
    { left: '90%', top: '22%', size: 380, color: 'rgba(99,102,241,0.07)', dur: 18, del: 2 },
    { left: '52%', top: '88%', size: 350, color: 'rgba(37,99,235,0.05)', dur: 30, del: 7 },
  ],
  ventures: [
    { left: '12%', top: '25%', size: 480, color: 'rgba(37,99,235,0.08)', dur: 20, del: 0 },
    { left: '82%', top: '65%', size: 450, color: 'rgba(5,150,105,0.07)', dur: 24, del: 3 },
  ],
  testimonials: [
    { left: '18%', top: '30%', size: 520, color: 'rgba(79,70,229,0.06)', dur: 22, del: 0 },
    { left: '78%', top: '70%', size: 400, color: 'rgba(37,99,235,0.05)', dur: 20, del: 5 },
  ],
  availability: [
    { left: '12%', top: '50%', size: 440, color: 'rgba(37,99,235,0.08)', dur: 18, del: 0 },
    { left: '88%', top: '28%', size: 380, color: 'rgba(220,38,38,0.06)', dur: 22, del: 2 },
    { left: '50%', top: '82%', size: 340, color: 'rgba(5,150,105,0.06)', dur: 26, del: 5 },
  ],
  connect: [
    { left: '8%', top: '40%', size: 460, color: 'rgba(37,99,235,0.08)', dur: 20, del: 0 },
    { left: '88%', top: '58%', size: 380, color: 'rgba(37,211,102,0.05)', dur: 24, del: 3 },
  ],
  contact: [
    { left: '20%', top: '25%', size: 460, color: 'rgba(37,99,235,0.08)', dur: 20, del: 0 },
    { left: '80%', top: '72%', size: 380, color: 'rgba(37,99,235,0.05)', dur: 25, del: 4 },
  ],
}

export default function AnimatedBg({ variant = 'about' }) {
  const orbs = config[variant] ?? config.about

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(250,250,250,0.042) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Floating gradient orbs */}
      {orbs.map((orb, i) => {
        const path = PATHS[i % PATHS.length]
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              filter: `blur(${Math.round(orb.size * 0.22)}px)`,
              transform: 'translate(-50%, -50%)',
              willChange: 'transform',
            }}
            animate={{ x: path.x, y: path.y, scale: SCALE }}
            transition={{
              duration: orb.dur,
              delay: orb.del,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
}
