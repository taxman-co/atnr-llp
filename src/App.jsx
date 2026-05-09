import React, { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --deep:#111111; --charcoal:#1C1C1C; --ivory:#F7F4EE;
      --brass:#A8895C; --brass-l:#C4A97A; --slate:#3A3A3A;
      --mid:#6B6B6B; --rule:#D5CFC4;
      --serif:'Cormorant Garamond',Georgia,serif;
      --sans:'Montserrat',sans-serif;
    }
    html{
      scroll-behavior:smooth;
      overflow-x:hidden;
      width:100%;
    }
    body{background:var(--deep);color:var(--ivory);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:hidden;}
    a{text-decoration:none;color:inherit;}
    button{cursor:pointer;border:none;background:none;}

    .rv{opacity:0;transform:translateY(20px);transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1);}
    .rv.on{opacity:1;transform:translateY(0);}
    .rv-l{opacity:0;transform:translateX(-20px);transition:opacity .75s cubic-bezier(.22,.61,.36,1),transform .75s cubic-bezier(.22,.61,.36,1);}
    .rv-l.on{opacity:1;transform:translateX(0);}
    .rv-r{opacity:0;transform:translateX(20px);transition:opacity .75s cubic-bezier(.22,.61,.36,1),transform .75s cubic-bezier(.22,.61,.36,1);}
    .rv-r.on{opacity:1;transform:translateX(0);}
    .d1{transition-delay:.07s;} .d2{transition-delay:.16s;} .d3{transition-delay:.25s;} .d4{transition-delay:.34s;}

    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:var(--deep);}
    ::-webkit-scrollbar-thumb{background:var(--brass);}

    .mob-panel{
      position:fixed;top:0;right:0;bottom:0;width:min(310px,100vw);
      background:#0e0e0e;border-left:1px solid rgba(168,137,92,.18);
      z-index:200;transform:translateX(110%);
      transition:transform .38s cubic-bezier(.22,.61,.36,1);
      display:flex;flex-direction:column;padding:72px 32px 44px;
      overflow-y:auto;
      box-sizing:border-box;
    }
    .mob-panel.open{transform:translateX(0);}
    .mob-bg{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:199;opacity:0;pointer-events:none;transition:opacity .32s;}
    .mob-bg.open{opacity:1;pointer-events:auto;}

    @media(max-width:599px){
      .practice-grid{grid-template-columns:1fr!important;}
      .pcard{flex-direction:column!important;}
      .pcard-img{width:100%!important;min-width:unset!important;height:130px!important;}
      .pcard-body{border-left:none!important;border-top:1px solid rgba(168,137,92,.1)!important;}
    }
    @media(min-width:600px){
      .practice-grid{grid-template-columns:1fr 1fr!important;}
    }
    @media(max-width:767px){
      .attorney-grid{grid-template-columns:1fr!important;}
      .about-features{grid-template-columns:1fr!important;}
      .about-intro-grid{grid-template-columns:1fr!important;}
      .contact-grid{grid-template-columns:1fr!important; }
      .contact-grid > *{
        min-width:0;
      }
      .results-grid{grid-template-columns:1fr!important;}
    }
    @media(min-width:768px) and (max-width:1099px){
      .attorney-grid{grid-template-columns:1fr 1fr!important;}
    }
    @media(max-width:599px){.footer-nav{display:none!important;}}
    @media(max-width:599px){.footer-disc{text-align:left!important;}}
  `}</style>
);

function Eyebrow({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
      <div style={{ width: 26, height: 1, background: "var(--brass)", flexShrink: 0 }} />
      <span style={{ fontFamily: "var(--sans)", fontSize: 9.5, fontWeight: 600, letterSpacing: "0.22em", color: "var(--brass)", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

// ── NAVBAR ──
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const w = useWindowWidth();
  const mob = w < 960;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = ["About", "Practice Areas", "Attorneys", "Results", "Contact"];

  const go = (id) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 150,
        height: mob ? 72 : 82,
        background: (scrolled || open) ? "rgba(14,14,14,.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(168,137,92,.14)" : "1px solid transparent",
        transition: "background .32s, border-color .32s",
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1680, margin: "0 auto", width: "100%", padding: "0 clamp(24px,5vw,92px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img
              src="/logo.png"
              alt="ANDERSON TYSON NATIONAL RECOVERY"
              style={{
                width: mob ? 42 : 54,
                height: mob ? 42 : 54,
                objectFit: "contain"
              }}
            />
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: mob ? 14 : 16, fontWeight: 500, color: "var(--ivory)", letterSpacing: "0.07em", lineHeight: 1.25 }}>ANDERSON TYSON</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: mob ? 11.5 : 13, fontWeight: 400, color: "var(--brass)", letterSpacing: "0.1em", lineHeight: 1.25 }}>NATIONAL RECOVERY</div>
            </div>
          </a>

          {!mob ? (
            <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
              {links.map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                  style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", color: "rgba(247,244,238,.58)", textTransform: "uppercase", transition: "color .22s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--brass)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(247,244,238,.58)"}
                >{l}</a>
              ))}
              <a href="#contact" style={{
                fontFamily: "var(--sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em",
                textTransform: "uppercase", padding: "9px 20px",
                border: "1px solid var(--brass)", color: "var(--brass)", transition: "all .24s"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--brass)"; e.currentTarget.style.color = "var(--deep)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--brass)"; }}
              >Schedule Consultation</a>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <a href="tel:+14044237063" style={{
                fontFamily: "var(--sans)", fontSize: 9.5, fontWeight: 600, letterSpacing: "0.1em",
                color: "var(--brass)", border: "1px solid rgba(168,137,92,.38)", padding: "6px 12px", textTransform: "uppercase"
              }}>Call Us</a>
              <button onClick={() => setOpen(o => !o)} style={{ padding: "6px 2px", display: "flex", flexDirection: "column", gap: 5 }} aria-label="Toggle menu">
                <span style={{ display: "block", width: 21, height: 1.5, background: open ? "var(--brass)" : "var(--ivory)", transition: "all .28s", transform: open ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }} />
                <span style={{ display: "block", width: 21, height: 1.5, background: "var(--ivory)", opacity: open ? 0 : 1, transition: "opacity .28s" }} />
                <span style={{ display: "block", width: 21, height: 1.5, background: open ? "var(--brass)" : "var(--ivory)", transition: "all .28s", transform: open ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }} />
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className={`mob-bg ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <div className={`mob-panel ${open ? "open" : ""}`}>
        <div style={{ fontFamily: "var(--sans)", fontSize: 9, fontWeight: 600, letterSpacing: "0.24em", color: "rgba(168,137,92,.45)", textTransform: "uppercase", marginBottom: 32 }}>Menu</div>
        {links.map(l => (
          <button key={l} onClick={() => go(l.toLowerCase().replace(/ /g, "-"))} style={{
            display: "block", width: "100%", textAlign: "left",
            padding: "15px 0", fontFamily: "var(--serif)", fontSize: 21, fontWeight: 400,
            color: "var(--ivory)", borderBottom: "1px solid rgba(168,137,92,.1)", transition: "color .2s"
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--brass)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--ivory)"}
          >{l}</button>
        ))}
        <a
          href="/privacy-policy"
          onClick={() => setOpen(false)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "15px 0",
            fontFamily: "var(--serif)",
            fontSize: 21,
            fontWeight: 400,
            color: "var(--ivory)",
            borderBottom: "1px solid rgba(168,137,92,.1)",
            transition: "color .2s"
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--brass)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--ivory)"}
        >
          Privacy Policy
        </a>
        <a href="#contact" onClick={() => setOpen(false)} style={{
          display: "block", marginTop: 32, padding: "14px 0", textAlign: "center",
          border: "1px solid var(--brass)", color: "var(--brass)",
          fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase"
        }}>Schedule Consultation</a>
        <div style={{ marginTop: "auto", paddingTop: 28 }}>
          <a href="tel:+14044237063" style={{ fontFamily: "var(--sans)", fontSize: 12, color: "rgba(247,244,238,.38)" }}>(404) 423-7063</a>
        </div>
      </div>
    </>
  );
}

