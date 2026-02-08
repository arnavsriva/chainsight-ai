"use client";

import { useState } from "react";

export default function RoutePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  async function fetchRoute() {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/lifi");
      const json = await res.json();

      if (!res.ok) {
        setError(json?.error || "Failed to fetch route");
        return;
      }

      setData(json);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">LI.FI Route Optimizer</h1>

          <a
            href="/"
            className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-2 text-sm hover:bg-slate-900/70"
          >
            ← Back
          </a>
        </div>

        <p className="mt-2 text-slate-300">
          Find the best cross-chain route with fees, gas, and ETA.
        </p>

        <button
          onClick={fetchRoute}
          disabled={loading}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Fetching..." : "Find Best Route"}
        </button>

        {error && (
          <div className="mt-4 rounded-xl border border-red-900/40 bg-red-950/30 p-4 text-red-200">
            {error}
          </div>
        )}

        {data && (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
            <div>
              <span className="text-slate-400">Bridge:</span>{" "}
              <span className="font-semibold">{data.tool}</span>
            </div>

            <div>
              <span className="text-slate-400">Estimated Time:</span>{" "}
              {data.estimate?.executionDuration}s
            </div>

            <div>
              <span className="text-slate-400">From:</span>{" "}
              {data.action?.fromToken?.symbol} (Chain{" "}
              {data.action?.fromChainId})
            </div>

            <div>
              <span className="text-slate-400">To:</span>{" "}
              {data.action?.toToken?.symbol} (Chain{" "}
              {data.action?.toChainId})
            </div>

            <div>
              <span className="text-slate-400">Slippage:</span>{" "}
              {data.action?.slippage * 100}%
            </div>

            <div>
              <span className="text-slate-400">Gas Cost:</span>{" "}
              {data.gasCosts?.[0]?.amountUSD} USD
            </div>

            <div>
              <span className="text-slate-400">Total Fee:</span>{" "}
              {data.feeCosts?.[0]?.amountUSD} USD
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
