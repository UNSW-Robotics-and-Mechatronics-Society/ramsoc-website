"use client";

import { Container } from "@/components/ui/container";
import { useCallback, useEffect, useRef, useState } from "react";

const SYMBOLS = ["🤖", "⚙️", "🔧", "🔩", "💡", "🏆", "⚡"];

const TAUNTS_LOSS = [
  "The house always wins, baby!",
  "Better luck next time, champ.",
  "Oof. RAMSoc sends its condolences.",
  "Your wallet is crying.",
  "That's rough, buddy.",
  "Pain.",
  "Insert more fake coins to continue suffering.",
  "Have you considered a career in NOT gambling?",
  "The robots are laughing at you.",
  "L + ratio + no credits",
  "Down bad.",
  "You just funded a robot's college tuition.",
  "Skill issue.",
];

const TAUNTS_WIN = [
  "Let's GOOO!",
  "The machines have blessed you!",
  "You're basically a genius.",
  "Don't let it go to your head.",
  "Okay, calm down, it's fake money.",
  "Winner winner robot dinner!",
  "The algorithms smile upon you.",
  "Spend it wisely... or don't.",
  "Stonks!",
];

const TAUNTS_JACKPOT = [
  "HOLY CIRCUITS! JACKPOT!!!",
  "THE MACHINE IS BROKEN! (not really)",
  "SOMEONE CALL SECURITY!",
  "YOU ABSOLUTE LEGEND!",
  "MOM GET THE CAMERA!!!",
  "THE PROPHECY IS FULFILLED!",
];

/*
 * Fair-odds payout table — EV = 0 per spin.
 *
 * 7 symbols, 3 reels → 7³ = 343 total equally-likely outcomes.
 * Player pays 1 unit and receives payout × bet on a win.
 * For EV = 0 the sum of (payout × frequency) must equal 343.
 *
 *   Two-match (any 2 of 3 reels): 7 × C(3,2) × 6 = 126 outcomes × 2 = 252
 *   Three-match (all 3 reels):     7 outcomes, payouts sum to        =  91
 *   No match:                      210 outcomes × 0                  =   0
 *                                                              Total = 343 ✓
 */
const PAYOUTS: Record<
  string,
  { match: number; payout: number; label: string }[]
> = {
  "🏆": [{ match: 3, payout: 35, label: "JACKPOT" }],
  "🤖": [{ match: 3, payout: 20, label: "ROBOT BONUS" }],
  "⚡": [{ match: 3, payout: 12, label: "POWER SURGE" }],
  "💡": [{ match: 3, payout: 8, label: "BRIGHT IDEA" }],
  "⚙️": [{ match: 3, payout: 7, label: "GEAR UP" }],
  "🔧": [{ match: 3, payout: 5, label: "WRENCH IT" }],
  "🔩": [{ match: 3, payout: 4, label: "NUTS & BOLTS" }],
};

const ANY_TWO_PAYOUT = 2;

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function getRandomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]!;
}

function generateReelStrip(length: number) {
  return Array.from({ length }, () => getRandomSymbol());
}

function evaluateSpin(r1: string, r2: string, r3: string) {
  if (r1 === r2 && r2 === r3) {
    const payoutInfo = PAYOUTS[r1];
    if (payoutInfo?.[0]) {
      return {
        win: true,
        payout: payoutInfo[0].payout,
        label: payoutInfo[0].label,
      };
    }
  }
  if (r1 === r2 || r2 === r3 || r1 === r3) {
    return { win: true, payout: ANY_TWO_PAYOUT, label: "PARTIAL MATCH" };
  }
  return { win: false, payout: 0, label: "" };
}

