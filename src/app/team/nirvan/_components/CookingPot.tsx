"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_SLOTS = 5;

type IngredientId =
  | "herb"
  | "pepper"
  | "meat"
  | "radish"
  | "mushroom"
  | "fish"
  | "apple"
  | "bird"
  | "pumpkin"
  | "spice";

interface Ingredient {
  id: IngredientId;
  name: string;
  emoji: string;
  glowColor: string;
}

interface RecipeResult {
  name: string;
  description: string;
  emoji: string;
  hearts: number;
  effect?: string;
  effectColor?: string;
}

type RecipeCheck = RecipeResult & {
  match: (ids: IngredientId[]) => boolean;
};

const INGREDIENTS: Ingredient[] = [
  { id: "herb", name: "Hyrule Herb", emoji: "🌿", glowColor: "#4ade80" },
  { id: "pepper", name: "Spicy Pepper", emoji: "🌶️", glowColor: "#f87171" },
  { id: "meat", name: "Raw Meat", emoji: "🥩", glowColor: "#fb923c" },
  { id: "radish", name: "Hearty Radish", emoji: "🌱", glowColor: "#c084fc" },
  { id: "mushroom", name: "Sunshroom", emoji: "🍄", glowColor: "#fbbf24" },
  { id: "fish", name: "Hyrule Bass", emoji: "🐟", glowColor: "#60a5fa" },
  { id: "apple", name: "Apple", emoji: "🍎", glowColor: "#f87171" },
  { id: "bird", name: "Bird Drumstick", emoji: "🍗", glowColor: "#fcd34d" },
  { id: "pumpkin", name: "Fortified Pumpkin", emoji: "🎃", glowColor: "#fb923c" },
  { id: "spice", name: "Goron Spice", emoji: "✨", glowColor: "#e879f9" },
];

function countOf(ids: IngredientId[], id: IngredientId): number {
  return ids.filter((i) => i === id).length;
}

function has(ids: IngredientId[], ...required: IngredientId[]): boolean {
  return required.every((r) => ids.includes(r));
}

