import { ImageResponse } from 'next/og';

export const alt = 'FULLKEEM · Developer, AX Tutor/Mentor';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden',
          padding: '42px', background: '#263ee8', color: '#f0efe9', fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ position: 'absolute', width: 430, height: 430, borderRadius: 999, background: '#f0efe9', left: 410, top: 96, border: '4px solid #11110f' }} />
        <div style={{ position: 'absolute', width: 190, height: 190, borderRadius: 999, background: '#ff5722', right: 72, bottom: 50, border: '4px solid #11110f', boxShadow: '14px 14px 0 #11110f' }} />
        <div style={{ position: 'absolute', width: 270, height: 80, background: '#d8ff55', right: 62, top: 92, border: '4px solid #11110f', transform: 'rotate(4deg)' }} />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2, border: '3px solid #11110f', padding: '28px 34px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#11110f', fontSize: 20, fontWeight: 700, letterSpacing: 2 }}>
            <span>BUILD / TEACH / MENTOR</span><span>SEOUL · 2026</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 164, lineHeight: .76, letterSpacing: -12, fontWeight: 900, textShadow: '8px 8px 0 #11110f' }}>FULLKEEM</span>
            <span style={{ alignSelf: 'flex-start', marginTop: 40, padding: '12px 18px', background: '#11110f', color: '#f0efe9', fontSize: 29, fontWeight: 700, letterSpacing: 4 }}>
              Developer, AX Tutor/Mentor
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
