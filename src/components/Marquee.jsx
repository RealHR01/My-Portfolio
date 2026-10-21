import CurvedLoop from './CurvedLoop'

const row1 = 'HighLevel Expert ✦ Workflow Automation ✦ AI Agents ✦ Whitelabel Support ✦ CRM Architecture ✦ GHL Snapshots ✦ Agency Scaling ✦ 5+ Years Deep'
const row2 = 'Custom Development ✦ API Integrations ✦ React & Vite ✦ Level Up Marketplace ✦ All The Apps ✦ 100+ Agencies Served ✦ Remote Ready ✦ Open to Work ✦ Pakistan to Global'

export default function Marquee() {
  return (
    <div className="relative border-y border-brand-border/60" style={{ overflow: 'visible' }}>
      {/* Left / right edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--color-brand-bg,#09090b), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--color-brand-bg,#09090b), transparent)' }} />

      {/* Row 1 — gentle arc down, left */}
      <div className="py-1">
        <CurvedLoop
          marqueeText={row1}
          shape="arc"
          curveAmount={55}
          direction="left"
          speed={1.6}
          fontSize={13}
          fontWeight={700}
          letterSpacing={3}
          color="rgba(250,250,250,0.5)"
          edgeFade={0}
          interactive={true}
          scrollBoost={0.4}
        />
      </div>

      {/* Row 2 — gentle arc up, right */}
      <div className="py-1 border-t border-brand-border/40">
        <CurvedLoop
          marqueeText={row2}
          shape="arc"
          curveAmount={-55}
          direction="right"
          speed={1.6}
          fontSize={13}
          fontWeight={700}
          letterSpacing={3}
          color="rgba(250,250,250,0.5)"
          edgeFade={0}
          interactive={true}
          scrollBoost={0.4}
        />
      </div>
    </div>
  )
}
