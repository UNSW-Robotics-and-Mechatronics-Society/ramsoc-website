"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SYMBOLS = ["\u{1F916}", "\u2699\uFE0F", "\u{1F527}", "\u{1F529}", "\u{1F4A1}", "\u{1F3C6}", "\u26A1"];

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

const PAYOUTS: Record<
  string,
  { match: number; payout: number; label: string }[]
> = {
  "\u{1F3C6}": [{ match: 3, payout: 35, label: "JACKPOT" }],
  "\u{1F916}": [{ match: 3, payout: 20, label: "ROBOT BONUS" }],
  "\u26A1": [{ match: 3, payout: 12, label: "POWER SURGE" }],
  "\u{1F4A1}": [{ match: 3, payout: 8, label: "BRIGHT IDEA" }],
  "\u2699\uFE0F": [{ match: 3, payout: 7, label: "GEAR UP" }],
  "\u{1F527}": [{ match: 3, payout: 5, label: "WRENCH IT" }],
  "\u{1F529}": [{ match: 3, payout: 4, label: "NUTS & BOLTS" }],
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
            className={`absolute ${color}`}
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

function StreakFire({ streak }: { streak: number }) {
  if (streak < 2) return null;
  const flames =
    streak >= 5
      ? "\u{1F525}\u{1F525}\u{1F525}"
      : streak >= 3
        ? "\u{1F525}\u{1F525}"
        : "\u{1F525}";
  return (
    <div className="text-center text-lg font-black tracking-[0.2em] text-yellow-400 uppercase animate-bounce">
      {flames} {streak} STREAK {flames}
    </div>
  );
}

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
      className={`relative flex h-28 w-28 items-center justify-center border-2 text-5xl transition-all duration-300 sm:h-36 sm:w-36 sm:text-7xl ${
        isAnimating
          ? "border-primary-400 bg-white/10 shadow-[0_0_20px_rgba(41,171,226,0.4)]"
          : won
            ? "border-yellow-400 bg-yellow-400/10 shadow-[0_0_25px_rgba(250,204,21,0.3)]"
            : "border-white/10 bg-white/5"
      }`}
    >
      {isAnimating && (
        <div className="absolute inset-0 animate-spin border-2 border-dashed border-primary-400/30" />
      )}
      <span
        className={`transition-transform duration-200 ${isAnimating ? "scale-90 blur-[2px]" : won ? "scale-110" : ""}`}
      >
        {displaySymbol}
      </span>
    </div>
  );
}

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

  useEffect(() => {
    if (isBroke && autoSpin) {
      autoSpinRef.current = false;
      setAutoSpin(false);
    }
  }, [isBroke, autoSpin]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030a18]">
      {/* Decorative lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[25%] h-full w-px bg-white/5" />
        <div className="absolute top-0 left-[75%] h-full w-px bg-white/5" />
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
            border-color: rgb(41 171 226);
            box-shadow: 0 0 30px rgb(41 171 226 / 0.4);
          }
          50% {
            border-color: rgb(250 204 21);
            box-shadow: 0 0 40px rgb(250 204 21 / 0.4);
          }
          100% {
            border-color: rgb(41 171 226);
            box-shadow: 0 0 30px rgb(41 171 226 / 0.4);
          }
        }
      `}</style>

      {/* ── Header ── */}
      <section className="relative z-10 pt-40 pb-4 text-center">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
            // Mini Game
          </span>
          <h1
            className="mb-2 text-5xl font-bold text-white md:text-6xl lg:text-7xl"
            style={{ animation: "neon-flicker 2s ease-in-out infinite" }}
          >
            RAMSoc <span className="text-primary-400">Slots</span>
          </h1>
          <p className="text-sm text-white/30">
            A mock mini-game for fun only &mdash; no real money involved!
          </p>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="relative z-10 py-4">
        <div className="mx-auto max-w-lg px-6">
          <div className="grid grid-cols-4 gap-px bg-white/8">
            <div className="bg-[#030a18] px-3 py-2 text-center">
              <div className="text-[0.6rem] font-bold tracking-[0.2em] text-white/20 uppercase">
                Spins
              </div>
              <div className="text-sm font-black text-white">{totalSpins}</div>
            </div>
            <div className="bg-[#030a18] px-3 py-2 text-center">
              <div className="text-[0.6rem] font-bold tracking-[0.2em] text-green-400/60 uppercase">
                Wins
              </div>
              <div className="text-sm font-black text-white">{totalWins}</div>
            </div>
            <div className="bg-[#030a18] px-3 py-2 text-center">
              <div className="text-[0.6rem] font-bold tracking-[0.2em] text-yellow-400/60 uppercase">
                Best
              </div>
              <div className="text-sm font-black text-white">{biggestWin}</div>
            </div>
            <div className="bg-[#030a18] px-3 py-2 text-center">
              <div className="text-[0.6rem] font-bold tracking-[0.2em] text-primary-400/60 uppercase">
                Rate
              </div>
              <div className="text-sm font-black text-white">
                {totalSpins > 0
                  ? `${Math.round((totalWins / totalSpins) * 100)}%`
                  : "-"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Machine ── */}
      <section className="relative z-10 py-8">
        <div className="mx-auto max-w-lg px-6">
          {/* Credits & bet display */}
          <div className="mb-6 flex items-center justify-between border border-white/8 bg-white/5 px-6 py-4">
            <div>
              <div className="text-[0.6rem] font-bold tracking-[0.2em] text-white/30 uppercase">
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
              <div className="text-[0.6rem] font-bold tracking-[0.2em] text-white/30 uppercase">
                Bet
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBet((prev) => Math.max(1, prev - 1))}
                  disabled={spinning || bet <= 1}
                  className="border border-white/10 bg-white/5 px-2.5 py-0.5 text-sm font-bold text-white transition-all hover:border-primary-500/30 hover:bg-white/10 disabled:opacity-30"
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
                  className="border border-white/10 bg-white/5 px-2.5 py-0.5 text-sm font-bold text-white transition-all hover:border-primary-500/30 hover:bg-white/10 disabled:opacity-30"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Slot machine body */}
          <div
            className={`relative border-2 p-6 transition-all duration-700 sm:p-8 ${
              isJackpot
                ? "border-yellow-400 bg-yellow-400/5"
                : isBigWin
                  ? "border-primary-400 bg-primary-400/5 shadow-[0_0_30px_rgba(41,171,226,0.2)]"
                  : result?.win
                    ? "border-primary-500/40 bg-primary-500/5"
                    : "border-white/8 bg-white/3"
            }`}
            style={
              isJackpot
                ? {
                    animation: "ramsoc-border 2s linear infinite",
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
              className="mb-6 flex justify-center gap-3 sm:gap-5"
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
            <div className="mb-6 flex min-h-20 items-center justify-center">
              {result && (
                <div
                  className={`text-center ${isJackpot ? "animate-bounce" : ""}`}
                >
                  {result.win ? (
                    <>
                      <div
                        className={`text-xl font-black tracking-[0.15em] uppercase ${
                          isJackpot
                            ? "text-yellow-400"
                            : isBigWin
                              ? "text-primary-300"
                              : "text-primary-400"
                        }`}
                      >
                        {result.label}!
                      </div>
                      <div className="mt-1 text-base text-white/60">
                        Won{" "}
                        <span className="font-black text-yellow-400">
                          +{result.payout * bet}
                        </span>{" "}
                        credits
                      </div>
                    </>
                  ) : (
                    <div className="text-base text-white/30">No match...</div>
                  )}
                  <div
                    className={`mt-1 text-sm italic ${result.win ? "text-white/40" : "text-white/20"}`}
                  >
                    {taunt}
                  </div>
                </div>
              )}
              {spinning && (
                <div className="text-lg font-black tracking-[0.3em] text-primary-400 uppercase">
                  Spinning...
                </div>
              )}
            </div>

            {/* Buttons row */}
            <div className="flex gap-3">
              <button
                onClick={handleSpin}
                disabled={spinning || credits < bet || autoSpin}
                className={`flex-1 py-4 text-sm font-black tracking-[0.2em] uppercase transition-all duration-200 ${
                  spinning || credits < bet || autoSpin
                    ? "cursor-not-allowed border border-white/5 bg-white/3 text-white/20"
                    : "bg-primary-500 text-white shadow-[0_0_30px_rgba(41,171,226,0.3)] hover:bg-primary-400 hover:shadow-[0_0_50px_rgba(41,171,226,0.4)] active:scale-[0.97]"
                }`}
              >
                {spinning ? "..." : isBroke ? "Broke!" : "Spin"}
              </button>

              <button
                onClick={toggleAutoSpin}
                disabled={isBroke && !autoSpin}
                className={`px-5 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-200 ${
                  autoSpin
                    ? "bg-red-500 text-white hover:bg-red-400"
                    : "border border-white/10 bg-white/5 text-white/40 hover:border-primary-500/30 hover:text-white disabled:opacity-30"
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
                className="mt-4 w-full border border-dashed border-white/10 py-3 text-xs font-bold tracking-[0.15em] text-white/40 uppercase transition-all hover:border-primary-500/30 hover:bg-white/5 hover:text-white"
              >
                Feed the machine 100 more credits
              </button>
            )}
          </div>

          {/* Paytable toggle */}
          <div className="mt-6">
            <button
              onClick={() => setShowPaytable((prev) => !prev)}
              className="w-full border border-white/8 bg-white/3 py-3 text-xs font-bold tracking-[0.2em] text-white/30 uppercase transition-all hover:bg-white/5 hover:text-white/60"
            >
              {showPaytable ? "Hide" : "Show"} Paytable
            </button>

            {showPaytable && (
              <div className="mt-3 border border-white/8 bg-white/3 p-5">
                <h3 className="mb-4 text-center text-xs font-bold tracking-[0.3em] text-yellow-400 uppercase">
                  Payouts (per 1 credit bet)
                </h3>
                <div className="space-y-1">
                  {SYMBOLS.map((symbol) => {
                    const info = PAYOUTS[symbol]?.[0];
                    if (!info) return null;
                    return (
                      <div
                        key={symbol}
                        className="flex items-center justify-between border-b border-white/5 px-3 py-2 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {symbol} {symbol} {symbol}
                          </span>
                          <span className="text-xs font-medium tracking-[0.1em] text-white/30 uppercase">
                            {info.label}
                          </span>
                        </div>
                        <span className="font-black text-yellow-400">
                          x{info.payout}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">?? ??</span>
                      <span className="text-xs font-medium tracking-[0.1em] text-white/30 uppercase">
                        Any Two Match
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
          <p className="mt-6 text-center text-[0.65rem] tracking-wider text-white/15 uppercase">
            Mock game for entertainment only. No real currency. RAMSoc does not
            promote real gambling.
          </p>
        </div>
      </section>
    </main>
  );
}
