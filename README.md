# OnyxTech

A fully custom electronics e-commerce storefront — clean, premium, and built around immersive 3D product experiences.

## Vision

OnyxTech is designed to feel like a "wow" store: minimal Apple-inspired UI, deep navy/white palette, neumorphism + glassmorphism hybrid design language, and full 3D product visualization powered by Three.js. The goal is a portfolio-grade project that demonstrates full-stack CMS-driven commerce, not just a template store.

## Tech Stack

- **Framework:** Next.js
- **CMS:** Payload CMS (blank template — custom collections, no pre-built page-builder)
- **Database:** PostgreSQL via Supabase (Session Pooler)
- **3D:** Three.js (product visualization, interactive configurators)
- **Styling:** Tailwind CSS
- **Package manager:** pnpm
- **Deployment:** Vercel (planned)

## Design Language

- Apple-inspired: clean, minimal, generous whitespace
- Palette: white + deep navy/blue
- Hybrid neumorphism + glassmorphism UI accents
- Heavy use of animation and motion for a premium feel

## Project Status

🚧 **In early scaffolding** — project structure being set up, collections not yet defined.

## Planned Collections (draft — subject to change)

- `Products` — core product data, specs, pricing
- `Variants` — color/configuration variants per product
- `Categories` — electronics category taxonomy
- `Media` — includes 3D model assets (GLTF/GLB) alongside images
- `Orders` — order/checkout records
- `Users` — customer + admin accounts with role-based access

## Key Architectural Notes

- 3D scenes are isolated as client components (`'use client'`) to keep server-rendered product/catalog pages fast and SEO-friendly.
- Product 3D models are optimized (Draco/Meshopt compression) and lazy-loaded per product page to manage performance budget.
- Cart/checkout state handled outside Payload (likely Zustand + Stripe), since Payload is CMS-focused, not commerce-native.

## Getting Started

```bash
pnpm install
pnpm dev
```

Requires a `.env` file with:

```
DATABASE_URI=your_supabase_postgres_connection_string
PAYLOAD_SECRET=your_payload_secret
```

## Author

Ayub Liaqat ([@ayubliaqat](https://github.com/ayubliaqat))