// ── HERO ──
function Hero() {
  const w = useWindowWidth();
  const mob = w < 640;
  const tab = w >= 640 && w < 1024;

  return (
    <section style={{ position: "relative", minHeight: "100svh", background: "var(--deep)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80&auto=format')",
        backgroundSize: "cover", backgroundPosition: mob ? "72% center" : "center right",
        backgroundAttachment: mob ? "scroll" : "fixed",
        filter: "brightness(.34)"
      }} />
      {!mob && <div style={{ position: "absolute", top: 0, left: "clamp(18px,4vw,68px)", width: 1, height: "100%", background: "rgba(168,137,92,.16)" }} />}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "68%", background: "linear-gradient(to top, rgba(17,17,17,.99) 20%, transparent)" }} />

      <div style={{
        position: "relative", zIndex: 2, width: "100%", maxWidth: 1600, margin: "0 auto",
        padding: mob
          ? `92px 18px 64px`
          : `148px clamp(24px,5vw,92px) 96px`
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: mob ? 22 : 30 }}>
          <div style={{ width: 28, height: 1, background: "var(--brass)" }} />
          <span style={{ fontFamily: "var(--sans)", fontSize: 9, fontWeight: 600, letterSpacing: "0.22em", color: "var(--brass)", textTransform: "uppercase" }}>Atlanta, Georgia · Est. 2008</span>
        </div>

        <h1 style={{
          fontFamily: "var(--serif)",
          fontSize: mob
            ? "clamp(38px,11vw,54px)"
            : tab
              ? "clamp(56px,7vw,82px)"
              : "clamp(74px,6vw,120px)",
          fontWeight: 300, lineHeight: 1.07, color: "var(--ivory)",
          marginBottom: mob ? 18 : 26, letterSpacing: "-0.015em",
          maxWidth: mob ? "100%" : 900
        }}>
          Strategic Recovery.<br />
          <span style={{
            color: "var(--brass-l)",
            fontWeight: 400
          }}>
            Aggressive
          </span><br />
          Representation.
        </h1>

        <div style={{ width: 44, height: 1, background: "var(--brass)", marginBottom: mob ? 16 : 22 }} />

        <p style={{
          fontFamily: "var(--sans)",
          fontSize: mob ? 13 : 14,
          fontWeight: 300, lineHeight: 1.85,
          color: "rgba(247,244,238,.55)",
          maxWidth: mob ? "100%" : 620,
          marginBottom: mob ? 32 : 44,
          letterSpacing: "0.01em"
        }}>
          Trusted counsel for businesses and creditors across Georgia. We align litigation strategy with real-world recovery goals and deliver clear, timely communication at every stage.
        </p>

        <div style={{ display: "flex", flexDirection: mob ? "column" : "row", gap: mob ? 11 : 14, marginBottom: mob ? 36 : 52 }}>
          <a href="#contact" style={{
            display: "block", padding: mob ? "14px 20px" : "12px 32px",
            background: "var(--brass)", color: "var(--deep)", textAlign: "center",
            fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em",
            textTransform: "uppercase", transition: "opacity .22s"
          }} onMouseEnter={e => e.currentTarget.style.opacity = .84} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
            Schedule Consultation
          </a>
          <a href="#practice-areas" style={{
            display: "block", padding: mob ? "14px 20px" : "12px 32px",
            background: "transparent", color: "var(--ivory)", textAlign: "center",
            fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em",
            textTransform: "uppercase", border: "1px solid rgba(247,244,238,.22)", transition: "border-color .22s,color .22s"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--brass)"; e.currentTarget.style.color = "var(--brass)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(247,244,238,.22)"; e.currentTarget.style.color = "var(--ivory)"; }}
          >
            View Practice Areas
          </a>
        </div>

        <div style={{
          display: "flex", gap: mob ? 24 : 44,
          paddingTop: mob ? 22 : 28,
          borderTop: "1px solid rgba(168,137,92,.16)",
          flexWrap: "wrap"
        }}>
          {[["15+", "Years in Practice"], ["$50M+", "Recovered"], ["500+", "Cases Resolved"]].map(([n, l]) => (
            <div key={n}>
              <div style={{ fontFamily: "var(--serif)", fontSize: mob ? 26 : 34, fontWeight: 400, color: "var(--brass-l)", lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 9, fontWeight: 500, letterSpacing: "0.15em", color: "rgba(247,244,238,.38)", textTransform: "uppercase", marginTop: 5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ──
function About() {
  const [ref, inView] = useInView(0.07);
  const w = useWindowWidth();
  const mob = w < 768;

  const feats = [
    { title: "Business-First Strategy", desc: "Every strategy is calibrated to maximize recovery value while minimizing exposure, delay, and cost.", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=480&q=75&auto=format" },
    { title: "Trial-Ready", desc: "We prepare every matter as if it will proceed to trial — consistently producing better settlements and stronger outcomes.", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=480&q=75&auto=format" },
    { title: "Clear Communication", desc: "Direct, substantive updates at every stage. You will always know exactly where your matter stands.", img: "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=480&q=75&auto=format" },
  ];

  return (
    <section id="about" style={{ background: "var(--ivory)", padding: "clamp(56px,9vh,112px) clamp(18px,4vw,68px)" }} ref={ref}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <div className="about-intro-grid" style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: mob ? 22 : "clamp(36px,5vw,80px)", marginBottom: mob ? 40 : 64 }}>
          <div className={`rv-l ${inView ? "on" : ""}`}>
            <Eyebrow label="Our Firm" />
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(30px,5vw,52px)", fontWeight: 400, lineHeight: 1.1, color: "var(--charcoal)" }}>
              About Our <em style={{ fontStyle: "italic" }}>Firm</em>
            </h2>
          </div>
          <div className={`rv-r ${inView ? "on" : ""}`} style={{ display: "flex", alignItems: mob ? "flex-start" : "center" }}>
            <p style={{ fontFamily: "var(--sans)", fontSize: mob ? 13 : 14, fontWeight: 300, lineHeight: 1.9, color: "var(--slate)" }}>
              We provide strategic advice and trial-tested representation. Our team focuses on business disputes, collections litigation, asset recovery, employment issues, construction matters, and high-value creditor claims. Clients choose us for clear guidance, efficient execution, and results that hold up in the real world.
            </p>
          </div>
        </div>

        <div className="about-features" style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "repeat(3,1fr)", gap: "2px" }}>
          {feats.map((f, i) => (
            <div key={f.title} className={`rv d${i + 1} ${inView ? "on" : ""}`}
              style={{ background: "var(--deep)", overflow: "hidden", transition: "transform .38s ease" }}
              onMouseEnter={e => !mob && (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={e => !mob && (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ height: mob ? 168 : 200, backgroundImage: `url('${f.img}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(.43) sepia(.22)", backgroundAttachment: mob ? "scroll" : "fixed" }} />
              <div style={{ padding: mob ? "22px 18px 26px" : "26px 26px 30px" }}>
                <div style={{ width: 22, height: 1, background: "var(--brass)", marginBottom: 14 }} />
                <h3 style={{ fontFamily: "var(--serif)", fontSize: mob ? 19 : 21, fontWeight: 500, color: "var(--ivory)", marginBottom: 9 }}>{f.title}</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 300, lineHeight: 1.8, color: "rgba(247,244,238,.5)" }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRACTICE AREAS ──
function PracticeAreas() {
  const [ref, inView] = useInView(0.06);
  const w = useWindowWidth();
  const mob = w < 600;

  const practices = [
    { name: "Business Litigation", desc: "Commercial disputes, contract enforcement, breach of fiduciary duty, and multi-party litigation.", img: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=280&q=70&auto=format" },
    { name: "Debt Recovery", desc: "Strategic debt collection for creditors and financial institutions — judgment enforcement and creditor rights.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=280&q=70&auto=format" },
    { name: "Asset Recovery", desc: "Identification, freezing, and recovery of assets through domestic and international legal channels.", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=280&q=70&auto=format" },
    { name: "Commercial Collections", desc: "Systematic recovery of commercial accounts receivable through litigation and pre-litigation strategies.", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=280&q=70&auto=format" },
    { name: "Employment", desc: "Employer-side defense in discrimination, wrongful termination, wage disputes, and EEOC proceedings.", img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=280&q=70&auto=format" },
    { name: "Construction", desc: "Lien enforcement, contract disputes, defect claims, and subcontractor recovery.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=280&q=70&auto=format" },
    { name: "Estate Planning", desc: "Estate disputes, trust litigation, probate administration, and fiduciary representation.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=280&q=70&auto=format" },
    { name: "Personal Injury", desc: "High-value personal injury claims with a focus on maximum recovery through structured litigation.", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=280&q=70&auto=format" },
  ];

  return (
    <section id="practice-areas" style={{ background: "var(--deep)", padding: "clamp(56px,9vh,112px) clamp(18px,4vw,68px)" }} ref={ref}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <div className={`rv ${inView ? "on" : ""}`} style={{ marginBottom: mob ? 32 : 52 }}>
          <Eyebrow label="Capabilities" />
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,5vw,50px)", fontWeight: 400, color: "var(--ivory)", lineHeight: 1.1 }}>
            Practice <em style={{ fontStyle: "italic", color: "var(--brass-l)" }}>Areas</em>
          </h2>
        </div>

        <div className="practice-grid" style={{ display: "grid", gap: "1px", background: "rgba(168,137,92,.09)" }}>
          {practices.map((p, i) => (
            <div key={p.name} className={`rv d${(i % 4) + 1} ${inView ? "on" : ""}`}
              style={{ background: "var(--deep)", transition: "background .28s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#181818"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--deep)"}
            >
              <div className="pcard" style={{ display: "flex" }}>
                <div className="pcard-img" style={{ width: mob ? "100%" : 92, minWidth: mob ? "auto" : 92, height: mob ? 128 : 96, backgroundImage: `url('${p.img}')`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(.38) sepia(.18)", backgroundAttachment: mob ? "scroll" : "fixed" }} />
                <div className="pcard-body" style={{ padding: mob ? "18px 18px 22px" : "20px 26px", flex: 1, borderLeft: mob ? "none" : "1px solid rgba(168,137,92,.09)" }}>
                  <div style={{ width: 16, height: 1, background: "var(--brass)", marginBottom: 9, opacity: .7 }} />
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: mob ? 19 : 18, fontWeight: 500, color: "var(--ivory)", marginBottom: 6 }}>{p.name}</h3>
                  <p style={{ fontFamily: "var(--sans)", fontSize: 11.5, fontWeight: 300, lineHeight: 1.75, color: "rgba(247,244,238,.4)" }}>{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ATTORNEYS ──
function Attorneys() {
  const [ref, inView] = useInView(0.06);
  const w = useWindowWidth();
  const mob = w < 768;

  const atts = [
    { name: "Michael Anderson", title: "Partner & Founding Attorney", bio: "Michael leads the firm's commercial litigation and creditor rights practice. With over fifteen years of trial experience in Georgia state and federal courts, he has recovered significant judgments for lenders, businesses, and institutional clients across a broad range of commercial disputes.", focus: "Commercial Litigation · Creditor Rights · Asset Recovery", edu: "J.D., Emory University School of Law · B.A., University of Georgia", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=380&q=75&auto=format" },
    { name: "Sarah Tyson", title: "Partner & Litigation Attorney", bio: "Sarah focuses on complex business disputes, employment litigation, and construction claims. She is recognized for her methodical case preparation and her ability to achieve favorable resolutions at each stage — from pre-litigation negotiations through trial and appeal.", focus: "Business Disputes · Employment Defense · Construction", edu: "J.D., Georgia State University College of Law · B.B.A., University of Florida", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=380&q=75&auto=format" },
    { name: "Daniel Reeves", title: "Senior Associate", bio: "Daniel supports the firm's debt recovery and collections litigation practice. He manages high-volume commercial portfolio matters and specialized enforcement actions, bringing rigorous attention to detail and consistent communication across every matter he handles.", focus: "Debt Recovery · Collections Litigation · Judgment Enforcement", edu: "J.D., University of Georgia School of Law · B.S., Georgia Tech", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=380&q=75&auto=format" },
  ];

  return (
    <section id="attorneys" style={{ background: "#161616", padding: "clamp(56px,9vh,112px) clamp(18px,4vw,68px)" }} ref={ref}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <div className={`rv ${inView ? "on" : ""}`} style={{ marginBottom: mob ? 32 : 52 }}>
          <Eyebrow label="Our Team" />
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,5vw,50px)", fontWeight: 400, color: "var(--ivory)", lineHeight: 1.1 }}>The Attorneys</h2>
        </div>

        <div className="attorney-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: mob ? 20 : 18 }}>
          {atts.map((a, i) => (
            <div key={a.name} className={`rv d${i + 1} ${inView ? "on" : ""}`} style={{ background: "var(--deep)", overflow: "hidden" }}>
              <div style={{ position: "relative", height: mob ? 260 : 290, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${a.img}')`, backgroundSize: "cover", backgroundPosition: "center top", filter: "grayscale(22%) brightness(.8)", backgroundAttachment: mob ? "scroll" : "fixed" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 64, background: "linear-gradient(transparent,var(--deep))" }} />
              </div>
              <div style={{ padding: mob ? "18px 18px 22px" : "22px 22px 26px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: mob ? 21 : 21, fontWeight: 500, color: "var(--ivory)", marginBottom: 3 }}>{a.name}</h3>
                <div style={{ fontFamily: "var(--sans)", fontSize: 9.5, fontWeight: 600, letterSpacing: "0.12em", color: "var(--brass)", textTransform: "uppercase", marginBottom: 14 }}>{a.title}</div>
                <div style={{ width: 26, height: 1, background: "rgba(168,137,92,.32)", marginBottom: 12 }} />
                <p style={{ fontFamily: "var(--sans)", fontSize: 12, fontWeight: 300, lineHeight: 1.8, color: "rgba(247,244,238,.48)", marginBottom: 16 }}>{a.bio}</p>
                <div style={{ borderTop: "1px solid rgba(168,137,92,.1)", paddingTop: 13 }}>
                  <div style={{ fontFamily: "var(--sans)", fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", color: "var(--brass)", textTransform: "uppercase", marginBottom: 4 }}>Focus</div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 12.5, fontStyle: "italic", color: "rgba(247,244,238,.47)", marginBottom: 11 }}>{a.focus}</div>
                  <div style={{ fontFamily: "var(--sans)", fontSize: 9, fontWeight: 600, letterSpacing: "0.15em", color: "var(--brass)", textTransform: "uppercase", marginBottom: 4 }}>Education</div>
                  <div style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 300, color: "rgba(247,244,238,.38)", lineHeight: 1.65 }}>{a.edu}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── RESULTS ──
function Results() {
  const [ref, inView] = useInView(0.07);
  const w = useWindowWidth();
  const mob = w < 640;

  const results = [
    { amount: "$2.5M", label: "Settlement", desc: "Breach of contract and fraud claims on behalf of a commercial lender in a complex multi-defendant matter.", tag: "Commercial Litigation" },
    { amount: "Defense Verdict", label: "Jury Trial", desc: "Complete defense verdict obtained in a three-week jury trial involving employment discrimination claims.", tag: "Employment Defense" },
    { amount: "Injunction Granted", label: "Emergency Relief", desc: "Emergency TRO obtained to prevent dissipation of assets pending litigation proceedings.", tag: "Asset Recovery" },
    { amount: "$980K", label: "Commercial Recovery", desc: "Recovery of outstanding commercial debt for institutional creditor following aggressive collections litigation.", tag: "Debt Recovery" },
  ];

  return (
    <section id="results" style={{ background: "var(--ivory)", padding: "clamp(56px,9vh,112px) clamp(18px,4vw,68px)" }} ref={ref}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <div className={`rv ${inView ? "on" : ""}`} style={{ marginBottom: mob ? 32 : 52 }}>
          <Eyebrow label="Representative Matters" />
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,5vw,50px)", fontWeight: 400, color: "var(--charcoal)", lineHeight: 1.1 }}>Results</h2>
        </div>

        <div className="results-grid" style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1fr", gap: "1px", background: "var(--rule)", marginBottom: 28 }}>
          {results.map((r, i) => (
            <div key={r.label} className={`rv d${i + 1} ${inView ? "on" : ""}`} style={{ background: "var(--ivory)", padding: mob ? "28px 18px" : "40px 36px" }}>
              <div style={{ fontFamily: "var(--sans)", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", color: "var(--brass)", textTransform: "uppercase", marginBottom: 12 }}>{r.tag}</div>
              <div style={{ fontFamily: "var(--serif)", fontSize: mob ? "clamp(22px,6vw,34px)" : "clamp(26px,3vw,42px)", fontWeight: 400, color: "var(--charcoal)", lineHeight: 1.1, marginBottom: 5 }}>{r.amount}</div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 9.5, fontWeight: 600, letterSpacing: "0.15em", color: "var(--mid)", textTransform: "uppercase", marginBottom: 16 }}>{r.label}</div>
              <div style={{ width: 22, height: 1, background: "var(--brass)", marginBottom: 14 }} />
              <p style={{ fontFamily: "var(--sans)", fontSize: mob ? 12 : 13, fontWeight: 300, lineHeight: 1.8, color: "var(--slate)" }}>{r.desc}</p>
            </div>
          ))}
        </div>

        <div className={`rv ${inView ? "on" : ""}`} style={{ display: "flex", gap: 14, padding: "16px 0", borderTop: "1px solid var(--rule)", alignItems: "flex-start" }}>
          <div style={{ width: 1, height: 26, background: "rgba(168,137,92,.45)", flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 300, color: "var(--mid)", lineHeight: 1.7 }}>
            Past outcomes do not guarantee future results. Each matter is unique. Results depend on the specific facts, applicable law, and circumstances of each case.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ──
function Contact() {
  const [ref, inView] = useInView(0.07);
  const w = useWindowWidth();
  const mob = w < 768;

  return (
    <section id="contact" style={{ background: "var(--deep)", padding: "clamp(56px,9vh,112px) clamp(18px,4vw,68px)" }} ref={ref}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <div className={`rv ${inView ? "on" : ""}`} style={{ marginBottom: mob ? 32 : 52 }}>
          <Eyebrow label="Get In Touch" />
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,5vw,50px)", fontWeight: 400, color: "var(--ivory)", lineHeight: 1.1 }}>
            Contact <em style={{ fontStyle: "italic", color: "var(--brass-l)" }}>Our Firm</em>
          </h2>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: mob ? "1fr" : "1fr 1.3fr", gap: mob ? 36 : "clamp(36px,5vw,68px)" }}>
          {/* Details */}
          <div className={`rv-l ${inView ? "on" : ""}`}>
            {[
              { label: "Address", content: <a href="https://maps.google.com/?q=4488+Park+Lake+Drive+Suite+776+Atlanta+GA+30345" target="_blank" rel="noreferrer" style={{ fontFamily: "var(--serif)", fontSize: mob ? 18 : 20, color: "var(--ivory)", lineHeight: 1.6, display: "block", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--brass-l)"} onMouseLeave={e => e.currentTarget.style.color = "var(--ivory)"}>4488 Park Lake Drive, Suite 776<br />Atlanta, GA 30345</a> },
              {
                label: "Phone",
                content: (
                  <a
                    href="tel:+14044237063"
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: mob ? 28 : 30,
                      color: "var(--ivory)",
                      display: "block",
                      transition: "color .2s",
                      padding: "3px 0"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--brass-l)"}
                    onMouseLeave={e => e.currentTarget.style.color = "var(--ivory)"}
                  >
                    (404) 423-7063
                  </a>
                )
              },
              { label: "Email", content: <a href="mailto:contact@atnr-llp.com" style={{ fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: 300, color: "rgba(247,244,238,.62)", display: "block", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--brass-l)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(247,244,238,.62)"}>contact@atnr-llp.com</a> },
              { label: "Office Hours", content: <div style={{ fontFamily: "var(--sans)", fontSize: 13.5, fontWeight: 300, color: "rgba(247,244,238,.48)" }}>Monday – Friday, 9:00 am – 5:30 pm</div> },
            ].map(({ label, content }) => (
              <div key={label} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid rgba(168,137,92,.1)" }}>
                <div style={{ fontFamily: "var(--sans)", fontSize: 9, fontWeight: 600, letterSpacing: "0.2em", color: "var(--brass)", textTransform: "uppercase", marginBottom: 9 }}>{label}</div>
                {content}
              </div>
            ))}
            <a href="https://atnr-llp.com/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--sans)", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", color: "var(--brass)", textTransform: "uppercase", borderBottom: "1px solid rgba(168,137,92,.28)", paddingBottom: 3, transition: "border-color .2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "var(--brass)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(168,137,92,.28)"}>
              atnr-llp.com
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" /></svg>
            </a>
          </div>

          {/* Map */}
          <div
            className={`rv-r ${inView ? "on" : ""}`}
            style={{
              width: "100%",
              overflow: "hidden"
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.0!2d-84.3285!3d33.8501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a3c58c9c9f3f%3A0x1!2s4488+Park+Lake+Drive+Suite+776%2C+Atlanta%2C+GA+30345!5e0!3m2!1sen!2sus!4v1690000000000"
              width="100%" height={mob ? 240 : 380}
              style={{ border: "none", display: "block", filter: "grayscale(90%) brightness(.7) contrast(1.1)", maxWidth: "100%" }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="atnr Office Location"
            />
            <div style={{ padding: "13px 0", borderTop: "1px solid rgba(168,137,92,.1)" }}>
              <a href="https://maps.google.com/?q=4488+Park+Lake+Drive+Suite+776+Atlanta+GA+30345" target="_blank" rel="noreferrer"
                style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", color: "var(--brass)", textTransform: "uppercase" }}
              >Get Directions →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ──
function Footer() {
  const w = useWindowWidth();
  const mob = w < 600;
  const links = ["About", "Practice Areas", "Attorneys", "Results", "Contact", "Privacy Policy"];
  return (
    <footer style={{ background: "#0C0C0C", borderTop: "1px solid rgba(168,137,92,.1)", padding: "clamp(32px,5vh,52px) clamp(18px,4vw,68px) 26px" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap", gap: 24 }}>
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13 }}>
              <div style={{ width: 32, height: 32, border: "1px solid rgba(168,137,92,.4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: 15, fontWeight: 600, color: "var(--brass)" }}><img
                src="/logo.png"
                alt="ANDERSON TYSON NATIONAL RECOVERY"
                style={{
                  width: mob ? 30 : 42,
                  height: mob ? 30 : 42,
                  objectFit: "contain"
                }}
              /></div>
              <div>
                <div style={{ fontFamily: "var(--serif)", fontSize: mob ? 11.5 : 12.5, fontWeight: 500, color: "var(--ivory)", letterSpacing: "0.06em" }}>ANDERSON TYSON NATIONAL RECOVERY</div>
                <div style={{ fontFamily: "var(--sans)", fontSize: 9, fontWeight: 400, letterSpacing: "0.1em", color: "rgba(168,137,92,.6)", textTransform: "uppercase" }}>Debt & Trial Attorneys · Atlanta, GA</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 300, color: "rgba(247,244,238,.25)", lineHeight: 1.75 }}>
              Strategic litigation and debt recovery counsel for businesses and creditors across Georgia and the Southeast.
            </p>
          </div>
          <div className="footer-nav" style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {links.map(l => (
              <a key={l} href={l === "Privacy Policy"
                ? "/privacy-policy"
                : `#${l.toLowerCase().replace(/ /g, "-")}`
              }
                style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 500, letterSpacing: "0.15em", color: "rgba(247,244,238,.32)", textTransform: "uppercase", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--brass)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(247,244,238,.32)"}
              >{l}</a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingTop: 20, borderTop: "1px solid rgba(168,137,92,.07)", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 300, color: "rgba(247,244,238,.2)", letterSpacing: "0.03em" }}>
            © {new Date().getFullYear()} Anderson Tyson National Recovery, LLC. All rights reserved.
          </div>
          <div className="footer-disc" style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 300, color: "rgba(247,244,238,.16)", maxWidth: 480, textAlign: "right", lineHeight: 1.65 }}>
            Attorney Advertising. The information on this website does not constitute legal advice and no attorney-client relationship is formed by use of this site.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Attorneys />
        <Results />
        <Contact />
      </main>
      <Footer />
    </>
  );
}