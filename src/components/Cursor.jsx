import { useEffect, useRef } from 'react';

/* Custom cursor — a small dot and an eased golden ring.
   Only mounted on fine pointers; disabled for reduced motion. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let x = -100, y = -100, rx = -100, ry = -100;
    let raf = 0;
    let hover = false;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      if (!raf) loop();
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e) => {
      hover = !!e.target.closest('a, button, [data-cursor]');
      ring.classList.toggle('cursor__ring--hover', hover);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring" />
    </div>
  );
}