const RECIPES: RecipeCheck[] = [
  {
    name: "Spicy Meat and Seafood Fry",
    description:
      "Even the parts that didn't cook through are somehow appetizing. Grants cold resistance for a time.",
    emoji: "🍢",
    hearts: 7,
    effect: "Cold Resistance",
    effectColor: "#93c5fd",
    match: (ids) => has(ids, "meat", "fish", "pepper"),
  },
  {
    name: "Monster Curry",
    description:
      "The Goron Spice transforms this into something otherworldly. Attack power rises dramatically!",
    emoji: "🍛",
    hearts: 8,
    effect: "Attack Up",
    effectColor: "#f97316",
    match: (ids) => has(ids, "spice", "meat", "mushroom"),
  },
  {
    name: "Pumpkin Stew",
    description:
      "A rich, warming stew of fortified pumpkin and exotic spice. Bolsters defense significantly.",
    emoji: "🥘",
    hearts: 7,
    effect: "Defense Up",
    effectColor: "#a78bfa",
    match: (ids) => has(ids, "pumpkin", "spice"),
  },
  {
    name: "Spicy Meat Skewer",
    description:
      "A flame-grilled specialty that'll keep the cold at bay. The spice makes every bite memorable.",
    emoji: "🍖",
    hearts: 5,
    effect: "Cold Resistance",
    effectColor: "#93c5fd",
    match: (ids) => has(ids, "meat", "pepper"),
  },
  {
    name: "Hearty Stew",
    description:
      "A warm, wholesome stew. The hearty radish overflows with life energy—temporarily increases max hearts.",
    emoji: "🍲",
    hearts: 8,
    effect: "Hearty +3 ♥",
    effectColor: "#c084fc",
    match: (ids) => has(ids, "radish", "meat"),
  },
  {
    name: "Hearty Simmered Fruit",
    description:
      "The hearty radish elevates this sweet dish into a life-restoring masterpiece.",
    emoji: "🍧",
    hearts: 6,
    effect: "Hearty +2 ♥",
    effectColor: "#c084fc",
    match: (ids) => has(ids, "radish", "apple"),
  },
  {
    name: "Hearty Fried Wild Greens",
    description:
      "A powerful dish brimming with the radish's overflowing life force.",
    emoji: "🥗",
    hearts: 5,
    effect: "Hearty +1 ♥",
    effectColor: "#c084fc",
    match: (ids) => ids.includes("radish"),
  },
  {
    name: "Salt-Grilled Fish",
    description:
      "The herbs bring out the fish's natural sweetness. The scales grill up nice and crispy.",
    emoji: "🐟",
    hearts: 4,
    match: (ids) => has(ids, "fish", "herb"),
  },
  {
    name: "Herb Sauté",
    description:
      "A fragrant sauté of bird and wild herbs. The aroma alone revives drooping spirits.",
    emoji: "🍽️",
    hearts: 4,
    match: (ids) => has(ids, "bird", "herb"),
  },
  {
    name: "Sunny Fried Wild Greens",
    description:
      "The warm sunshrooms are brimming with heat energy. Restores and extends your stamina wheel.",
    emoji: "☀️",
    hearts: 4,
    effect: "Enduring Stamina",
    effectColor: "#fde047",
    match: (ids) => countOf(ids, "mushroom") >= 2,
  },
  {
    name: "Copious Meat Skewers",
    description:
      "An intimidating stack of meat skewers. The sheer quantity leaves even the heartiest hero satisfied.",
    emoji: "🍢",
    hearts: 9,
    match: (ids) => countOf(ids, "meat") >= 3,
  },
  {
    name: "Meat Skewer",
    description:
      "A simple roasted skewer. Its savory aroma revives the spirits of weary travelers.",
    emoji: "🍖",
    hearts: 5,
    match: (ids) => countOf(ids, "meat") >= 2,
  },
  {
    name: "Simmered Fruit",
    description:
      "The apples cook down into something sweet and warming. Restores a handful of hearts.",
    emoji: "🍎",
    hearts: 4,
    match: (ids) => countOf(ids, "apple") >= 2,
  },
  {
    name: "Spicy Sautéed Peppers",
    description:
      "Almost too hot to eat, but it warms you to the core on frigid mountain peaks.",
    emoji: "🌶️",
    hearts: 3,
    effect: "Cold Resistance",
    effectColor: "#93c5fd",
    match: (ids) => countOf(ids, "pepper") >= 2,
  },
  {
    name: "Fried Wild Greens",
    description:
      "A healthy sauté of wild plants. Simple, nourishing, and perfect for any journey.",
    emoji: "🥬",
    hearts: 3,
    match: (ids) => countOf(ids, "herb") >= 2,
  },
];

const DUBIOUS_FOOD: RecipeResult = {
  name: "Dubious Food",
  description:
    "It somehow all came together in the end... or did it? The taste defies all description. Restores a meager half-heart.",
  emoji: "🤢",
  hearts: 0.5,
};

function playDropSound(): void {
  if (typeof window === "undefined") return;
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
    setTimeout(() => void ctx.close(), 400);
  } catch {
    // ignore – audio unavailable
  }
}

function playCookingSound(): void {
  if (typeof window === "undefined") return;
  try {
    const ctx = new AudioContext();
    const bufLen = Math.floor(ctx.sampleRate * 1.8);
    const buffer = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 400;
    filter.Q.value = 2;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 7;
    lfoGain.gain.value = 0.1;
    lfo.connect(lfoGain);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
    src.connect(filter);
    lfoGain.connect(gain.gain);
    filter.connect(gain);
    gain.connect(ctx.destination);
    lfo.start();
    src.start();
    src.stop(ctx.currentTime + 1.8);
    lfo.stop(ctx.currentTime + 1.8);
    setTimeout(() => void ctx.close(), 2500);
  } catch {
    // ignore
  }
}

function playSuccessSound(): void {
  if (typeof window === "undefined") return;
  try {
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.18);
      gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + i * 0.18 + 0.4,
      );
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.4);
    });
    setTimeout(() => void ctx.close(), 1500);
  } catch {
    // ignore
  }
}

