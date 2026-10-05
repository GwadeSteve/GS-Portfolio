import type { Project } from './types';

export const PROJECTS: Project[] = [
  {
    "k": "nexus",
    "feat": true,
    "t": "Nexus",
    "yr": "2026",
    "badge": {
      "en": "In production",
      "fr": "En production"
    },
    "d": {
      "en": "Transaction platform",
      "fr": "Plateforme de transactions"
    },
    "where": "Sawego Digital",
    "role": {
      "en": "Full stack engineer",
      "fr": "Ingénieur full stack"
    },
    "pb": {
      "en": "Deposits through telecom operators used to be confirmed and matched by hand. Slow for the team, and stressful when it is someone’s money.",
      "fr": "Les dépôts via les opérateurs télécoms étaient confirmés et rapprochés à la main. Lent pour l’équipe, et stressant quand il s’agit de l’argent de quelqu’un."
    },
    "sum": {
      "en": "Deposits now run on their own across two operators, from request to confirmation. The team handles more transactions without adding hands, every confirmation lands on the right payment, and anything unclear goes to a person instead of a guess. That is how people learn to trust a platform with their money.",
      "fr": "Les dépôts tournent désormais seuls sur deux opérateurs, de la demande à la confirmation. L’équipe traite plus de transactions sans renfort, chaque confirmation retrouve le bon paiement, et tout cas douteux part chez un humain au lieu d’être deviné. C’est comme ça qu’on gagne la confiance de gens qui confient leur argent."
    },
    "stats": [
      [
        "45M+",
        {
          "en": "FCFA moved",
          "fr": "FCFA transférés"
        }
      ],
      [
        "2",
        {
          "en": "telecom operators automated",
          "fr": "opérateurs télécoms automatisés"
        }
      ],
      [
        "11",
        {
          "en": "Android releases shipped",
          "fr": "versions Android livrées"
        }
      ]
    ],
    "stack": [
      "python",
      "fastapi",
      "postgresql",
      "redis",
      "n8n",
      "react",
      "kotlin",
      "docker",
      "hetzner"
    ],
    "links": [],
    "priv": {
      "en": "Private platform built at Sawego Digital.",
      "fr": "Plateforme privée développée chez Sawego Digital."
    }
  },
  {
    "k": "lina",
    "feat": true,
    "t": "LINA",
    "yr": "2025",
    "hot": true,
    "badge": {
      "en": "1st worldwide",
      "fr": "1er mondial"
    },
    "d": {
      "en": "Sight, described out loud",
      "fr": "La vue, décrite à voix haute"
    },
    "where": "JIANTS, Huawei ICT Competition",
    "role": {
      "en": "Computer vision engineer",
      "fr": "Ingénieur vision par ordinateur"
    },
    "pb": {
      "en": "Blind and visually impaired people move through spaces that were not designed for them, and good assistive tools are rare and expensive.",
      "fr": "Les personnes aveugles et malvoyantes évoluent dans des lieux qui ne sont pas pensés pour elles, et les bons outils d’assistance sont rares et chers."
    },
    "sum": {
      "en": "A small device built on a Raspberry Pi that looks, listens and describes the surroundings to its user in real time. Built on affordable hardware. It took first place worldwide at the Huawei ICT Competition 2025.",
      "fr": "Un petit appareil sur Raspberry Pi qui regarde, écoute et décrit l’environnement à son utilisateur en temps réel. Sur du matériel abordable. Premier prix mondial au Huawei ICT Competition 2025."
    },
    "stats": [
      [
        "1st",
        {
          "en": "worldwide, 179 teams",
          "fr": "mondial, 179 équipes"
        }
      ],
      [
        "+90%",
        {
          "en": "navigation confidence in trials",
          "fr": "de confiance en navigation, en essai"
        }
      ],
      [
        "−75%",
        {
          "en": "need for assistance in trials",
          "fr": "de besoin d’assistance, en essai"
        }
      ]
    ],
    "stack": [
      "python",
      "pytorch",
      "opencv",
      "linux"
    ],
    "links": [
      [
        {
          "en": "Visit the project",
          "fr": "Voir le projet"
        },
        "https://lina-bgjd.onrender.com"
      ]
    ]
  },
  {
    "k": "vero",
    "feat": true,
    "t": "VERO",
    "yr": "2025",
    "badge": "Open source",
    "d": {
      "en": "Research answers you can verify",
      "fr": "Des réponses de recherche vérifiables"
    },
    "where": {
      "en": "Personal project",
      "fr": "Projet personnel"
    },
    "role": {
      "en": "Full stack AI engineer",
      "fr": "Ingénieur IA full stack"
    },
    "img": "vero",
    "pb": {
      "en": "Notes live across papers, tabs and repositories. Finding where a claim came from takes longer than reading it.",
      "fr": "Les notes sont éparpillées entre articles, onglets et dépôts. Retrouver d’où vient une affirmation prend plus de temps que de la lire."
    },
    "sum": {
      "en": "Ask a question across your own papers, links and repositories, and get an answer with its exact source attached. You check it in seconds instead of trusting it blindly.",
      "fr": "Posez une question sur vos propres articles, liens et dépôts, et obtenez une réponse avec sa source exacte. Vous la vérifiez en quelques secondes au lieu de la croire sur parole."
    },
    "stats": [
      [
        "100k+",
        {
          "en": "document blocks indexed",
          "fr": "blocs de documents indexés"
        }
      ],
      [
        "<45ms",
        {
          "en": "to find the sources",
          "fr": "pour trouver les sources"
        }
      ],
      [
        {
          "en": "Cited",
          "fr": "Sourcée"
        },
        {
          "en": "every answer",
          "fr": "chaque réponse"
        }
      ]
    ],
    "stack": [
      "python",
      "fastapi",
      "react",
      "typescript"
    ],
    "links": [
      [
        {
          "en": "View on GitHub",
          "fr": "Voir sur GitHub"
        },
        "https://github.com/GwadeSteve/VERO"
      ]
    ]
  },
  {
    "k": "vigie",
    "feat": true,
    "t": "Vigie",
    "yr": "2026",
    "badge": {
      "en": "In production",
      "fr": "En production"
    },
    "d": {
      "en": "Know who is about to leave",
      "fr": "Savoir qui va partir"
    },
    "where": "Sawego Digital",
    "role": {
      "en": "AI Engineer",
      "fr": "Ingénieur IA"
    },
    "pb": {
      "en": "By the time a customer stops sending money, it is too late to win them back.",
      "fr": "Quand un client arrête d’envoyer de l’argent, il est trop tard pour le reconquérir."
    },
    "sum": {
      "en": "Flags customers of an international money transfer service who are drifting away, early enough for the team to reach out, and ranks them so the first calls go to the people most at risk. Their data stays locked to their own company.",
      "fr": "Repère les clients d’un service de transfert d’argent international qui s’éloignent, assez tôt pour que l’équipe les contacte, et les classe pour que les premiers appels aillent aux plus à risque. Les données de chaque entreprise restent cloisonnées."
    },
    "stats": [
      [
        "8 / 10",
        {
          "en": "leavers ranked above stayers",
          "fr": "départs classés avant les fidèles"
        }
      ],
      [
        "6",
        {
          "en": "periods backtested",
          "fr": "périodes testées a posteriori"
        }
      ]
    ],
    "stack": [
      "python",
      "postgresql",
      "fastapi"
    ],
    "links": [],
    "priv": {
      "en": "Private product built at Sawego Digital.",
      "fr": "Produit privé développé chez Sawego Digital."
    }
  },
  {
    "k": "plum",
    "feat": true,
    "t": "PlumVision",
    "yr": "2025",
    "hot": true,
    "badge": {
      "en": "JCIA winner",
      "fr": "Lauréat JCIA"
    },
    "d": {
      "en": "Fruit sorting that never gets tired",
      "fr": "Un tri des fruits qui ne fatigue jamais"
    },
    "where": {
      "en": "JCIA 2025 hackathon",
      "fr": "Hackathon JCIA 2025"
    },
    "role": {
      "en": "Lead developer",
      "fr": "Développeur principal"
    },
    "img": "plum",
    "pb": {
      "en": "Sorting fruit by eye is slow, tiring and different from one person to the next.",
      "fr": "Trier les fruits à l’œil est lent, fatigant et varie d’une personne à l’autre."
    },
    "sum": {
      "en": "A camera grades plums as they pass and shows every decision on a live dashboard, so quality stays the same from the first crate to the last. It won the JCIA 2025 hackathon.",
      "fr": "Une caméra classe les prunes à leur passage et affiche chaque décision en direct, pour une qualité identique de la première à la dernière caisse. Lauréat du hackathon JCIA 2025."
    },
    "stats": [
      [
        "98%",
        {
          "en": "grading accuracy",
          "fr": "de précision du tri"
        }
      ],
      [
        "12ms",
        {
          "en": "per frame",
          "fr": "par image"
        }
      ],
      [
        "JCIA",
        {
          "en": "hackathon winner",
          "fr": "lauréat du hackathon"
        }
      ]
    ],
    "stack": [
      "python",
      "pytorch",
      "fastapi",
      "react"
    ],
    "links": [
      [
        {
          "en": "View on GitHub",
          "fr": "Voir sur GitHub"
        },
        "https://github.com/GwadeSteve/JCIA_Plum_Challenge/"
      ]
    ]
  },
  {
    "k": "mttl",
    "feat": true,
    "t": "MTTL",
    "yr": "2025",
    "badge": {
      "en": "MSc thesis",
      "fr": "Mémoire de master"
    },
    "d": {
      "en": "Faster malaria diagnosis research",
      "fr": "Recherche pour un diagnostic du paludisme plus rapide"
    },
    "where": "National Higher Polytechnic School of Douala",
    "role": {
      "en": "Lead researcher",
      "fr": "Chercheur principal"
    },
    "img": "mttl",
    "pb": {
      "en": "Reading a blood smear for malaria takes a trained eye, and trained eyes are scarce where malaria is most common.",
      "fr": "Lire un frottis sanguin demande un œil expert, et les experts manquent là où le paludisme frappe le plus."
    },
    "sum": {
      "en": "One model that finds, outlines and pinpoints malaria parasites in blood smear images, instead of three separate ones, and does better at the part that matters most, spotting infected cells. My master’s thesis, graduated with Distinction.",
      "fr": "Un seul modèle qui trouve, délimite et localise les parasites du paludisme sur des frottis, au lieu de trois, et fait mieux là où ça compte le plus, repérer les cellules infectées. Mon mémoire de master, obtenu avec mention."
    },
    "stats": [
      [
        "+34%",
        {
          "en": "better at spotting infection",
          "fr": "de détection en plus"
        }
      ],
      [
        "3",
        {
          "en": "tasks, one model",
          "fr": "tâches, un modèle"
        }
      ],
      [
        "MSc",
        {
          "en": "with Distinction",
          "fr": "avec mention"
        }
      ]
    ],
    "stack": [
      "python",
      "pytorch"
    ],
    "links": [
      [
        {
          "en": "Read the thesis",
          "fr": "Lire le mémoire"
        },
        "https://github.com/GwadeSteve/MTTL-Research-Malaria/blob/main/MSc%20Document/MSc.pdf"
      ],
      [
        {
          "en": "View on GitHub",
          "fr": "Voir sur GitHub"
        },
        "https://github.com/GwadeSteve/MTTL-Research-Malaria"
      ]
    ]
  },
  {
    "k": "eatwise",
    "t": "EatWise",
    "yr": "2025",
    "hot": true,
    "badge": {
      "en": "JCIA 1st place",
      "fr": "1re place JCIA"
    },
    "d": {
      "en": "Nutrition advice that knows local food",
      "fr": "Des conseils nutrition qui connaissent la cuisine locale"
    },
    "where": {
      "en": "JCIA 2025, AI prototypes",
      "fr": "JCIA 2025, prototypes IA"
    },
    "role": {
      "en": "Lead full stack engineer",
      "fr": "Ingénieur full stack principal"
    },
    "img": "eatwise",
    "pb": {
      "en": "Most nutrition apps know burgers and salads, not ndolé or eru.",
      "fr": "La plupart des apps de nutrition connaissent les burgers et les salades, pas le ndolé ni l’eru."
    },
    "sum": {
      "en": "Scan a meal, get a plan built around the food people in Cameroon actually eat, and talk to a dietitian when you need one. First place among the AI prototypes at JCIA 2025.",
      "fr": "Scannez un repas, obtenez un plan construit autour de ce qu’on mange vraiment au Cameroun, et parlez à un diététicien si besoin. Première place des prototypes IA au JCIA 2025."
    },
    "stats": [
      [
        "1st",
        {
          "en": "among AI prototypes, JCIA 2025",
          "fr": "des prototypes IA, JCIA 2025"
        }
      ]
    ],
    "stack": [
      {
        "en": "Computer vision",
        "fr": "Vision par ordinateur"
      },
      {
        "en": "Recommender systems",
        "fr": "Systèmes de recommandation"
      },
      "Mobile"
    ],
    "links": [],
    "priv": {
      "en": "Competition prototype, demo on request.",
      "fr": "Prototype de compétition, démo sur demande."
    }
  },
  {
    "k": "booking",
    "ill": "chat",
    "t": "Booking Assistant",
    "yr": "2026",
    "badge": "Freelance",
    "d": {
      "en": "Business travel booked in a chat",
      "fr": "Des voyages d’affaires réservés en discutant"
    },
    "where": "MITS SARL, Moabi",
    "role": {
      "en": "Lead developer",
      "fr": "Développeur principal"
    },
    "pb": {
      "en": "Booking a business flight meant a chain of emails and a lot of waiting.",
      "fr": "Réserver un vol professionnel, c’était une chaîne d’e-mails et beaucoup d’attente."
    },
    "sum": {
      "en": "Employees of a B2B travel platform book flights by chatting on WhatsApp, in French or English, with sign in and manager approval built into the conversation. What took a chain of emails now takes a few messages.",
      "fr": "Les employés d’une plateforme de voyage B2B réservent leurs vols sur WhatsApp, en français ou en anglais, avec connexion et validation du manager intégrées à la conversation. Ce qui prenait une chaîne d’e-mails tient en quelques messages."
    },
    "stats": [
      [
        "90%",
        {
          "en": "faster booking requests",
          "fr": "de demandes plus rapides"
        }
      ],
      [
        "−35%",
        {
          "en": "cloud costs",
          "fr": "de coûts cloud"
        }
      ],
      [
        "500+",
        {
          "en": "conversations at once",
          "fr": "conversations simultanées"
        }
      ]
    ],
    "stack": [
      "python",
      "fastapi",
      "redis",
      "AWS"
    ],
    "links": [],
    "priv": {
      "en": "Private client work under NDA.",
      "fr": "Projet client privé, sous NDA."
    }
  },
  {
    "k": "support",
    "t": "Support Assistant",
    "yr": "2026",
    "badge": {
      "en": "In production",
      "fr": "En production"
    },
    "d": {
      "en": "Customer support that answers in both languages",
      "fr": "Un support client qui répond dans les deux langues"
    },
    "where": "Sawego Digital",
    "role": {
      "en": "Backend engineer, with a teammate",
      "fr": "Ingénieur backend, en binôme"
    },
    "pb": {
      "en": "Customers write at all hours, in French or English, and expect an answer now.",
      "fr": "Les clients écrivent à toute heure, en français ou en anglais, et attendent une réponse tout de suite."
    },
    "sum": {
      "en": "Answers customers in French and English, steps aside the moment a human agent joins the conversation, and measures how satisfied people are, so the team spends its time on the questions that need a person.",
      "fr": "Répond aux clients en français et en anglais, s’efface dès qu’un agent humain rejoint la conversation, et mesure la satisfaction, pour que l’équipe se concentre sur les questions qui demandent un humain."
    },
    "stats": [],
    "stack": [
      "n8n",
      "typescript",
      "redis",
      "cloudflare"
    ],
    "links": [],
    "priv": {
      "en": "Private product built at Sawego Digital.",
      "fr": "Produit privé développé chez Sawego Digital."
    }
  },
  {
    "k": "kite",
    "t": "Kite",
    "yr": "2026",
    "badge": "Open source",
    "d": {
      "en": "Teamwork that survives a bad connection",
      "fr": "Le travail d’équipe qui survit à une mauvaise connexion"
    },
    "where": {
      "en": "Personal project",
      "fr": "Projet personnel"
    },
    "role": {
      "en": "Full stack engineer",
      "fr": "Ingénieur full stack"
    },
    "pb": {
      "en": "Most collaboration tools stop working the moment the connection drops, and in many places it drops often.",
      "fr": "La plupart des outils collaboratifs s’arrêtent dès que la connexion tombe, et dans beaucoup d’endroits elle tombe souvent."
    },
    "sum": {
      "en": "Work together across devices, even when the network drops. Changes sync back on their own when you reconnect.",
      "fr": "Travaillez à plusieurs sur différents appareils, même sans réseau. Les changements se resynchronisent seuls à la reconnexion."
    },
    "stats": [
      [
        "1,200+",
        {
          "en": "sessions kept in sync",
          "fr": "sessions synchronisées"
        }
      ],
      [
        "−20%",
        {
          "en": "data sent when syncing",
          "fr": "de données envoyées"
        }
      ],
      [
        "−90%",
        {
          "en": "manual refreshes after a drop",
          "fr": "de rechargements après coupure"
        }
      ]
    ],
    "stack": [
      "react",
      "typescript"
    ],
    "links": [],
    "priv": {
      "en": "Repository link coming soon.",
      "fr": "Lien du dépôt bientôt disponible."
    }
  },
  {
    "k": "spoof",
    "t": "Spoof Detector",
    "badge": "API",
    "d": {
      "en": "Stops fake faces fooling face ID",
      "fr": "Bloque les faux visages"
    },
    "where": {
      "en": "Personal project",
      "fr": "Projet personnel"
    },
    "role": {
      "en": "ML engineer",
      "fr": "Ingénieur ML"
    },
    "pb": {
      "en": "A printed photo or a phone screen can be enough to fool a face check.",
      "fr": "Une photo imprimée ou un écran de téléphone peut suffire à tromper une vérification faciale."
    },
    "sum": {
      "en": "A service that tells a real face from a photo, a screen or a mask held up to the camera, ready to plug into any app through a simple API.",
      "fr": "Un service qui distingue un vrai visage d’une photo, d’un écran ou d’un masque, prêt à brancher sur n’importe quelle app via une API simple."
    },
    "stats": [],
    "stack": [
      "python",
      "pytorch",
      "fastapi"
    ],
    "links": [
      [
        {
          "en": "View on GitHub",
          "fr": "Voir sur GitHub"
        },
        "https://github.com/GwadeSteve/spoof-detect-service"
      ]
    ]
  },
  {
    "k": "foodhub",
    "t": "FoodHub",
    "badge": {
      "en": "Web app",
      "fr": "App web"
    },
    "d": {
      "en": "Less food in the bin",
      "fr": "Moins de nourriture à la poubelle"
    },
    "where": {
      "en": "Personal project",
      "fr": "Projet personnel"
    },
    "role": {
      "en": "Full stack developer",
      "fr": "Développeur full stack"
    },
    "img": "foodhub",
    "pb": {
      "en": "Good food gets thrown away while people nearby would gladly buy it for less.",
      "fr": "De la bonne nourriture finit à la poubelle alors que des gens à côté l’achèteraient volontiers moins cher."
    },
    "sum": {
      "en": "A marketplace where shops in Cameroon sell their surplus food at a lower price before it goes to waste, with face recognition to confirm payments.",
      "fr": "Une marketplace où les commerces au Cameroun vendent leurs surplus moins cher avant qu’ils ne soient jetés, avec reconnaissance faciale pour confirmer les paiements."
    },
    "stats": [],
    "stack": [
      "react",
      "django"
    ],
    "links": [
      [
        {
          "en": "View on GitHub",
          "fr": "Voir sur GitHub"
        },
        "https://github.com/GwadeSteve/FrontEnd-FoodHub"
      ]
    ]
  },
  {
    "k": "morph",
    "t": "Morphology",
    "yr": "2024",
    "badge": {
      "en": "Research",
      "fr": "Recherche"
    },
    "d": {
      "en": "Image processing from scratch",
      "fr": "Traitement d’image à partir de zéro"
    },
    "where": {
      "en": "Independent research",
      "fr": "Recherche indépendante"
    },
    "role": {
      "en": "Author",
      "fr": "Auteur"
    },
    "img": "morph",
    "pb": {
      "en": "Libraries make image processing a single function call, which hides how it really works.",
      "fr": "Les bibliothèques réduisent le traitement d’image à un appel de fonction, ce qui cache son vrai fonctionnement."
    },
    "sum": {
      "en": "Erosion, dilation, opening and closing, written from first principles with NumPy to understand exactly what the libraries do.",
      "fr": "Érosion, dilatation, ouverture et fermeture, écrites à la main avec NumPy pour comprendre exactement ce que font les bibliothèques."
    },
    "stats": [],
    "stack": [
      "python"
    ],
    "links": [
      [
        {
          "en": "View on GitHub",
          "fr": "Voir sur GitHub"
        },
        "https://github.com/GwadeSteve/Mathematical-Morphology-Image-Processing"
      ]
    ]
  },
  {
    "k": "splash",
    "t": "Insect Splash",
    "badge": {
      "en": "Just for fun",
      "fr": "Pour le plaisir"
    },
    "d": {
      "en": "Hand tracking webcam game",
      "fr": "Jeu webcam au suivi de la main"
    },
    "where": {
      "en": "Personal project",
      "fr": "Projet personnel"
    },
    "role": {
      "en": "Computer vision engineer",
      "fr": "Ingénieur vision par ordinateur"
    },
    "img": "splash",
    "pb": {
      "en": "Real time hand tracking usually needs special hardware. This one needs a webcam.",
      "fr": "Le suivi de la main demande souvent du matériel spécial. Ici, une webcam suffit."
    },
    "sum": {
      "en": "Squash insects with your bare hands. No controller, no special camera, just the webcam you already have.",
      "fr": "Écrasez des insectes à mains nues. Pas de manette, pas de caméra spéciale, juste la webcam que vous avez déjà."
    },
    "stats": [],
    "stack": [
      "python",
      "opencv"
    ],
    "links": [
      [
        {
          "en": "View on GitHub",
          "fr": "Voir sur GitHub"
        },
        "https://github.com/GwadeSteve/Insect-Splash"
      ]
    ]
  },
  {
    "k": "polyapps",
    "t": "PolyApps",
    "badge": {
      "en": "Community",
      "fr": "Communauté"
    },
    "d": {
      "en": "Live coding and typing contests",
      "fr": "Concours de code et de frappe en direct"
    },
    "where": {
      "en": "University AI club",
      "fr": "Club IA universitaire"
    },
    "role": {
      "en": "Contributor and maintainer",
      "fr": "Contributeur et mainteneur"
    },
    "img": "polyapps",
    "pb": {
      "en": "Club members wanted to practise together, live, instead of alone in front of a tutorial.",
      "fr": "Les membres du club voulaient s’entraîner ensemble, en direct, plutôt que seuls devant un tutoriel."
    },
    "sum": {
      "en": "Real time multiplayer coding and typing contests, built for the university AI club so members could compete and learn together.",
      "fr": "Des concours multijoueurs de code et de frappe en temps réel, conçus pour le club IA de l’université, pour s’affronter et apprendre ensemble."
    },
    "stats": [],
    "stack": [
      {
        "en": "Real time",
        "fr": "Temps réel"
      },
      "Web"
    ],
    "links": [],
    "priv": {
      "en": "Club project, no public link.",
      "fr": "Projet de club, pas de lien public."
    }
  }
];
