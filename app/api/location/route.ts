import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabaseClient";

export const runtime = "nodejs";

interface LocationBody {
  latitude?: unknown;
  longitude?: unknown;
  address?: unknown;
}

function isValidCoordinate(lat: unknown, lon: unknown): lat is number {
  return (
    typeof lat === "number" &&
    typeof lon === "number" &&
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
}

export async function POST(req: NextRequest) {
  let body: LocationBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { latitude, longitude, address } = body;

  if (!isValidCoordinate(latitude, longitude)) {
    return NextResponse.json({ error: "Invalid coordinates." }, { status: 400 });
  }

  // Store only the minimum required fields, plus a server-generated timestamp.
  // No IP, device, or user-identifying data is captured here.
  const record = {
    latitude,
    longitude,
    address: typeof address === "string" ? address.slice(0, 300) : null,
    created_at: new Date().toISOString(),
  };

  try {
    const supabase = getServerSupabase();
    const { error } = await supabase.from("birthday_locations").insert(record);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { error: "Could not save location right now." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Location API error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}

// Only POST is supported — no way to list or read back stored locations
// through this public endpoint.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
