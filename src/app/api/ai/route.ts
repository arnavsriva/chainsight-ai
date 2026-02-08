import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const key = process.env.HF_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Missing HF_API_KEY in frontend/.env.local" },
        { status: 500 }
      );
    }

    // ✅ Pick a solid instruct model (not gated)
    const model = "meta-llama/Meta-Llama-3-8B-Instruct";

    const url = "https://router.huggingface.co/v1/chat/completions";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    // IMPORTANT: Router sometimes returns non-JSON on errors; handle both
    const raw = await res.text();
    let data: any = null;
    try {
      data = JSON.parse(raw);
    } catch {
      // leave data as null
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: "HF Router error", details: data ?? raw },
        { status: 500 }
      );
    }

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json(
        { error: "No AI response", details: data ?? raw },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: text });
  } catch (e: any) {
    return NextResponse.json(
      { error: "AI route failed", details: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
