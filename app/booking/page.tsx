"use client";

import { useState } from "react";
import Link from "next/link";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <Link href="/" className="booking-back">
          ← Back to home
        </Link>
        <div className="booking-card">
          <header className="booking-header">
            <p className="booking-eyebrow">Form Heading</p>
            <h1 className="booking-title">Book Your Appointment</h1>
            <p className="booking-intro">
              Fill out the form below and our team will contact you to confirm your session.
            </p>
          </header>

          {submitted ? (
            <div className="booking-success" role="status">
              <p>Thank you! We&apos;ll contact you shortly to confirm your booking.</p>
              <button
                type="button"
                className="cta primary"
                onClick={() => setSubmitted(false)}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="booking-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>
              <div className="booking-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  placeholder="+91 0000000000"
                />
              </div>
              <div className="booking-row">
                <div className="booking-field">
                  <label htmlFor="preferredDate">Preferred Date</label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={form.preferredDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="booking-field">
                  <label htmlFor="preferredTime">Preferred Time</label>
                  <input
                    id="preferredTime"
                    name="preferredTime"
                    type="time"
                    value={form.preferredTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="booking-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any special requests or notes..."
                />
              </div>
              <button type="submit" className="cta primary booking-submit">
                Request Booking
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
