export const portfolioData = {
    hero: {
        // Dynamic headlines based on mode
        headlines: {
            ml: ["I Build", "Intelligent Systems", "That Work"], // Highlight middle
            fullstack: ["I Architect", "Software & AI", "Grounded In Research"] // Highlight middle
        },
        resume: {
            ml: "resume/ML_Resume_GwadeSteve.pdf",
            fullstack: "resume/FullStack_Resume_GwadeSteve.pdf",
        },
        socials: {
            github: "https://github.com/GwadeSteve",
            linkedin: "https://www.linkedin.com/in/gwadesteve",
            email: "gwade.steve.dev@gmail.com"
        }
    },
    about: {
        photoUrl: "/images/BlackandWhite.jpg",
        // Dynamic text for "Human" connection
        text: {
            ml: "I’ve spent 3 years working on machine learning problems, mostly in computer vision but also around automation, LLM-based systems, and applied research. I’ve trained models from scratch, fine-tuned existing ones, designed objectives, and run large experiment cycles under real constraints like limited data, limited compute, and noisy labels. I care about understanding the problem first, then building models that actually make sense for the business and can be deployed without falling apart.",
            fullstack: "I have 2+ years of full-stack experience building and shipping software products end to end. I’ve built APIs, web and mobile backends, integrated ML models into production, handled data, auth, and deployment, and maintained systems used by real people. I focus on clarity, performance, and reliability, and I like systems that stay simple even as they grow."
        }

    },
    projects: {
        ml: [
            {
                title: "LINA",
                descriptor: "Multimodal Assistive Vision System",
                image: "https://lina-bgjd.onrender.com/images/Proto.png",
                tags: [
                    "Computer Vision",
                    "Edge AI",
                    "Multimodal",
                    "Huawei MindSpore",
                    "Raspberry Pi"
                ],
                details: {
                    problem: "Assistive vision systems must understand real-world scenes while running under tight compute and latency limits.",
                    role: "CV Engineer",
                    how: "Worked on the computer vision stack using Huawei MindSpore and MindYOLO, and helped design a multimodal pipeline split between on-device inference on Raspberry Pi 4 and cloud-based models.",
                    outcome: "Functional real-time prototype, Won Global at the Huawei ICT Competition In China.",
                    link: "https://lina-bgjd.onrender.com"
                }
            },
            {
                title: "PlumVision",
                descriptor: "Real-time Agricultural Classification",
                image: "/images/Experience/PlumVision.png",
                tags: ["Computer Vision", "FastAPI", "WebSocket"],
                details: {
                    problem: "Manual plum sorting is slow, inconsistent, and hard to scale.",
                    role: "Lead Developer (JCIA Hackathon)",
                    how: "Built a real-time vision system with PyTorch, FastAPI, and WebSockets for live feedback.",
                    outcome: "Delivers robust classification for medium-to-large scale businesses.",
                    link: "https://github.com/GwadeSteve/JCIA_Plum_Challenge/"
                }
            },
            {
                title: "Spoof Detector",
                descriptor: "Deep Learning Security Service",
                image: "/images/Experience/Spoof.png",
                tags: ["Deep Learning", "Security", "API"],
                details: {
                    problem: "Facial recognition systems are vulnerable to presentation attacks.",
                    role: "ML Engineer",
                    how: "Trained a DL model on diverse datasets to improve robustness across races, lighting, devices, and attack types, accessible via REST API.",
                    outcome: "Distinguishes real vs fake faces with high accuracy.",
                    link: "https://github.com/GwadeSteve/spoof-detect-service"
                }
            },
            {
                title: "Insect Splash",
                descriptor: "Interactive Computer Vision Game",
                image: "/images/Experience/Splash.JPG",
                tags: ["MediaPipe", "OpenCV", "Game Dev"],
                details: {
                    problem: "Demonstrating the playful potential of real-time computer vision.",
                    role: "Computer Vision Engineer",
                    how: "Used MediaPipe for hand-tracking to create an insect-squashing game.",
                    outcome: "Engaging interactive experience.",
                    link: "https://github.com/GwadeSteve/Insect-Splash"
                }
            },
            {
                title: "Mathematical Morphology",
                descriptor: "Image Processing from Scratch",
                image: "/images/Experience/Morphology.png",
                tags: ["Numpy", "Image Processing", "Optimization"],
                details: {
                    problem: "Understanding the core algorithms behind image processing tools.",
                    role: "Student",
                    how: "Implemented erosion, dilation, and feature extraction using only Numpy/Matplotlib.",
                    outcome: "Optimized implementation of fundamental morphological operations.",
                    link: "https://github.com/GwadeSteve/Mathematical-Morphology-Image-Processing/tree/feature-dev"
                }
            }, {
                title: "MTTL for Malaria Detection",
                descriptor: "Multi-Task Transfer Learning Framework",
                image: "/images/Experience/MTTL_Architecture.jpg",
                tags: ["Research", "PyTorch", "Medical AI"],
                details: {
                    problem: "Single-task models fail to capture the complexity of malaria diagnosis.",
                    role: "Lead Research (MSc Thesis)",
                    how: "Used Multi-Task Transfer Learning (MTTL) and PEFT to train a unified model for detection, segmentation, and heatmap generation.",
                    outcome: "Achieved up to 34% improvement in F1-score over YOLOv8-Small on infected cell detection.",
                    link: "https://github.com/GwadeSteve/MTTL-Research-Malaria"
                }
            }
        ],
        fullstack: [
            {
                title: "EatWise",
                descriptor: "AI Nutrition Platform",
                image: "/images/Experience/EatWise.svg",
                tags: ["Computer Vision", "Recommender Systems", "Mobile"],
                details: {
                    problem: "Promoting healthier eating habits in Cameroon through technology.",
                    role: "Lead Full-Stack Engineer",
                    how: "Features food scanning, personalized meal plans, and dietitian consultations.",
                    outcome: "Empowers users to achieve health goals with local context."
                }
            },
            {
                title: "StudyMate",
                descriptor: "Generative AI Study Companion",
                image: "/images/Experience/StudyMate.jpg",
                tags: ["Django", "React", "GenAI", "NLP"],
                details: {
                    problem: "Students need interactive ways to engage with their study materials.",
                    role: "Full-Stack Engineer",
                    how: "Allows chatting with PDF/Word/Audio uploads, generating quizzes and flashcards.",
                    outcome: "Turns static documents into interactive study sessions."
                }
            },
            {
                title: "FoodHub",
                descriptor: "Anti-Food Waste Platform",
                image: "/images/Experience/FoodHub.jpg",
                tags: ["React", "Django", "Facial Authentication", "Payment Gateway"],
                details: {
                    problem: "Food waste and hunger are simultaneous issues.",
                    role: "Full-Stack Developer",
                    how: "Marketplace for surplus food with secure facial recognition payment authentication.",
                    outcome: "Promotes community resourcefulness.",
                    link: "https://github.com/GwadeSteve/FrontEnd-FoodHub"
                }
            },
            {
                title: "PolyApps Suite",
                descriptor: "University AI Club Platform",
                image: "/images/Experience/PolyApps.png",
                tags: ["Web Dev", "Real-time", "Community"],
                details: {
                    problem: "Managing AI Club activities and contests.",
                    role: "Contributor & Maintainer",
                    how: "Built 'PolyCoding' and 'PolyTyping' for real-time multiplayer contests.",
                    outcome: "Enabled real-time coding and typing competitions for UIT students."
                }
            }
        ]
    },
    timeline: [
        {
            year: "Jan 2025 – Present",
            type: "role",
            title: "Research Engineer",
            org: "Jiants",
            impact: "Contributing to internal research and productionizing models."
        },
        {
            year: "Dec 2025",
            type: "achievement",
            title: "ODC Champions",
            org: "Orange Digital Center",
            impact: "1st Place National, 2nd in Africa."
        },
        {
            year: "May 2025",
            type: "achievement",
            title: "LINA",
            org: "Huawei ICT Competition",
            impact: "Global Winner (Innovation Track, China). Best AI Solution."
        },
        {
            year: "Apr 16, 2025",
            type: "achievement",
            title: "JCIA AI Prototypes",
            org: "JCIA",
            impact: "1st Place winner with EatWise."
        },
        {
            year: "Apr 16, 2025",
            type: "achievement",
            title: "JCIA Hackathon",
            org: "JCIA",
            impact: "Winner with PlumVision."
        },
        {
            year: "Mar 2023 – Dec 2024",
            type: "role",
            title: "Software Engineer",
            org: "TGNix",
            impact: "Full-stack development and microservices architecture."
        },
        {
            year: "Jun 2023 – Nov 2023",
            type: "role",
            title: "Intern AI/Backend",
            org: "AITECAF",
            impact: "Assisted in data pipeline optimization."
        }
    ],
    research: [
        {
            year: "2025",
            title: "Multi-Task Transfer Learning for Malaria Detection",
            journal: "MSc Thesis • Polytechnic School of Douala",
            impact: "A unified framework for robust Malaria diagnosis.",
            link: "https://github.com/GwadeSteve/MTTL-Research-Malaria/blob/main/MSc%20Document/MSc.pdf"
        },
        {
            year: "2024",
            title: "Mathematical Morphology Framework",
            journal: "Independent Research",
            impact: "Algorithmic implementation of fundamental vision operations.",
            link: "https://github.com/GwadeSteve/Mathematical-Morphology-Image-Processing"
        }
    ],
    expertise: [
        { category: "Model Engineering", items: ["PyTorch", "TensorFlow", "HuggingFace", "LangChain"] },
        { category: "Data & Ops", items: ["PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS"] },
        { category: "Full-Stack", items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Node.js"] },
        { category: "Research", items: ["Latex", "Arxiv Pipeline", "Experiment Tracking", "W&B"] }
    ]
};
