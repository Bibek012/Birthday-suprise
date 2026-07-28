import confetti from "canvas-confetti";

const PALETTE = ["#FF8FB3", "#F76B9C", "#E94F8A", "#FFD6E8", "#E8B84B"];

export function burstConfetti() {
  const duration = 1400;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors: PALETTE,
      scalar: 0.9,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors: PALETTE,
      scalar: 0.9,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({
    particleCount: 90,
    spread: 100,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors: PALETTE,
  });
}

export function heartFountain() {
  const scalar = 1.4;
  const heart = confetti.shapeFromText({ text: "♥", scalar });
  confetti({
    particleCount: 30,
    spread: 70,
    origin: { y: 0.65 },
    shapes: [heart],
    scalar,
    colors: PALETTE,
  });
}
