import { NextResponse } from "next/server";
import { ethers } from "ethers";

const RPC_URL = "https://1rpc.io/eth";
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Minimal ABIs
const POOL_ABI = [
  "function token0() view returns (address)",
  "function token1() view returns (address)",
  "function fee() view returns (uint24)",
  "function liquidity() view returns (uint128)",
  "function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16, uint16, uint16, uint8, bool)",
];

const ERC20_ABI = ["function symbol() view returns (string)"];

// ✅ Only 2 pools for stability (still strong demo)
const POOLS = [
  "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640", // WETH/USDC 0.05%
  "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed", // WBTC/WETH 0.3%
].map((a) => ethers.getAddress(a));

export const revalidate = 60; // cache for 60s (reduces RPC hits)

export async function GET() {
  try {
    const results = [];

    // ✅ sequential (prevents batch rate-limit)
    for (const poolAddress of POOLS) {
      const pool = new ethers.Contract(poolAddress, POOL_ABI, provider);

      const token0Addr = await pool.token0();
      const token1Addr = await pool.token1();
      const fee = await pool.fee();
      const liquidity = await pool.liquidity();
      const slot0 = await pool.slot0();

      const token0 = new ethers.Contract(token0Addr, ERC20_ABI, provider);
      const token1 = new ethers.Contract(token1Addr, ERC20_ABI, provider);

      const sym0 = await token0.symbol();
      const sym1 = await token1.symbol();

      results.push({
        id: poolAddress,
        token0: { symbol: sym0 },
        token1: { symbol: sym1 },
        feeTier: String(fee),
        liquidity: liquidity.toString(),
        tick: Number(slot0[1]),
        sqrtPriceX96: slot0[0].toString(),
      });
    }

    return NextResponse.json(results);
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to fetch Uniswap on-chain data", details: String(e?.message ?? e) },
      { status: 500 }
    );
  }
}