function PotSVG({
  isCooking,
  hasIngredients,
}: {
  isCooking: boolean;
  hasIngredients: boolean;
}) {
  const liquidColor = hasIngredients
    ? isCooking
      ? "#a05000"
      : "#8b4513"
    : "#1a1008";
  return (
    <svg width="200" height="150" viewBox="0 0 200 150">
      {/* Legs */}
      <rect x="40" y="118" width="11" height="26" rx="3" fill="#1a1008" />
      <rect x="94" y="122" width="11" height="22" rx="3" fill="#1a1008" />
      <rect x="148" y="118" width="11" height="26" rx="3" fill="#1a1008" />
      {/* Pot body shadow */}
      <path
        d="M 26 68 Q 24 120 100 124 Q 176 120 174 68 Z"
        fill="#111006"
        opacity="0.4"
        transform="translate(3,4)"
      />
      {/* Pot body */}
      <path
        d="M 26 68 Q 24 120 100 124 Q 176 120 174 68 Z"
        fill="#2a1a08"
      />
      {/* Body highlight */}
      <path
        d="M 40 70 Q 38 112 100 115 Q 162 112 160 70 Z"
        fill="rgba(255,255,255,0.03)"
      />
      {/* Pot rim */}
      <ellipse cx="100" cy="68" rx="74" ry="17" fill="#3d2a0f" />
      <ellipse cx="100" cy="67" rx="71" ry="15" fill="#2a1a08" />
      {/* Liquid surface */}
      <ellipse cx="100" cy="66" rx="67" ry="12" fill={liquidColor} />
      {/* Liquid shine */}
      {hasIngredients && (
        <ellipse
          cx="80"
          cy="63"
          rx="24"
          ry="4"
          fill="rgba(255,200,100,0.1)"
        />
      )}
      {/* Cooking glow on liquid */}
      {isCooking && (
        <ellipse
          cx="100"
          cy="66"
          rx="67"
          ry="12"
          fill="rgba(255,140,0,0.25)"
        />
      )}
      {/* Rim shine */}
      <path
        d="M 45 70 Q 65 62 100 60 Q 135 62 155 70"
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Handles */}
      <rect x="2" y="60" width="26" height="12" rx="6" fill="#3d2a0f" />
      <rect x="4" y="61" width="22" height="10" rx="5" fill="#2a1a08" />
      <rect x="172" y="60" width="26" height="12" rx="6" fill="#3d2a0f" />
      <rect x="174" y="61" width="22" height="10" rx="5" fill="#2a1a08" />
    </svg>
  );
}

function CookBubble({ id }: { id: number }) {
  const leftPct = 28 + ((id * 13) % 44);
  const size = 8 + ((id * 7) % 10);
  const delay = ((id * 0.17) % 0.9) + 0.05;
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        left: `${leftPct}%`,
        bottom: "44%",
        width: size,
        height: size,
        background:
          "radial-gradient(circle, rgba(255,220,140,0.75), rgba(255,160,60,0.3))",
        border: "1px solid rgba(255,200,100,0.35)",
      }}
      initial={{ opacity: 0, y: 0, scale: 0.4 }}
      animate={{ opacity: [0, 1, 0.7, 0], y: -110, scale: [0.4, 1, 0.9, 0.5] }}
      transition={{ delay, duration: 1.3 + delay * 0.2, ease: "easeOut" }}
    />
  );
}

function SteamWisp({ id }: { id: number }) {
  const leftPct = 32 + ((id * 19) % 36);
  const delay = ((id * 0.22) % 0.7) + 0.1;
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: `${leftPct}%`,
        bottom: "56%",
        width: 8,
        height: 24,
        background:
          "linear-gradient(to top, rgba(255,255,255,0.2), transparent)",
        filter: "blur(5px)",
        borderRadius: "50%",
      }}
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{ opacity: [0, 0.7, 0], y: -70, x: [0, 8, -6, 12] }}
      transition={{ delay, duration: 1.6, ease: "easeOut" }}
    />
  );
}

