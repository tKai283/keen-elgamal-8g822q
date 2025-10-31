import React, { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let offset = 0;
    const speed = 3;
    let time = 0;

    // --- パーティクル（生物発光） ---
    const particles = Array.from({ length: 150 }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: depth,
        size: Math.random() * 2 + 0.5 + depth * 2,
        speedX: (Math.random() - 0.5) * 0.3 * (1 + depth),
        speedY: (Math.random() - 0.5) * 0.2 + 0.1,
        opacity: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.02,
      };
    });

    // --- 地面オブジェクト ---
    const rocks = Array.from({ length: 60 }, () => ({
      z: Math.random() * 2000,
      side: Math.random() > 0.5 ? "left" : "right",
      size: Math.random() * 120 + 60,
      type: 1,
      offsetX: Math.random() * 400 + 80,
      rotation: Math.random() * Math.PI * 2,
      glowPhase: Math.random() * Math.PI * 2,
    }));

    // --- 魚 ---
    const fishes = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6,
      z: Math.random(),
      size: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.5) * 2,
      direction: Math.random() > 0.5 ? 1 : -1,
      swimPhase: Math.random() * Math.PI * 2,
    }));

    // --- 敵キャラ ---
    const enemy = {
      spawning: false,
      spawnProgress: 0,
      spawnDuration: 60,
      alive: false,
      despawnTimer: 0,
      x: canvas.width / 2,
      y: canvas.height * 0.35,
      targetX: canvas.width / 2,
      targetY: canvas.height * 0.35,
      velocityX: 0,
      velocityY: 0,
      rotation: 0,
      moveTimer: 0,
      floatPhase: Math.random() * Math.PI * 2,
      wobblePhase: Math.random() * Math.PI * 2,
    };

    // --- 敵召喚関数 ---
    function spawnEnemy() {
      if (!enemy.spawning && !enemy.alive) {
        enemy.spawning = true;
        enemy.spawnProgress = 0;
        enemy.x = canvas.width / 2;
        enemy.y = canvas.height * 0.35;
      }
    }

    // --- 敵更新 ---
    function updateEnemy() {
      if (enemy.spawning) {
        enemy.spawnProgress++;
        if (enemy.spawnProgress >= enemy.spawnDuration) {
          enemy.spawning = false;
          enemy.alive = true;
          enemy.despawnTimer = 1500;
          enemy.moveTimer = 0;
        }
      }
      if (enemy.alive) {
        enemy.despawnTimer--;
        enemy.moveTimer--;
        if (enemy.moveTimer <= 0) {
          enemy.moveTimer = Math.random() * 120 + 60;
          const rangeX = canvas.width * 0.3;
          const rangeY = canvas.height * 0.15;
          enemy.targetX = canvas.width / 2 + (Math.random() - 0.5) * rangeX;
          enemy.targetY = canvas.height * 0.35 + (Math.random() - 0.5) * rangeY;
        }
        const dx = enemy.targetX - enemy.x;
        const dy = enemy.targetY - enemy.y;
        enemy.velocityX += dx * 0.001;
        enemy.velocityY += dy * 0.001;
        enemy.velocityX *= 0.95;
        enemy.velocityY *= 0.95;
        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;

        enemy.floatPhase += 0.02;
        enemy.wobblePhase += 0.03;
        if (enemy.despawnTimer <= 0) enemy.alive = false;
      }
    }

    // --- パーティクル描画 ---
    function drawParticles() {
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y > canvas.height + 50) {
          p.y = -50;
          p.x = Math.random() * canvas.width;
        }
        const pulse = Math.sin(time * p.pulseSpeed + p.x * 0.01) * 0.4 + 0.6;
        const size = p.size * (0.5 + p.z * 0.5);
        ctx.fillStyle = `rgba(0, 200, 255, ${
          p.opacity * pulse * (0.3 + p.z * 0.7)
        })`;
        ctx.shadowBlur = 8 + p.z * 8;
        ctx.shadowColor = "#00CCFF";
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    // --- メイン描画ループ ---
    function animate() {
      offset += speed;
      if (offset >= 1000) offset = 0;
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateEnemy();
      drawParticles();
      requestAnimationFrame(animate);
    }

    // --- リサイズ対応 ---
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // --- 敵出現間隔 ---
    const enemyInterval = setInterval(spawnEnemy, 2000);
    spawnEnemy();

    animate();

    return () => {
      clearInterval(enemyInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #0d3d5c, #0a2d4d, #052033)",
        zIndex: -1,
      }}
    />
  );
}
