# RAMSoc Website Design System

Comprehensive reference for the visual language, component patterns, and styling conventions used across the RAMSoc website. Use this document when building or restyling pages to ensure consistency with the established editorial magazine-style aesthetic.

---

## 1. Brand Color Palette

### Primary (Teal/Cyan)
| Token | Hex | Usage |
|-------|-----|-------|
| `primary-400` | `#4cc6ed` | Accent highlights on dark backgrounds, hover states, taglines |
| `primary-500` | `#29abe2` | **Main brand color** — buttons, accent bars, labels, badges, accents on white |
| `primary-950` | `#0d2631` | Hero backgrounds, dark sections |

### Dark Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| `#030a18` | Near-black | Dark sections (footer, careers, rambo, gambling, society structure) |
| `primary-950` | `#0d2631` | Hero backgrounds, benefits table, overlay panels |

### Neutrals (White Sections)
| Token | Usage |
|-------|-------|
| `white` | Section backgrounds |
| `neutral-100` | Decorative vertical lines, gap-px grid dividers |
| `neutral-200` | Borders, dividers, stat separators, navbar scroll border |
| `neutral-300` | Inactive elements |
| `neutral-400` | Secondary labels, metadata, uppercase tracking text |
| `neutral-500` | Body/description text on white sections |

### Opacity Scales
```
Text on dark:    white/80, white/60, white/50, white/40, white/30, white/20
Backgrounds:     white/3, white/5, white/8 (card/surface on dark)
Borders dark:    white/10, white/8 (dividers on dark sections)
Borders light:   neutral-200, primary-500/30 (hover), primary-500/20
Decorative:      white/2, primary-500/5 (large background numbers)
```

---

## 2. Typography

### Font
- **Family**: Space Grotesk (Google Fonts) — weights: 400, 500, 600, 700
- **Variable**: `--font-geist-sans` (applied on `<body>`)

### Heading Patterns

#### Hero Headings (Parallax Sections)
```
text-7xl font-bold text-white md:text-8xl lg:text-9xl
— With colored word: <span className="text-primary-400">Keyword</span>
```

#### Section Headings
```
text-5xl font-bold md:text-6xl lg:text-8xl
— On white: <span className="text-primary-500">Keyword</span>
— On dark:  <span className="text-primary-400">Keyword</span>
```

### Label/Tag Pattern (Section Numbering)
```
text-xs font-bold tracking-[0.3em] uppercase
— On white: text-primary-500
— On dark:  text-primary-400
— Format:   "// 01 — Section Name"
```

### Letter Spacing Scale
| Use | Value |
|-----|-------|
| Section labels | `tracking-[0.3em]` |
| Buttons/CTAs | `tracking-[0.2em]` |
| Company names, metadata | `tracking-[0.15em]` or `tracking-[0.2em]` |
| Nav links | `tracking-[0.05em]` |
| Logo text | `tracking-[0.15em]` (name), `tracking-[0.1em]` (subtitle) |

---

## 3. Layout System

### Container
```
max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20
```
Used directly on all pages. No wrapper component.

### Section Spacing
```
py-28 md:py-36    — Standard content sections
py-16             — Compact sections (stats bars)
py-20             — Medium sections (society structure)
```

### Grid Systems
| Pattern | Usage |
|---------|-------|
| `grid-cols-2 lg:grid-cols-4` | Stats row |
| `gap-px bg-neutral-100` (or `bg-white/8`) | Gap-px grid pattern (cells share 1px borders) |
| `md:grid-cols-2 lg:grid-cols-3` | Card grids |
| `md:grid-cols-3` | Sponsorship tiers |
| `md:grid-cols-4` | Sponsor logos, footer columns |

---

## 4. Section Background Patterns

### White Section
```tsx
<section className="relative overflow-hidden bg-white py-28 text-primary-950 md:py-36">
  {/* Optional: Decorative vertical lines */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute top-0 left-[25%] h-full w-px bg-neutral-100" />
    <div className="absolute top-0 left-[75%] h-full w-px bg-neutral-100" />
  </div>
  <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
    {/* content */}
  </div>
</section>
```

