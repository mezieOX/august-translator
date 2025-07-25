import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, from, to } = await req.json();
    if (!text || !from || !to) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Translation API error" },
        { status: 500 }
      );
    }
    const data = await response.json();
    // The translation is in data[0][0][0]
    const translated = data[0]?.[0]?.[0] || "";
    return NextResponse.json({ translation: translated });
  } catch (error: unknown) {
    let message = "Translation failed";
    if (error && typeof error === "object" && "message" in error) {
      message = (error as { message?: string }).message || message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
