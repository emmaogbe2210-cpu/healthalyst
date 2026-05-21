import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    number: '01',
    name: 'HealthSchedule',
    category: 'Scheduling & Patient Flow',
    tagline: '01 — SCHEDULING & PATIENT FLOW',
    headline: 'The scheduling layer for hospitals and clinics',
    subHeadline: 'Appointment & scheduling platform for hospitals and clinics',
    description:
      'A comprehensive digital scheduling platform purpose-built for hospitals and clinics. Manages outpatient bookings, specialist queues, inpatient admissions, and multi-department workflows — reducing no-shows and improving patient throughput.',
    builtFor: 'Hospitals · General Clinics · Specialist Centres · Community Health Facilities',
    capabilities: [
      'Multi-department appointment routing and queue management',
      'Automated patient reminders via SMS, WhatsApp and email',
      'Telehealth and virtual consultation integration',
      'Walk-in triage and emergency queue prioritisation',
      'Cross-visit patient health record linkage',
      'Administrator dashboards and performance analytics',
    ],
  },
  {
    number: '02',
    name: 'LabConnect',
    category: 'Laboratory & Diagnostics',
    tagline: '02 — LABORATORY & DIAGNOSTICS',
    headline: 'End-to-end digital workflow for diagnostic laboratories',
    subHeadline: 'Laboratory management & digital results platform',
    description:
      'Digitises every step of the laboratory process — from receiving test requests to delivering verified results. Eliminates paper-based reporting, closes the communication gap between labs and clinicians, and dramatically reduces result turnaround times.',
    builtFor: 'Clinical Laboratories · Diagnostic Centres · Pathology Labs · Research Institutions',
    capabilities: [
      'Digital lab test request management from any connected provider',
      'Sample tracking from collection through to processing',
      'Automated result verification and patient notification',
      'Clinician and referring doctor result-sharing portal',
      'Quality control and accreditation audit logging',
      'Reagent and consumable inventory management',
    ],
  },
  {
    number: '03',
    name: 'PharmaDesk',
    category: 'Pharmacy & Dispensing',
    tagline: '03 — PHARMACY & DISPENSING',
    headline: 'Digital pharmacy operations from prescription to dispensing',
    subHeadline: 'Pharmacy & dispensing management platform',
    description:
      'Connects pharmacies to the broader healthcare network. Enables digital prescription intake, intelligent stock management, and refill coordination — improving medication access, reducing dispensing errors, and creating a traceable audit trail.',
    builtFor: 'Retail Pharmacies · Hospital Pharmacies · Pharmaceutical Chains · Dispensing Clinics',
    capabilities: [
      'Digital prescription intake and verification from connected providers',
      'Medication dispensing records and full audit trails',
      'Real-time stock and inventory management',
      'Patient medication history and refill tracking',
      'Drug interaction and contraindication alert system',
      'Multi-branch stock visibility for pharmacy chains',
    ],
  },
  {
    number: '04',
    name: 'DentaFlow',
    category: 'Dental Practice Management',
    tagline: '04 — DENTAL PRACTICE MANAGEMENT',
    headline: 'Scheduling and clinical management built for dentistry',
    subHeadline: 'Dental practice management platform',
    description:
      'Purpose-built for dental practices — understanding procedure-specific chair time, recall scheduling, treatment plan phasing, and the patient experience in ways that generic clinic systems never do.',
    builtFor: 'General Dental Clinics · Orthodontic Practices · Oral Surgery Centres · Dental Chains',
    capabilities: [
      'Procedure-specific appointment time blocking per chair',
      'Dental treatment plan creation, tracking and phasing',
      'Automated patient recall and routine check-up reminders',
      'Digital dental charting and clinical notes',
      'Dental X-ray and intraoral imaging system integration',
      'Insurance pre-authorisation and billing workflow support',
    ],
  },
  {
    number: '05',
    name: 'ImagingHub',
    category: 'Radiology & Imaging',
    tagline: '05 — RADIOLOGY & IMAGING',
    headline: 'Digital referral and reporting platform for imaging centres',
    subHeadline: 'X-ray, radiology & diagnostics referral platform',
    description:
      'Manages the complete imaging workflow — from clinician referral through scan acquisition to radiologist reporting and result delivery. Built for X-ray, CT, MRI, and ultrasound facilities, with DICOM-compatible image management.',
    builtFor: 'X-Ray Centres · Radiology Departments · MRI & CT Facilities · Ultrasound Clinics',
    capabilities: [
      'Digital imaging referral intake from any connected provider',
      'Modality-specific scheduling — X-ray, CT, MRI, Ultrasound',
      'Radiologist reporting queue and workflow management',
      'DICOM-compatible image management and secure delivery',
      'Contrast and patient preparation instruction automation',
      'Cross-facility referral tracking and outcome feedback',
    ],
  },
  {
    number: '06',
    name: 'MedSupply',
    category: 'Equipment & Supply Procurement',
    tagline: '06 — EQUIPMENT & SUPPLY PROCUREMENT',
    headline: 'Digital procurement for medical equipment and supplies',
    subHeadline: 'Medical equipment & healthcare supplies platform',
    description:
      'Connects healthcare institutions with vetted medical equipment suppliers and healthcare product distributors. Simplifies the sourcing, ordering, and lifecycle management of devices, diagnostic tools, and clinical consumables.',
    builtFor:
      'Hospitals · Laboratories · Clinics · Government Health Institutions · NGO Health Programmes',
    capabilities: [
      'Curated catalogue of verified medical equipment and supplies',
      'Digital procurement and purchase order management',
      'Supplier verification, rating and compliance documentation',
      'Equipment lifecycle and maintenance scheduling',
      'Bulk ordering and institutional pricing frameworks',
      'Last-mile delivery coordination and tracking',
    ],
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Discovery & Scoping',
    tag: '01 — DISCOVERY & SCOPING',
    headline: 'Understanding your institution before writing a line of code',
    body: 'We begin with your institution. Before any design or code, our team immerses itself in your workflows, clinical realities, infrastructure constraints, and staff contexts. The brief emerges from your world — not from a template.',
  },
  {
    number: '02',
    title: 'Design & Architecture',
    tag: '02 — DESIGN & ARCHITECTURE',
    headline: 'Built for African operating conditions from the ground up',
    body: 'We architect platforms for African operating conditions from day one. Offline-first capability, low-bandwidth optimisation, USSD and SMS fallback, multilingual interfaces, and field-level mobile usability are not features added later — they are structural foundations.',
  },
  {
    number: '03',
    title: 'Build & Integration',
    tag: '03 — BUILD & INTEGRATION',
    headline: 'Platforms that talk to each other and to your existing systems',
    body: 'Our platforms are built to integrate into your existing systems and to communicate with each other. A lab result processed in LabConnect flows automatically into HealthSchedule. A prescription verified in PharmaDesk creates a traceable dispensing record.',
  },
  {
    number: '04',
    title: 'Launch & Continuous Improvement',
    tag: '04 — LAUNCH & CONTINUOUS IMPROVEMENT',
    headline: 'A long-term technology partner, not a one-time vendor',
    body: 'Go-live is a beginning, not an end. We provide full implementation support, staff training, and ongoing product iterations. As your institution grows, your platform evolves with it. We are a long-term technology partner, not a one-time vendor.',
  },
];

