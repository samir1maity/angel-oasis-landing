import { NextResponse } from "next/server";

type BookingPayload = {
  name?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
};

const REQUIRED_FIELDS: Array<keyof BookingPayload> = [
  "name",
  "phone",
  "preferredDate",
  "preferredTime"
];

function normalizeValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const apiUrl =
    process.env.BOOK_NOW_API_URL ?? process.env.NEXT_PUBLIC_BOOK_NOW_API_URL;

  console.log("[api/booking] request received", {
    hasApiUrl: Boolean(apiUrl)
  });

  if (!apiUrl) {
    console.error("[api/booking] Missing booking API URL");
    return NextResponse.json(
      { error: "Booking service is not configured." },
      { status: 500 }
    );
  }

  let payload: BookingPayload;

  try {
    payload = (await request.json()) as BookingPayload;
  } catch (error) {
    console.error("[api/booking] Invalid JSON payload", error);
    return NextResponse.json(
      { error: "Invalid booking request payload." },
      { status: 400 }
    );
  }

  const booking = {
    name: normalizeValue(payload.name),
    phone: normalizeValue(payload.phone),
    preferredDate: normalizeValue(payload.preferredDate),
    preferredTime: normalizeValue(payload.preferredTime),
    message: normalizeValue(payload.message)
  };

  console.log("[api/booking] payload normalized", booking);

  const missingField = REQUIRED_FIELDS.find((field) => !booking[field]);

  if (missingField) {
    console.error("[api/booking] Missing required field", { missingField });
    return NextResponse.json(
      { error: `Missing required field: ${missingField}` },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking),
      cache: "no-store"
    });

    const contentType = response.headers.get("content-type") ?? "";
    const responseBody = contentType.includes("application/json")
      ? await response.json().catch(() => null)
      : await response.text().catch(() => "");

    console.log("[api/booking] upstream response", {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      contentType,
      responseBody
    });

    if (!response.ok) {
      const upstreamError =
        typeof responseBody === "object" &&
        responseBody !== null &&
        "error" in responseBody &&
        typeof responseBody.error === "string"
          ? responseBody.error
          : typeof responseBody === "string" && responseBody.trim()
            ? responseBody.trim()
            : "Unable to submit your booking request.";

      return NextResponse.json({ error: upstreamError }, { status: 502 });
    }

    if (
      typeof responseBody === "object" &&
      responseBody !== null &&
      "success" in responseBody &&
      responseBody.success === false
    ) {
      const upstreamError =
        "error" in responseBody && typeof responseBody.error === "string"
          ? responseBody.error
          : "Unable to submit your booking request.";

      return NextResponse.json({ error: upstreamError }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/booking] Upstream request failed", error);
    return NextResponse.json(
      { error: "Unable to submit your booking request right now." },
      { status: 502 }
    );
  }
}
