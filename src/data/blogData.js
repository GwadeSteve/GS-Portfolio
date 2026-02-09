/**
 * BLOG DATA - Comprehensive Examples
 * 
 * SUPPORTED CONTENT TYPES:
 * - { type: "p", text: "Paragraph text" }           → Regular paragraph
 * - { type: "h3", text: "Heading text" }            → Subheading (H3)
 * - { type: "ul", items: ["Item 1", "Item 2"] }     → Bullet point list
 * - { type: "ol", items: ["First", "Second"] }      → Numbered list
 * - { type: "quote", text: "Quote text" }           → Block quote
 * - { type: "code", text: "console.log('hi')" }     → Code block
 */

export const blogData = [
    {
        title: "The Alignment Problem: Why LLMs Hallucinate",
        date: "Feb 10, 2026",
        category: "Research",
        readTime: "7 min read",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop",
        excerpt: "Exploring the fundamental disconnect between next-token prediction and factual reasoning in modern Large Language Models.",
        content: [
            { type: "p", text: "Large Language Models (LLMs) have revolutionized NLP, but they remain prone to hallucination. This isn't a bug—it's a feature of their probabilistic nature." },

            { type: "h3", text: "The Probabilistic Trap" },
            { type: "p", text: "When an LLM generates text, it's not 'thinking'—it's navigating a high-dimensional vector space to find the most likely completion. This works beautifully for creative writing but fails when truth is binary." },

            { type: "h3", text: "Key Reasons for Hallucination" },
            {
                type: "ul", items: [
                    "Training data contains contradictions that the model learns to 'average'",
                    "The objective function rewards fluency, not factual accuracy",
                    "Long-context generation leads to compounding errors",
                    "Lack of explicit knowledge grounding or retrieval augmentation"
                ]
            },

            { type: "h3", text: "Mitigation Strategies" },
            {
                type: "ol", items: [
                    "Retrieval-Augmented Generation (RAG) to ground responses in external knowledge",
                    "Constitutional AI and RLHF to align outputs with human values",
                    "Chain-of-Thought prompting to encourage step-by-step reasoning",
                    "Uncertainty quantification to flag low-confidence outputs"
                ]
            },

            { type: "quote", text: "The goal isn't to make LLMs never wrong—it's to make them aware when they might be." },

            { type: "p", text: "As we push towards AGI, solving the alignment problem isn't optional—it's existential." }
        ],
        tags: ["NLP", "LLM", "Research", "AI Safety"]
    },
    {
        title: "Microservices vs Monolith: A Real-world Case Study",
        date: "Jan 15, 2026",
        category: "Engineering",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
        excerpt: "How we migrated a legacy Django monolith to a Go-based microservices architecture at TGNIx, and the pitfalls we faced.",
        content: [
            { type: "p", text: "Microservices are often sold as the silver bullet for scalability. But at TGNIx, we learned that distributed complexity comes with its own heavy price tag." },

            { type: "h3", text: "The Starting Point" },
            { type: "p", text: "Our Django monolith served us well for 3 years. It handled authentication, payments, inventory, and reporting—all in one codebase. But as the team grew to 15 engineers, we hit walls:" },

            {
                type: "ul", items: [
                    "Deployments took 45+ minutes and required full regression testing",
                    "A bug in reporting could bring down the entire payment flow",
                    "Onboarding new developers took weeks due to codebase complexity",
                    "Scaling meant scaling everything, even unused features"
                ]
            },

            { type: "h3", text: "The Migration Strategy" },
            {
                type: "ol", items: [
                    "Identify bounded contexts using Domain-Driven Design (DDD)",
                    "Implement the Strangler Fig pattern—wrap legacy endpoints with new services",
                    "Start with the least critical service (Reporting) as a pilot",
                    "Build robust observability before migrating critical paths",
                    "Run shadow traffic to validate correctness before cutover"
                ]
            },

            { type: "h3", text: "What We Got Wrong" },
            {
                type: "ul", items: [
                    "Underestimated network latency—service-to-service calls added 200ms",
                    "Distributed transactions are HARD—we needed eventual consistency patterns",
                    "Each service needed its own CI/CD pipeline—DevOps overhead tripled",
                    "Debugging distributed traces requires serious tooling investment"
                ]
            },

            { type: "quote", text: "If you can't build a well-structured monolith, you can't build microservices either." },

            { type: "h3", text: "The Verdict" },
            { type: "p", text: "After 18 months, we have 8 services in production. Deployment time dropped to 5 minutes per service. But our operational complexity increased 3x. The trade-off was worth it for us—but it's not for everyone." }
        ],
        tags: ["System Design", "Golang", "Backend", "Architecture"]
    },
    {
        title: "Optimizing PyTorch for Edge Devices",
        date: "Dec 05, 2025",
        category: "Tutorial",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670&auto=format&fit=crop",
        excerpt: "A deep dive into quantization and pruning techniques to run BERT models on mobile CPUs with <100ms latency.",
        content: [
            { type: "p", text: "Edge AI is all about doing more with less. In this guide, we'll walk through practical techniques to deploy transformer models on resource-constrained devices." },

            { type: "h3", text: "Why Edge Deployment?" },
            {
                type: "ul", items: [
                    "Privacy: Data never leaves the device",
                    "Latency: No network round-trip required",
                    "Reliability: Works offline",
                    "Cost: No cloud inference costs"
                ]
            },

            { type: "h3", text: "Optimization Techniques" },

            { type: "h3", text: "1. Quantization" },
            { type: "p", text: "Quantization reduces model precision from FP32 to INT8, cutting model size by 4x with minimal accuracy loss." },
            { type: "code", text: "import torch.quantization\nmodel_quantized = torch.quantization.quantize_dynamic(\n    model, {torch.nn.Linear}, dtype=torch.qint8\n)" },

            { type: "h3", text: "2. Pruning" },
            { type: "p", text: "Pruning removes redundant weights. Structured pruning removes entire neurons; unstructured pruning zeros individual weights." },

            { type: "h3", text: "3. Knowledge Distillation" },
            { type: "p", text: "Train a smaller 'student' model to mimic a larger 'teacher' model's outputs." },

            { type: "h3", text: "Results on Mobile" },
            {
                type: "ul", items: [
                    "Original BERT-base: 440MB, 850ms inference",
                    "Quantized: 110MB, 280ms inference",
                    "Distilled + Quantized: 25MB, 65ms inference"
                ]
            },

            { type: "p", text: "With these techniques, we achieved real-time NLP inference on a Pixel 6—opening doors for offline assistants, privacy-first apps, and low-latency interactions." }
        ],
        tags: ["Edge AI", "PyTorch", "Performance", "Mobile"]
    },
    {
        title: "Building a Design System from Scratch",
        date: "Nov 20, 2025",
        category: "Engineering",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2564&auto=format&fit=crop",
        excerpt: "How I created a cohesive design system for my portfolio using CSS custom properties and component-driven development.",
        content: [
            { type: "p", text: "A design system isn't just a style guide—it's a shared language between design and development that ensures consistency and accelerates iteration." },

            { type: "h3", text: "Core Principles" },
            {
                type: "ol", items: [
                    "Start with design tokens (colors, spacing, typography)",
                    "Build atoms before molecules before organisms",
                    "Document everything with usage examples",
                    "Make accessibility non-negotiable"
                ]
            },

            { type: "h3", text: "The Token Layer" },
            { type: "p", text: "I use CSS custom properties as design tokens. They cascade naturally and can be overridden per-context (like dark mode)." },
            { type: "code", text: ":root {\n  --color-primary: #22d3ee;\n  --space-md: 1.5rem;\n  --font-heading: 'Inter', sans-serif;\n}" },

            { type: "h3", text: "Component Checklist" },
            {
                type: "ul", items: [
                    "Does it have clear props/variants?",
                    "Is it accessible (ARIA, keyboard nav)?",
                    "Does it handle edge cases (empty state, loading)?",
                    "Is it responsive by default?"
                ]
            },

            { type: "quote", text: "The best design system is one your team actually uses." }
        ],
        tags: ["Design Systems", "CSS", "Frontend", "DX"]
    }
];
