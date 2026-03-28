import { useState, useCallback, useRef } from "react";

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) return;
    const x = e.clientX;
    const y = e.clientY;
    const target = e.currentTarget as HTMLElement;
    rafRef.current = requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      setPos({ x: x - rect.left, y: y - rect.top });
      rafRef.current = null;
    });
  }, []);

  const handleMouseEnter = useCallback(() => setActive(true), []);
  const handleMouseLeave = useCallback(() => setActive(false), []);

  return { pos, active, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

export function useCardSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (rafRef.current) return;
    const x = e.clientX;
    const y = e.clientY;
    const target = e.currentTarget as HTMLElement;
    rafRef.current = requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      setPos({ x: x - rect.left, y: y - rect.top });
      rafRef.current = null;
    });
  }, []);

  const onMouseEnter = useCallback(() => setHovering(true), []);
  const onMouseLeave = useCallback(() => setHovering(false), []);

  return { pos, hovering, onMouseMove, onMouseEnter, onMouseLeave };
}
