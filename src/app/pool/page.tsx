"use client";

import { useEffect, useState } from "react";

type Pool = {
  id: string;
  token0: { symbol: string };
  token1: { symbol: string };
  feeTier: string;
  liquidity: string;
  tick: number;
  sqrtPriceX96: string;
};

type AISummaryState = {
  loading: boolean;
  text: string;
  error: string;
};

export default function PoolPage() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // AI summary per pool (keyed by pool id)
  const [aiByPool, setAiByPool] = useState<Record<string, AISummaryState>>({});

  useEffect(() => {
    fetch("/api/uniswap")
      .then(async (res) => {
        const json = await res.json();

        if (!res.ok) {
          setError(json?.error || "Failed to fetch pools");
          setPools([]);
          setLoading(false);
          return;
        }

        if (Array.isArray(json)) {
          setPools(json);
          setError("");
        } else {
          setPools([]);
          setError("Unexpected API response shape");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error calling /api/uniswap");
        setPools([]);
        setLoading(false);
      });
  }, []);

  async function generateSummary(pool: Pool) {
    const poolId = pool.id;

    setAiByPool((prev) => ({
      ...prev,
      [poolId]: { loading: true, text: "", error: "" },
    }));

    const prompt = `
You are a DeFi risk analyst. Analyze this Uniswap V3 pool snapshot and produce a concise, practical summary.

Pool:
- Pair: ${pool.token0.symbol}/${pool.token1.symbol}
- Fee tier: ${pool.feeTier}
- Liquidity (raw uint128): ${pool.liquidity}
- Tick: ${pool.tick}
- sqrtPriceX96: ${pool.sqrtPriceX96}

Output format (use these headings):
1) Risk Level (Low/Medium/High) + 1-line reason
2) What this tells us (2-3 bullets)
3) LP Guidance (2 bullets)
4) Trader Notes (2 bullets)
5) Red Flags to watch (2 bullets)

Keep it plain English. No disclaimers.`;

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const json = await res.json();

      if (!res.ok) {
        setAiByPool((prev) => ({
          ...prev,
          [poolId]: {
            loading: false,
            text: "",
            error: json?.error || "AI request failed",
          },
        }));
        return;
      }

      setAiByPool((prev) => ({
        ...prev,
        [poolId]: { loading: false, text: json?.result || "", error: "" },
      }));
    } catch {
      setAiByPool((prev) => ({
        ...prev,
        [poolId]: { loading: false, text: "", error: "Network error calling /api/ai" },
      }));
    }
  }

  function clearSummary(poolId: string) {
    setAiByPool((prev) => ({
      ...prev,
      [poolId]: { loading: false, text: "", error: "" },
    }));
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Uniswap Pool Analyzer</h1>
            <p className="text-slate-300">
              Live on-chain pool metrics (Uniswap V3 contracts via public RPC).
            </p>
          </div>

          <a
            href="/"
            className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-2 text-sm hover:bg-slate-900/70"
          >
            ← Back
          </a>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/30 p-5">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1">
              Source: Ethereum Mainnet (Public RPC)
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1">
              Metrics: fee, liquidity, tick, sqrtPriceX96
            </span>
            <span className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1">
              AI: Gemini summary via /api/ai
            </span>
          </div>
        </div>

        {loading && <p className="mt-6 text-slate-300">Loading pools...</p>}

        {!loading && error && (
          <div className="mt-6 rounded-xl border border-red-900/40 bg-red-950/30 p-4 text-red-200">
            <div className="font-semibold">Error</div>
            <div className="mt-1 text-sm">{error}</div>
            <div className="mt-2 text-xs text-red-200/80">
              Tip: open <code>/api/uniswap</code> to see the raw response.
            </div>
          </div>
        )}

        {!loading && !error && pools.length === 0 && (
          <p className="mt-6 text-slate-300">
            No pool data returned. Check <code>/api/uniswap</code>.
          </p>
        )}

        <div className="mt-6 grid gap-4">
          {pools.map((p) => {
            const aiState = aiByPool[p.id] || { loading: false, text: "", error: "" };

            return (
              <div
                key={p.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold">
                    {p.token0.symbol}/{p.token1.symbol}
                  </h2>
                  <span className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-xs text-slate-200">
                    Fee tier: {p.feeTier}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-400">
                      Liquidity
                    </div>
                    <div className="mt-1 text-lg font-semibold">{p.liquidity}</div>
                    <div className="mt-1 text-xs text-slate-400">
                      Raw Uniswap V3 liquidity value (uint128).
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-400">
                      Tick
                    </div>
                    <div className="mt-1 text-lg font-semibold">{p.tick}</div>
                    <div className="mt-1 text-xs text-slate-400">
                      Current tick from slot0 (price state).
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-slate-400 break-all">Pool: {p.id}</div>
                <div className="mt-2 text-xs text-slate-400 break-all">
                  sqrtPriceX96: {p.sqrtPriceX96}
                </div>

                {/* AI actions */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => generateSummary(p)}
                    disabled={aiState.loading}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {aiState.loading ? "Analyzing..." : "Generate AI Summary"}
                  </button>

                  {(aiState.text || aiState.error) && (
                    <button
                      onClick={() => clearSummary(p.id)}
                      className="rounded-lg border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm font-medium hover:bg-slate-900/70"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* AI output */}
                {aiState.error && (
                  <div className="mt-3 rounded-xl border border-red-900/40 bg-red-950/30 p-4 text-sm text-red-200">
                    {aiState.error}
                  </div>
                )}

                {aiState.text && (
                  <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/60 p-4 text-sm text-slate-200 whitespace-pre-wrap">
                    {aiState.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
