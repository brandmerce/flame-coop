'use client';

import { useState, useEffect, useRef } from 'react';

/*
 * Accessibility Widget — ADA compliance toggle
 *
 * Provides users with visual impairments or color blindness a one-click
 * way to switch the site into a high-contrast, larger-text mode.
 *
 * When active:
 * - Adds class "a11y-mode" to <html>
 * - globals.css (see bottom of file) applies overrides for all tokens
 * - Choice persisted to localStorage
 *
 * WCAG references satisfied:
 * - 1.4.3 / 1.4.6  Contrast (Minimum / Enhanced)
 * - 1.4.4           Resize Text — bumps base font 20%
 * - 1.4.12          Text Spacing — increases letter/line spacing
 * - 2.5.5           Target Size — widget button is 48px
 */

export default function AccessibilityWidget() {
  const [open,    setOpen]    = useState(false);
  const [active,  setActive]  = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('a11y-mode');
    if (saved === 'true') {
      setActive(true);
      document.documentElement.classList.add('a11y-mode');
    }
  }, []);

  // Sync class with state
  useEffect(() => {
    if (!mounted) return;
    if (active) {
      document.documentElement.classList.add('a11y-mode');
      localStorage.setItem('a11y-mode', 'true');
    } else {
      document.documentElement.classList.remove('a11y-mode');
      localStorage.setItem('a11y-mode', 'false');
    }
  }, [active, mounted]);

  // Close panel on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Close panel on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!mounted) return null;

  return (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        bottom:   '20px',
        right:    '20px',
        zIndex:   999,
      }}
    >
      {/* Toggle button — universal accessibility icon */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility options"
        aria-expanded={open}
        style={{
          width:        '48px',
          height:       '48px',
          borderRadius: '50%',
          background:   active ? '#1565C0' : 'var(--obsidian)',
          color:        '#FFFFFF',
          border:       '2px solid rgba(255,255,255,.3)',
          cursor:       'pointer',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          fontSize:     '1.4rem',
          boxShadow:    '0 2px 12px rgba(0,0,0,.3)',
          transition:   'background .2s ease',
        }}
        title="Accessibility options"
      >
        {/* Universal accessibility symbol */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="4.5" r="2" />
          <path d="M12 7v5m0 0l-3 5m3-5l3 5" />
          <path d="M6 9h12" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          style={{
            position:     'absolute',
            bottom:       '60px',
            right:        '0',
            width:        '280px',
            background:   '#FFFFFF',
            borderRadius: '8px',
            boxShadow:    '0 4px 24px rgba(0,0,0,.15)',
            padding:      '20px',
            border:       '1px solid #E0E0E0',
          }}
        >
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, color: '#111', marginBottom: '12px' }}>
            Accessibility
          </p>
          <p style={{ fontSize: '.82rem', color: '#555', lineHeight: 1.6, marginBottom: '16px' }}>
            Enable high-contrast mode for improved readability. Increases text size, contrast ratios, and spacing.
          </p>

          <button
            onClick={() => setActive((a) => !a)}
            style={{
              width:        '100%',
              padding:      '12px 16px',
              borderRadius: '6px',
              border:       active ? '2px solid #1565C0' : '2px solid #CCC',
              background:   active ? '#E3F2FD' : '#F5F5F5',
              color:        active ? '#0D47A1' : '#333',
              fontSize:     '.88rem',
              fontWeight:   600,
              cursor:       'pointer',
              display:      'flex',
              alignItems:   'center',
              gap:          '10px',
              transition:   'all .15s ease',
            }}
          >
            <span style={{
              width:        '18px',
              height:       '18px',
              borderRadius: '4px',
              border:       active ? '2px solid #1565C0' : '2px solid #999',
              background:   active ? '#1565C0' : 'transparent',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              flexShrink:   0,
              color:        '#FFF',
              fontSize:     '.7rem',
            }}>
              {active && '✓'}
            </span>
            High Contrast Mode
          </button>

          <p style={{ fontSize: '.72rem', color: '#888', marginTop: '12px', lineHeight: 1.5 }}>
            Your preference is saved automatically.
          </p>
        </div>
      )}
    </div>
  );
}