const FAQS = [
  {
    q: 'What kinds of institutions does Healthalyst Africa work with?',
    a: 'We work with the full spectrum of healthcare providers — hospitals and clinics, diagnostic laboratories, pharmacies, dental practices, radiology and imaging centres, and medical equipment suppliers and institutions. Each has a dedicated product module built for their specific workflows.',
  },
  {
    q: 'Is Healthalyst Africa a patient-facing platform or a consumer app?',
    a: 'Neither. Healthalyst Africa is a B2B health technology company. We build and deploy the digital infrastructure that healthcare institutions use to run their operations. We are not a patient marketplace, consumer app, or scheduling aggregator.',
  },
  {
    q: 'Do your six products work together as a connected system?',
    a: 'Yes — interoperability is a core architectural principle, not a bolt-on feature. A patient record created in HealthSchedule is accessible in LabConnect and PharmaDesk. A radiology referral initiated in ImagingHub connects back to the originating clinician in HealthSchedule. The suite is modular but unified.',
  },
  {
    q: 'How does the technology handle low-connectivity environments?',
    a: "Every platform we build is engineered with an offline-first architecture. Core scheduling, record access, and dispensing functions operate with intermittent connectivity. Where internet access is unavailable, SMS and USSD fallback protocols ensure continuity. We design for the continent's infrastructure reality.",
  },
  {
    q: "Can the platforms be customised for our institution's specific needs?",
    a: 'Yes. Our core platforms are production-ready and deployable, but we offer deep configuration and customisation layers for institutions with specific workflow requirements, existing legacy systems, branding standards, or regulatory compliance needs.',
  },
  {
    q: 'How does an institution begin working with Healthalyst Africa?',
    a: "Submit an enquiry through our contact form. Our team will reach out to schedule a discovery consultation — a structured conversation to understand your institution's context, identify the right products, and outline an implementation approach. We work with institutions of all sizes and budgets.",
  },
];

// ─────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────

