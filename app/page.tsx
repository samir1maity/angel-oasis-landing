"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FooterLegal from "./components/FooterLegal";

export default function Home() {
  const [callOpen, setCallOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

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

  const scrollToAbout = () => {
    setMenuOpen(false);
    document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    setMenuOpen(false);
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBooking = () => {
    setMenuOpen(false);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", onClick: scrollToTop },
    { label: "About Us", onClick: scrollToAbout },
    { label: "Services", onClick: scrollToServices },
    { label: "Booking", onClick: scrollToBooking },
    { label: "Contacts", onClick: () => setMenuOpen(false) }
  ];

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
            {navItems.map((item) => (
              <button key={item.label} className="menu-link" onClick={item.onClick}>
                {item.label}
              </button>
            ))}
          </div>
          <button className="cta primary" onClick={() => { scrollToBooking(); setMenuOpen(false); }}>Book Appointment</button>
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
            {navItems.map((item) => (
              <button key={item.label} className="nav-link" onClick={item.onClick}>
                {item.label}
              </button>
            ))}
          </div>
          <p aria-label="Studio detail">
            {/* Kolkata Wellness Studio */}
          </p>
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
        id="about-us"
        className="section about-us reveal"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={slowStagger}
      >
        <div className="about-us-grid">
          <motion.div className="about-us-copy" variants={slowStagger}>
            <motion.p className="eyebrow" variants={fadeLeft}>Our Story</motion.p>
            <motion.h2 variants={fadeLeft}>About Us</motion.h2>
            <motion.p className="about-us-lead" variants={fadeUp}>
              Angel Oasis Spa is a wellness and relaxation destination located on Jessore Road, Bangur Avenue, West Bengal.
            </motion.p>
            <motion.p variants={fadeUp}>
              We provide a calm, hygienic, and comfortable environment designed to help clients relax, refresh, and rejuvenate their body and mind. Our personalized approach and soothing atmosphere make us an ideal choice for those seeking stress relief and wellness experiences in the local area.
            </motion.p>
            <motion.p className="about-us-cta-text" variants={fadeUp}>
              Contact us today to book your visit.
            </motion.p>
          </motion.div>
          <motion.div className="about-us-visual" variants={slowStagger}>
            {[
              { label: "Calm & Hygienic", desc: "Serene, spotless space" },
              { label: "Personalized Care", desc: "Tailored to you" },
              { label: "Wellness Focus", desc: "Mind & body renewal" }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="about-us-card"
                variants={fadeRight}
                whileHover={{ x: 8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="about-us-card-dot" style={{ animationDelay: `${i * 0.4}s` }} />
                <div>
                  <h4>{item.label}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
            <motion.div
              className="about-us-orb"
              variants={fadeUp}
              animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
          </motion.div>
        </div>
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
        id="services"
        className="section services-section reveal"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={slowStagger}
      >
        <motion.div className="section-head services-section-head" variants={fadeUp}>
          <p className="eyebrow">What We Offer</p>
          <h2>Services</h2>
        </motion.div>
        <motion.div
          className="services-grid"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
        >
          {[
            {
              title: "Relaxation Therapy",
              copy: "A soothing experience designed to ease tension, calm the mind, and promote overall relaxation in a peaceful environment."
            },
            {
              title: "Body Rejuvenation",
              copy: "A revitalizing session focused on refreshing your body and restoring comfort through calming wellness techniques."
            },
            {
              title: "Stress Relief Session",
              copy: "Ideal for reducing daily stress and restoring balance, helping you feel refreshed and re-energized."
            },
            {
              title: "Wellness Experience",
              copy: "A holistic relaxation session crafted to enhance comfort, calmness, and personal well-being."
            }
          ].map((item) => (
            <motion.article
              key={item.title}
              className="service-card"
              variants={fadeUp}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 320, damping: 22 }
              }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="service-card-icon" aria-hidden />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
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
        className="section booking-section"
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
          <button className="cta primary" onClick={scrollToBooking}>Join Angel Oasis</button>
        </motion.div>
      </motion.section>

      <motion.section
        id="booking"
        className="section book-appointment reveal"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slowStagger}
      >
        <motion.div className="book-appointment-inner" variants={fadeUp}>
          <div className="section-head book-appointment-head">
            <p className="eyebrow">Reserve your visit</p>
            <h2>Book Your Appointment</h2>
            <p>
              Fill out the form below and our team will contact you to confirm your session.
            </p>
          </div>
          {bookingSubmitted ? (
            <div className="booking-success book-appointment-success" role="status">
              <p>Thank you! We&apos;ll contact you shortly to confirm your booking.</p>
              <button
                type="button"
                className="cta primary"
                onClick={() => setBookingSubmitted(false)}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form className="booking-form book-appointment-form" onSubmit={handleBookingSubmit}>
              <div className="booking-field">
                <label htmlFor="landing-name">Name</label>
                <input
                  id="landing-name"
                  name="name"
                  type="text"
                  value={bookingForm.name}
                  onChange={handleBookingChange}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>
              <div className="booking-field">
                <label htmlFor="landing-phone">Phone Number</label>
                <input
                  id="landing-phone"
                  name="phone"
                  type="tel"
                  value={bookingForm.phone}
                  onChange={handleBookingChange}
                  required
                  autoComplete="tel"
                  placeholder="+91 0000000000"
                />
              </div>
              <div className="booking-row">
                <div className="booking-field">
                  <label htmlFor="landing-date">Preferred Date</label>
                  <input
                    id="landing-date"
                    name="preferredDate"
                    type="date"
                    value={bookingForm.preferredDate}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="booking-field">
                  <label htmlFor="landing-time">Preferred Time</label>
                  <input
                    id="landing-time"
                    name="preferredTime"
                    type="time"
                    value={bookingForm.preferredTime}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
              </div>
              <div className="booking-field">
                <label htmlFor="landing-message">Message</label>
                <textarea
                  id="landing-message"
                  name="message"
                  value={bookingForm.message}
                  onChange={handleBookingChange}
                  rows={4}
                  placeholder="Any special requests or notes..."
                />
              </div>
              <button type="submit" className="cta primary booking-submit">
                Request Booking
              </button>
            </form>
          )}
        </motion.div>
      </motion.section>

      <a
        className="whatsapp-fab"
        href="https://wa.me/919903300339?text=Hi%20Angel%20Oasis%20Spa%2C%20I%20would%20like%20to%20book%20an%20appointment."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <span className="whatsapp-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="img" focusable="false">
            <path
              fill="currentColor"
              d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.54 0 .24 5.3.24 11.82c0 2.08.54 4.11 1.57 5.9L0 24l6.46-1.69a11.76 11.76 0 0 0 5.6 1.43h.01c6.52 0 11.82-5.3 11.82-11.82 0-3.16-1.23-6.13-3.37-8.44Zm-8.46 18.2h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.83 1 1.02-3.73-.24-.38A9.83 9.83 0 0 1 2.1 11.8C2.1 6.42 6.48 2.04 11.86 2.04c2.6 0 5.05 1.01 6.89 2.85a9.67 9.67 0 0 1 2.85 6.9c0 5.4-4.38 9.89-9.84 9.89Zm5.42-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.16-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.57-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.2 3.07c.15.2 2.1 3.2 5.09 4.48.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
            />
          </svg>
        </span>
        <span className="whatsapp-label">WhatsApp</span>
      </a>

      <footer className="footer">
        <div className="footer-brand">
          <div>
            <p className="logo-name">Angel Oasis</p>
            <p className="logo-sub">Spa</p>
          </div>
          <nav className="footer-social" aria-label="Social media">
            <a href="https://www.facebook.com/angeloasisspa" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://instagram.com/angeloasisspa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a> */}
            {/* <a href="#" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a> */}
          </nav>
          <FooterLegal />
        </div>
        <div className="location-stats" aria-label="Location stats">
          <p>
            <span className="location-label">Address</span>
            <span>166 Jessore Road, Bangur Avenue, Kolkata 700055</span>
          </p>
          <p>
            <span className="location-label">Email</span>
            <span>hello.angeloasis@gmail.com</span>
          </p>
          <p>
            <span className="location-label">Phone</span>
            <span>+91 9903300339</span>
          </p>
        </div>
        <p className="footer-copyright">© 2026 Angel Oasis Spa</p>
      </footer>
    </div>
  );
}
