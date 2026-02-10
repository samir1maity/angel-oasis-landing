"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [callOpen, setCallOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        root.style.setProperty("--scrollY", `${window.scrollY}`);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };

  const slowStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="page">
      <div className={`menu-overlay ${menuOpen ? "open" : ""}`}>
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="menu-panel" role="dialog" aria-modal="true">
          <div className="menu-header">
            <div className="logo">
              <div className="logo-mark" />
              <div>
                <p className="logo-name">Angel Oasis</p>
                <p className="logo-sub">Spa</p>
              </div>
            </div>
            <button className="close" onClick={() => setMenuOpen(false)}>
              Close
            </button>
          </div>
          <div className="menu-links">
            {["Home", "About Us", "Services", "Contacts"].map((item) => (
              <button key={item} className="menu-link">
                {item}
              </button>
            ))}
          </div>
          <button className="cta primary">Free Consultation</button>
        </div>
      </div>
      <div className={`call-overlay ${callOpen ? "open" : ""}`}>
        <div className="call-backdrop" onClick={() => setCallOpen(false)} />
        <div className="call-panel" role="dialog" aria-modal="true">
          <div className="call-header">
            <p className="eyebrow">Instant Call</p>
            <button className="close" onClick={() => setCallOpen(false)}>
              Close
            </button>
          </div>
          <h3>Talk to Angel Oasis Spa</h3>
          <p>
            Our concierge is ready to guide you through treatments, pricing, and
            appointment times.
          </p>
          <div className="call-actions">
            <a className="cta primary" href="tel:9903300339">
              Call Now
            </a>
            <button className="cta ghost" onClick={() => setCallOpen(false)}>
              Maybe Later
            </button>
          </div>
        </div>
      </div>
      <header className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="topbar">
          <div className="topbar-left">Premises No.4, 4th Floor, 166 Jessore Road, Bangur Avenue – 700055, W.B, India</div>
          <div className="topbar-center">hello.angeloasis@gmail.com</div>
          <div className="topbar-right">+91 9903300339</div>
        </div>

        <div className="mobile-logo" aria-label="Angel Oasis">
          <div className="logo-mark" />
        </div>

        <nav className="nav">
          <div className="logo">
            <div className="logo-mark" />
            <div>
              <p className="logo-name">Angel Oasis</p>
              <p className="logo-sub">Spa</p>
            </div>
          </div>
          <div className="nav-links">
            {["Home", "About Us", "Services", "Contacts"].map((item) => (
              <button key={item} className="nav-link">
                {item}
              </button>
            ))}
          </div>
          <button className="pill">Contact Us</button>
        </nav>

        <motion.button
          className="fab"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="fab-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </motion.button>

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={slowStagger}
        >
          <motion.div className="hero-text" variants={fadeLeft}>
            <p className="eyebrow">Welcome to Angel Oasis Spa</p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Health &amp;
              <span>Relaxation</span>
            </motion.h1>
            <motion.div className="hero-actions" variants={fadeUp}>
              <motion.button
                className="cta primary"
                onClick={() => setCallOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-floating-badge"
            variants={fadeRight}
            whileHover={{ scale: 1.03 }}
          >
            <p className="eyebrow">Today’s Ritual</p>
            <h3>Golden Calm</h3>
            <p>Signature aromatherapy + warm stone release.</p>
          </motion.div>
        </motion.div>

        {/* <div className="hero-dots">
          <span className="dot active" />
          <span className="dot" />
          <span className="dot" />
        </div> */}
      </header>

      <motion.section
        className="tiles"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slowStagger}
      >
        <motion.article
          className="tile her"
          variants={fadeUp}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="tile-overlay" />
          <p>
            for <span>HER</span>
          </p>
        </motion.article>
        <motion.article
          className="tile him"
          variants={fadeUp}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="tile-overlay" />
          <p>
            for <span>HIM</span>
          </p>
        </motion.article>
        <motion.article
          className="tile couples"
          variants={fadeUp}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="tile-overlay" />
          <p>
            for <span>COUPLES</span>
          </p>
        </motion.article>
      </motion.section>

      <motion.section
        className="section highlights"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slowStagger}
      >
        <motion.div className="section-head" variants={fadeUp}>
          <p className="eyebrow">Angel Oasis Rituals</p>
          <h2>Modern Healing, Timeless Calm</h2>
          <p>
            Crafted experiences blending aromatherapy, hydrotherapy, and restorative
            touch. Every ritual is guided by golden oils, warm stone therapy, and
            curated music.
          </p>
        </motion.div>
        <motion.div className="highlight-grid" variants={slowStagger}>
          {[
            {
              title: "Aura Reset",
              copy: "Sound bath + warm stone ritual designed to melt tension."
            },
            {
              title: "Golden Glow",
              copy: "Botanical polish, honey wrap, and mineral hydration veil."
            },
            {
              title: "Serene Flow",
              copy: "Slow massage rhythms with essential oil layering."
            },
            {
              title: "Velvet Skin",
              copy: "Deep cleanse, micro-exfoliation, and cooling jade finish."
            }
          ].map((item) => (
            <motion.article
              key={item.title}
              className="highlight-card"
              variants={fadeUp}
              whileHover={{ y: -10, rotateX: 4, rotateY: -4 }}
            >
              <div className="spark" />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <button className="text-link">Explore</button>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="section sanctuary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slowStagger}
      >
        <div className="sanctuary-grid">
          <motion.div className="sanctuary-copy" variants={fadeLeft}>
            <p className="eyebrow">The Sanctuary</p>
            <h2>Float in a Golden Oasis</h2>
            <p>
              Step into a luminous retreat with curated scents, warm lighting, and
              soothing soundscapes. Every ritual is tailored to your rhythm.
            </p>
            <div className="stat-row">
              <div>
                <p className="stat">12K+</p>
                <p className="stat-label">Happy Guests</p>
              </div>
              <div>
                <p className="stat">27</p>
                <p className="stat-label">Signature Rituals</p>
              </div>
              <div>
                <p className="stat">4.9</p>
                <p className="stat-label">Average Rating</p>
              </div>
            </div>
          </motion.div>
          <motion.div className="sanctuary-card" variants={fadeRight}>
            <div className="orb" />
            <h3>Evening Bliss</h3>
            <p>Sunset treatments with warm oils and candlelight therapy.</p>
            <button className="cta ghost">Reserve a Slot</button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="section journey"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slowStagger}
      >
        <motion.div className="section-head" variants={fadeUp}>
          <p className="eyebrow">Your Journey</p>
          <h2>Flow Through Every Step</h2>
        </motion.div>
        <motion.div className="timeline" variants={slowStagger}>
          {[
            {
              step: "01",
              title: "Arrival Ritual",
              copy: "Herbal welcome tea and aromatic cleansing."
            },
            {
              step: "02",
              title: "Immersion",
              copy: "Steam therapy and soft lighting resets."
            },
            {
              step: "03",
              title: "Release",
              copy: "Targeted massage with golden oils."
            },
            {
              step: "04",
              title: "Restore",
              copy: "Hydration elixirs and calm lounge."
            }
          ].map((item) => (
            <motion.article key={item.step} className="timeline-card" variants={fadeUp}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="section gallery"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slowStagger}
      >
        <motion.div className="section-head" variants={fadeUp}>
          <p className="eyebrow">Experience</p>
          <h2>Golden Moments</h2>
        </motion.div>
        <motion.div className="gallery-grid" variants={slowStagger}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              className={`gallery-card g${item}`}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
            >
              <div className="gallery-glow" />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="section booking"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slowStagger}
      >
        <motion.div className="booking-panel" variants={fadeUp}>
          <div>
            <p className="eyebrow">Membership</p>
            <h2>Glow All Year</h2>
            <p>
              Priority access, exclusive rituals, and personalized wellness
              consultations.
            </p>
          </div>
          <button className="cta primary">Join Angel Oasis</button>
        </motion.div>
      </motion.section>

      <footer className="footer">
        <div>
          <p className="logo-name">Angel Oasis</p>
          <p className="logo-sub">Spa</p>
        </div>
        <p>© 2026 Angel Oasis Spa. Crafted for immersive calm.</p>
      </footer>
    </div>
  );
}