function Navbar({ setActiveProduct }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Products', id: 'products' },
    { label: 'What We Build', id: 'what-we-build' },
    { label: 'How We Work', id: 'how-we-work' },
    { label: 'About', id: 'about' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 100,
        transition: 'all 0.35s ease',
        background: scrolled ? 'rgba(249,246,240,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid #E2D9C8' : '1px solid transparent',
      }}
    >
      <div
        className="nav-container"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 40px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo lockup */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Healthalyst Africa — scroll to top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.1)',
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.jpeg"
              alt="Healthalyst Africa"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 16,
                fontWeight: 700,
                color: '#B8935A',
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}
            >
              HEALTHALYST
            </span>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 8.5,
                color: '#B8935A',
                letterSpacing: '0.32em',
                lineHeight: 1,
              }}
            >
              AFRICA
            </span>
          </div>
        </button>

        {/* Center nav */}
        <nav className="desktop-nav" style={{ gap: 36 }}>
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: scrolled ? '#9A9282' : 'rgba(255,255,255,0.55)',
                transition: 'color 0.2s',
                padding: '4px 0',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="desktop-ctas" style={{ gap: 12, alignItems: 'center' }}>
          <button onClick={() => scrollTo('contact')} className="btn-secondary">
            Contact
          </button>
          <button onClick={() => scrollTo('contact')} className="btn-primary">
            Partner With Us
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            flexDirection: 'column',
            gap: 5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: 1.5,
                background: scrolled ? '#0E1510' : 'rgba(255,255,255,0.8)',
                borderRadius: 1,
                transition: 'background 0.3s',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            background: '#F9F6F0',
            borderBottom: '2px solid #183020',
            padding: '28px 40px',
          }}
        >
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => {
                scrollTo(id);
                setMenuOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '13px 0',
                borderTop: '1px solid #E2D9C8',
                borderBottom: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                background: 'none',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: '#183020',
              }}
            >
              {label}
            </button>
          ))}
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={() => {
                scrollTo('contact');
                setMenuOpen(false);
              }}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              Contact
            </button>
            <button
              onClick={() => {
                scrollTo('contact');
                setMenuOpen(false);
              }}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Partner With Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────

function Hero({ setActiveProduct }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const entrance = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(20px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      style={{
        minHeight: '100vh',
        background: '#183020',
        padding: 'clamp(100px,12vh,140px) 0 100px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Radial gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 70% 40%, rgba(184,147,90,0.12) 0%, transparent 55%), radial-gradient(circle at 15% 80%, rgba(184,147,90,0.06) 0%, transparent 45%)',
        }}
      />

      {/* Giant H watermark */}
      <div
        className="hero-h-watermark"
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(200px,28vw,380px)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.03)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        H
      </div>

      {/* Decorative vertical text */}
      <div
        className="hero-vertical-text"
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 36,
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          fontFamily: "'DM Mono', monospace",
          fontSize: 9,
          color: '#B8935A',
          letterSpacing: '0.2em',
          opacity: 0.28,
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        HEALTHALYST AFRICA
      </div>

      <div
        className="section-container"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', width: '100%', position: 'relative', zIndex: 2 }}
      >
        <div style={{ maxWidth: 800 }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, ...entrance(0) }}>
            <div style={{ width: 32, height: 1, background: '#B8935A', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: '#B8935A',
                letterSpacing: '0.2em',
              }}
            >
              HEALTH TECHNOLOGY · PAN-AFRICAN
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(3.2rem,7.5vw,6.8rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              color: 'white',
              marginBottom: 36,
              ...entrance(80),
            }}
          >
            We build the digital
            <br />
            infrastructure of
            <br />
            <em style={{ color: '#B8935A', fontStyle: 'italic' }}>African healthcare.</em>
          </h1>

          {/* Primary body */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 18,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.85,
              maxWidth: 560,
              marginBottom: 16,
              ...entrance(160),
            }}
          >
            Healthalyst Africa is a health technology company. We design and develop
            purpose-built digital products for hospitals, laboratories, pharmacies, dental
            practices, diagnostic imaging centres, and medical equipment suppliers across the
            continent.
          </p>

          {/* Secondary body */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.38)',
              lineHeight: 1.8,
              maxWidth: 520,
              marginBottom: 52,
              ...entrance(160),
            }}
          >
            We don't build generic software. We build technology that understands the specific
            workflows, infrastructure realities, and clinical needs of African healthcare — from
            the ground up.
          </p>

          {/* CTAs */}
          <div
            className="hero-ctas"
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 80, ...entrance(240) }}
          >
            <button onClick={() => scrollTo('products')} className="btn-gold">
              Explore Our Products →
            </button>
            <button onClick={() => scrollTo('contact')} className="btn-ghost">
              Speak to Our Team
            </button>
          </div>

          {/* Product name strip */}
          <div
            style={{
              paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 320ms',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 4px', alignItems: 'center' }}>
              {PRODUCTS.map((p, i) => (
                <React.Fragment key={p.name}>
                  <button
                    onClick={() => {
                      setActiveProduct(i);
                      scrollTo('products');
                    }}
                    className="product-chip"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.4)',
                      padding: '4px 2px',
                      transition: 'color 0.2s',
                    }}
                  >
                    {p.name}
                  </button>
                  {i < PRODUCTS.length - 1 && (
                    <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: 12 }}> · </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// STATS BAR
