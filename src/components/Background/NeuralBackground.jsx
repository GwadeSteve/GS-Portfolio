import React, { useEffect, useRef } from 'react';

const NeuralBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration: "Ghost-in-the-Shell" Minimalist
        const config = {
            layersCount: 5,
            nodesPerLayer: 7,
            color: '34, 211, 238', // Cyan (#22d3ee)
            nodeOpacity: 0.12,     // Extreme transparency
            synapseOpacity: 0.02,  // Almost invisible
            flowOpacity: 0.15,     // Subtle flow
            topOffset: 150,
            curveTension: 0.4
        };

        let layers = [];
        let paths = [];
        let flows = [];

        const resize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initArchitecture();
        };

        const initArchitecture = () => {
            layers = [];
            paths = [];
            flows = [];

            const layerSpacing = canvas.width / (config.layersCount + 1);

            // 1. Initialize Nodes
            for (let i = 0; i < config.layersCount; i++) {
                const nodes = [];
                const count = config.nodesPerLayer + (i === 0 || i === config.layersCount - 1 ? -2 : 2);
                const x = layerSpacing * (i + 1);
                const availableHeight = canvas.height - config.topOffset - 100;
                const ySpacing = availableHeight / (count + 1);

                for (let j = 0; j < count; j++) {
                    nodes.push({
                        x: x + (Math.random() - 0.5) * 40,
                        y: config.topOffset + ySpacing * (j + 1) + (Math.random() - 0.5) * 30,
                        size: 1.5
                    });
                }
                layers.push(nodes);
            }

            // 2. Pre-calculate Paths (Bezier)
            for (let i = 0; i < layers.length - 1; i++) {
                const currentLayer = layers[i];
                const nextLayer = layers[i + 1];

                for (let j = 0; j < currentLayer.length; j++) {
                    const startNode = currentLayer[j];
                    for (let k = 0; k < nextLayer.length; k++) {
                        const endNode = nextLayer[k];

                        // Create a unique curved path
                        const cp1x = startNode.x + (endNode.x - startNode.x) * config.curveTension;
                        const cp2x = endNode.x - (endNode.x - startNode.x) * config.curveTension;

                        paths.push({
                            x0: startNode.x, y0: startNode.y,
                            cp1x: cp1x, cp1y: startNode.y,
                            cp2x: cp2x, cp2y: endNode.y,
                            x1: endNode.x, y1: endNode.y
                        });
                    }
                }
            }
        };

        const createFlow = () => {
            if (paths.length === 0) return;
            const path = paths[Math.floor(Math.random() * paths.length)];
            flows.push({
                path: path,
                progress: 0,
                speed: 0.003 + Math.random() * 0.005,
                length: 0.1 + Math.random() * 0.2
            });
        };

        // Bezier interpolation helper
        const getBezierPoint = (p, t) => {
            const cx = 3 * (p.cp1x - p.x0);
            const bx = 3 * (p.cp2x - p.cp1x) - cx;
            const ax = p.x1 - p.x0 - cx - bx;
            const cy = 3 * (p.cp1y - p.y0);
            const by = 3 * (p.cp2y - p.cp1y) - cy;
            const ay = p.y1 - p.y0 - cy - by;
            const x = ((ax * t + bx) * t + cx) * t + p.x0;
            const y = ((ay * t + by) * t + cy) * t + p.y0;
            return { x, y };
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. Draw Curved Synapses
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${config.color}, ${config.synapseOpacity})`;
            paths.forEach(p => {
                ctx.beginPath();
                ctx.moveTo(p.x0, p.y0);
                ctx.bezierCurveTo(p.cp1x, p.cp1y, p.cp2x, p.cp2y, p.x1, p.y1);
                ctx.stroke();
            });

            // 2. Update & Draw Flows
            for (let i = flows.length - 1; i >= 0; i--) {
                const f = flows[i];
                f.progress += f.speed;

                if (f.progress > 1 + f.length) {
                    flows.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = `rgba(${config.color}, ${config.flowOpacity})`;

                const steps = 15;
                for (let j = 0; j <= steps; j++) {
                    const t = f.progress - (j / steps) * f.length;
                    if (t >= 0 && t <= 1) {
                        const pt = getBezierPoint(f.path, t);
                        if (j === 0) ctx.moveTo(pt.x, pt.y);
                        else ctx.lineTo(pt.x, pt.y);
                    }
                }
                ctx.stroke();
            }

            if (Math.random() < 0.04) createFlow();

            // 3. Draw Nodes (Subtle Points)
            layers.forEach(layer => {
                layer.forEach(node => {
                    ctx.fillStyle = `rgba(${config.color}, ${config.nodeOpacity})`;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                    ctx.fill();
                });
            });

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

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.7
            }}
        />
    );
};

export default NeuralBackground;
