import { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { CATEGORY_MAP, CATEGORIES } from '../data/categories';

const THEMES = [
  {
    key: 'violet', label: '幽紫',
    bg: 'linear-gradient(160deg,#0a031a 0%,#160636 40%,#090822 75%,#040314 100%)',
    orb1:'#6d28d9', orb2:'#3730a3', orb3:'#5b21b6',
    btnGrad: 'linear-gradient(145deg,#9333ea,#7c3aed 50%,#5b21b6)',
    btnGlow1:'rgba(147,51,234,0.7)', btnGlow2:'rgba(124,58,237,0.35)',
    numGlow: '0 0 48px rgba(192,132,252,0.95), 0 0 100px rgba(167,139,250,0.5)',
    colonColor:'rgba(192,132,252,0.8)', pingColor:'rgba(167,139,250,0.4)',
    accentBorder:'rgba(139,92,246,0.6)', accentBg:'rgba(139,92,246,0.2)',
    accentShadow:'rgba(139,92,246,0.3)', activeText:'rgba(196,181,253,1)',
    iconColor:'#c084fc', lineGrad:'linear-gradient(to right,#8b5cf6,#ec4899)',
    swatch:'linear-gradient(135deg,#9333ea,#6d28d9)',
  },
  {
    key: 'ocean', label: '深海',
    bg: 'linear-gradient(160deg,#010c1a 0%,#012240 40%,#010f1f 75%,#010810 100%)',
    orb1:'#0e7490', orb2:'#1d4ed8', orb3:'#0369a1',
    btnGrad: 'linear-gradient(145deg,#0ea5e9,#0284c7 50%,#0369a1)',
    btnGlow1:'rgba(14,165,233,0.7)', btnGlow2:'rgba(2,132,199,0.35)',
    numGlow: '0 0 48px rgba(125,211,252,0.95), 0 0 100px rgba(56,189,248,0.5)',
    colonColor:'rgba(125,211,252,0.8)', pingColor:'rgba(56,189,248,0.4)',
    accentBorder:'rgba(14,165,233,0.6)', accentBg:'rgba(14,165,233,0.18)',
    accentShadow:'rgba(14,165,233,0.3)', activeText:'rgba(186,230,253,1)',
    iconColor:'#7dd3fc', lineGrad:'linear-gradient(to right,#0ea5e9,#06b6d4)',
    swatch:'linear-gradient(135deg,#0ea5e9,#0369a1)',
  },
  {
    key: 'ink', label: '暗夜',
    bg: 'linear-gradient(160deg,#040404 0%,#090909 40%,#060606 75%,#020202 100%)',
    orb1:'#166534', orb2:'#14532d', orb3:'#15803d',
    btnGrad: 'linear-gradient(145deg,#22c55e,#16a34a 50%,#15803d)',
    btnGlow1:'rgba(34,197,94,0.7)', btnGlow2:'rgba(22,163,74,0.35)',
    numGlow: '0 0 48px rgba(134,239,172,0.9), 0 0 100px rgba(74,222,128,0.45)',
    colonColor:'rgba(134,239,172,0.8)', pingColor:'rgba(74,222,128,0.4)',
    accentBorder:'rgba(34,197,94,0.6)', accentBg:'rgba(34,197,94,0.15)',
    accentShadow:'rgba(34,197,94,0.3)', activeText:'rgba(187,247,208,1)',
    iconColor:'#86efac', lineGrad:'linear-gradient(to right,#22c55e,#14b8a6)',
    swatch:'linear-gradient(135deg,#22c55e,#15803d)',
  },
  {
    key: 'aurora', label: '极光',
    bg: 'linear-gradient(160deg,#020d12 0%,#051a20 40%,#020d10 75%,#010a0d 100%)',
    orb1:'#0d9488', orb2:'#059669', orb3:'#0f766e',
    btnGrad: 'linear-gradient(145deg,#2dd4bf,#14b8a6 50%,#0d9488)',
    btnGlow1:'rgba(45,212,191,0.7)', btnGlow2:'rgba(20,184,166,0.35)',
    numGlow: '0 0 48px rgba(153,246,228,0.9), 0 0 100px rgba(94,234,212,0.45)',
    colonColor:'rgba(153,246,228,0.8)', pingColor:'rgba(94,234,212,0.4)',
    accentBorder:'rgba(45,212,191,0.6)', accentBg:'rgba(45,212,191,0.15)',
    accentShadow:'rgba(45,212,191,0.3)', activeText:'rgba(204,251,241,1)',
    iconColor:'#99f6e4', lineGrad:'linear-gradient(to right,#2dd4bf,#34d399)',
    swatch:'linear-gradient(135deg,#2dd4bf,#0d9488)',
  },
  {
    key: 'ember', label: '赤焰',
    bg: 'linear-gradient(160deg,#1a0305 0%,#2d0808 40%,#150304 75%,#0d0202 100%)',
    orb1:'#991b1b', orb2:'#92400e', orb3:'#b91c1c',
    btnGrad: 'linear-gradient(145deg,#ef4444,#dc2626 50%,#b91c1c)',
    btnGlow1:'rgba(239,68,68,0.7)', btnGlow2:'rgba(220,38,38,0.35)',
    numGlow: '0 0 48px rgba(252,165,165,0.9), 0 0 100px rgba(248,113,113,0.45)',
    colonColor:'rgba(252,165,165,0.8)', pingColor:'rgba(248,113,113,0.4)',
    accentBorder:'rgba(239,68,68,0.6)', accentBg:'rgba(239,68,68,0.15)',
    accentShadow:'rgba(239,68,68,0.3)', activeText:'rgba(254,202,202,1)',
    iconColor:'#fca5a5', lineGrad:'linear-gradient(to right,#ef4444,#f97316)',
    swatch:'linear-gradient(135deg,#ef4444,#b91c1c)',
  },
];

const FONTS = [
  { key: 'modern',  label: '现代', family: "'Outfit', sans-serif",    weight: 800 },
  { key: 'mono',    label: '等宽', family: "'Space Mono', monospace", weight: 700 },
  { key: 'display', label: '粗犷', family: "'Bebas Neue', sans-serif", weight: 400 },
];

export default function TimerRunning({
  displayTime,
  isActive,
  category,
  onPause,
  onResume,
  onStop,
}) {
  const [fontKey, setFontKey] = useState('modern');
  const [themeKey, setThemeKey] = useState('violet');

  const cat = CATEGORY_MAP[category] || CATEGORIES[0];
  const isRunning = isActive;
  const activeFont = FONTS.find(f => f.key === fontKey) ?? FONTS[0];
  const theme = THEMES.find(t => t.key === themeKey) ?? THEMES[0];

  const numGlow = isRunning ? theme.numGlow : '0 0 16px rgba(255,255,255,0.08)';
  const colonClr = isRunning ? theme.colonColor : 'rgba(255,255,255,0.16)';

  const handlePlayPause = () => {
    if (isActive) onPause();
    else onResume();
  };

  const segments = [
    { v: displayTime.h, label: 'HOURS' },
    { v: displayTime.m, label: 'MINS' },
    { v: displayTime.s, label: 'SECS' },
  ];

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', userSelect: 'none',
        background: theme.bg, transition: 'background 0.6s',
      }}
    >
      {/* Ambient orbs */}
      <div style={{ position:'absolute', top:'-15%', right:'-10%', width:700, height:700,
        background:`radial-gradient(circle,${theme.orb1} 0%,transparent 65%)`,
        filter:'blur(80px)', opacity:0.3, pointerEvents:'none', transition:'background 0.6s' }} />
      <div style={{ position:'absolute', bottom:'-15%', left:'-10%', width:600, height:600,
        background:`radial-gradient(circle,${theme.orb2} 0%,transparent 65%)`,
        filter:'blur(80px)', opacity:0.25, pointerEvents:'none', transition:'background 0.6s' }} />
      <div style={{ position:'absolute', top:'50%', left:'50%', width:800, height:800,
        transform:'translate(-50%,-50%)',
        background:`radial-gradient(circle,${theme.orb3} 0%,transparent 55%)`,
        filter:'blur(110px)', opacity:0.12, pointerEvents:'none', transition:'background 0.6s' }} />

      {/* Vignette */}
      <div style={{ position:'absolute', inset:0,
        background:'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)',
        pointerEvents:'none', zIndex:1 }} />

      {/* Subject — top */}
      <div style={{ position:'absolute', top:40, left:0, right:0,
        display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:2 }}>
        <div style={{ width:46, height:46, borderRadius:'50%',
          background:`linear-gradient(145deg,${theme.orb1}50,${theme.orb2}30)`,
          border:`1px solid ${theme.iconColor}50`,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 0 22px ${theme.orb1}40`, transition:'all 0.6s' }}>
          <span style={{ fontSize:22, lineHeight:1 }}>{cat.emoji}</span>
        </div>
        <span style={{ fontSize:15, letterSpacing:'0.2em', color:'rgba(255,255,255,0.65)', fontWeight:500 }}>{cat.label}</span>
        <div style={{ width:20, height:1.5, borderRadius:9999, background:theme.lineGrad, opacity:0.65, transition:'background 0.6s' }} />
      </div>

      {/* Timer digits */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:8, position:'relative', zIndex:2 }}>
        {segments.map((seg, i) => (
          <div key={seg.label} style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
            {i > 0 && (
              <div style={{
                fontSize: 130, fontFamily: activeFont.family, fontWeight: activeFont.weight,
                lineHeight: 1, color: colonClr, marginTop: 10, marginBottom: 42,
                textShadow: isRunning ? `0 0 20px ${theme.colonColor}` : 'none',
                transition: 'color 0.6s, text-shadow 0.6s',
                animation: isRunning ? 'colonBlink 1s ease-in-out infinite' : 'none',
              }}>:</div>
            )}
            <div style={{ textAlign:'center' }}>
              <div style={{
                fontSize: 205, fontFamily: activeFont.family, fontWeight: activeFont.weight,
                lineHeight: 1,
                letterSpacing: fontKey === 'mono' ? '0.02em' : '-0.03em',
                color: 'white', textShadow: numGlow,
                fontVariantNumeric: 'tabular-nums', fontFeatureSettings: '"tnum" 1',
                transition: 'text-shadow 0.6s', whiteSpace: 'nowrap',
              }}>
                {seg.v}
              </div>
              <div style={{ fontSize:10, letterSpacing:'0.42em', color:'rgba(255,255,255,0.25)', marginTop:18 }}>
                {seg.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:22, marginTop:60, position:'relative', zIndex:2 }}>
        <div style={{ position:'relative' }}>
          {isRunning && <>
            <div style={{ position:'absolute', inset:-8,  borderRadius:'50%', border:`1.5px solid ${theme.pingColor}`, animation:'playPing 2s ease-in-out infinite' }} />
            <div style={{ position:'absolute', inset:-20, borderRadius:'50%', border:`1px solid ${theme.pingColor}`, opacity:0.5, animation:'playPing 2s ease-in-out 0.65s infinite' }} />
          </>}
          <button
            onClick={handlePlayPause}
            style={{
              width:100, height:100, borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
              background: theme.btnGrad,
              border:'1px solid rgba(255,255,255,0.2)',
              boxShadow:`0 0 36px ${theme.btnGlow1},0 0 72px ${theme.btnGlow2},0 10px 32px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.22)`,
              color:'white', cursor:'pointer', transition:'transform 0.25s, background 0.6s, box-shadow 0.6s',
              position:'relative', zIndex:1,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; }}
          >
            {isRunning
              ? <Pause size={40} fill="white" />
              : <Play size={40} fill="white" style={{ marginLeft:4 }} />
            }
          </button>
        </div>

        <button
          onClick={onStop}
          style={{ display:'flex', alignItems:'center', gap:7, padding:'7px 20px', borderRadius:9999,
            background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)',
            color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:13, letterSpacing:'0.1em', transition:'all 0.22s' }}
          onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.color='rgba(255,255,255,0.7)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='rgba(255,255,255,0.3)'; }}
        >
          <RotateCcw size={12} />
          放弃
        </button>
      </div>

      {/* Bottom selectors */}
      <div style={{ position:'absolute', bottom:28, left:0, right:0,
        display:'flex', flexDirection:'column', alignItems:'center', gap:18, zIndex:2 }}>

        {/* Theme picker */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
          <div style={{ fontSize:10, letterSpacing:'0.35em', color:'rgba(255,255,255,0.2)' }}>页面风格</div>
          <div style={{ display:'flex', gap:14 }}>
            {THEMES.map(t => {
              const active = t.key === themeKey;
              return (
                <button key={t.key} onClick={() => setThemeKey(t.key)} title={t.label}
                  style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                    background:'none', border:'none', cursor:'pointer', padding:'2px 4px' }}>
                  <div style={{
                    width:26, height:26, borderRadius:'50%', background:t.swatch,
                    boxShadow: active
                      ? `0 0 0 2.5px rgba(255,255,255,0.9), 0 0 14px ${t.btnGlow1}`
                      : '0 0 0 1.5px rgba(255,255,255,0.15)',
                    transform: active ? 'scale(1.22)' : 'scale(1)',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                  }} />
                  <span style={{ fontSize:10, letterSpacing:'0.1em',
                    color: active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
                    transition:'color 0.25s' }}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font picker */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
          <div style={{ fontSize:10, letterSpacing:'0.35em', color:'rgba(255,255,255,0.2)' }}>字体风格</div>
          <div style={{ display:'flex', gap:10 }}>
            {FONTS.map(f => {
              const active = f.key === fontKey;
              return (
                <button key={f.key} onClick={() => setFontKey(f.key)}
                  style={{
                    display:'flex', flexDirection:'column', alignItems:'center', gap:5,
                    padding:'10px 16px', borderRadius:14,
                    background: active ? theme.accentBg : 'rgba(255,255,255,0.04)',
                    border: active ? `1px solid ${theme.accentBorder}` : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: active ? `0 0 16px ${theme.accentShadow}` : 'none',
                    cursor:'pointer', transition:'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background='rgba(255,255,255,0.08)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
                >
                  <span style={{ fontFamily:f.family, fontWeight:f.weight, fontSize:24, lineHeight:1,
                    color: active ? theme.activeText : 'rgba(255,255,255,0.45)',
                    letterSpacing:'-0.02em', transition:'color 0.2s' }}>
                    09
                  </span>
                  <span style={{ fontSize:11, letterSpacing:'0.12em',
                    color: active ? theme.activeText : 'rgba(255,255,255,0.28)',
                    transition:'color 0.2s' }}>
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes colonBlink {
          0%,100% { opacity:1; }
          50%      { opacity:0.12; }
        }
        @keyframes playPing {
          0%       { transform:scale(1);   opacity:0.55; }
          80%,100% { transform:scale(1.4); opacity:0; }
        }
      `}</style>
    </div>
  );
}
