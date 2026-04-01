# Design System Specification: The 2026/2027 National Collection

## 1. Overview & Creative North Star: "Kinetic Elegance"
The Creative North Star for this design system is **Kinetic Elegance**. This system moves away from the static, "boxy" nature of traditional e-commerce. It mimics the fluidity of a player in motion and the rhythmic energy of Brazilian culture. 

We break the "template" look by utilizing **Intentional Asymmetry**. Hero sections should feature high-definition imagery that breaks out of container bounds, overlapping with bold typography to create a 3D editorial feel. This isn't just a shop; it’s a digital flagship gallery where whitespace acts as a luxury high-ceiling environment.

---

## 2. Colors & Atmospheric Depth
Our palette utilizes the iconic *Canarinho* yellow and deep oceanic blues, but applied with a sophisticated hierarchy that prioritizes depth over flat blocks of color.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or card containment. Boundaries must be defined solely through background shifts. For example, a `surface-container-low` product grid should sit on a `surface` background. If you feel the need for a line, use a margin instead.

### Surface Hierarchy & Nesting
Treat the UI as layered sheets of premium athletic fabric.
*   **Base Layer:** `surface` (#f8f9fa) for the primary page background.
*   **Content Blocks:** Use `surface-container-low` (#f3f4f5) to group related product categories.
*   **Feature Focus:** Use `surface-container-highest` (#e1e3e4) for high-contrast utility areas (like a sophisticated cart drawer).

### The "Glass & Gradient" Rule
To elevate the "Modern Premium" aesthetic:
*   **Glassmorphism:** Navigation bars and floating "Quick Add" menus must use semi-transparent `surface` colors with a `backdrop-filter: blur(20px)`.
*   **Signature Textures:** For primary CTAs, do not use flat yellow. Apply a subtle linear gradient from `primary` (#6d5e00) to `primary_container` (#ffdf00) at a 135-degree angle to simulate the sheen of high-performance jersey fabric.

---

## 3. Typography: The Athletic Editorial
The contrast between the "Lexend" display face and "Manrope" body text creates a tension between raw power and technical precision.

*   **Display (Lexend):** Used for "Hero" moments and major collection titles. It should be tracked tightly (-0.02em) to feel aggressive and bold.
*   **Headline (Lexend):** Used for product names. Set in `headline-lg` or `headline-md` to ensure the brand's "athletic" voice is the first thing the user hears.
*   **Body (Manrope):** All functional text, descriptions, and specs use `body-lg` or `body-md`. Manrope’s geometric clarity ensures readability even at small sizes against complex textures.
*   **Labels (Manrope):** Set in `label-md` uppercase with +0.05em letter spacing for technical specs or "Limited Edition" tags.

---

## 4. Elevation & Depth: Tonal Layering
Traditional dropshadows are too heavy for a high-performance brand. We use light and tone to imply height.

*   **The Layering Principle:** Depth is achieved by "stacking." A `surface-container-lowest` (#ffffff) card placed on a `surface-container` (#edeeef) section creates a natural "lift" without a single pixel of shadow.
*   **Ambient Shadows:** When a floating element (like a mobile nav) is required, use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(25, 28, 29, 0.04)`. The shadow color is a tinted version of `on-surface` to keep it organic.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke (e.g., input fields), use the `outline_variant` token at **15% opacity**. Never use 100% opaque outlines.

---

## 5. Components

### Buttons (The Kinetic Triggers)
*   **Primary:** Gradient of `primary` to `primary_container`. Text in `on_primary_fixed` (#211b00). Shape: `md` (0.375rem). Hover state should trigger a subtle scale-up (1.02x).
*   **Secondary:** Glassmorphic fill (semi-transparent `surface_bright`) with a "Ghost Border."
*   **Tertiary:** Text-only with an animated underline that expands from the center on hover.

### Product Cards
*   **Forbid Dividers:** Use `spacing-6` (1.5rem) of vertical whitespace between image and text rather than a line.
*   **Image Treatment:** Products should be shot on high-contrast backgrounds. Use `rounded-xl` for image containers to soften the "athletic" hardness.

### Input Fields
*   **State:** Background should be `surface-container-high` (#e7e8e9). On focus, the background shifts to `surface-container-lowest` (#ffffff) with a 2px `secondary` (#405aa9) bottom-accent only.

### Navigation (The Floating Bar)
A "Glassmorphism" bar using `surface_container_low` at 80% opacity. It should sit `spacing-4` from the top of the viewport, not flush, to emphasize the "layered" philosophy.

---

## 6. Do's and Don'ts

### Do:
*   **Use Oversized Typography:** Let `display-lg` text be cut off by the screen edge (overflow-x: hidden) in hero sections for a high-fashion editorial look.
*   **Embrace "Dynamic Yellow":** Use `primary_fixed` (#ffe243) as a highlight color for micro-interactions (dots, active states, price tags).
*   **Asymmetric Grids:** In the "Lookbook" section, vary the column widths (e.g., a 2-column row where one image is 65% width and the other 35%).

### Don't:
*   **Don't use 1px Borders:** This is the quickest way to make a premium system look like a generic template.
*   **Don't use Pure Black:** Use `on_background` (#191c1d) for text to maintain a softer, more expensive visual "ink."
*   **Don't Overcrowd:** If a section feels "busy," increase the spacing token by two levels (e.g., move from `spacing-8` to `spacing-12`).

---

## 7. Motion & Haptics
*   **Page Transitions:** Use "Staggered Fades." When a product page loads, the image should slide up 20px while the typography fades in with a 100ms delay.
*   **Micro-interactions:** Selection of a size or color should feel tactile. Use a "Pop" animation (scale 1.0 -> 1.1 -> 1.0) over 150ms using a `cubic-bezier(0.34, 1.56, 0.64, 1)` curve.