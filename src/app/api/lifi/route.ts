import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const fromChain = searchParams.get("fromChain") || "1";
    const toChain = searchParams.get("toChain") || "137";
    const fromToken = searchParams.get("fromToken") || "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    const toToken = searchParams.get("toToken") || "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";
    const amount = searchParams.get("amount") || "100000000000000000";

    const fromAddress =
        searchParams.get("fromAddress") ||
        "0x000000000000000000000000000000000000dead";

    const url =
        `https://li.quest/v1/quote` +
        `?fromChain=${fromChain}` +
        `&toChain=${toChain}` +
        `&fromToken=${fromToken}` +
        `&toToken=${toToken}` +
        `&fromAmount=${amount}` +
        `&fromAddress=${fromAddress}`;


    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();

    return NextResponse.json(json);
  } catch (e: any) {
    return NextResponse.json(
      { error: "LI.FI fetch failed", details: String(e) },
      { status: 500 }
    );
  }
}
