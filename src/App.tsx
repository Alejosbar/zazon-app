import { useState, useEffect, useRef } from 'react'

// ── Utility ──────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function useCounter(target: number, duration = 1800, active = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    const steps = 60
    const step = target / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      setValue(Math.floor(current))
      if (current >= target) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return value
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const IconTrend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
  </svg>
)

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>
)

const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
)

const IconPlatform = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
  </svg>
)

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = ['Características', 'Cómo funciona', 'Precios', 'Testimonios']

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(11,17,14,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #2A3830' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: '#E8962A', color: '#0B110E', fontFamily: 'Fraunces, serif' }}
          >
            Z
          </span>
          <span className="font-semibold text-lg tracking-tight" style={{ color: '#F0EBE0', fontFamily: 'Outfit, sans-serif' }}>
            zazon<span style={{ color: '#E8962A' }}>App</span>
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(' ', '-')}`}
              className="text-sm transition-colors duration-200"
              style={{ color: '#8FA89A' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F0EBE0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8FA89A')}
            >
              {l}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#precios" className="text-sm px-4 py-2 rounded-lg transition-colors duration-200" style={{ color: '#8FA89A' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F0EBE0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#8FA89A')}>
            Iniciar sesión
          </a>
          <a href="#precios"
            className="text-sm px-4 py-2 rounded-lg font-medium transition-all duration-200"
            style={{ background: '#E8962A', color: '#0B110E' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F5B95A')}
            onMouseLeave={e => (e.currentTarget.style.background = '#E8962A')}>
            Prueba gratis
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} style={{ color: '#8FA89A' }}>
          <div className="w-5 h-0.5 mb-1 transition-all" style={{ background: 'currentColor', transform: open ? 'rotate(45deg) translate(2px,2px)' : 'none' }} />
          <div className="w-5 h-0.5 mb-1 transition-all" style={{ background: 'currentColor', opacity: open ? 0 : 1 }} />
          <div className="w-5 h-0.5 transition-all" style={{ background: 'currentColor', transform: open ? 'rotate(-45deg) translate(2px,-2px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-4" style={{ background: 'rgba(11,17,14,0.98)', borderTop: '1px solid #2A3830' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`}
              className="block py-3 text-sm border-b" style={{ color: '#8FA89A', borderColor: '#2A3830' }}
              onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#precios"
            className="block mt-4 text-sm px-4 py-2.5 rounded-lg font-medium text-center"
            style={{ background: '#E8962A', color: '#0B110E' }}
            onClick={() => setOpen(false)}>
            Prueba gratis
          </a>
        </div>
      )}
    </header>
  )
}

// ── Stat Counter ──────────────────────────────────────────────────────────────

