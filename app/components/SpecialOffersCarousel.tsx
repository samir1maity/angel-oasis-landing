"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OFFERS = [
  {
    id: 1,
    badge: "Limited time",
    title: "First Visit Wellness",
    description: "20% off your first full-body massage. Experience our signature oils and serene setting.",
    cta: "Book now"
  },
  {
    id: 2,
    badge: "Popular",
    title: "Couples Retreat",
    description: "Side-by-side aromatherapy and warm stone therapy. Perfect for a relaxing escape together.",
    cta: "Reserve"
  },
  {
    id: 3,
    badge: "New",
    title: "Golden Glow Package",
    description: "Botanical polish, honey wrap & mineral hydration. Save 15% when you bundle.",
    cta: "Learn more"
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.92,
    filter: "blur(8px)"
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.92,
    filter: "blur(8px)",
    transition: { duration: 0.35 }
  })
};

const cardContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.4, ease: "easeOut" }
  })
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const headItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function SpecialOffersCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }, [index]);

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % OFFERS.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + OFFERS.length) % OFFERS.length);
  }, []);

  const AUTOPLAY_MS = 5000;

  useEffect(() => {
    const t = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [goNext]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / AUTOPLAY_MS, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(frame);
    };
    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [index]);

  const offer = OFFERS[index];

  return (
    <motion.section
      className="special-offers"
      aria-label="Special offers carousel"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div className="carousel-container" variants={sectionVariants}>
        <motion.div className="carousel-head" variants={sectionVariants}>
          <motion.p className="eyebrow" variants={headItemVariants}>Special Offers</motion.p>
          <motion.h2 variants={headItemVariants}>Treat Yourself</motion.h2>
        </motion.div>

        <motion.div className="carousel-wrapper" variants={headItemVariants}>
          <motion.button
            type="button"
            className="carousel-btn carousel-btn-prev"
            onClick={goPrev}
            aria-label="Previous offer"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <div className="carousel-track">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.article
                key={offer.id}
                className="carousel-card"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <motion.span
                  className="carousel-card-badge carousel-card-badge-pulse"
                  variants={cardContentVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                >
                  {offer.badge}
                </motion.span>
                <motion.h3 variants={cardContentVariants} custom={1} initial="hidden" animate="visible">
                  {offer.title}
                </motion.h3>
                <motion.p variants={cardContentVariants} custom={2} initial="hidden" animate="visible">
                  {offer.description}
                </motion.p>
                <motion.button
                  type="button"
                  className="carousel-card-cta"
                  variants={cardContentVariants}
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  {offer.cta}
                </motion.button>
              </motion.article>
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            className="carousel-btn carousel-btn-next"
            onClick={goNext}
            aria-label="Next offer"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </motion.div>

        <div className="carousel-dots-wrap">
          <motion.div
            className="carousel-dots"
            role="tablist"
            aria-label="Offer slides"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            {OFFERS.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to offer ${i + 1}`}
                className={`carousel-dot ${i === index ? "active" : ""}`}
                onClick={() => goTo(i)}
                variants={headItemVariants}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={i === index ? { scale: 1.2 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
            ))}
          </motion.div>
          <div className="carousel-progress-track" aria-hidden>
            <motion.div
              className="carousel-progress-fill"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.15, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
