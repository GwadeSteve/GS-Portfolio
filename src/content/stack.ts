import type { ToolGroup } from './types';

export const GROUPS: ToolGroup[] = [
  {
    "k": "ai",
    "n": {
      "en": "AI",
      "fr": "IA"
    },
    "v": {
      "en": "Vision, retrieval and language models, taken all the way to production.",
      "fr": "Vision, recherche et modèles de langage, menés jusqu’en production."
    },
    "items": [
      [
        "python",
        "Python"
      ],
      [
        "pytorch",
        "PyTorch"
      ],
      [
        "opencv",
        "OpenCV"
      ],
      [
        "fastapi",
        "FastAPI"
      ],
      [
        "linux",
        "Linux"
      ]
    ]
  },
  {
    "k": "lang",
    "n": {
      "en": "Languages",
      "fr": "Langages"
    },
    "v": {
      "en": "What I write every day, from APIs to Android.",
      "fr": "Ce que j’écris chaque jour, des API à Android."
    },
    "items": [
      [
        "python",
        "Python"
      ],
      [
        "typescript",
        "TypeScript"
      ],
      [
        "kotlin",
        "Kotlin"
      ]
    ]
  },
  {
    "k": "front",
    "n": {
      "en": "Frontend and mobile",
      "fr": "Frontend et mobile"
    },
    "v": {
      "en": "Consoles, dashboards and Android apps that teams rely on.",
      "fr": "Consoles, tableaux de bord et apps Android sur lesquels les équipes comptent."
    },
    "items": [
      [
        "react",
        "React"
      ],
      [
        "typescript",
        "TypeScript"
      ],
      [
        "vite",
        "Vite"
      ],
      [
        "tailwindcss",
        "Tailwind"
      ],
      [
        "android",
        "Android"
      ],
      [
        "kotlin",
        "Kotlin"
      ]
    ]
  },
  {
    "k": "back",
    "n": "Backend",
    "v": {
      "en": "APIs, data and automation that stay correct under load.",
      "fr": "API, données et automatisations qui restent justes sous charge."
    },
    "items": [
      [
        "python",
        "Python"
      ],
      [
        "fastapi",
        "FastAPI"
      ],
      [
        "django",
        "Django"
      ],
      [
        "postgresql",
        "PostgreSQL"
      ],
      [
        "redis",
        "Redis"
      ],
      [
        "supabase",
        "Supabase"
      ],
      [
        "n8n",
        "n8n"
      ],
      [
        "docker",
        "Docker"
      ],
      [
        "hetzner",
        "Hetzner"
      ],
      [
        "caddy",
        "Caddy"
      ],
      [
        "nginx",
        "Nginx"
      ]
    ]
  },
  {
    "k": "infra",
    "n": "Infra",
    "v": {
      "en": "Shipping, hosting and keeping everything running.",
      "fr": "Déployer, héberger et tout faire tourner."
    },
    "items": [
      [
        "docker",
        "Docker"
      ],
      [
        "hetzner",
        "Hetzner"
      ],
      [
        "caddy",
        "Caddy"
      ],
      [
        "githubactions",
        "GitHub Actions"
      ],
      [
        "cloudflare",
        "Cloudflare"
      ],
      [
        "nginx",
        "Nginx"
      ],
      [
        "linux",
        "Linux"
      ]
    ]
  }
];

/** Projects offered in the globe's project tab. */
export const STACK_PROJECTS = ['nexus', 'lina', 'vero', 'plum', 'support'];
