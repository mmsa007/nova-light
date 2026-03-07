import type {FC} from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type SceneLayoutProps = {
  title: string;
  subtitle?: string;
  bullets?: string[];
};

export const SceneLayout: FC<SceneLayoutProps> = ({title, subtitle, bullets = []}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 14
    }
  });

  const contentOpacity = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(120deg, #0f172a 0%, #1e293b 55%, #334155 100%)',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: 96,
        boxSizing: 'border-box'
      }}
    >
      <div style={{transform: `scale(${titleScale})`, transformOrigin: 'left center'}}>
        <h1 style={{fontSize: 76, margin: 0, letterSpacing: 1}}>{title}</h1>
      </div>

      {subtitle ? <p style={{fontSize: 40, color: '#cbd5e1', marginTop: 28}}>{subtitle}</p> : null}

      <ul style={{marginTop: 28, opacity: contentOpacity, fontSize: 38, lineHeight: 1.6}}>
        {bullets.map((bullet) => (
          <li key={bullet} style={{marginBottom: 12}}>
            {bullet}
          </li>
        ))}
      </ul>
    </AbsoluteFill>
  );
};
