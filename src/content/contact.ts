import type { ComposerOption } from './types';

export const EMAIL = 'gwade.steve.dev@gmail.com';

export const COMPOSER: Record<'about' | 'area', ComposerOption[]> = {
  "about": [
    [
      "role",
      {
        "en": "A role",
        "fr": "Un poste"
      },
      {
        "en": "a full time role",
        "fr": "un poste à temps plein"
      }
    ],
    [
      "free",
      {
        "en": "Freelance",
        "fr": "Freelance"
      },
      {
        "en": "freelance work",
        "fr": "une mission freelance"
      }
    ],
    [
      "collab",
      {
        "en": "Collab",
        "fr": "Collab"
      },
      {
        "en": "a collaboration",
        "fr": "une collaboration"
      }
    ],
    [
      "hi",
      {
        "en": "Say hi",
        "fr": "Bonjour"
      },
      ""
    ]
  ],
  "area": [
    [
      "back",
      "Backend",
      {
        "en": "backend systems",
        "fr": "backend"
      }
    ],
    [
      "ai",
      {
        "en": "AI",
        "fr": "IA"
      },
      {
        "en": "applied AI",
        "fr": "IA appliquée"
      }
    ],
    [
      "mobile",
      "Mobile",
      {
        "en": "mobile apps",
        "fr": "mobile"
      }
    ],
    [
      "product",
      {
        "en": "Product",
        "fr": "Produit"
      },
      {
        "en": "a full product",
        "fr": "produit complet"
      }
    ]
  ]
};
