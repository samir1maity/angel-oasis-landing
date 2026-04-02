"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type FormState = {
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const initialFormState: FormState = {
  name: "",
  phone: "",
  preferredDate: "",
  preferredTime: "",
  message: ""
};

export default function BookingPage() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState("");
  const isSubmitting = status === "submitting";
  const isSubmitted = status === "success";
  const apiUrl = process.env.NEXT_PUBLIC_BOOK_NOW_API_URL;

  useEffect(() => {
    console.log("[booking] page mounted", {
      hasApiUrl: Boolean(apiUrl),
      apiUrl
    });
  }, [apiUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("[booking] field changed", {
      name: e.target.name,
      value: e.target.value
    });

    if (status === "error") {
      setError("");
      setStatus("idle");
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setStatus("submitting");

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      preferredDate: form.preferredDate,
      preferredTime: form.preferredTime,
      message: form.message.trim()
    };

    console.log("[booking] submit triggered", {
      payload,
      hasApiUrl: Boolean(apiUrl),
      currentStatus: status
    });

    if (!apiUrl) {
      console.error("[booking] Missing NEXT_PUBLIC_BOOK_NOW_API_URL");
      setStatus("error");
      setError("Booking service is not configured. Add NEXT_PUBLIC_BOOK_NOW_API_URL.");
      return;
    }

    try {
      console.log("[booking] submitting request", {
        apiUrl,
        payload
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get("content-type") ?? "";
      const responseHeaders = Object.fromEntries(response.headers.entries());
      const data = contentType.includes("application/json")
        ? await response.json().catch(() => null)
        : await response.text().catch(() => "");

      console.log("[booking] response received", {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        contentType,
        headers: responseHeaders,
        data
      });

      if (!response.ok) {
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : typeof data === "string" && data.trim()
              ? data.trim()
              : "Unable to submit your booking request.";

        throw new Error(message);
      }

      if (
        typeof data === "object" &&
        data !== null &&
        "success" in data &&
        data.success === false
      ) {
        throw new Error(
          "error" in data && typeof data.error === "string"
            ? data.error
            : "Unable to submit your booking request."
        );
      }

      console.log("[booking] request completed successfully");
      setStatus("success");
      setForm(initialFormState);
    } catch (err) {
      console.error("[booking] request failed", {
        error: err,
        message: err instanceof Error ? err.message : "Unknown error",
        name: err instanceof Error ? err.name : "UnknownError",
        stack: err instanceof Error ? err.stack : undefined
      });
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setError("");
    setForm(initialFormState);
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

          {isSubmitted ? (
            <div className="booking-success" role="status">
              <p>Thank you! We&apos;ll contact you shortly to confirm your booking.</p>
              <button
                type="button"
                className="cta primary"
                onClick={handleReset}
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit} aria-busy={isSubmitting}>
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>
              <p className="booking-helper" aria-live="polite">
                {isSubmitting ? "Submitting your booking request..." : "All fields marked above help us confirm your appointment faster."}
              </p>
              {error ? (
                <p role="alert" className="booking-error">
                  {error}
                </p>
              ) : null}
              <button type="submit" className="cta primary booking-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="booking-spinner" aria-hidden="true" />
                    Sending request...
                  </>
                ) : (
                  "Request Booking"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