// ─────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { number: '6', label: 'Digital Product Lines', sub: 'Purpose-built, not adapted' },
    { number: '54+', label: 'African Nations', sub: 'Continent-wide expansion' },
    { number: '100%', label: 'African-Context Design', sub: 'Offline-first architecture' },
    { number: '1', label: 'Connected Ecosystem', sub: 'All products interoperable' },
  ];

  return (
    <div style={{ background: '#0E1510' }}>
      <div
        className="stats-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-item"
            style={{
              padding: '44px 36px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2.4rem,4vw,3.4rem)',
                color: '#B8935A',
                lineHeight: 1,
              }}
            >
              {s.number}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: 'white',
                marginTop: 10,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.35)',
                marginTop: 4,
              }}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// WHAT WE BUILD
// ─────────────────────────────────────────────────────────────────

function ProductCard({ product, index, visible, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Explore ${product.name}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`reveal reveal-${index + 1}${visible ? ' show' : ''}`}
      style={{
        background: 'white',
        padding: '36px 32px',
        cursor: 'pointer',
        transition: 'all 0.28s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 12px 40px rgba(24,48,32,0.08)' : 'none',
        outline: hovered ? '1.5px solid #B8935A' : '1.5px solid transparent',
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: '#B8935A',
          letterSpacing: '0.18em',
          marginBottom: 24,
        }}
      >
        {product.number}
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          fontWeight: 500,
          color: '#183020',
          lineHeight: 1.2,
          marginBottom: 6,
        }}
      >
        {product.name}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: '#9A9282',
          letterSpacing: '0.04em',
          marginBottom: 20,
          textTransform: 'uppercase',
        }}
      >
        {product.category}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13.5,
          fontWeight: 300,
          color: '#3D3830',
          lineHeight: 1.75,
        }}
      >
        {product.headline}
      </div>
      <div
        style={{
          marginTop: 28,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          color: '#183020',
          letterSpacing: '0.06em',
        }}
      >
        EXPLORE <span style={{ color: '#B8935A' }}>→</span>
      </div>
    </div>
  );
}