/* ── Particle burst on wins ── */
function Particles({ intensity }: { intensity: "small" | "big" | "jackpot" }) {
  const count = intensity === "jackpot" ? 40 : intensity === "big" ? 20 : 10;
  const colors = [
    "bg-primary-300",
    "bg-primary-400",
    "bg-cyan-400",
    "bg-yellow-400",
    "bg-primary-200",
    "bg-white",
    "bg-sky-300",
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 1 + Math.random() * 1.5;
        const size =
          intensity === "jackpot"
            ? 8 + Math.random() * 8
            : 4 + Math.random() * 6;
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            className={`absolute rounded-full ${color}`}
            style={{
              left: `${left}%`,
              top: "50%",
              width: size,
              height: size,
              animation: `particle-fly ${duration}s ease-out ${delay}s forwards`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Streak fire effect ── */
function StreakFire({ streak }: { streak: number }) {
  if (streak < 2) return null;
  const flames = streak >= 5 ? "🔥🔥🔥" : streak >= 3 ? "🔥🔥" : "🔥";
  return (
    <div className="animate-bounce text-center text-2xl">
      {flames} {streak} WIN STREAK {flames}
    </div>
  );
}

/* ── Single Reel ── */
function Reel({
  spinning,
  finalSymbol,
  delay,
  onStop,
  won,
}: {
  spinning: boolean;
  finalSymbol: string;
  delay: number;
  onStop: () => void;
  won: boolean;
}) {
  const [displaySymbol, setDisplaySymbol] = useState(finalSymbol);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (spinning) {
      setIsAnimating(true);
      const strip = generateReelStrip(20);
      let idx = 0;

      intervalRef.current = setInterval(() => {
        setDisplaySymbol(strip[idx % strip.length]!);
        idx++;
      }, 70);

      timeoutRef.current = setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplaySymbol(finalSymbol);
        setIsAnimating(false);
        onStop();
      }, 1000 + delay);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning, finalSymbol, delay]);

  return (
    <div
      className={`relative flex h-28 w-28 items-center justify-center rounded-xl border-4 text-5xl transition-all duration-300 sm:h-36 sm:w-36 sm:text-7xl ${
        isAnimating
          ? "border-primary-400 bg-linear-to-b from-primary-50 to-primary-100 shadow-[0_0_20px_rgba(51,102,255,0.6)]"
          : won
            ? "border-yellow-400 bg-linear-to-b from-primary-50 to-yellow-50 shadow-[0_0_25px_rgba(250,204,21,0.5)]"
            : "border-primary-300/60 bg-linear-to-b from-white to-primary-50 shadow-lg"
      }`}
    >
      {isAnimating && (
        <div className="absolute inset-0 animate-spin rounded-xl border-2 border-dashed border-primary-300/50" />
      )}
      <span
        className={`transition-transform duration-200 ${isAnimating ? "scale-90 blur-[2px]" : won ? "scale-110" : ""}`}
      >
        {displaySymbol}
      </span>
    </div>
  );
}

/* ── Main Page ── */
export default function GamblingPage() {
  const [credits, setCredits] = useState(100);
  const [bet, setBet] = useState(5);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{
    win: boolean;
    payout: number;
    label: string;
  } | null>(null);
  const [reels, setReels] = useState([
    getRandomSymbol(),
    getRandomSymbol(),
    getRandomSymbol(),
  ]);
  const [stoppedCount, setStoppedCount] = useState(0);
  const [showPaytable, setShowPaytable] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [taunt, setTaunt] = useState("");
  const [winStreak, setWinStreak] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [totalSpins, setTotalSpins] = useState(0);
  const [biggestWin, setBiggestWin] = useState(0);
  const [autoSpin, setAutoSpin] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState(0);
  const autoSpinRef = useRef(false);
  const spinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSpin = useCallback(() => {
    if (spinning || credits < bet) {
      if (autoSpinRef.current) {
        autoSpinRef.current = false;
        setAutoSpin(false);
      }
      return;
    }

    setCredits((prev) => prev - bet);
    setResult(null);
    setStoppedCount(0);
    setSpinCount((prev) => prev + 1);
    setTotalSpins((prev) => prev + 1);
    setTaunt("");

    const newReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    setReels(newReels);
    setSpinning(true);
  }, [spinning, credits, bet]);

  // Evaluate result when all reels stop
  useEffect(() => {
    if (spinning && stoppedCount === 3) {
      const evalResult = evaluateSpin(reels[0]!, reels[1]!, reels[2]!);
      setResult(evalResult);
      const winAmount = evalResult.payout * bet;

      if (evalResult.win) {
        setCredits((prev) => prev + winAmount);
        setTotalWins((prev) => prev + 1);
        setWinStreak((prev) => prev + 1);
        if (winAmount > biggestWin) setBiggestWin(winAmount);

        if (evalResult.label === "JACKPOT") {
          setTaunt(pickRandom(TAUNTS_JACKPOT));
        } else {
          setTaunt(pickRandom(TAUNTS_WIN));
        }
      } else {
        setWinStreak(0);
        setTaunt(pickRandom(TAUNTS_LOSS));
      }
      setSpinning(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stoppedCount, spinning, reels, bet]);

  // Auto-spin: trigger next spin after result settles
  useEffect(() => {
    if (autoSpinRef.current && !spinning && result !== null) {
      spinTimeoutRef.current = setTimeout(() => {
        setAutoSpinCount((prev) => prev + 1);
        handleSpin();
      }, 800);
    }
    return () => {
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    };
  }, [spinning, result, handleSpin]);

  const handleReelStop = useCallback(() => {
    setStoppedCount((prev) => prev + 1);
  }, []);

  const toggleAutoSpin = () => {
    if (autoSpin) {
      autoSpinRef.current = false;
      setAutoSpin(false);
      if (spinTimeoutRef.current) clearTimeout(spinTimeoutRef.current);
    } else {
      autoSpinRef.current = true;
      setAutoSpin(true);
      setAutoSpinCount(0);
      if (!spinning) handleSpin();
    }
  };

  const isJackpot = result?.label === "JACKPOT";
  const isBigWin = result?.win && (result.payout ?? 0) >= 10;
  const isBroke = credits <= 0 && !spinning;

  // Stop auto-spin if broke
  useEffect(() => {
    if (isBroke && autoSpin) {
      autoSpinRef.current = false;
      setAutoSpin(false);
    }
  }, [isBroke, autoSpin]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-primary-950 via-primary-900 to-primary-950 pt-28">
      {/* Animated background glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary-500/10 blur-3xl" />
        <div
          className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-primary-400/10 blur-3xl"
          style={{ animation: "pulse 3s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
          style={{ animation: "pulse 4s ease-in-out infinite 0.5s" }}
        />
      </div>

      {/* Particle animation keyframes */}
      <style jsx>{`
        @keyframes particle-fly {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-200px)
              translateX(
                ${Math.random() > 0.5 ? "" : "-"}${40 + Math.random() * 80}px
              )
              scale(0);
          }
        }
        @keyframes neon-flicker {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          25%,
          75% {
            opacity: 0.9;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes ramsoc-border {
          0% {
            border-color: #3366ff;
            box-shadow: 0 0 30px #3366ff66;
          }
          25% {
            border-color: #5c8aff;
            box-shadow: 0 0 40px #5c8aff66;
          }
          50% {
            border-color: #eab308;
            box-shadow: 0 0 40px #eab30866;
          }
          75% {
            border-color: #8aadff;
            box-shadow: 0 0 40px #8aadff66;
          }
          100% {
            border-color: #3366ff;
            box-shadow: 0 0 30px #3366ff66;
          }
        }
      `}</style>

      {/* Header */}
      <section className="relative z-10 pb-2 pt-12 text-center">
        <Container>
          <h1
            className="mb-1 bg-linear-to-r from-primary-200 via-white to-primary-200 bg-clip-text text-4xl font-bold text-transparent drop-shadow-lg md:text-5xl"
            style={{ animation: "neon-flicker 2s ease-in-out infinite" }}
          >
            RAMSoc Slots
          </h1>
          <p className="text-sm text-primary-300/70">
            A mock mini-game for fun only — no real money involved!
          </p>
        </Container>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 pb-2 pt-2">
        <Container>
          <div className="mx-auto flex max-w-lg justify-center gap-4 text-center text-xs">
            <div className="rounded-lg bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-primary-300">Spins</span>{" "}
              <span className="font-bold text-white">{totalSpins}</span>
            </div>
            <div className="rounded-lg bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-green-400">Wins</span>{" "}
              <span className="font-bold text-white">{totalWins}</span>
            </div>
            <div className="rounded-lg bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-yellow-400">Best</span>{" "}
              <span className="font-bold text-white">{biggestWin}</span>
            </div>
            <div className="rounded-lg bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-primary-200">Rate</span>{" "}
              <span className="font-bold text-white">
                {totalSpins > 0
                  ? `${Math.round((totalWins / totalSpins) * 100)}%`
                  : "-"}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Machine */}
      <section className="relative z-10 py-4">
        <Container>
          <div className="mx-auto max-w-lg">
            {/* Credits & bet display */}
            <div className="mb-5 flex items-center justify-between rounded-2xl border border-primary-400/20 bg-white/5 px-6 py-3 backdrop-blur-md">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-primary-300">
                  Credits
                </div>
                <div
                  className={`text-3xl font-black transition-colors ${credits > 50 ? "text-green-400" : credits > 20 ? "text-yellow-400" : "text-red-400"}`}
                >
                  {credits}
                </div>
              </div>
              <div>
                <StreakFire streak={winStreak} />
              </div>
              <div className="text-right">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-primary-300">
                  Bet
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setBet((prev) => Math.max(1, prev - 1))}
                    disabled={spinning || bet <= 1}
                    className="rounded-lg bg-primary-700/50 px-2.5 py-0.5 text-sm font-bold text-white transition-all hover:bg-primary-600/50 hover:shadow-lg hover:shadow-primary-500/20 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="min-w-[2.5ch] text-center text-3xl font-black text-yellow-400">
                    {bet}
                  </span>
                  <button
                    onClick={() =>
                      setBet((prev) => Math.min(credits, prev + 1))
                    }
                    disabled={spinning || bet >= credits}
                    className="rounded-lg bg-primary-700/50 px-2.5 py-0.5 text-sm font-bold text-white transition-all hover:bg-primary-600/50 hover:shadow-lg hover:shadow-primary-500/20 disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Slot machine body */}
            <div
              className={`relative rounded-3xl border-2 p-6 transition-all duration-700 sm:p-8 ${
                isJackpot
                  ? "border-yellow-400 bg-linear-to-b from-yellow-900/20 via-primary-900/60 to-primary-950/80"
                  : isBigWin
                    ? "border-primary-300 bg-linear-to-b from-primary-800/40 via-primary-900/60 to-primary-950/80 shadow-[0_0_30px_rgba(51,102,255,0.3)]"
                    : result?.win
                      ? "border-primary-400/60 bg-linear-to-b from-primary-800/20 via-primary-900/60 to-primary-950/80"
                      : "border-primary-600/30 bg-primary-900/60"
              }`}
              style={
                isJackpot
                  ? {
                      animation: "ramsoc-border 2s linear infinite",
                      backgroundSize: "200% 200%",
                    }
                  : undefined
              }
            >
              {/* Win particles */}
              {result?.win && !spinning && (
                <Particles
                  intensity={
                    isJackpot ? "jackpot" : isBigWin ? "big" : "small"
                  }
                />
              )}

              {/* Reels */}
              <div
                className="mb-5 flex justify-center gap-3 sm:gap-5"
                style={{ animation: "float 3s ease-in-out infinite" }}
              >
                {reels.map((symbol, i) => (
                  <Reel
                    key={`${spinCount}-${i}`}
                    spinning={spinning}
                    finalSymbol={symbol}
                    delay={i * 400}
                    onStop={handleReelStop}
                    won={!spinning && !!result?.win}
                  />
                ))}
              </div>

              {/* Result + taunt display */}
              <div className="mb-5 flex min-h-20 items-center justify-center">
                {result && (
                  <div
                    className={`text-center ${isJackpot ? "animate-bounce" : ""}`}
                  >
                    {result.win ? (
                      <>
                        <div
                          className={`text-2xl font-black tracking-wide ${
                            isJackpot
                              ? "bg-linear-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent"
                              : isBigWin
                                ? "text-primary-200"
                                : "text-primary-300"
                          }`}
                        >
                          {result.label}!
                        </div>
                        <div className="mt-1 text-lg text-primary-100">
                          Won{" "}
                          <span className="font-black text-yellow-400">
                            +{result.payout * bet}
                          </span>{" "}
                          credits
                        </div>
                      </>
                    ) : (
                      <div className="text-lg text-primary-400/70">
                        No match...
                      </div>
                    )}
                    <div
                      className={`mt-1 text-sm italic ${result.win ? "text-primary-200/80" : "text-primary-500/60"}`}
                    >
                      {taunt}
                    </div>
                  </div>
                )}
                {spinning && (
                  <div className="text-xl font-black tracking-widest text-primary-200">
                    SPINNING...
                  </div>
                )}
              </div>

              {/* Buttons row */}
              <div className="flex gap-3">
                {/* Spin button */}
                <button
                  onClick={handleSpin}
                  disabled={spinning || credits < bet || autoSpin}
                  className={`flex-1 rounded-2xl py-4 text-xl font-black uppercase tracking-widest transition-all duration-200 ${
                    spinning || credits < bet || autoSpin
                      ? "cursor-not-allowed bg-primary-800/50 text-primary-600"
                      : "bg-linear-to-r from-primary-500 via-primary-400 to-primary-500 text-white shadow-[0_0_30px_rgba(51,102,255,0.4)] hover:from-primary-400 hover:via-primary-300 hover:to-primary-400 hover:shadow-[0_0_50px_rgba(51,102,255,0.6)] active:scale-[0.97]"
                  }`}
                >
                  {spinning ? "..." : isBroke ? "Broke!" : "Spin"}
                </button>

                {/* Auto-spin button */}
                <button
                  onClick={toggleAutoSpin}
                  disabled={isBroke && !autoSpin}
                  className={`rounded-2xl px-5 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                    autoSpin
                      ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:bg-red-400"
                      : "border-2 border-primary-500/30 bg-primary-800/30 text-primary-300 hover:border-primary-400/50 hover:bg-primary-700/40 hover:text-white disabled:opacity-30"
                  }`}
                >
                  {autoSpin ? (
                    <span>
                      Stop
                      <br />
                      <span className="text-[10px] font-normal opacity-70">
                        ({autoSpinCount})
                      </span>
                    </span>
                  ) : (
                    "Auto"
                  )}
                </button>
              </div>

              {/* Reset button when broke */}
              {isBroke && (
                <button
                  onClick={() => {
                    setCredits(100);
                    setResult(null);
                    setTaunt("");
                    setWinStreak(0);
                  }}
                  className="mt-3 w-full rounded-2xl border-2 border-dashed border-primary-400/40 py-3 text-sm font-semibold text-primary-200 transition-all hover:border-primary-300/60 hover:bg-primary-800/30 hover:text-white"
                >
                  Feed the machine 100 more credits (it&apos;s free, it&apos;s
                  fake)
                </button>
              )}
            </div>

            {/* Paytable toggle */}
            <div className="mt-5">
              <button
                onClick={() => setShowPaytable((prev) => !prev)}
                className="w-full rounded-xl bg-white/5 py-2 text-sm text-primary-300 transition-all hover:bg-white/10 hover:text-primary-100"
              >
                {showPaytable ? "Hide" : "Show"} Paytable
              </button>

              {showPaytable && (
                <div className="mt-3 rounded-2xl border border-primary-500/20 bg-white/5 p-4 backdrop-blur-md">
                  <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-widest text-yellow-400">
                    Payouts (per 1 credit bet)
                  </h3>
                  <div className="space-y-2">
                    {SYMBOLS.map((symbol) => {
                      const info = PAYOUTS[symbol]?.[0];
                      if (!info) return null;
                      return (
                        <div
                          key={symbol}
                          className="flex items-center justify-between rounded-xl bg-primary-900/40 px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {symbol} {symbol} {symbol}
                            </span>
                            <span className="text-xs text-primary-300">
                              {info.label}
                            </span>
                          </div>
                          <span className="font-black text-yellow-400">
                            x{info.payout}
                          </span>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between rounded-xl bg-primary-900/40 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">?? ??</span>
                        <span className="text-xs text-primary-300">
                          ANY TWO MATCH
                        </span>
                      </div>
                      <span className="font-black text-yellow-400">
                        x{ANY_TWO_PAYOUT}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <p className="mt-5 text-center text-xs text-primary-600/60">
              This is a mock game for entertainment purposes only. No real
              currency is used. RAMSoc does not condone or promote real gambling.
              Please gamble responsibly.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
