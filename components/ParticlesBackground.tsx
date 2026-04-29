'use client';
import React, { useLayoutEffect } from 'react';

declare global {
  interface Window {
    particlesJS?: (elementId: string, config: Record<string, unknown>) => void;
  }
}

interface ParticlesBackgroundProps {
  colors?: string[];
  size?: number;
  countDesktop?: number;
  countTablet?: number;
  countMobile?: number;
  zIndex?: number;
  height?: string;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  colors = ['#ff223e', '#5d1eb2', '#ff7300'],
  size = 3,
  countDesktop = 60,
  countTablet = 50,
  countMobile = 40,
  height = '100%',
}) => {
  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = () => {
      const particlesElement = document.getElementById('js-particles');
      if (particlesElement && window.particlesJS) {
        const getParticleCount = () => {
          const screenWidth = window.innerWidth;
          if (screenWidth > 1024) return countDesktop;
          if (screenWidth > 768) return countTablet;
          return countMobile;
        };

        window.particlesJS('js-particles', {
          particles: {
            number: { value: getParticleCount() },
            color: { value: colors },
            shape: { type: 'circle' },
            opacity: { value: 1, random: false },
            size: { value: size, random: true },
            line_linked: { enable: false },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'bounce', // 👈 bounce inside instead of escaping
            },
          },
          interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: false }, onclick: { enable: false }, resize: true },
          },
          retina_detect: true,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [colors, size, countDesktop, countTablet, countMobile]);

  return (
    <div
      id="js-particles"
      style={{
        width: '100%',
        height: height,
        position: 'absolute', // stays inside parent if parent is relative
        top: 0,
        left: 0,
        pointerEvents: 'none',
        overflow: 'hidden', // 👈 ensures particles never overflow
      }}
      className="-z-0"
    >
      <style>{`
        #js-particles canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default ParticlesBackground;
