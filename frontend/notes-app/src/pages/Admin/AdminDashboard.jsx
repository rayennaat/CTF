import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function AdminDashboard() {
  const [active, setActive] = useState("Main");

  useEffect(() => {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}[]";
    const columns = Math.floor(canvas.width / 20);
    const drops = Array(columns).fill(0);

    const particles = [];
    const particleCount = 200;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        size: Math.random() * 5 + 1,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = "15px monospace";
      drops.forEach((y, i) => {
        const speed = 1 + Math.random() * 2;
        drops[i] += speed;
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.globalAlpha = Math.random() * 0.5 + 0.5;
        ctx.fillText(text, i * 20, drops[i] * 20);
        ctx.globalAlpha = 1;

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      });

      particles.forEach((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.dx = -particle.dx;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.dy = -particle.dy;
        }

        ctx.fillStyle = "#00ff00";
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 ml-64 p-10 flex flex-col justify-center items-center relative overflow-hidden">
        <canvas id="matrixCanvas" className="absolute top-0 left-0 w-full h-full z-0" />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold text-green-400 mb-4 animate-pulse">
            Welcome to your Administration Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            Manage your CTF challenges, users, and more.
          </p>
        </div>
      </main>
    </div>
  );
}