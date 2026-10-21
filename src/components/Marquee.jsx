import CurvedLoop from './CurvedLoop'

const row1 = 'HighLevel Expert ✦ Workflow Automation ✦ AI Agents ✦ Whitelabel Support ✦ CRM Architecture ✦ GHL Snapshots ✦ Agency Scaling ✦ 5+ Years Deep'
const row2 = 'Custom Development ✦ API Integrations ✦ React & Vite ✦ Level Up Marketplace ✦ All The Apps ✦ 100+ Agencies Served ✦ Remote Ready ✦ Open to Work ✦ Pakistan to Global'

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-brand-border/60">
      {/* Row 1 — arc curves down, scrolls left */}
      <CurvedLoop
        marqueeText={row1}
        shape="arc"
        curveAmount={160}
        direction="left"
        speed={1.6}
        fontSize={13}
        fontWeight={700}
        letterSpacing={3}
        color="rgba(250,250,250,0.45)"
        edgeFade={0.15}
        interactive={true}
        scrollBoost={0.4}
      />

      {/* Row 2 — arc curves up, scrolls right */}
      <div style={{ marginTop: '-14px' }}>
        <CurvedLoop
          marqueeText={row2}
          shape="arc"
          curveAmount={-160}
          direction="right"
          speed={1.6}
          fontSize={13}
          fontWeight={700}
          letterSpacing={3}
          color="rgba(250,250,250,0.45)"
          edgeFade={0.15}
          interactive={true}
          scrollBoost={0.4}
        />
      </div>
    </div>
  )
}