### Dark Section
```tsx
<section className="relative overflow-hidden bg-[#030a18] py-28 text-white md:py-36">
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute top-0 left-[25%] h-full w-px bg-white/5" />
    <div className="absolute top-0 left-[75%] h-full w-px bg-white/5" />
  </div>
  <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
    {/* content */}
  </div>
</section>
```

### Parallax Hero (Per-Page Custom)
Each page has its own parallax hero — no shared Hero component is used.
```tsx
<section ref={heroRef} className="relative flex min-h-[70vh] items-center overflow-hidden bg-primary-950">
  <motion.div className="absolute inset-0 -z-0" style={{ scale: heroScale }}>
    <Image src="/page/hero.webp" alt="..." fill className="object-cover" priority quality={90} />
  </motion.div>
  <div className="absolute inset-0 bg-primary-700/50" />
  <div className="absolute inset-0 bg-primary-950/40" />
  <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-white to-transparent" />

  <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:px-20">
    <motion.span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
      // Page Label
    </motion.span>
    <motion.h1 className="text-7xl font-bold text-white md:text-8xl lg:text-9xl">
      First<br /><span className="text-primary-400">Word</span>
    </motion.h1>
    <motion.div className="my-6 h-1.5 w-16 origin-left bg-primary-400" />
    <motion.p className="max-w-md text-base leading-relaxed text-white/60">
      Description text.
    </motion.p>
  </div>
</section>
```
Hero animations use staggered delays (0.1, 0.2, 0.35, 0.45) with easing `[0.22, 1, 0.36, 1]`.

---

## 5. Decorative Elements

### Decorative Large Number
```tsx
{/* On white sections */}
<motion.span className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-primary-500/5 lg:block xl:right-20 xl:text-[16rem]">
  02
</motion.span>

{/* On dark sections */}
<motion.span className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-white/2 lg:block xl:right-20 xl:text-[16rem]">
  01
</motion.span>
```

### Accent Bars
```
Hero accent:     h-1.5 w-16 bg-primary-400
Border-left:     border-l-2 border-primary-500 (content blocks on dark)
Stat dividers:   border-l border-neutral-200 (between stat items)
Section border:  border-y border-neutral-200 (year selector bridge)
Top border:      h-px bg-white/10 (footer top)
```

### Gap-Px Grid Pattern
Cells separated by 1px lines using grid background color:
```tsx
{/* On white */}
<div className="grid gap-px bg-neutral-100 md:grid-cols-4">
  <div className="bg-white p-8">Cell</div>
</div>

{/* On dark */}
<div className="grid gap-px bg-white/8 md:grid-cols-3">
  <div className="bg-[#030a18] p-8">Cell</div>
</div>
```

---

## 6. Component Patterns

### Section Header
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="mb-16"
>
  <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
    // 02 — Section Label
  </span>
  <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
    First Line<br />
    <span className="text-primary-500">Colored Word</span>
  </h2>
</motion.div>
```

### CTA Button (Square Icon + Label)
```tsx
<a className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-primary-400">
  <span className="flex size-12 items-center justify-center bg-primary-500 text-white transition-colors group-hover:bg-primary-400">
    <HiArrowRight className="size-5" />
  </span>
  Button Label
</a>
```
Variants: `-rotate-45` arrow for external links, `border border-white/20` outline style.

### Stat Block
```tsx
<div className="group relative border-l border-neutral-200 px-6 py-6 first:border-l-0 lg:px-8">
  <Icon size={18} strokeWidth={1.5} className="mb-4 text-primary-500" />
  <div className="mb-1 text-3xl font-black tracking-tight text-primary-950 md:text-4xl lg:text-7xl">
    {value}
  </div>
  <div className="text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase">{label}</div>
</div>
```

### Card (Dark Background — e.g. Career Cards)
```tsx
<div className="border border-white/10 bg-white/3 transition-all hover:border-primary-500/30 hover:bg-white/5">
  {/* Horizontal layout: logo | content | action */}
</div>
```
- Position title: white, hover to primary-500
- Company: `text-[0.65rem] font-bold tracking-[0.2em] text-white/30 uppercase`
- Metadata: `text-white/30`, icons at 60% opacity
- Tags: `border border-white/8 text-[0.625rem] text-white/30 uppercase`
- Apply button: `bg-primary-500 text-[0.7rem] font-bold tracking-[0.15em] uppercase`

### Card (White Background — e.g. Sponsor Logos)
```tsx
<div className="bg-white p-8 transition-colors hover:bg-primary-50/50">
  <Image className="opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" />
