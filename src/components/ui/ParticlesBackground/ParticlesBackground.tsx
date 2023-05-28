import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await container;
  }, []);

  return (
    <div className={'absolute top-0 left-0 w-full h-full z-0'}>
      <Particles
        className={'w-full h-[98%]'}
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          fullScreen: { enable: false, zIndex: -1 },
          particles: {
            color: {
              value: '#d1e8ec',
            },
            links: {
              color: '#d1e8ec',
              distance: 350,
              enable: true,
              opacity: 0.2,
              width: 2,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 20,
            },
            opacity: {
              value: 1,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 5, max: 12 },
            },
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              resize: true,
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};
