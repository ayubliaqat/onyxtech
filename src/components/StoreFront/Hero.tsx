'use client'

import { HeroProduct3D } from './HeroProduct3D'
import { useScrollProgress } from './useScrollProgress'
import './Hero.scss'

export const Hero = () => {
  const scrollProgress = useScrollProgress(600)

  return (
    <section className="onyx-hero">
      <div className="onyx-hero__content">
        <span className="onyx-hero__eyebrow">New — Series 4</span>
        <h1 className="onyx-hero__headline">
          Power, refined.
          <br />
          Carried everywhere.
        </h1>
        <p className="onyx-hero__subhead">
          Precision-engineered charging cases and accessories, designed to disappear into your
          everyday carry.
        </p>
        <div className="onyx-hero__actions">
          <a href="/shop" className="onyx-btn onyx-btn--primary">
            Shop now
          </a>
          <a href="/products" className="onyx-btn onyx-btn--ghost">
            Explore the lineup →
          </a>
        </div>
      </div>

      <div className="onyx-hero__stage">
        <HeroProduct3D scrollProgress={scrollProgress} />
      </div>
    </section>
  )
}