</div>
```

### Empty State
```tsx
{/* On white */}
<div className="border border-neutral-200 px-8 py-16 text-center">
  <p className="text-sm tracking-wider text-neutral-400 uppercase">No items</p>
</div>

{/* On dark */}
<div className="border border-white/10 px-8 py-16 text-center">
  <p className="text-sm tracking-wider text-white/30 uppercase">No items</p>
</div>
```

### Loading Skeleton (Dark)
```tsx
<div className="border border-white/10 bg-white/3 p-6 md:p-8">
  <Skeleton className="h-28 w-full bg-white/5 md:size-32" />
</div>
```

### Modal (Dark Header + White Content)
```tsx
<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
  <div className="border border-white/10 bg-[#030a18]">
    {/* Dark header with white/10 border-b */}
    <div className="border-b border-white/10 p-6">...</div>
    {/* White scrollable content area */}
    <div className="bg-white p-6">...</div>
  </div>
</div>
```

---

## 7. Navigation

### Navbar
- Fixed position, `bg-white`, transitions to `h-16` with `border-b border-neutral-200 bg-white/95 backdrop-blur-sm` on scroll
- Default height: `h-20`, scrolled: `h-16`
- Logo: `size-10` image + tracked uppercase text ("RAMSoc" / "UNSW Robotics")
- Desktop links: `text-sm font-medium tracking-[0.05em]`, hover `text-primary-500` with bottom `h-0.5 bg-primary-500` underline animation
- Mobile: Sheet overlay with `bg-primary-950`, links with `border-b border-white/10`

### Footer
- `bg-[#030a18]` with `h-px bg-white/10` top border
- 4-column grid: brand, navigate, resources, contact
- Section headers: `text-xs font-bold tracking-[0.2em] text-white/30 uppercase`
- Links: `text-white/50 hover:text-primary-400`
- Social icons: `text-white/30 hover:text-primary-400`
- Copyright: `text-[0.65rem] tracking-[0.2em] text-white/20 uppercase`

---

## 8. Animation Patterns

### Standard Entrance
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
/>
```

### Staggered Items
```tsx
transition={{ duration: 0.5, delay: index * 0.08 }}
```

### Parallax Hero
```tsx
const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
```

### Ease Curve
```tsx
const ease = [0.22, 1, 0.36, 1] as const;
```

### Hover Transitions
| Effect | Implementation |
|--------|---------------|
| Image zoom | `transition-transform duration-700 group-hover:scale-105` |
| Color shift | `transition-colors` |
| Arrow nudge | `group-hover:translate-x-1` or `group-hover:translate-x-0.5` |
| Border color | `hover:border-primary-500/30` |

---

## 9. Key Design Principles

1. **No rounded corners** — All cards, buttons, badges, and containers use sharp edges (`rounded-none` or no border-radius)
2. **No shadows** — Cards use borders instead of box-shadow. Navbar uses border-b instead of shadow-lg
3. **Editorial typography** — Huge headings (up to `text-9xl`), tracked uppercase labels, numbered section prefixes
4. **Dark/light alternation** — Pages alternate between white and dark (`#030a18`) sections for visual rhythm
5. **Decorative restraint** — Vertical lines at 25%/75%, faint large numbers, accent bars — no gradients on cards
6. **Per-page heroes** — Each page has its own parallax hero. No shared Hero component is used
7. **Gap-px grids** — Grid cells separated by 1px background color, not borders or gaps

---

## 10. Page Structure

### Standard Page Flow
1. **Parallax Hero** — `min-h-[70vh]`, bg image with overlays, bottom gradient to next section color
2. **Content Sections** — Alternating white/dark with numbered editorial headers
3. **CTA Section** — Dark bg with centered heading + action buttons
4. **Footer** — Dark editorial footer

### Section Numbering
```
// 01 — First Section
// 02 — Second Section
// 03 — Third Section
```

### Bottom Gradient Bridge
Heroes gradient into the first section:
- `from-white to-transparent` if next section is white
- `from-[#030a18] to-transparent` if next section is dark
