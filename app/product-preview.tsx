'use client';

import { createContext, useEffect, useRef, useState, type ReactNode } from 'react';

export const PreviewContext = createContext<{ expanded: boolean } | null>(null);

export default function ProductPreview({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = frame.current;
    const window = content.current;
    if (!viewport || !window || expanded) return;
    const card = window.querySelector('[data-card="up-next"]');
    if (!card) return;
    function measure() {
      if (!viewport || !window || !card) return;
      const width = viewport.clientWidth;
      viewport.style.setProperty('--preview-width', `${Math.max(width, 1100)}px`);
      viewport.style.setProperty('--preview-scale', String(Math.min(1, width / 1100)));
      const bounds = card.getBoundingClientRect();
      const top = window.getBoundingClientRect().top;
      viewport.style.setProperty('--preview-height', `${bounds.top - top + bounds.height * 0.75}px`);
    }
    let pending = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(measure);
    });
    observer.observe(viewport);
    observer.observe(card);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(pending);
    };
  }, [expanded]);

  return <PreviewContext.Provider value={{ expanded }}>
    <div className={`product-reveal ${expanded ? 'is-expanded' : 'is-sleeved'}`} id="product">
      <div className="product-sleeve" ref={frame} id="dashboard-preview">
        <div className="product-reveal-content" ref={content} inert={!expanded} aria-hidden={!expanded}>
          {children}
        </div>
      </div>
      <button className="preview-toggle" aria-expanded={expanded} aria-controls="dashboard-preview" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Close full preview' : 'Explore the full dashboard'} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
      </button>
    </div>
  </PreviewContext.Provider>;
}
