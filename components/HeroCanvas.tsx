"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's wireframe orb. Geometry, materials and motion constants come from
 * the design artifact; the guards are ours — three is dynamically imported and
 * skipped entirely below 900px and under prefers-reduced-motion, so it never
 * touches the initial bundle or mobile.
 */
export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 900) return;

    let disposed = false;
    let raf = 0;
    let teardown: (() => void) | null = null;

    void import("three").then((THREE) => {
      if (disposed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 5.2;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const group = new THREE.Group();
      scene.add(group);

      const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x0a1226,
        transparent: true,
        opacity: 0.55,
      });
      group.add(new THREE.Mesh(coreGeo, coreMat));

      const wireGeo = new THREE.WireframeGeometry(
        new THREE.IcosahedronGeometry(1.52, 1)
      );
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x4c6fff,
        transparent: true,
        opacity: 0.42,
      });
      group.add(new THREE.LineSegments(wireGeo, wireMat));

      const shellGeo = new THREE.WireframeGeometry(
        new THREE.IcosahedronGeometry(2.35, 0)
      );
      const shellMat = new THREE.LineBasicMaterial({
        color: 0x24d8c4,
        transparent: true,
        opacity: 0.18,
      });
      const shell = new THREE.LineSegments(shellGeo, shellMat);
      group.add(shell);

      const count = 900;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = 3 + Math.random() * 5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
        pos[i * 3 + 2] = r * Math.cos(ph);
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0x9fb4ff,
        size: 0.028,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      const resize = () => {
        const w = canvas.clientWidth || canvas.parentElement?.clientWidth || 0;
        const h = canvas.clientHeight || canvas.parentElement?.clientHeight || 0;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const wide = w > 900;
        group.position.set(wide ? 1.9 : 0, wide ? 0.1 : 0.6, 0);
        group.scale.setScalar(wide ? 1 : 0.72);
      };
      resize();
      window.addEventListener("resize", resize);

      const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      const onMove = (e: PointerEvent) => {
        mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const clock = new THREE.Clock();
      const loop = () => {
        if (disposed) return;
        raf = requestAnimationFrame(loop);
        // Stop rendering once the hero has scrolled past.
        if (canvas.getBoundingClientRect().bottom < 0) return;
        const t = clock.getElapsedTime();
        mouse.x += (mouse.tx - mouse.x) * 0.045;
        mouse.y += (mouse.ty - mouse.y) * 0.045;
        group.rotation.y = t * 0.11 + mouse.x * 0.32;
        group.rotation.x = Math.sin(t * 0.24) * 0.14 + mouse.y * 0.2;
        shell.rotation.y = -t * 0.16;
        shell.rotation.z = t * 0.06;
        dust.rotation.y = t * 0.02 + mouse.x * 0.08;
        dust.rotation.x = mouse.y * 0.05;
        renderer.render(scene, camera);
      };
      loop();

      teardown = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
        coreGeo.dispose();
        coreMat.dispose();
        wireGeo.dispose();
        wireMat.dispose();
        shellGeo.dispose();
        shellMat.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        renderer.dispose();
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      teardown?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  );
}
