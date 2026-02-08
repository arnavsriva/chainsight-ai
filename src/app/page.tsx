export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-100">
      {/* Background cover */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/brand/cover.png)" }}
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-6 py-16">
        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            src="/brand/logo.png"
            alt="ChainSight AI Logo"
            className="h-12 w-12 rounded-xl border border-slate-700 bg-slate-900 p-1"
          />
          <div>
            <h1 className="text-3xl font-bold">ChainSight AI</h1>
            <p className="text-slate-300">
              AI-powered DeFi risk + bridge analytics using{" "}
              <span className="text-slate-100 font-medium">Uniswap</span> &{" "}
              <span className="text-slate-100 font-medium">LI.FI</span>
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
          <h2 className="text-xl font-semibold">
            Understand a pool. Choose the safest route. In seconds.
          </h2>
          <p className="mt-2 text-slate-300">
            ChainSight AI pulls live on-chain Uniswap V3 pool signals and live
            LI.FI routing quotes, then summarizes risk + action steps in a
            simple, trader-friendly way.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/pool"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-700"
            >
              Analyze Uniswap Pools →
            </a>
            <a
              href="/route"
              className="rounded-xl border border-slate-700 bg-slate-900/40 px-5 py-3 text-sm font-semibold hover:bg-slate-900/70"
            >
              Optimize LI.FI Route →
            </a>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <a
            href="/pool"
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:bg-slate-900/70"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Uniswap Pool Analyzer</h3>
              <span className="text-xs text-slate-300 rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1">
                On-chain
              </span>
            </div>
            <p className="mt-2 text-slate-300">
              Live fee tier, liquidity, tick, and sqrtPriceX96 from Uniswap V3
              contracts.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Use-case: detect risky conditions (thin liquidity / volatile ticks)
              before LPing or trading.
            </p>
          </a>

          <a
            href="/route"
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:bg-slate-900/70"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">LI.FI Route Optimizer</h3>
              <span className="text-xs text-slate-300 rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1">
                Cross-chain
              </span>
            </div>
            <p className="mt-2 text-slate-300">
              Fetch a real swap/bridge quote with fees, gas, and estimated
              execution time.
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Use-case: reduce bridge cost + avoid slow/expensive routes.
            </p>
          </a>
        </div>

        {/* Why it matters */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
          <h3 className="text-lg font-semibold">Why this matters</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-400">
                Risk
              </div>
              <div className="mt-2 text-slate-200">
                Don’t LP or trade blind—see live pool signals.
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-400">
                Cost
              </div>
              <div className="mt-2 text-slate-200">
                Choose routes with lower fees + better execution time.
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-400">
                Clarity
              </div>
              <div className="mt-2 text-slate-200">
                AI summaries turn complex data into action steps.
              </div>
            </div>
          </div>
        </div>

        {/* Hackathon MVP (clean list, no icons) */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold">Hackathon MVP</h3>
            <span className="text-xs text-slate-300 rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1">
              Live demo + open-source
            </span>
          </div>

          <ul className="mt-4 space-y-2 text-slate-300">
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span>Real Uniswap V3 pool stats (on-chain)</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span>Real LI.FI routing quote (fees + ETA)</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span>AI risk & strategy summary (LLM-powered)</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
              <span>Deployed live + public repo for judging</span>
            </li>
          </ul>

          <div className="mt-4 text-xs text-slate-400">
            Sponsors used: <span className="text-slate-200">Uniswap</span>{" "}
            (pool contract reads) +{" "}
            <span className="text-slate-200">LI.FI</span> (quote/routing).
          </div>
        </div>

        {/* Footer (upgraded) */}
        <footer className="mt-12 border-t border-slate-800/60 pt-6 text-sm text-slate-400">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              Built for <span className="text-slate-200">ETHGlobal ETHMoney</span>{" "}
              — <span className="text-slate-200">ChainSight AI</span> (v0.1)
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                className="hover:text-slate-200 underline underline-offset-4"
                href="/pool"
              >
                Uniswap Analyzer
              </a>
              <a
                className="hover:text-slate-200 underline underline-offset-4"
                href="/route"
              >
                LI.FI Optimizer
              </a>
              <a
                className="hover:text-slate-200 underline underline-offset-4"
                href="https://github.com/arnavsriva/chainsight-ai"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
