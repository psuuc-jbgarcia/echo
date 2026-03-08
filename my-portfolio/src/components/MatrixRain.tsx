import { useEffect, useRef } from 'react';

const MatrixRain = ({ isDarkMode }: { isDarkMode: boolean }) => {
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
    const matrixChars = '01';
    const charsArray = matrixChars.split('');
    const fontSize = 18;
    const colSpacing = fontSize * 2; // Double spacing so binary chars don't crowd each other
    const columns = Math.floor(canvas.width / colSpacing);

    // Array for drops - one per column
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start off-screen
    }

    const draw = () => {
      // Clear old characters faster so they don't stack/pile up
      ctx.fillStyle = isDarkMode ? 'rgba(18, 18, 18, 0.15)' : 'rgba(240, 242, 245, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        
        // Randomize the color slightly, more cyan/blue based on theme vars ideally,
        // but since we're in canvas, we'll use a fixed hex with low opacity.
        // We want it to be *very* subtle.
        ctx.fillStyle = isDarkMode ? 'rgba(29, 233, 182, 0.6)' : 'rgba(0, 132, 255, 0.5)';
        
        ctx.fillText(text, i * colSpacing, drops[i] * fontSize);

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
  }, [isDarkMode]);

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