export default function CookingPot() {
  const [potIngredients, setPotIngredients] = useState<IngredientId[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCooking, setIsCooking] = useState(false);
  const [result, setResult] = useState<RecipeResult | null>(null);
  const [bubbleKey, setBubbleKey] = useState(0);
  const dragIdRef = useRef<IngredientId | null>(null);

  const addIngredient = useCallback((id: IngredientId) => {
    setPotIngredients((prev) => {
      if (prev.length >= MAX_SLOTS) return prev;
      playDropSound();
      return [...prev, id];
    });
  }, []);

  const removeIngredient = useCallback((idx: number) => {
    setPotIngredients((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    id: IngredientId,
  ) => {
    dragIdRef.current = id;
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (dragIdRef.current && potIngredients.length < MAX_SLOTS) {
      addIngredient(dragIdRef.current);
      dragIdRef.current = null;
    }
  };

  const cook = () => {
    if (potIngredients.length === 0 || isCooking) return;
    setIsCooking(true);
    setBubbleKey((k) => k + 1);
    playCookingSound();
    setTimeout(() => {
      const matched = RECIPES.find((r) => r.match(potIngredients));
      setIsCooking(false);
      setResult(matched ?? DUBIOUS_FOOD);
      setPotIngredients([]);
      playSuccessSound();
    }, 2200);
  };

  const ingById = (id: IngredientId) => INGREDIENTS.find((i) => i.id === id);

  return (
    <div className="relative flex flex-col items-center gap-5 px-2 py-6">
      {/* Title */}
      <div className="text-center">
        <h3
          style={{
            color: "#f5deb3",
            fontFamily: "Georgia, serif",
            fontSize: "1.45rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textShadow:
              "0 0 22px rgba(201,162,39,0.95), 0 2px 6px rgba(0,0,0,0.95)",
          }}
        >
          ⚔️ Hyrule Cooking Pot ⚔️
        </h3>
        <p
          style={{
            color: "#c4a882",
            fontSize: "0.78rem",
            marginTop: "5px",
            textShadow: "0 1px 4px rgba(0,0,0,0.95)",
          }}
        >
          Drag or click ingredients into the pot · up to {MAX_SLOTS}
        </p>
      </div>

      {/* Ingredient shelf */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "8px",
          width: "100%",
        }}
      >
        {INGREDIENTS.map((ing) => (
          <div
            key={ing.id}
            draggable
            onDragStart={(e) => handleDragStart(e, ing.id)}
            onClick={() => addIngredient(ing.id)}
            style={{
              cursor: potIngredients.length >= MAX_SLOTS ? "not-allowed" : "grab",
            }}
          >
            <motion.div
              whileHover={
                potIngredients.length < MAX_SLOTS ? { scale: 1.1, y: -3 } : {}
              }
              whileTap={
                potIngredients.length < MAX_SLOTS ? { scale: 0.92 } : {}
              }
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                padding: "8px 4px",
                borderRadius: "10px",
                background: "rgba(6, 4, 1, 0.82)",
                border: `1.5px solid ${ing.glowColor}55`,
                boxShadow: `0 0 9px ${ing.glowColor}28`,
                opacity: potIngredients.length >= MAX_SLOTS ? 0.38 : 1,
                backdropFilter: "blur(6px)",
              }}
            >
              <span style={{ fontSize: "1.45rem", lineHeight: 1 }}>
                {ing.emoji}
              </span>
              <span
                style={{
                  fontSize: "8.5px",
                  color: ing.glowColor,
                  textAlign: "center",
                  lineHeight: 1.25,
                  fontWeight: 600,
                }}
              >
                {ing.name}
              </span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Ingredient slots (what's in the pot) */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {Array.from({ length: MAX_SLOTS }).map((_, i) => {
          const id = potIngredients[i];
          const ing = id !== undefined ? ingById(id) : undefined;
          return (
            <motion.div
              key={i}
              animate={ing ? { scale: [1, 1.22, 1] } : {}}
              transition={{ duration: 0.28 }}
              onClick={() => {
                if (ing) removeIngredient(i);
              }}
              title={ing ? `Remove ${ing.name}` : "Empty slot"}
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "9px",
                border: ing
                  ? `2px solid ${ing.glowColor}`
                  : "2px solid rgba(201,162,39,0.22)",
                background: ing
                  ? "rgba(12, 8, 2, 0.92)"
                  : "rgba(12, 8, 2, 0.38)",
                boxShadow: ing ? `0 0 10px ${ing.glowColor}50` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: ing ? "pointer" : "default",
                fontSize: "1.45rem",
                backdropFilter: "blur(4px)",
              }}
            >
              {ing?.emoji}
            </motion.div>
          );
        })}
      </div>

      {/* The pot + fire + particles */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="relative"
        animate={
          isCooking
            ? { rotate: [-1.5, 1.5, -2.5, 2.5, -1, 1, 0] }
            : {}
        }
        transition={
          isCooking
            ? { repeat: Infinity, duration: 0.32, ease: "easeInOut" }
            : {}
        }
        style={{
          filter: isDragOver
            ? "drop-shadow(0 0 28px rgba(201,162,39,1))"
            : "drop-shadow(0 4px 18px rgba(0,0,0,0.75))",
          transition: "filter 0.2s",
          userSelect: "none",
        }}
      >
        {/* Fire */}
        <div
          style={{
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "2px",
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              style={{
                width: 14 + i * 4,
                height: 22 + i * 6,
                borderRadius: "50% 50% 28% 28%",
                background:
                  i % 2 === 0
                    ? "radial-gradient(ellipse at 50% 80%, #f97316, #fbbf24, transparent)"
                    : "radial-gradient(ellipse at 50% 80%, #ef4444, #f97316, transparent)",
                filter: "blur(3.5px)",
              }}
              animate={{
                scaleY: [1, 1.4, 0.85, 1.25, 1],
                scaleX: [1, 0.82, 1.18, 0.9, 1],
                y: [0, -6, -2, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.52 + i * 0.09,
                delay: i * 0.06,
              }}
            />
          ))}
        </div>

        <PotSVG
          isCooking={isCooking}
          hasIngredients={potIngredients.length > 0}
        />

        {/* Bubbles and steam while cooking */}
        {isCooking &&
          Array.from({ length: 7 }).map((_, i) => (
            <CookBubble key={`b-${bubbleKey}-${i}`} id={i} />
          ))}
        {isCooking &&
          Array.from({ length: 4 }).map((_, i) => (
            <SteamWisp key={`s-${bubbleKey}-${i}`} id={i} />
          ))}
      </motion.div>

      {/* Cook button */}
      <motion.button
        onClick={cook}
        disabled={potIngredients.length === 0 || isCooking}
        whileHover={
          potIngredients.length > 0 && !isCooking ? { scale: 1.06 } : {}
        }
        whileTap={
          potIngredients.length > 0 && !isCooking ? { scale: 0.94 } : {}
        }
        style={{
          padding: "11px 36px",
          borderRadius: "10px",
          fontFamily: "Georgia, serif",
          fontSize: "1.1rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "#1a0f00",
          background:
            potIngredients.length > 0 && !isCooking
              ? "linear-gradient(135deg, #c9a227 0%, #f5c842 50%, #c9a227 100%)"
              : "rgba(50, 32, 8, 0.55)",
          border: `2px solid ${
            potIngredients.length > 0 && !isCooking
              ? "#c9a227"
              : "rgba(201,162,39,0.28)"
          }`,
          boxShadow:
            potIngredients.length > 0 && !isCooking
              ? "0 0 28px rgba(201,162,39,0.75), 0 4px 14px rgba(0,0,0,0.55)"
              : "none",
          cursor:
            potIngredients.length === 0 || isCooking
              ? "not-allowed"
              : "pointer",
          textShadow:
            potIngredients.length > 0 && !isCooking
              ? "0 1px 2px rgba(255,240,180,0.3)"
              : "none",
        }}
      >
        {isCooking ? "Cooking..." : "Cook!"}
      </motion.button>

      {potIngredients.length > 0 && !isCooking && (
        <p
          style={{
            color: "#8a7050",
            fontSize: "0.68rem",
            textShadow: "0 1px 3px rgba(0,0,0,0.9)",
          }}
        >
          Click a slot above to remove an ingredient
        </p>
      )}

      {/* Result popup */}
      <AnimatePresence>
        {result !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.78)",
              backdropFilter: "blur(7px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setResult(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.45, y: 110, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.72, y: 60, opacity: 0 }}
              transition={{ type: "spring", damping: 16, stiffness: 255 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "370px",
                borderRadius: "18px",
                padding: "28px 22px 22px",
                background: "linear-gradient(155deg, #1e1506, #0e0902)",
                border: "2px solid #c9a227",
                boxShadow:
                  "0 0 55px rgba(201,162,39,0.48), 0 28px 80px rgba(0,0,0,0.88)",
              }}
            >
              {/* Corner ornaments */}
              <div
                style={{
                  position: "absolute",
                  top: 7,
                  left: 7,
                  width: 18,
                  height: 18,
                  borderTop: "2px solid #c9a227",
                  borderLeft: "2px solid #c9a227",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 7,
                  right: 7,
                  width: 18,
                  height: 18,
                  borderTop: "2px solid #c9a227",
                  borderRight: "2px solid #c9a227",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 7,
                  left: 7,
                  width: 18,
                  height: 18,
                  borderBottom: "2px solid #c9a227",
                  borderLeft: "2px solid #c9a227",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 7,
                  right: 7,
                  width: 18,
                  height: 18,
                  borderBottom: "2px solid #c9a227",
                  borderRight: "2px solid #c9a227",
                }}
              />

              {/* Item icon */}
              <motion.div
                animate={{ rotate: [0, 7, -7, 4, -4, 0] }}
                transition={{ delay: 0.28, duration: 0.55 }}
                style={{
                  margin: "0 auto 18px",
                  width: 84,
                  height: 84,
                  borderRadius: 14,
                  background: "rgba(201,162,39,0.1)",
                  border: "1.5px solid rgba(201,162,39,0.38)",
                  boxShadow: "0 0 26px rgba(201,162,39,0.22) inset",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3.2rem",
                }}
              >
                {result.emoji}
              </motion.div>

              {/* Name */}
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "1.22rem",
                  fontWeight: 700,
                  fontFamily: "Georgia, serif",
                  color: "#f5deb3",
                  textShadow: "0 0 14px rgba(201,162,39,0.55)",
                  marginBottom: "10px",
                }}
              >
                {result.name}
              </h3>

              {/* Effect badge */}
              {result.effect && (
                <motion.div
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      padding: "3px 14px",
                      borderRadius: 999,
                      background: `${result.effectColor}1c`,
                      border: `1px solid ${result.effectColor}75`,
                      color: result.effectColor,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    ✦ {result.effect}
                  </span>
                </motion.div>
              )}

              {/* Hearts */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "2px",
                  marginBottom: "14px",
                }}
              >
                {Array.from({ length: Math.floor(result.hearts) }).map(
                  (_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3 + i * 0.07,
                        type: "spring",
                        stiffness: 420,
                      }}
                      style={{ fontSize: "1.1rem" }}
                    >
                      ❤️
                    </motion.span>
                  ),
                )}
                {result.hearts % 1 !== 0 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 420 }}
                    style={{ fontSize: "1.1rem" }}
                  >
                    💔
                  </motion.span>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  textAlign: "center",
                  color: "#c4a882",
                  fontSize: "0.86rem",
                  lineHeight: 1.65,
                  marginBottom: "22px",
                }}
              >
                {result.description}
              </p>

              {/* Close */}
              <motion.button
                whileHover={{
                  background: "rgba(201,162,39,0.22)",
                  boxShadow: "0 0 16px rgba(201,162,39,0.35)",
                }}
                onClick={() => setResult(null)}
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "9px",
                  background: "rgba(201,162,39,0.1)",
                  border: "1px solid rgba(201,162,39,0.42)",
                  color: "#c9a227",
                  fontFamily: "Georgia, serif",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  letterSpacing: "0.13em",
                  cursor: "pointer",
                }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
