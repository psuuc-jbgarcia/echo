import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters to display
    const matrixChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charsArray = matrixChars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    // Array for drops - one per column
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start off-screen
    }

    // Determine current theme to set alpha opacity properly
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const draw = () => {
      // Black background with extreme transparency to show the trail
      ctx.fillStyle = isDark ? 'rgba(18, 18, 18, 0.05)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        
        // Randomize the color slightly, more cyan/blue based on theme vars ideally,
        // but since we're in canvas, we'll use a fixed hex with low opacity.
        // We want it to be *very* subtle.
        ctx.fillStyle = isDark ? 'rgba(29, 233, 182, 0.15)' : 'rgba(41, 98, 255, 0.1)';
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30fps

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0, /* ensure it stays behind the workspace but above bg */
      }}
    />
  );
};

export default MatrixRain;