function StatCard({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const n = useCounter(value, 1600, active)
  return (
    <div className="text-center">
      <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#E8962A' }}>
        {n.toLocaleString()}{suffix}
      </div>
      <div className="text-sm" style={{ color: '#8FA89A' }}>{label}</div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const { ref, visible } = useInView(0.05)

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(42,56,48,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(42,56,48,0.18) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,150,42,0.08) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8 transition-all duration-700"
            style={{
              background: 'rgba(232,150,42,0.12)',
              border: '1px solid rgba(232,150,42,0.3)',
              color: '#E8962A',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#3DD68C' }} />
            Analítica de restaurantes en tiempo real
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 transition-all duration-700 delay-100"
            style={{
              fontFamily: 'Fraunces, serif',
              color: '#F0EBE0',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Convierte opiniones en{' '}
            <span style={{ color: '#E8962A', fontStyle: 'italic' }}>decisiones</span>
            <br />que hacen crecer tu restaurante
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed transition-all duration-700 delay-200"
            style={{
              color: '#8FA89A',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            zazonApp recopila y analiza automáticamente las reseñas de tus clientes desde todas las plataformas,
            entregándote insights accionables para mejorar tu servicio y aumentar tu reputación.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 mb-20 transition-all duration-700 delay-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <a
              href="#precios"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
              style={{ background: '#E8962A', color: '#0B110E' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F5B95A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#E8962A'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Comenzar gratis — 14 días <IconArrow />
            </a>
            <a
              href="#cómo-funciona"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-200"
              style={{ border: '1px solid #2A3830', color: '#8FA89A' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#3A5040'; e.currentTarget.style.color = '#F0EBE0' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A3830'; e.currentTarget.style.color = '#8FA89A' }}
            >
              Ver demostración
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 transition-all duration-700 delay-500"
            style={{ borderTop: '1px solid #2A3830', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
          >
            <StatCard value={2400} suffix="+" label="Restaurantes activos" active={visible} />
            <StatCard value={98} suffix="%" label="Satisfacción del cliente" active={visible} />
            <StatCard value={4200000} suffix="+" label="Reseñas analizadas" active={visible} />
            <StatCard value={37} suffix="%" label="Mejora promedio en rating" active={visible} />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Logos bar ─────────────────────────────────────────────────────────────────

function LogosBar() {
  const brands = ['La Docena', 'Quintonil', 'Pujol', 'Contramar', 'Sartoria', 'El Califa', 'Hunan', 'Rosetta']
  return (
    <div style={{ borderTop: '1px solid #2A3830', borderBottom: '1px solid #2A3830', background: '#131A15' }}>
      <div className="max-w-6xl mx-auto px-6 py-6">
        <p className="text-xs text-center mb-6" style={{ color: '#8FA89A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Restaurantes que confían en zazonApp
        </p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {brands.map(b => (
            <span key={b} className="text-sm font-semibold" style={{ color: '#2A3830', letterSpacing: '0.05em', fontFamily: 'Fraunces, serif' }}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────

function Features() {
  const { ref, visible } = useInView()

  const features = [
    {
      icon: <IconPlatform />,
      title: 'Centraliza todas las plataformas',
      desc: 'Conecta Google, TripAdvisor, Yelp y redes sociales en un solo panel. Sin cambiar de app, sin copiar y pegar.',
      color: '#E8962A',
    },
    {
      icon: <IconTrend />,
      title: 'Análisis de sentimiento',
      desc: 'Nuestro motor de IA clasifica automáticamente cada reseña: positivo, negativo o neutro, y detecta qué aspectos generan más fricción.',
      color: '#3DD68C',
    },
    {
      icon: <IconChart />,
      title: 'Reportes visuales',
      desc: 'Dashboards interactivos con tendencias semanales, comparativas mensuales y métricas de puntuación por categoría.',
      color: '#E05C3A',
    },
    {
      icon: <IconBell />,
      title: 'Alertas inteligentes',
      desc: 'Recibe notificaciones instantáneas cuando una reseña negativa aparece, para que puedas responder antes de que escale.',
      color: '#7B9CFF',
    },
    {
      icon: <IconTarget />,
      title: 'Benchmarking competitivo',
      desc: 'Compara el desempeño de tu restaurante con la competencia local y entiende exactamente dónde ganas y dónde pierdes.',
      color: '#E8962A',
    },
    {
      icon: <IconStar />,
      title: 'Gestión de reputación',
      desc: 'Genera respuestas sugeridas por IA y haz seguimiento a tu rating promedio en todas las plataformas desde un solo lugar.',
      color: '#3DD68C',
    },
  ]

  return (
    <section id="características" className="py-28" style={{ background: '#0B110E' }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div
          className="mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: '#E8962A' }}>Características</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>
            Todo lo que necesitas para<br />entender a tus clientes
          </h2>
          <p className="text-lg max-w-xl" style={{ color: '#8FA89A' }}>
            De la reseña al insight, en segundos. Sin hojas de cálculo, sin consultores, sin complicaciones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="p-7 rounded-2xl group cursor-default transition-all duration-700"
              style={{
                background: '#131A15',
                border: '1px solid #2A3830',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = f.color + '66' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2A3830' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.color + '1A', color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="font-semibold mb-2" style={{ color: '#F0EBE0', fontFamily: 'Outfit, sans-serif' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8FA89A' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── How it works ──────────────────────────────────────────────────────────────

function HowItWorks() {
  const { ref, visible } = useInView()

  const steps = [
    { n: '01', title: 'Conecta tus plataformas', desc: 'En menos de 5 minutos vincula tu perfil de Google Business, TripAdvisor, Yelp y más. Todo en un clic, sin necesidad de soporte técnico.' },
    { n: '02', title: 'zazonApp analiza y clasifica', desc: 'Nuestro motor de inteligencia artificial procesa cada reseña, detecta sentimientos, temas recurrentes y alertas críticas de forma automática.' },
    { n: '03', title: 'Actúa con datos reales', desc: 'Recibe reportes claros, recomendaciones concretas y alertas en tiempo real. Toma decisiones basadas en lo que tus clientes realmente piensan.' },
  ]

  return (
    <section id="cómo-funciona" style={{ background: '#131A15', borderTop: '1px solid #2A3830' }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6 py-28">
        <div
          className="mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: '#E8962A' }}>Cómo funciona</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>
            Simple de comenzar,<br />poderoso en resultados
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-7xl font-bold mb-6 leading-none" style={{ fontFamily: 'Fraunces, serif', color: '#1B2520' }}>
                {s.n}
              </div>
              <div className="w-8 h-0.5 mb-6" style={{ background: '#E8962A' }} />
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#F0EBE0', fontFamily: 'Fraunces, serif' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8FA89A' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Dashboard mockup ──────────────────────────────────────────────────────────

function DashboardMockup() {
  const { ref, visible } = useInView()
  const [activeTab, setActiveTab] = useState('resumen')

  const bars = [72, 85, 63, 91, 78, 88, 95, 70, 82, 74, 90, 86]
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

  const reviews = [
    { name: 'Carlos M.', platform: 'Google', rating: 5, text: 'El servicio fue excelente, el mesero muy atento y la comida llegó rápido.', time: 'hace 2h', sentiment: 'positive' },
    { name: 'Sofía R.', platform: 'TripAdvisor', rating: 3, text: 'La comida estuvo buena pero esperamos 40 minutos para que nos atendieran.', time: 'hace 4h', sentiment: 'neutral' },
    { name: 'Andrés V.', platform: 'Yelp', rating: 5, text: 'Increíble experiencia, volvería sin duda. El pulpo es lo mejor del menú.', time: 'hace 6h', sentiment: 'positive' },
    { name: 'Mariana L.', platform: 'Google', rating: 2, text: 'El ambiente es bonito pero el precio no justifica la porción del plato.', time: 'hace 8h', sentiment: 'negative' },
  ]

  const sentimentColors: Record<string, string> = { positive: '#3DD68C', neutral: '#E8962A', negative: '#E05C3A' }
  const sentimentLabels: Record<string, string> = { positive: 'Positivo', neutral: 'Neutral', negative: 'Negativo' }

  const tabs = ['resumen', 'reseñas', 'tendencias']

  return (
    <section style={{ background: '#0B110E', borderTop: '1px solid #2A3830' }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6 py-28">
        <div
          className="mb-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: '#E8962A' }}>Vista previa</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>
            Tu reputación, en un solo panel
          </h2>
          <p className="text-lg max-w-xl" style={{ color: '#8FA89A' }}>
            Así se ve zazonApp en acción. Datos reales, visualizaciones claras, acciones inmediatas.
          </p>
        </div>

        {/* Dashboard window */}
        <div
          className="rounded-2xl overflow-hidden transition-all duration-1000"
          style={{
            border: '1px solid #2A3830',
            background: '#0F1612',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.98)',
            transitionDelay: '200ms',
          }}
        >
          {/* Window bar */}
          <div className="flex items-center gap-2 px-5 py-3.5" style={{ background: '#131A15', borderBottom: '1px solid #2A3830' }}>
            <span className="w-3 h-3 rounded-full" style={{ background: '#E05C3A' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#E8962A' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#3DD68C' }} />
            <span className="ml-4 text-xs" style={{ color: '#2A3830' }}>zazonapp.com/dashboard — Restaurante La Brasa</span>
          </div>

          <div className="p-6">
            {/* Top KPI row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Rating promedio', val: '4.6', change: '+0.3', unit: '/ 5.0', color: '#3DD68C' },
                { label: 'Reseñas este mes', val: '284', change: '+18%', unit: 'vs mes anterior', color: '#E8962A' },
                { label: 'Sentimiento positivo', val: '78%', change: '+5pp', unit: 'del total', color: '#3DD68C' },
                { label: 'Tiempo de respuesta', val: '2.3h', change: '-40min', unit: 'promedio', color: '#E8962A' },
              ].map(k => (
                <div key={k.label} className="p-4 rounded-xl" style={{ background: '#131A15', border: '1px solid #2A3830' }}>
                  <p className="text-xs mb-2" style={{ color: '#8FA89A' }}>{k.label}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>{k.val}</span>
                    <span className="text-xs mb-1" style={{ color: k.color }}>{k.change}</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#2A3830' }}>{k.unit}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-5 p-1 rounded-lg w-fit" style={{ background: '#131A15' }}>
              {tabs.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className="px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-all duration-200"
                  style={{
                    background: activeTab === t ? '#1B2520' : 'transparent',
                    color: activeTab === t ? '#F0EBE0' : '#8FA89A',
                    border: activeTab === t ? '1px solid #2A3830' : '1px solid transparent',
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'resumen' && (
              <div className="grid md:grid-cols-2 gap-4">
                {/* Bar chart */}
                <div className="p-5 rounded-xl" style={{ background: '#131A15', border: '1px solid #2A3830' }}>
                  <p className="text-sm font-semibold mb-4" style={{ color: '#F0EBE0' }}>Reseñas por mes</p>
                  <div className="flex items-end gap-1.5 h-32">
                    {bars.map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t transition-all duration-1000 cursor-pointer"
                          style={{
                            height: visible ? `${h}%` : '0%',
                            background: i === 8 ? '#E8962A' : '#2A3830',
                            transitionDelay: `${i * 60 + 400}ms`,
                          }}
                          onMouseEnter={e => { if (i !== 8) (e.currentTarget as HTMLElement).style.background = '#3A5040' }}
                          onMouseLeave={e => { if (i !== 8) (e.currentTarget as HTMLElement).style.background = '#2A3830' }}
                        />
                        <span className="text-[9px]" style={{ color: '#2A3830' }}>{months[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sentiment donut */}
                <div className="p-5 rounded-xl" style={{ background: '#131A15', border: '1px solid #2A3830' }}>
                  <p className="text-sm font-semibold mb-4" style={{ color: '#F0EBE0' }}>Distribución de sentimiento</p>
                  <div className="flex items-center gap-6">
                    <svg viewBox="0 0 80 80" className="w-24 h-24 shrink-0">
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#1B2520" strokeWidth="12" />
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#3DD68C" strokeWidth="12"
                        strokeDasharray={`${188 * 0.78} ${188}`} strokeDashoffset="47" strokeLinecap="round" />
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#E8962A" strokeWidth="12"
                        strokeDasharray={`${188 * 0.15} ${188}`} strokeDashoffset={`${47 - 188 * 0.78}`} strokeLinecap="round" />
                      <circle cx="40" cy="40" r="30" fill="none" stroke="#E05C3A" strokeWidth="12"
                        strokeDasharray={`${188 * 0.07} ${188}`} strokeDashoffset={`${47 - 188 * 0.93}`} strokeLinecap="round" />
                      <text x="40" y="37" textAnchor="middle" className="text-[10px] font-bold" fill="#F0EBE0" fontSize="10" fontFamily="Fraunces, serif">78%</text>
                      <text x="40" y="48" textAnchor="middle" fill="#8FA89A" fontSize="6">positivo</text>
                    </svg>
                    <div className="space-y-3">
                      {[['#3DD68C', '78%', 'Positivo'], ['#E8962A', '15%', 'Neutral'], ['#E05C3A', '7%', 'Negativo']].map(([c, p, l]) => (
                        <div key={l} className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
                          <span className="text-xs" style={{ color: '#8FA89A' }}>{l}</span>
                          <span className="text-xs font-semibold ml-auto" style={{ color: '#F0EBE0' }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reseñas' && (
              <div className="space-y-3">
                {reviews.map((r, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ background: '#131A15', border: '1px solid #2A3830' }}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: '#1B2520', color: '#E8962A', fontFamily: 'Fraunces, serif' }}>
                          {r.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: '#F0EBE0' }}>{r.name}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs" style={{ color: '#8FA89A' }}>{r.platform}</span>
                            <div className="flex gap-0.5" style={{ color: '#E8962A' }}>
                              {Array.from({ length: r.rating }).map((_, j) => <IconStar key={j} />)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: sentimentColors[r.sentiment] + '1A', color: sentimentColors[r.sentiment] }}>
                          {sentimentLabels[r.sentiment]}
                        </span>
                        <span className="text-xs" style={{ color: '#8FA89A' }}>{r.time}</span>
                      </div>
                    </div>
                    <p className="text-sm" style={{ color: '#8FA89A' }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tendencias' && (
              <div className="p-6 rounded-xl text-center" style={{ background: '#131A15', border: '1px solid #2A3830' }}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Servicio', score: 87, delta: '+4' },
                    { label: 'Comida', score: 94, delta: '+2' },
                    { label: 'Ambiente', score: 78, delta: '-1' },
                    { label: 'Precio/valor', score: 65, delta: '-3' },
                    { label: 'Limpieza', score: 91, delta: '+6' },
                    { label: 'Velocidad', score: 72, delta: '+8' },
                  ].map(t => (
                    <div key={t.label} className="p-4 rounded-xl" style={{ background: '#1B2520', border: '1px solid #2A3830' }}>
                      <p className="text-xs mb-3" style={{ color: '#8FA89A' }}>{t.label}</p>
                      <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>{t.score}</div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden mb-2" style={{ background: '#2A3830' }}>
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${t.score}%`, background: t.score > 80 ? '#3DD68C' : t.score > 70 ? '#E8962A' : '#E05C3A', transitionDelay: '600ms' }} />
                      </div>
                      <p className="text-xs" style={{ color: parseFloat(t.delta) >= 0 ? '#3DD68C' : '#E05C3A' }}>{t.delta} pts</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function Testimonials() {
  const { ref, visible } = useInView()

  const testi = [
    {
      quote: 'Antes tardábamos horas revisando reseñas manualmente. Con zazonApp, en 10 minutos ya sé exactamente qué está fallando y qué está funcionando. Es como tener un analista de datos en mi equipo.',
      name: 'Diego Torres',
      role: 'Gerente General',
      restaurant: 'La Brasa Restaurante — CDMX',
      rating: 5,
    },
    {
      quote: 'Gracias a zazonApp descubrimos que el 40% de las quejas eran sobre tiempos de espera los viernes. Reorganizamos la operación y en un mes subimos de 3.8 a 4.4 en Google.',
      name: 'Camila Reyes',
      role: 'Dueña',
      restaurant: 'Sartoria Trattoria — Monterrey',
      rating: 5,
    },
    {
      quote: 'Las alertas en tiempo real son increíbles. Cuando alguien deja una reseña negativa, me llega al celular y puedo responder de inmediato. Eso marca una diferencia enorme.',
      name: 'Mateo Ángel',
      role: 'Director de Operaciones',
      restaurant: 'Grupo Nómada — Guadalajara',
      rating: 5,
    },
  ]

  return (
    <section id="testimonios" style={{ background: '#131A15', borderTop: '1px solid #2A3830' }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6 py-28">
        <div
          className="mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: '#E8962A' }}>Testimonios</p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>
            Lo que dicen los restauranteros
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testi.map((t, i) => (
            <div
              key={t.name}
              className="p-8 rounded-2xl flex flex-col transition-all duration-700"
              style={{
                background: '#0B110E',
                border: '1px solid #2A3830',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex gap-0.5 mb-6" style={{ color: '#E8962A' }}>
                {Array.from({ length: t.rating }).map((_, j) => <IconStar key={j} />)}
              </div>
              <p className="text-sm leading-relaxed mb-8 flex-1 italic" style={{ color: '#8FA89A' }}>
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#F0EBE0' }}>{t.name}</p>
                <p className="text-xs mt-0.5" style={{ color: '#E8962A' }}>{t.role}</p>
                <p className="text-xs mt-0.5" style={{ color: '#8FA89A' }}>{t.restaurant}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ───────────────────────────────────────────────────────────────────

function Pricing() {
  const { ref, visible } = useInView()
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: 'Starter',
      desc: 'Para restaurantes que están comenzando',
      monthly: 490,
      annual: 390,
      features: ['1 sucursal', 'Hasta 500 reseñas/mes', 'Google + TripAdvisor', 'Reportes mensuales', 'Alertas básicas', 'Soporte por email'],
      cta: 'Comenzar gratis',
      highlight: false,
    },
    {
      name: 'Pro',
      desc: 'Para restaurantes enfocados en crecer',
      monthly: 990,
      annual: 790,
      features: ['Hasta 5 sucursales', 'Reseñas ilimitadas', 'Todas las plataformas', 'Reportes en tiempo real', 'Alertas inteligentes', 'Análisis de sentimiento', 'Benchmarking competitivo', 'Soporte prioritario'],
      cta: 'Empezar ahora',
      highlight: true,
    },
    {
      name: 'Enterprise',
      desc: 'Para cadenas y grupos restauranteros',
      monthly: 0,
      annual: 0,
      features: ['Sucursales ilimitadas', 'API personalizada', 'Dashboard de grupo', 'Integraciones a medida', 'Analítica avanzada', 'Gerente de cuenta dedicado', 'SLA garantizado', 'Capacitación del equipo'],
      cta: 'Contactar ventas',
      highlight: false,
    },
  ]

  return (
    <section id="precios" style={{ background: '#0B110E', borderTop: '1px solid #2A3830' }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6 py-28">
        <div
          className="mb-12 text-center transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: '#E8962A' }}>Precios</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>
            Planes para cada restaurante
          </h2>
          <p className="text-lg mb-8" style={{ color: '#8FA89A' }}>14 días gratis, sin necesidad de tarjeta de crédito.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3">
            <span className="text-sm" style={{ color: annual ? '#8FA89A' : '#F0EBE0' }}>Mensual</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors duration-200"
              style={{ background: annual ? '#E8962A' : '#2A3830' }}
            >
              <span
                className="absolute top-1 w-4 h-4 rounded-full transition-transform duration-200"
                style={{ background: '#F0EBE0', left: '4px', transform: annual ? 'translateX(24px)' : 'translateX(0)' }}
              />
            </button>
            <span className="text-sm" style={{ color: annual ? '#F0EBE0' : '#8FA89A' }}>
              Anual <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(61,214,140,0.15)', color: '#3DD68C' }}>-20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className="p-8 rounded-2xl flex flex-col transition-all duration-700 relative"
              style={{
                background: p.highlight ? '#131A15' : '#0F1612',
                border: p.highlight ? '1px solid rgba(232,150,42,0.4)' : '1px solid #2A3830',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(28px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: '#E8962A', color: '#0B110E' }}>
                  Más popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>{p.name}</h3>
                <p className="text-sm" style={{ color: '#8FA89A' }}>{p.desc}</p>
              </div>

              <div className="mb-8">
                {p.monthly === 0 ? (
                  <div className="text-4xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>A medida</div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>
                      ${annual ? p.annual : p.monthly}
                    </span>
                    <span className="text-sm mb-2" style={{ color: '#8FA89A' }}>MXN/mes</span>
                  </div>
                )}
                {p.monthly > 0 && annual && (
                  <p className="text-xs mt-1" style={{ color: '#3DD68C' }}>Facturado anualmente</p>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: '#8FA89A' }}>
                    <span style={{ color: '#3DD68C' }}><IconCheck /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                style={{
                  background: p.highlight ? '#E8962A' : 'transparent',
                  color: p.highlight ? '#0B110E' : '#F0EBE0',
                  border: p.highlight ? 'none' : '1px solid #2A3830',
                }}
                onMouseEnter={e => {
                  if (p.highlight) (e.currentTarget as HTMLElement).style.background = '#F5B95A'
                  else (e.currentTarget as HTMLElement).style.borderColor = '#3A5040'
                }}
                onMouseLeave={e => {
                  if (p.highlight) (e.currentTarget as HTMLElement).style.background = '#E8962A'
                  else (e.currentTarget as HTMLElement).style.borderColor = '#2A3830'
                }}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA final ─────────────────────────────────────────────────────────────────

function CtaBanner() {
  const { ref, visible } = useInView()
  return (
    <section style={{ background: '#131A15', borderTop: '1px solid #2A3830' }}>
      <div ref={ref} className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Fraunces, serif', color: '#F0EBE0' }}>
            ¿Listo para conocer<br />
            <span style={{ color: '#E8962A', fontStyle: 'italic' }}>lo que realmente piensan</span><br />
            tus clientes?
          </h2>
          <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: '#8FA89A' }}>
            Únete a más de 2,400 restaurantes que ya toman decisiones basadas en datos reales.
          </p>
          <a
            href="#precios"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            style={{ background: '#E8962A', color: '#0B110E', fontSize: '1rem' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F5B95A'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#E8962A'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Empezar 14 días gratis <IconArrow />
          </a>
          <p className="mt-4 text-xs" style={{ color: '#8FA89A' }}>Sin tarjeta de crédito · Cancela cuando quieras</p>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      title: 'Producto',
      links: ['Características', 'Precios', 'Integraciones', 'Actualizaciones', 'API'],
    },
    {
      title: 'Empresa',
      links: ['Nosotros', 'Blog', 'Clientes', 'Prensa', 'Carreras'],
    },
    {
      title: 'Soporte',
      links: ['Centro de ayuda', 'Documentación', 'Comunidad', 'Estado del servicio', 'Contacto'],
    },
  ]

  return (
    <footer style={{ background: '#0B110E', borderTop: '1px solid #2A3830' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{ background: '#E8962A', color: '#0B110E', fontFamily: 'Fraunces, serif' }}>
                Z
              </span>
              <span className="font-semibold text-lg" style={{ color: '#F0EBE0', fontFamily: 'Outfit, sans-serif' }}>
                zazon<span style={{ color: '#E8962A' }}>App</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#8FA89A' }}>
              Analítica de datos para restaurantes. Convierte las opiniones de tus clientes en ventaja competitiva.
            </p>
            <div className="flex gap-3">
              {['𝕏', 'in', 'ig'].map(s => (
                <a key={s} href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors duration-200"
                  style={{ background: '#131A15', border: '1px solid #2A3830', color: '#8FA89A' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F0EBE0'; (e.currentTarget as HTMLElement).style.borderColor = '#3A5040' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#8FA89A'; (e.currentTarget as HTMLElement).style.borderColor = '#2A3830' }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {cols.map(c => (
            <div key={c.title}>
              <p className="text-xs font-semibold mb-5 uppercase tracking-widest" style={{ color: '#F0EBE0' }}>{c.title}</p>
              <ul className="space-y-3">
                {c.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors duration-200" style={{ color: '#8FA89A' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#F0EBE0')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#8FA89A')}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid #2A3830' }}>
          <p className="text-xs" style={{ color: '#8FA89A' }}>© 2025 zazonApp. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {['Privacidad', 'Términos', 'Cookies'].map(l => (
              <a key={l} href="#" className="text-xs transition-colors duration-200" style={{ color: '#8FA89A' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0EBE0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8FA89A')}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: '#0B110E', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <LogosBar />
      <Features />
      <HowItWorks />
      <DashboardMockup />
      <Testimonials />
      <Pricing />
      <CtaBanner />
      <Footer />
    </div>
  )
}