function WhatWeBuild({ setActiveProduct }) {
  const [ref, visible] = useReveal();

  return (
    <section
      id="what-we-build"
      ref={ref}
      className="section-padding"
      style={{ background: '#F9F6F0', padding: '128px 0' }}
    >
      <div
        className="section-container"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}
      >
        {/* Section header */}
        <div className={`reveal${visible ? ' show' : ''}`}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: '#9A9282',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            WHAT WE BUILD
          </div>
          <div
            className="two-col"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
              alignItems: 'end',
              marginBottom: 72,
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2.2rem,4.5vw,3.8rem)',
                lineHeight: 1.1,
                color: '#183020',
              }}
            >
              Six product lines.
              <br />
              <em style={{ fontStyle: 'italic' }}>One connected</em>
              <br />
              healthcare ecosystem.
            </h2>
            <div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: 300,
                  color: '#3D3830',
                  lineHeight: 1.82,
                  marginBottom: 18,
                }}
              >
                Each product is purpose-built for a specific healthcare institution type —
                designed from the ground up to address the exact workflows, operational
                challenges, and clinical realities of that setting.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: 300,
                  color: '#3D3830',
                  lineHeight: 1.82,
                }}
              >
                Together, they form a unified ecosystem — where a patient's journey across
                hospitals, laboratories, pharmacies, and imaging centres is a single,
                coherent digital experience.
              </p>
            </div>
          </div>
          <div style={{ height: 1, background: '#E2D9C8', marginBottom: 1 }} />
        </div>

        {/* 6-card grid */}
        <div
          className="product-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: '#E2D9C8',
          }}
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard
              key={i}
              product={p}
              index={i}
              visible={visible}
              onClick={() => {
                setActiveProduct(i);
                scrollTo('products');
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// PRODUCT DEEP DIVE
// ─────────────────────────────────────────────────────────────────

function ProductsDive({ activeProduct, setActiveProduct }) {
  const [ref, visible] = useReveal();
  const p = PRODUCTS[activeProduct];

  return (
    <section
      id="products"
      ref={ref}
      className="section-padding"
      style={{ background: '#F2EDE3', padding: '128px 0' }}
    >
      <div
        className="section-container"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}
      >
        {/* Section header */}
        <div className={`reveal${visible ? ' show' : ''}`} style={{ marginBottom: 52 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: '#9A9282',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            PRODUCT DETAILS
          </div>
          <div
            className="two-col"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end' }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2.2rem,4.5vw,3.8rem)',
                lineHeight: 1.1,
                color: '#183020',
              }}
            >
              Explore our
              <br />
              <em style={{ fontStyle: 'italic' }}>product suite</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: '#3D3830',
                lineHeight: 1.82,
              }}
            >
              Each product is engineered for its specific healthcare context. Select a product
              to explore its capabilities, use cases, and the institutions it serves.
            </p>
          </div>
        </div>

        {/* Tab navigation */}
        <div
          className={`reveal${visible ? ' show' : ''}`}
          style={{
            borderBottom: '1px solid #E2D9C8',
            marginBottom: 0,
            overflowX: 'auto',
            display: 'flex',
            gap: 32,
          }}
        >
          {PRODUCTS.map((prod, i) => (
            <button
              key={i}
              onClick={() => setActiveProduct(i)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12.5,
                fontWeight: 500,
                color: activeProduct === i ? '#183020' : '#9A9282',
                background: 'none',
                border: 'none',
                borderBottom: activeProduct === i ? '2px solid #B8935A' : '2px solid transparent',
                padding: '10px 0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                marginBottom: -1,
              }}
            >
              {prod.name}
            </button>
          ))}
        </div>

        {/* Active product panel */}
        <div
          className={`reveal product-panel two-col-equal${visible ? ' show' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            border: '1px solid #E2D9C8',
            borderTop: 'none',
          }}
        >
          {/* Left — dark panel */}
          <div
            style={{
              background: '#183020',
              padding: 'clamp(40px,5vw,64px) clamp(32px,4.5vw,56px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Watermark number */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: -20,
                bottom: -30,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 180,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.04)',
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {p.number}
            </div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: '#B8935A',
                  letterSpacing: '0.2em',
                  marginBottom: 24,
                }}
              >
                {p.tagline}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.8rem,3.2vw,2.6rem)',
                  fontWeight: 400,
                  color: 'white',
                  lineHeight: 1.15,
                  marginBottom: 10,
                }}
              >
                {p.headline}
              </h3>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem,1.5vw,1.2rem)',
                  color: '#CFA96E',
                  lineHeight: 1.4,
                  marginBottom: 28,
                }}
              >
                {p.subHeadline}
              </p>
              <div style={{ width: 40, height: 1, background: '#B8935A', marginBottom: 28 }} />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.85,
                  marginBottom: 28,
                }}
              >
                {p.description}
              </p>
              <div
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 3,
                  padding: '20px 24px',
                  background: 'rgba(255,255,255,0.04)',
                  marginBottom: 32,
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    color: '#B8935A',
                    letterSpacing: '0.18em',
                    marginBottom: 10,
                  }}
                >
                  BUILT FOR
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.6,
                  }}
                >
                  {p.builtFor}
                </div>
              </div>
              <button onClick={() => scrollTo('contact')} className="btn-gold">
                Enquire About {p.name}
              </button>
            </div>
          </div>

          {/* Right — white panel */}
          <div
            style={{
              background: 'white',
              padding: 'clamp(40px,5vw,64px) clamp(32px,4.5vw,56px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.22em',
                color: '#9A9282',
                textTransform: 'uppercase',
                marginBottom: 32,
              }}
            >
              PLATFORM CAPABILITIES
            </div>
            <div style={{ flex: 1 }}>
              {p.capabilities.map((cap, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: '20px 0',
                    borderBottom: i < p.capabilities.length - 1 ? '1px solid #E2D9C8' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      color: '#B8935A',
                      minWidth: 24,
                      paddingTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#3D3830',
                      lineHeight: 1.65,
                    }}
                  >
                    {cap}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 32,
                paddingTop: 20,
                borderTop: '1px solid #E2D9C8',
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: '#9A9282',
                letterSpacing: '0.1em',
              }}
            >
              INTEROPERABLE · OFFLINE-FIRST · MULTILINGUAL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// HOW WE WORK
// ─────────────────────────────────────────────────────────────────

function HowWeWork() {
  const [ref, visible] = useReveal();
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  return (
    <section
      id="how-we-work"
      ref={ref}
      className="section-padding"
      style={{ background: '#F9F6F0', padding: '128px 0' }}
    >
      <div
        className="section-container"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}
      >
        {/* Section header */}
        <div className={`reveal${visible ? ' show' : ''}`} style={{ marginBottom: 80 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: '#9A9282',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            HOW WE WORK
          </div>
          <div
            className="two-col"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end' }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2.2rem,4.5vw,3.8rem)',
                lineHeight: 1.1,
                color: '#183020',
              }}
            >
              From discovery to
              <br />
              <em style={{ fontStyle: 'italic' }}>continuous growth</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: '#3D3830',
                lineHeight: 1.82,
              }}
            >
              Our implementation process is designed around one principle: your institution's
              reality comes first. We don't fit your workflows into our template — we build
              platforms from your ground up.
            </p>
          </div>
        </div>

        {/* Interactive process */}
        <div
          className={`reveal two-col-process${visible ? ' show' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}
        >
          {/* Step selector */}
          <div>
            {STEPS.map((s, i) => (
              <StepButton
                key={i}
                step={s}
                active={activeStep === i}
                onClick={() => setActiveStep(i)}
              />
            ))}
          </div>

          {/* Step content */}
          <div key={activeStep} style={{ paddingTop: 8 }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: '#B8935A',
                letterSpacing: '0.2em',
                marginBottom: 24,
              }}
            >
              {step.tag}
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.6rem,3vw,2.4rem)',
                fontWeight: 400,
                color: '#183020',
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              {step.headline}
            </h3>
            <div style={{ width: 32, height: 1, background: '#B8935A', marginBottom: 28 }} />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: '#3D3830',
                lineHeight: 1.9,
                marginBottom: 36,
              }}
            >
              {step.body}
            </p>
            {activeStep < STEPS.length - 1 ? (
              <button onClick={() => setActiveStep(activeStep + 1)} className="btn-secondary">
                Next: {STEPS[activeStep + 1].title} →
              </button>
            ) : (
              <button onClick={() => scrollTo('contact')} className="btn-primary">
                Start a Conversation →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepButton({ step, active, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '24px 28px',
        borderLeft: `3px solid ${active ? '#B8935A' : hovered ? '#E2D9C8' : 'transparent'}`,
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        borderRadius: '0 4px 4px 0',
        background: active ? '#FAF4EB' : hovered ? '#F2EDE3' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginBottom: 4,
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.16em',
          color: active ? '#B8935A' : '#C8BCA8',
          marginBottom: 6,
          transition: 'color 0.2s',
        }}
      >
        {step.number}
      </div>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          fontWeight: active ? 600 : 400,
          color: active ? '#183020' : '#3D3830',
          transition: 'all 0.2s',
        }}
      >
        {step.title}
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────────

