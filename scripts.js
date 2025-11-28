// particles.js config
particlesJS("particles-js", {
    particles: {
      number: {
        value: 50,
        density: { enable: true, value_area: 500 }
      },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 10, size_min: 0.1, sync: false }
      },
      line_linked: { enable: false },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    },
    retina_detect: true
  });
  
  