"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const LEGAL = {
  terms: {
    title: "Terms & Conditions",
    content:
      "All services are subject to availability and confirmation. Angel Oasis Spa reserves the right to modify services or pricing without prior notice. Customers are encouraged to arrive on time for appointments. By using our services, you agree to these terms."
  },
  privacy: {
    title: "Privacy Policy",
    content:
      "Angel Oasis Spa respects your privacy. Any personal information submitted through our website, including contact or booking details, will be used only for communication and service purposes. We do not share or sell customer information to third parties. By using our website, you agree to this policy."
  }
} as const;

type LegalKey = keyof typeof LEGAL;

export default function FooterLegal() {
  const [open, setOpen] = useState<LegalKey | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const item = open ? LEGAL[open] : null;

  const modal = (
    <div
      className={`legal-modal-overlay ${item ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={item ? "legal-modal-title" : undefined}
      aria-hidden={!item}
    >
      <div className="legal-modal-backdrop" onClick={close} aria-hidden />
      <div className="legal-modal-panel">
        <div className="call-header">
          <p className="eyebrow">{open ? (open === "terms" ? "Legal" : "Policy") : ""}</p>
          <button
            ref={closeRef}
            type="button"
            className="close"
            onClick={close}
          >
            Close
          </button>
        </div>
        {item && (
          <>
            <h3 id="legal-modal-title">{item.title}</h3>
            <p>{item.content}</p>
            <div className="call-actions">
              <button type="button" className="cta ghost" onClick={close}>
                Got it
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="footer-legal">
        <button
          type="button"
          className="footer-legal-link"
          onClick={() => setOpen("terms")}
        >
          Terms & Conditions
        </button>
        <span className="footer-legal-sep" aria-hidden>
          ·
        </span>
        <button
          type="button"
          className="footer-legal-link"
          onClick={() => setOpen("privacy")}
        >
          Privacy Policy
        </button>
      </div>
      {mounted ? createPortal(modal, document.body) : null}
    </>
  );
}