function About() {
  const [ref, visible] = useReveal();

  const pillars = [
    {
      icon: '◈',
      title: 'African Infrastructure First',
      body: "Offline-first architecture. Low-bandwidth optimisation. SMS and USSD fallback. Multilingual support. These are foundations, not optional features.",
    },
    {
      icon: '⬡',
      title: 'Interoperable by Design',
      body: "A patient's journey across a hospital, lab, imaging centre, and pharmacy exists as one coherent digital record. No data silos. No manual transfers.",
    },
    {
      icon: '◇',
      title: 'Institution-Grade Security',
      body: "Role-based access control, encrypted data storage, full audit trails, and compliance with international health data protection standards.",
    },
    {
      icon: '◎',
      title: 'Long-Term Partnership',
      body: "We measure success by the health outcomes your institution delivers — not by licences sold. Implementation, training, and evolution are built into how we work.",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding"
      style={{ background: '#183020', padding: '128px 0' }}
    >
      <div
        className="section-container"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.38)',
            textTransform: 'uppercase',
            marginBottom: 56,
          }}
        >
          ABOUT US
        </div>

        {/* Main 2-col */}
        <div
          className={`reveal two-col${visible ? ' show' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 96 }}
        >
          {/* Left */}
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2.2rem,4.5vw,3.8rem)',
                lineHeight: 1.1,
                color: 'white',
                marginBottom: 32,
              }}
            >
              Technology built for
              <br />
              <em style={{ fontStyle: 'italic', color: '#B8935A' }}>African healthcare future</em>
            </h2>

            <blockquote
              style={{ borderLeft: '3px solid #B8935A', paddingLeft: 28, marginBottom: 36 }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.15rem,1.8vw,1.5rem)',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.6,
                }}
              >
                "Africa's healthcare system doesn't need software written elsewhere and adapted.
                It needs technology built here, for here."
              </p>
            </blockquote>

            <button onClick={() => scrollTo('contact')} className="btn-gold">
              Partner With Us →
            </button>
          </div>

          {/* Right */}
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.88,
                marginBottom: 28,
              }}
            >
              Healthalyst Africa is a health technology company with a singular focus: building
              the digital infrastructure that will transform how healthcare is accessed, delivered,
              and managed across the African continent.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.88,
                marginBottom: 28,
              }}
            >
              We develop purpose-built software for the full spectrum of healthcare provision —
              from primary care scheduling to laboratory diagnostics, pharmaceutical management,
              dental practice operations, diagnostic imaging, and medical supply chains.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.88,
              }}
            >
              Our platforms are designed from first principles for African operating conditions —
              built to function in low-connectivity environments, support multiple languages, and
              scale from a single-facility deployment to continent-wide rollout.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 56 }} />

        {/* Approach pillars */}
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.38)',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          OUR APPROACH
        </div>
        <div
          className={`reveal pillars-grid${visible ? ' show' : ''}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'rgba(255,255,255,0.07)',
          }}
        >
          {pillars.map((pillar, i) => (
            <div key={i} style={{ background: '#254533', padding: '44px 36px' }}>
              <div style={{ fontSize: 22, color: '#B8935A', marginBottom: 20 }}>{pillar.icon}</div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: 14,
                }}
              >
                {pillar.title}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.78,
                }}
              >
                {pillar.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────

function FAQ() {
  const [ref, visible] = useReveal();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding"
      style={{ background: '#F9F6F0', padding: '128px 0' }}
    >
      <div
        className="section-container"
        style={{ maxWidth: 860, margin: '0 auto', padding: '0 40px' }}
      >
        <div className={`reveal${visible ? ' show' : ''}`} style={{ marginBottom: 64 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.22em',
              color: '#9A9282',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}
          >
            QUESTIONS
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2.2rem,4.5vw,3.8rem)',
              lineHeight: 1.1,
              color: '#183020',
            }}
          >
            Frequently asked <em style={{ fontStyle: 'italic' }}>questions</em>
          </h2>
        </div>

        <div className={`reveal${visible ? ' show' : ''}`}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderTop: '1px solid #E2D9C8',
                borderBottom: i === FAQS.length - 1 ? '1px solid #E2D9C8' : 'none',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  width: '100%',
                  padding: '24px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#183020',
                    lineHeight: 1.45,
                    flex: 1,
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    fontSize: 22,
                    color: '#B8935A',
                    flexShrink: 0,
                    transform: openIndex === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.3s ease',
                    lineHeight: 1.2,
                    display: 'inline-block',
                  }}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div style={{ paddingBottom: 28 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 300,
                      color: '#3D3830',
                      lineHeight: 1.85,
                      maxWidth: 680,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────────

const inputStyle = {
  background: 'white',
  border: '1.5px solid #E2D9C8',
  borderRadius: 3,
  padding: '14px 16px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 14,
  color: '#0E1510',
  outline: 'none',
  width: '100%',
  display: 'block',
};

function Contact() {
  const [ref, visible] = useReveal();

  const institutions = [
    { name: 'Hospitals & Clinics', product: 'HealthSchedule', desc: 'patient scheduling and clinical operations' },
    { name: 'Laboratories', product: 'LabConnect', desc: 'end-to-end digital diagnostic workflows' },
    { name: 'Pharmacies', product: 'PharmaDesk', desc: 'prescription and inventory management' },
    { name: 'Dental Practices', product: 'DentaFlow', desc: 'scheduling, charting and patient management' },
    { name: 'Imaging Centres', product: 'ImagingHub', desc: 'referral management and radiology reporting' },
    { name: 'Equipment Suppliers & Institutions', product: 'MedSupply', desc: 'digital procurement and supply chain' },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="section-padding"
      style={{ background: '#F2EDE3', padding: '128px 0' }}
    >
      <div
        className="section-container"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}
      >
        <div
          className={`reveal two-col-contact${visible ? ' show' : ''}`}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 100, alignItems: 'start' }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.22em',
                color: '#9A9282',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              GET IN TOUCH
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(2.2rem,4.5vw,3.4rem)',
                lineHeight: 1.1,
                color: '#183020',
                marginBottom: 28,
              }}
            >
              Ready to build better
              <br />
              <em style={{ fontStyle: 'italic' }}>healthcare technology?</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: '#3D3830',
                lineHeight: 1.82,
                marginBottom: 32,
              }}
            >
              Whether you're a hospital, laboratory, pharmacy, or any other healthcare
              institution — we'd like to understand your context and explore how Healthalyst
              Africa can serve your needs.
            </p>
            <div style={{ height: 1, background: '#E2D9C8', marginBottom: 32 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {institutions.map((inst, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#B8935A',
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#183020',
                        marginBottom: 2,
                      }}
                    >
                      {inst.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        fontWeight: 300,
                        color: '#9A9282',
                      }}
                    >
                      {inst.product} — {inst.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            style={{
              background: 'white',
              border: '1px solid #E2D9C8',
              borderRadius: 4,
              padding: 'clamp(36px,5vw,52px) clamp(28px,4.5vw,48px)',
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.22em',
                color: '#9A9282',
                textTransform: 'uppercase',
                marginBottom: 28,
              }}
            >
              SEND US A MESSAGE
            </div>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                className="form-name-grid"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
              >
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-input"
                  style={inputStyle}
                  autoComplete="given-name"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-input"
                  style={inputStyle}
                  autoComplete="family-name"
                />
              </div>
              <input
                type="text"
                placeholder="Organisation / Institution Name"
                className="form-input"
                style={inputStyle}
                autoComplete="organization"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="form-input"
                style={inputStyle}
                autoComplete="email"
              />
              <input
                type="tel"
                placeholder="Phone Number (optional)"
                className="form-input"
                style={inputStyle}
                autoComplete="tel"
              />
              <select className="form-input" style={{ ...inputStyle, color: '#0E1510' }}>
                <option value="" style={{ color: '#9A9282' }}>
                  I represent a…
                </option>
                <option>Hospital or Clinic</option>
                <option>Laboratory / Diagnostic Centre</option>
                <option>Pharmacy</option>
                <option>Dental Practice</option>
                <option>X-Ray / Imaging Centre</option>
                <option>Medical Equipment Supplier</option>
                <option>Investor / Fund</option>
                <option>Government Health Institution</option>
                <option>NGO / Development Organisation</option>
                <option>Technology Partner</option>
                <option>Other</option>
              </select>
              <select className="form-input" style={{ ...inputStyle, color: '#0E1510' }}>
                <option value="" style={{ color: '#9A9282' }}>
                  Product of interest…
                </option>
                {PRODUCTS.map((p) => (
                  <option key={p.name}>
                    {p.name} — {p.category}
                  </option>
                ))}
                <option>Full Product Suite</option>
                <option>General Partnership</option>
                <option>Investment Enquiry</option>
              </select>
              <textarea
                rows={4}
                placeholder="Tell us about your institution and what you're looking to achieve…"
                className="form-input"
                style={{ ...inputStyle, resize: 'vertical', minHeight: 104 }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '16px 32px', fontSize: 14, marginTop: 4 }}
              >
                Send Message →
              </button>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 300,
                  color: '#9A9282',
                  textAlign: 'center',
                  marginTop: 4,
                }}
              >
                We respond to all enquiries within two business days.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────

