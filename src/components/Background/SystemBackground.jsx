import React, { useEffect, useRef } from 'react';

const SystemBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let packets = [];
        let junctions = [];

        const config = {
            gridSpacing: 60,
            gridColor: 'rgba(249, 115, 22, 0.05)', // Extremely faint Amber
            packetCount: 8,         // Reduced from 15
            packetSpeed: 1.5,       // Reduced from 2
            packetColor: '#f97316',
            junctionCount: 8,       // Reduced from 12
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initElements();
        };

        const initElements = () => {
            packets = [];
            junctions = [];

            // 1. Define Virtual Grid
            const cols = Math.ceil(canvas.width / config.gridSpacing);
            const rows = Math.ceil(canvas.height / config.gridSpacing);

            // 2. Junctions (Server Nodes) at random grid intersections
            for (let i = 0; i < config.junctionCount; i++) {
                const cx = Math.floor(Math.random() * cols) * config.gridSpacing;
                const cy = Math.floor(Math.random() * rows) * config.gridSpacing;
                junctions.push({
                    x: cx,
                    y: cy,
                    size: Math.random() * 2 + 1,
                    pulse: Math.random() * Math.PI,
                    active: false
                });
            }

            // 3. Data Packets
            for (let i = 0; i < config.packetCount; i++) {
                spawnPacket();
            }
        };

        const spawnPacket = () => {
            // Pick a random axis (Horizontal vs Vertical)
            const axis = Math.random() > 0.5 ? 'h' : 'v';
            const fixed = Math.floor(Math.random() * (axis === 'h' ? canvas.height : canvas.width) / config.gridSpacing) * config.gridSpacing;

            packets.push({
                x: axis === 'h' ? (Math.random() > 0.5 ? -100 : canvas.width + 100) : fixed,
                y: axis === 'v' ? (Math.random() > 0.5 ? -100 : canvas.height + 100) : fixed,
                axis: axis,
                speed: (Math.random() * 2 + 2) * (Math.random() > 0.5 ? 1 : -1), // Random direction
                size: Math.random() * 2 + 1,
                tail: Math.random() * 50 + 20
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw Static Grid (Very Faint)
            ctx.strokeStyle = config.gridColor;
            ctx.lineWidth = 0.5;
            ctx.beginPath();

            // Vertical Lines
            for (let x = 0; x <= canvas.width; x += config.gridSpacing) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            // Horizontal Lines
            for (let y = 0; y <= canvas.height; y += config.gridSpacing) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();


            // 2. Draw Junctions (Blinking Servers)
            junctions.forEach(j => {
                j.pulse += 0.05;
                const alpha = (Math.sin(j.pulse) + 1) / 2 * 0.4 + 0.1;

                ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;
                ctx.beginPath();
                ctx.arc(j.x, j.y, j.size, 0, Math.PI * 2);
                ctx.fill();

                // Active Burst (if a packet passed nearby recently - simulated random for now)
                if (Math.random() < 0.01) {
                    ctx.strokeStyle = `rgba(249, 115, 22, 0.8)`;
                    ctx.beginPath();
                    ctx.arc(j.x, j.y, j.size * 3, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });

            // 3. Draw Data Packets
            ctx.fillStyle = config.packetColor;

            packets.forEach((p, index) => {
                if (p.axis === 'h') {
                    p.x += p.speed;
                } else {
                    p.y += p.speed;
                }

                // Draw Packet Head
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Draw Tail (Gradient fade)
                const grad = p.axis === 'h'
                    ? ctx.createLinearGradient(p.x - (p.tail * Math.sign(p.speed)), p.y, p.x, p.y)
                    : ctx.createLinearGradient(p.x, p.y - (p.tail * Math.sign(p.speed)), p.x, p.y);

                grad.addColorStop(0, 'rgba(249, 115, 22, 0)');
                grad.addColorStop(1, 'rgba(249, 115, 22, 0.4)');

                ctx.fillStyle = grad;
                if (p.axis === 'h') {
                    ctx.fillRect(Math.min(p.x, p.x - (p.tail * Math.sign(p.speed))), p.y - 1, Math.abs(p.tail), 2);
                } else {
                    ctx.fillRect(p.x - 1, Math.min(p.y, p.y - (p.tail * Math.sign(p.speed))), 2, Math.abs(p.tail));
                }

                // Reset if out of bounds
                const buffer = 150;
                if (p.x < -buffer || p.x > canvas.width + buffer || p.y < -buffer || p.y > canvas.height + buffer) {
                    packets.splice(index, 1);
                    spawnPacket();
                }
            });

            // Maintain packet count
            while (packets.length < config.packetCount) {
                spawnPacket();
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default SystemBackground;
