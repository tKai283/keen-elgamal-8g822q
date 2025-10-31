// src/components/Enemy.js
import React, { useEffect, useRef } from "react";

export default function Enemy() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

    let time = 0;

    function spawnEnemy() {
      if (!enemy.spawning && !enemy.alive) {
        enemy.spawning = true;
        enemy.spawnProgress = 0;
        enemy.x = canvas.width / 2;
        enemy.y = canvas.height * 0.35;
      }
    }

    function updateEnemy() {
      if (enemy.spawning) {
        enemy.spawnProgress++;
        if (enemy.spawnProgress >= enemy.spawnDuration) {
          enemy.spawning = false;
          enemy.alive = true;
          enemy.despawnTimer = 900;
          enemy.moveTimer = 0;
        }
      }

      if (enemy.alive) {
        enemy.despawnTimer--;
        enemy.moveTimer--;
        if (enemy.moveTimer <= 0) {
          enemy.moveTimer = Math.random() * 120 + 60;
          const centerX = canvas.width / 2;
          const centerY = canvas.height * 0.35;
          enemy.targetX = centerX + (Math.random() - 0.5) * canvas.width * 0.3;
          enemy.targetY =
            centerY + (Math.random() - 0.5) * canvas.height * 0.15;
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

        if (enemy.despawnTimer <= 0) {
          enemy.alive = false;
        }
      }
    }

    function drawEnemy(x, y, scale, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#1a0033";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#6600FF";
      ctx.beginPath();
      ctx.arc(0, -50, 70 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;
      updateEnemy();

      if (enemy.spawning) {
        const progress = enemy.spawnProgress / enemy.spawnDuration;
        drawEnemy(enemy.x, enemy.y, 1, progress);
      } else if (enemy.alive) {
        const floatY = Math.sin(enemy.floatPhase) * 15;
        drawEnemy(enemy.x, enemy.y + floatY, 1, 1);
      }

      requestAnimationFrame(animate);
    }

    animate();
    const interval = setInterval(spawnEnemy, 2000);

    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="background-canvas" />;
}