function Footer({ setActiveProduct }) {
  return (
    <footer style={{ background: '#0E1510', padding: '80px 0 40px' }}>
      <div
        className="section-container"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}
      >
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
            gap: 60,
            marginBottom: 60,
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 5,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/logo.jpeg"
                  alt="Healthalyst Africa"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#B8935A',
                    letterSpacing: '0.08em',
                    lineHeight: 1,
                  }}
                >
                  HEALTHALYST
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8.5,
                    color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.32em',
                    lineHeight: 1,
                  }}
                >
                  AFRICA
                </span>
              </div>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.7,
                maxWidth: 260,
                marginBottom: 20,
              }}
            >
              Building the digital infrastructure of African healthcare — one institution at
              a time.
            </p>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.1em',
              }}
            >
              PAN-AFRICAN / HEALTH TECHNOLOGY
            </div>
          </div>

          {/* Products */}
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9.5,
                color: '#B8935A',
                letterSpacing: '0.2em',
                marginBottom: 24,
                textTransform: 'uppercase',
              }}
            >
              PRODUCTS
            </div>
            {PRODUCTS.map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveProduct(i);
                  scrollTo('products');
                }}
                className="footer-link"
                style={{
                  display: 'block',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.38)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: 12,
                  padding: 0,
                  textAlign: 'left',
                  transition: 'color 0.2s',
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Company */}
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9.5,
                color: '#B8935A',
                letterSpacing: '0.2em',
                marginBottom: 24,
                textTransform: 'uppercase',
              }}
            >
              COMPANY
            </div>
            {['About Us', 'Our Approach', 'Careers', 'Press & Media', 'Partners'].map(
              (link) => (
                <button
                  key={link}
                  onClick={() => scrollTo('about')}
                  className="footer-link"
                  style={{
                    display: 'block',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.38)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: 12,
                    padding: 0,
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                >
                  {link}
                </button>
              )
            )}
          </div>

          {/* Connect */}
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9.5,
                color: '#B8935A',
                letterSpacing: '0.2em',
                marginBottom: 24,
                textTransform: 'uppercase',
              }}
            >
              CONNECT
            </div>
            {[
              'Contact Us',
              'Partnership Enquiries',
              'Investor Relations',
              'Support',
            ].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo('contact')}
                className="footer-link"
                style={{
                  display: 'block',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.38)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: 12,
                  padding: 0,
                  textAlign: 'left',
                  transition: 'color 0.2s',
                }}
              >
                {link}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: 28,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: 'rgba(255,255,255,0.22)',
            }}
          >
            © 2025 Healthalyst Africa. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              color: 'rgba(255,255,255,0.18)',
              letterSpacing: '0.08em',
            }}
          >
            BUILDING THE DIGITAL INFRASTRUCTURE OF AFRICAN HEALTHCARE
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <>
      <Navbar setActiveProduct={setActiveProduct} />
      <main>
        <Hero setActiveProduct={setActiveProduct} />
        <StatsBar />
        <WhatWeBuild setActiveProduct={setActiveProduct} />
        <ProductsDive activeProduct={activeProduct} setActiveProduct={setActiveProduct} />
        <HowWeWork />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer setActiveProduct={setActiveProduct} />
    </>
  );
}
