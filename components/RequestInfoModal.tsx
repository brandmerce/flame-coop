'use client';

import { useEffect, useState } from 'react';

interface RequestInfoModalProps {
  open:    boolean;
  onClose: () => void;
}

const EDUWEBY_URL = 'https://eduweby.com/embed/form?tenant=flame-christian-coop';

export default function RequestInfoModal({ open, onClose }: RequestInfoModalProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Reset loaded state each time modal opens so skeleton shows again
  useEffect(() => {
    if (open) setLoaded(false);
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position:        'fixed',
        inset:           0,
        background:      'rgba(20,20,20,.7)',
        zIndex:          1000,
        overflowY:       'auto',
        display:         'flex',
        alignItems:      'flex-start',
        justifyContent:  'center',
        padding:         '40px 16px',
      }}
    >
      <div
        style={{
          background:    '#fff',
          borderRadius:  '8px',
          width:         '100%',
          maxWidth:      '860px',
          position:      'relative',
          overflow:      'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          padding:         '20px 24px',
          borderBottom:    '1px solid var(--cream2)',
        }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--obsidian)' }}>
            Request Information
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1, color: 'var(--obsidian)', padding: '4px 8px' }}
          >
            ×
          </button>
        </div>

        {/* Skeleton shown until iframe fires onLoad */}
        {!loaded && (
          <div style={{ padding: '40px 32px', minHeight: '500px' }}>
            <style>{`
              @keyframes shimmer {
                0%   { background-position: -600px 0; }
                100% { background-position:  600px 0; }
              }
              .skeleton {
                background: linear-gradient(90deg, #f0eae0 25%, #e8dfd2 50%, #f0eae0 75%);
                background-size: 600px 100%;
                animation: shimmer 1.4s infinite linear;
                border-radius: 4px;
              }
            `}</style>
            <div className="skeleton" style={{ height: 18, width: '55%', marginBottom: 32 }} />
            <div className="skeleton" style={{ height: 44, marginBottom: 20 }} />
            <div className="skeleton" style={{ height: 44, marginBottom: 20 }} />
            <div className="skeleton" style={{ height: 44, marginBottom: 20 }} />
            <div className="skeleton" style={{ height: 44, marginBottom: 32 }} />
            <div className="skeleton" style={{ height: 120, marginBottom: 32 }} />
            <div className="skeleton" style={{ height: 48, width: 160 }} />
          </div>
        )}

        <iframe
          src={EDUWEBY_URL}
          onLoad={() => setLoaded(true)}
          style={{
            border:     'none',
            width:      '100%',
            minHeight:  '800px',
            display:    loaded ? 'block' : 'none',
          }}
          title="Request Information Form"
        />
      </div>
    </div>
  );
}
