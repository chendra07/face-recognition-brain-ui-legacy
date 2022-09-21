import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = ({
  onClick = false,
  onHover = false,
  numOfParticles = 70,
  opacity = 0.6,
  linkDistance = 200,
}) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <Particles
      className="z-0"
      id="tsparticles"
      // url="http://foo.bar/particles.json"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: onClick,
              mode: "push",
            },
            onHover: {
              enable: onHover,
              mode: "repulse",
            },
            resize: true,
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: linkDistance,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
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
            value: numOfParticles,
          },
          opacity: {
            value: opacity,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: false,
        zLayers: 1,
      }}
    />
  );
};

export default ParticleBackground;
