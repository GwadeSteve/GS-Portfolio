import type { Post } from './types';

export const POSTS: Post[] = [
  {
    "k": "gradient-descent",
    "feat": true,
    "t": "Gradient descent, without the jargon",
    "dek": "The idea behind almost every model I have trained, explained with a hill, a ball and one line of maths.",
    "date": [
      2026,
      9,
      28
    ],
    "tags": [
      "Maths",
      "AI"
    ],
    "cover": "contour",
    "blocks": [
      [
        "tldr",
        "Training a model means walking downhill on a surface you cannot see. The gradient tells you which way is down, the learning rate decides how far you step, and a surprising number of training problems come down to that step size."
      ],
      [
        "h2",
        "A landscape you cannot see"
      ],
      [
        "p",
        "Picture every possible setting of a model’s weights as a point on a huge landscape. The height at each point is the loss: how wrong the model is with those weights. Training is the search for a low valley."
      ],
      [
        "p",
        "The catch is that this landscape has millions of dimensions. You never see it. You only feel the slope under your feet, one point at a time, and you decide where to step next."
      ],
      [
        "fig",
        "descent",
        "Each step follows the local slope towards a lower loss"
      ],
      [
        "h2",
        "One line of maths"
      ],
      [
        "p",
        "The update rule behind gradient descent fits on a single line:"
      ],
      [
        "math",
        "θ<sub>t+1</sub> = θ<sub>t</sub> − η · ∇L(θ<sub>t</sub>)",
        "θ are the weights, η the learning rate, ∇L the gradient of the loss"
      ],
      [
        "p",
        "The gradient ∇L points uphill, in the direction where the loss grows fastest. Subtracting it moves you downhill. The learning rate η decides how big that move is, and that one number shapes the whole training run."
      ],
      [
        "h2",
        "Why the step size matters"
      ],
      [
        "ul",
        [
          "Too small, and training crawls. You make progress, but you pay for it in hours.",
          "Too large, and you overshoot the valley, bounce between its walls, or fly off entirely while the loss explodes.",
          "Just right, and the loss drops quickly at first, then settles into a slow, steady descent."
        ]
      ],
      [
        "quote",
        "When a model refuses to learn, I look at the step size before I look at anything else."
      ],
      [
        "h2",
        "Momentum, or remembering the slope"
      ],
      [
        "p",
        "Plain gradient descent forgets everything between steps. In a long, narrow valley it zigzags from wall to wall and barely moves forward. Momentum keeps a running memory of past gradients, like a ball that builds speed as it rolls downhill."
      ],
      [
        "math",
        "v<sub>t+1</sub> = β · v<sub>t</sub> + ∇L(θ<sub>t</sub>) &nbsp;&nbsp; θ<sub>t+1</sub> = θ<sub>t</sub> − η · v<sub>t+1</sub>",
        "β, often 0.9, controls how much of the past is kept"
      ],
      [
        "p",
        "The zigzags cancel out, the consistent direction adds up, and the ball rolls through flat stretches instead of stalling. Adam, the optimizer most people reach for by default, builds on the same idea and also adapts the step size for every weight separately."
      ],
      [
        "h2",
        "What I check when training stalls"
      ],
      [
        "ol",
        [
          "Plot the loss. A flat line, a staircase and a sudden spike each tell a different story.",
          "Divide the learning rate by ten and run again.",
          "Look for NaN values or gradients that explode.",
          "Try to overfit a handful of examples. If the model cannot memorise ten samples, the bug is in the code, not in the data."
        ]
      ],
      [
        "h2",
        "Schedules, or changing the step as you go"
      ],
      [
        "p",
        "A single learning rate for the whole run is a compromise. Early on, the weights are far from any valley and big steps cover ground quickly. Later, near the bottom, the same big steps make the loss bounce around a minimum it never settles into."
      ],
      [
        "p",
        "A schedule changes the learning rate during training. The two I use most are simple. A short warm up, where the rate climbs from almost zero over the first few hundred steps so the early, noisy gradients do not throw the weights somewhere bad. Then a slow decay, often following a cosine curve, so the final steps are small and precise."
      ],
      [
        "math",
        "η<sub>t</sub> = η<sub>min</sub> + ½ (η<sub>max</sub> − η<sub>min</sub>)(1 + cos(π t / T))",
        "Cosine decay from η max to η min over T steps"
      ],
      [
        "p",
        "Schedules will not rescue a learning rate that is wrong by a factor of a hundred. They turn a good rate into a better run. When I compare two experiments, I keep the schedule fixed and change one thing at a time, otherwise I never know which change actually helped."
      ],
      [
        "take",
        [
          "The gradient gives a direction, the learning rate gives a distance.",
          "Most training failures are step size failures.",
          "Momentum smooths the path and speeds up the walk."
        ]
      ],
      [
        "refs",
        [
          [
            "Kingma and Ba, 2014. Adam: A Method for Stochastic Optimization.",
            "https://arxiv.org/abs/1412.6980"
          ],
          [
            "Ruder, 2016. An overview of gradient descent optimization algorithms.",
            "https://arxiv.org/abs/1609.04747"
          ]
        ]
      ]
    ]
  },
  {
    "k": "one-model-three-tasks",
    "t": "One model, three tasks",
    "dek": "What my master’s thesis taught me about letting tasks learn from each other.",
    "date": [
      2026,
      9,
      10
    ],
    "tags": [
      "AI",
      "Research"
    ],
    "cover": "tree",
    "blocks": [
      [
        "tldr",
        "Multi task learning trains one shared model on several related tasks at once. When the tasks really are related, each one makes the others better. In my thesis on malaria detection, it beat a strong single task baseline."
      ],
      [
        "h2",
        "Three models or one?"
      ],
      [
        "p",
        "Diagnosing malaria from a blood smear is not one question. Where are the cells? Which ones are infected? Where exactly is the parasite? The usual answer is three separate models, each trained on its own."
      ],
      [
        "p",
        "Multi task learning asks something different: what if a single model learned all three, and shared what it sees between them?"
      ],
      [
        "h2",
        "One backbone, several heads"
      ],
      [
        "p",
        "The design is simple to describe. A shared backbone turns the image into features. Small heads on top each solve one task: detection, segmentation, and a heatmap of where to look."
      ],
      [
        "img",
        "mttl",
        "The architecture from my thesis: a ResNet-50 backbone, adapters and task heads"
      ],
      [
        "p",
        "Because every task pulls on the same features, the backbone is pushed towards a representation that is useful everywhere, instead of one tuned to a single narrow objective."
      ],
      [
        "h2",
        "Balancing the tasks"
      ],
      [
        "p",
        "The total loss is a weighted sum of the task losses:"
      ],
      [
        "math",
        "L = w<sub>1</sub>L<sub>det</sub> + w<sub>2</sub>L<sub>seg</sub> + w<sub>3</sub>L<sub>heat</sub>",
        "Each weight decides how loudly a task speaks during training"
      ],
      [
        "p",
        "This is where most of the real work is. If one task dominates, the others starve. If the weights fight, nothing learns well. I spent more time on this balance than on the architecture itself."
      ],
      [
        "h2",
        "Training on a budget"
      ],
      [
        "p",
        "Fine tuning the whole backbone for every experiment was too slow on the hardware I had. Low rank adapters, small trainable matrices placed next to frozen layers, let me adapt the model while training only a fraction of the parameters."
      ],
      [
        "quote",
        "Sharing is not free. It works when the tasks agree on what matters in the image."
      ],
      [
        "h2",
        "What it bought"
      ],
      [
        "p",
        "On infected cell detection, the multi task model improved F1 by up to 34% over YOLOv8 Small. The thesis, the code and the results are public on GitHub."
      ],
      [
        "h2",
        "When sharing hurts"
      ],
      [
        "p",
        "Multi task learning has a failure mode with a name, negative transfer. When two tasks want different things from the shared features, training one makes the other worse. The total loss still goes down, so it is easy to miss, but each task ends up below what a dedicated model would reach."
      ],
      [
        "p",
        "The signs are usually visible if you look for them. One task’s validation curve improves while another flattens or climbs. Gradients from different heads point in opposite directions on the shared layers. A single task model beats the shared one on its own metric."
      ],
      [
        "ul",
        [
          "Train each task alone first. Those numbers are the bar the shared model has to clear.",
          "Track every task’s metric separately, never only the combined loss.",
          "If two tasks fight, give each its own adapter or a few private layers before the shared backbone takes over."
        ]
      ],
      [
        "p",
        "In my case, detection and segmentation agreed well. Both care about where the cells are and what their edges look like. That agreement is the real reason the shared model could beat a dedicated detector. Pick related tasks first, then design the architecture."
      ],
      [
        "take",
        [
          "Related tasks can teach each other through a shared backbone.",
          "The loss weights matter as much as the architecture.",
          "Adapters make experiments affordable on modest hardware."
        ]
      ],
      [
        "refs",
        [
          [
            "Caruana, 1997. Multitask Learning.",
            "https://doi.org/10.1023/A:1007379606734"
          ],
          [
            "Hu et al., 2021. LoRA: Low-Rank Adaptation of Large Language Models.",
            "https://arxiv.org/abs/2106.09685"
          ],
          [
            "Thesis repository: github.com/GwadeSteve/MTTL-Research-Malaria",
            "https://github.com/GwadeSteve/MTTL-Research-Malaria"
          ]
        ]
      ]
    ]
  },
  {
    "k": "ranks-not-scores",
    "t": "Merge search results with ranks, not scores",
    "dek": "A one line formula that makes hybrid search work, with a worked example.",
    "date": [
      2026,
      8,
      20
    ],
    "tags": [
      "Maths",
      "Search"
    ],
    "cover": "bars",
    "blocks": [
      [
        "tldr",
        "Keyword search and vector search score documents on scales that cannot be compared. Reciprocal rank fusion ignores the scores and only uses positions. It is one line of maths, needs no training and works surprisingly well. I use it in VERO, my open source research workspace."
      ],
      [
        "h2",
        "Two searches, two languages"
      ],
      [
        "p",
        "Keyword search, like BM25, is excellent at exact terms: names, error codes, rare words. Vector search is excellent at meaning: it finds the paragraph that says the same thing in different words. Each one misses what the other finds, so you want both."
      ],
      [
        "p",
        "The hard part is merging them. A BM25 score of 12.4 and a cosine similarity of 0.81 do not live on the same scale. Adding them together is meaningless."
      ],
      [
        "fig",
        "fusion",
        "Two ranked lists, one merged answer"
      ],
      [
        "h2",
        "Use positions instead"
      ],
      [
        "p",
        "Reciprocal rank fusion sidesteps the problem of scales. It only asks where each document appears in each list:"
      ],
      [
        "math",
        "RRF(d) = Σ<sub>r</sub> 1 / (k + rank<sub>r</sub>(d))",
        "Sum over every ranked list r, with k a small constant"
      ],
      [
        "p",
        "A document near the top of any list gets a large contribution. A document near the top of several lists gets the most. The constant k softens the gap between first and second place; the original paper used k = 60."
      ],
      [
        "h2",
        "A worked example"
      ],
      [
        "table",
        [
          "Doc",
          "Keyword",
          "Vector",
          "RRF"
        ],
        [
          [
            "A",
            "1",
            "3",
            "0.0323"
          ],
          [
            "B",
            "2",
            "1",
            "0.0325",
            1
          ],
          [
            "C",
            "3",
            "·",
            "0.0159"
          ]
        ],
        "Rank in each list, and the fused score with k = 60. B wins because it is strong in both"
      ],
      [
        "p",
        "A tops the keyword list but only places third in the vector list. B is second and first. Fusion rewards agreement, so B comes out on top. C appears in only one list, so it falls behind."
      ],
      [
        "h2",
        "In code"
      ],
      [
        "code",
        "<span class=\"k\">def</span> rrf(rankings, k=60):\n    scores = {}\n    <span class=\"k\">for</span> ranking <span class=\"k\">in</span> rankings:\n        <span class=\"k\">for</span> rank, doc <span class=\"k\">in</span> enumerate(ranking, start=1):\n            scores[doc] = scores.get(doc, 0) + 1 / (k + rank)\n    <span class=\"k\">return</span> sorted(scores, key=scores.get, reverse=True)"
      ],
      [
        "quote",
        "Ranks travel well between systems. Scores do not."
      ],
      [
        "h2",
        "When fusion is not enough"
      ],
      [
        "p",
        "Reciprocal rank fusion treats every list as equally trustworthy. That is a good default and sometimes wrong. If your keyword search is excellent on product codes and your vector search is mediocre on them, you can weight each list, multiplying its contribution before summing. Keep the weights few and tune them on real queries, not on intuition."
      ],
      [
        "p",
        "Fusion also only reorders what the two searches already found. If the right document is in neither list, no formula will bring it back. The usual next step is a reranker, a slower model that reads the query and each of the top candidates together and scores them properly. Fusion then becomes the cheap first pass that decides what the reranker gets to see."
      ],
      [
        "ol",
        [
          "Retrieve a generous top list from each method, say fifty results.",
          "Fuse with reciprocal rank fusion.",
          "Rerank the fused top twenty with a model that reads query and document together.",
          "Measure every step on a small set of real questions with known good answers."
        ]
      ],
      [
        "p",
        "The last step is the one that keeps search honest. Twenty questions with known answers, checked after every change, will tell you more than any benchmark you did not build yourself."
      ],
      [
        "take",
        [
          "Never add scores that come from different systems.",
          "Reciprocal rank fusion rewards documents that several methods agree on.",
          "It needs no training and only one constant."
        ]
      ],
      [
        "refs",
        [
          [
            "Cormack, Clarke and Büttcher, 2009. Reciprocal Rank Fusion outperforms Condorcet and individual rank learning methods.",
            "https://doi.org/10.1145/1571941.1572114"
          ],
          [
            "Robertson and Zaragoza, 2009. The Probabilistic Relevance Framework: BM25 and Beyond.",
            "https://doi.org/10.1561/1500000019"
          ]
        ]
      ]
    ]
  },
  {
    "k": "idempotency",
    "t": "Press the button twice, pay once",
    "dek": "Networks fail at the worst moment. How to make retries harmless, explained with a lift button, a key and a table.",
    "date": [
      2026,
      9,
      19
    ],
    "tags": [
      "Systems"
    ],
    "cover": "retry",
    "blocks": [
      [
        "tldr",
        "A request is idempotent when doing it twice has the same effect as doing it once. Networks will always make clients retry, so any operation that moves money or sends a message needs this property by design. The usual tool is an idempotency key. The client names the operation, the server remembers the name, and a second attempt gets the first answer back instead of a second effect."
      ],
      [
        "h2",
        "The lift button"
      ],
      [
        "p",
        "Press the call button of a lift once and it lights up. Press it ten more times and nothing new happens. The lift is still coming once. That button is idempotent. Repeating the action does not repeat the effect."
      ],
      [
        "p",
        "Now picture a payment form. You press Pay, the spinner turns for twenty seconds, then the page says the connection was lost. Did the payment go through? You have no idea. The only reasonable move is to try again, and that is exactly the moment a careless system charges you twice."
      ],
      [
        "p",
        "That gap between what happened and what the client knows is not a bug you fix once. It is a property of every network. Requests get lost on the way in, responses get lost on the way out, and the client cannot tell the two apart."
      ],
      [
        "fig",
        "retry",
        "The same request sent three times. Only the first one creates an effect"
      ],
      [
        "h2",
        "Why retries are unavoidable"
      ],
      [
        "p",
        "From the client’s point of view, a request can end in three ways. A success, a clear failure, or silence. Silence is the hard one. The server may never have received the request. It may have received it and crashed halfway. It may have finished the work and lost the reply."
      ],
      [
        "ul",
        [
          "Lost request. Retrying is safe and necessary.",
          "Crash in the middle. Retrying may finish the job, or repeat the half that already ran.",
          "Lost response. The work is done, and a naive retry does it again."
        ]
      ],
      [
        "p",
        "The client only sees silence, so it cannot pick the right reaction for each case. Either it never retries and loses work every time the network hiccups, or it retries and the server makes that safe. Only the second option scales. Safety belongs on the server."
      ],
      [
        "quote",
        "The client cannot know what happened. The server has to make it not matter."
      ],
      [
        "h2",
        "Some operations are naturally safe"
      ],
      [
        "p",
        "HTTP already has a word for this. GET, PUT and DELETE are defined as idempotent. Reading a page twice changes nothing. Setting a value to 5 twice leaves it at 5. Deleting something that is already gone leaves it gone."
      ],
      [
        "p",
        "The trouble starts with operations that add something. Create an order, send a message, move money. POST is not idempotent by definition, and those are exactly the operations where a duplicate hurts the most."
      ],
      [
        "p",
        "Sometimes you can reshape an operation so it becomes safe on its own. “Set the balance to 12 000” can be repeated. “Add 2 000 to the balance” cannot. Absolute writes are friendlier than relative ones. But a transfer is a transfer, and most of the time you need something explicit."
      ],
      [
        "h2",
        "Idempotency keys"
      ],
      [
        "p",
        "The standard answer is to let the client name the operation. Before sending a request, the client generates a unique key, usually a random UUID, and sends it in a header. If it has to retry, it sends the same key again. On the server, the logic is short."
      ],
      [
        "ol",
        [
          "Look up the key. If a finished result exists, return it as it is.",
          "If the key is new, record it inside the same database transaction as the work.",
          "Do the work, store the response next to the key, commit.",
          "If a second request with the same key arrives while the first is still running, answer with a conflict and let the client try again later."
        ]
      ],
      [
        "code",
        "<span class=\"k\">def</span> handle(key, request):\n    <span class=\"k\">with</span> db.transaction():\n        row = db.lock(<span class=\"k\">\"idempotency\"</span>, key)\n        <span class=\"k\">if</span> row <span class=\"k\">and</span> row.response:\n            <span class=\"k\">return</span> row.response\n        response = do_the_work(request)\n        db.save(<span class=\"k\">\"idempotency\"</span>, key, response)\n        <span class=\"k\">return</span> response"
      ],
      [
        "p",
        "Two details matter more than they look. The check and the work must share one transaction. Otherwise a crash between them leaves a key that says done for work that never happened, or work that happened with no key to prove it. And the key needs a unique constraint in the database, so two retries racing each other cannot both slip past the check in the same instant."
      ],
      [
        "h2",
        "The details that bite"
      ],
      [
        "ul",
        [
          "Compare the payload. If a client reuses a key with a different body, that is a bug on their side. Refuse it loudly instead of replaying an answer that belongs to another request.",
          "Expire keys, but not too early. A key only needs to live as long as a client might retry. A day is common. An hour is often too short for phones that come back online later.",
          "Be careful with stored errors. A validation error can be replayed. A timeout from a third party should not be, because the next attempt may succeed.",
          "Scope every key. A key belongs to one user and one endpoint. Two customers who happen to send the same UUID must never see each other’s results."
        ]
      ],
      [
        "p",
        "Then there is the case where nobody gives you a key. Many outside systems send events with no stable identifier. You have to build one from the content, a hash of the fields that define the event, chosen so the same real event always produces the same hash."
      ],
      [
        "p",
        "Picking those fields is the real work. Include something that changes between retries, like the moment you received the event, and duplicates slip through. Leave out something that tells two real events apart, like the amount, and you merge two payments that should both count. I write the reasoning for every field next to the code, because the next person will ask."
      ],
      [
        "h2",
        "Exactly once is a story we tell"
      ],
      [
        "p",
        "People often ask for exactly once delivery. Over an unreliable network it cannot be guaranteed. What you can build is at least once delivery, by retrying until you get an answer, combined with a receiver that ignores copies it has already seen. From the outside, the result looks like exactly once. Underneath, it is retries plus memory."
      ],
      [
        "p",
        "Once you see it that way, the design question changes. You stop asking how to avoid duplicates and start asking where they get absorbed. Every hop that can retry needs a receiver that can say, I have seen this one, here is what I answered last time."
      ],
      [
        "take",
        [
          "A request is idempotent when doing it twice equals doing it once.",
          "Clients see silence, not causes, so retries are unavoidable.",
          "Idempotency keys let the server recognise a retry and replay the first answer.",
          "Keep the key check and the work in one transaction, backed by a unique constraint.",
          "Exactly once is at least once plus a receiver with a memory."
        ]
      ],
      [
        "refs",
        [
          [
            "Leach, 2017. Designing robust and predictable APIs with idempotency. Stripe Engineering Blog.",
            "https://stripe.com/blog/idempotency"
          ],
          [
            "IETF HTTPAPI working group. The Idempotency-Key HTTP Header Field, Internet Draft.",
            "https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/"
          ],
          [
            "Fielding, Nottingham and Reschke, 2022. RFC 9110, HTTP Semantics, section 9.2.2 on idempotent methods.",
            "https://www.rfc-editor.org/rfc/rfc9110#section-9.2.2"
          ],
          [
            "Kleppmann, 2017. Designing Data-Intensive Applications, chapters 8 and 11.",
            "https://dataintensive.net/"
          ]
        ]
      ]
    ]
  },
  {
    "k": "auc",
    "t": "What AUC actually tells you",
    "dek": "The most quoted number in classification, read as a simple bet between two people.",
    "date": [
      2026,
      9,
      2
    ],
    "tags": [
      "Maths",
      "AI"
    ],
    "cover": "roc",
    "blocks": [
      [
        "tldr",
        "AUC is the probability that a model ranks a random positive example above a random negative one. 0.5 is a coin flip, 1.0 is perfect ordering. It measures ranking, not calibration and not accuracy at the threshold you will actually use, which is why it should rarely be the only number you report."
      ],
      [
        "h2",
        "A bet between two people"
      ],
      [
        "p",
        "Pick one customer who left and one who stayed, at random. Ask the model which of the two is more likely to leave. Repeat thousands of times. The share of times the model picks correctly is the AUC."
      ],
      [
        "p",
        "That is the whole definition, and it is more useful than the curve most people draw. An AUC of 0.8 means that in eight out of ten such pairs, the model puts the right person on top. Nothing more, nothing less."
      ],
      [
        "math",
        "AUC = P( s(x<sup>+</sup>) &gt; s(x<sup>−</sup>) )",
        "s is the model’s score, x⁺ a random positive, x⁻ a random negative"
      ],
      [
        "p",
        "Read that way, a few things become obvious. AUC does not care about the actual score values, only their order. It does not care how many positives there are. And it says nothing about where you will draw the line between yes and no."
      ],
      [
        "h2",
        "Where the curve comes from"
      ],
      [
        "p",
        "A classifier usually outputs a score, and you choose a threshold to turn it into a decision. Every threshold gives two rates. The true positive rate is the share of real positives you catch. The false positive rate is the share of negatives you wrongly flag."
      ],
      [
        "p",
        "Slide the threshold from the highest score to the lowest and plot those two rates against each other. That is the ROC curve. A useless model draws the diagonal. A perfect one goes straight up, then right. The area under the curve is the AUC, and a little algebra shows it equals the pairwise bet above."
      ],
      [
        "fig",
        "roc",
        "ROC curves for a coin flip, a decent model and a strong one"
      ],
      [
        "h2",
        "Computing it by hand"
      ],
      [
        "p",
        "Take six customers with their scores. Three left, three stayed."
      ],
      [
        "table",
        [
          "Customer",
          "Score",
          "Left",
          "Rank"
        ],
        [
          [
            "A",
            "0.91",
            "Yes",
            "1",
            1
          ],
          [
            "B",
            "0.74",
            "No",
            "2"
          ],
          [
            "C",
            "0.66",
            "Yes",
            "3"
          ],
          [
            "D",
            "0.52",
            "Yes",
            "4"
          ],
          [
            "E",
            "0.40",
            "No",
            "5"
          ],
          [
            "F",
            "0.12",
            "No",
            "6"
          ]
        ],
        "Six customers sorted by score. A sits above every customer who stayed"
      ],
      [
        "p",
        "There are 3 × 3 = 9 pairs of one leaver and one stayer. A sits above all three stayers. C and D each sit above two of them but below B. That makes 3 + 2 + 2 = 7 correct pairs out of 9, so the AUC is 7 / 9, about 0.78."
      ],
      [
        "code",
        "<span class=\"k\">def</span> auc(scores, labels):\n    pos = [s <span class=\"k\">for</span> s, y <span class=\"k\">in</span> zip(scores, labels) <span class=\"k\">if</span> y == 1]\n    neg = [s <span class=\"k\">for</span> s, y <span class=\"k\">in</span> zip(scores, labels) <span class=\"k\">if</span> y == 0]\n    wins = sum((p &gt; n) + 0.5 * (p == n) <span class=\"k\">for</span> p <span class=\"k\">in</span> pos <span class=\"k\">for</span> n <span class=\"k\">in</span> neg)\n    <span class=\"k\">return</span> wins / (len(pos) * len(neg))"
      ],
      [
        "p",
        "This double loop is fine for learning and slow on real data. Sorting the scores once and summing ranks gives the same number in n log n time, which is what libraries do. Ties count as half a win."
      ],
      [
        "h2",
        "What AUC does not tell you"
      ],
      [
        "ul",
        [
          "It ignores calibration. Multiply every score by 0.1 and the AUC does not move, even though every probability is now wrong. If people will read scores as probabilities, check calibration separately, with a reliability plot or a Brier score.",
          "It ignores the threshold you will use. A team that can call fifty customers a week cares about precision at the very top, not about the order of everyone else.",
          "It can flatter rare events. When positives are 1% of the data, a high AUC can hide a flood of false alarms. A precision recall curve tells a more honest story there.",
          "It says nothing about stability. One AUC from one split is a single draw. Report it with an interval, from bootstrapping or from several time windows."
        ]
      ],
      [
        "quote",
        "A good AUC means the model sorts well. Whether that sorting is useful is a separate question."
      ],
      [
        "h2",
        "How I report it"
      ],
      [
        "p",
        "When I evaluate a classifier, the AUC comes with a confidence interval, a calibration measure, and a baseline that is almost embarrassingly simple, like ranking customers by how long ago they last did anything. If the model cannot clearly beat that baseline, the AUC does not matter."
      ],
      [
        "p",
        "When the data has a time dimension, I compute it on several windows that move forward in time. Train on the past, score the next period, slide, repeat. A model that only shines on the period it was trained on is not a model anyone can use, and one AUC on a random split will never show you that."
      ],
      [
        "take",
        [
          "AUC is the chance that a random positive scores above a random negative.",
          "It measures ordering only, not calibration and not your real threshold.",
          "Compute it by counting pairs, and report it with an interval.",
          "On rare events, look at precision and recall as well.",
          "Always compare against a simple baseline."
        ]
      ],
      [
        "refs",
        [
          [
            "Hanley and McNeil, 1982. The meaning and use of the area under a receiver operating characteristic curve. Radiology.",
            "https://doi.org/10.1148/radiology.143.1.7063747"
          ],
          [
            "Fawcett, 2006. An introduction to ROC analysis. Pattern Recognition Letters.",
            "https://doi.org/10.1016/j.patrec.2005.10.010"
          ],
          [
            "Saito and Rehmsmeier, 2015. The precision recall plot is more informative than the ROC plot when evaluating binary classifiers on imbalanced datasets. PLOS ONE.",
            "https://doi.org/10.1371/journal.pone.0118432"
          ],
          [
            "Brier, 1950. Verification of forecasts expressed in terms of probability. Monthly Weather Review.",
            "https://doi.org/10.1175/1520-0493(1950)078%3C0001:VOFEIT%3E2.0.CO;2"
          ]
        ]
      ]
    ]
  },
  {
    "k": "clocks",
    "t": "Your clocks disagree, and that is normal",
    "dek": "Why two machines never agree on the time, and how to put events in order anyway.",
    "date": [
      2026,
      8,
      11
    ],
    "tags": [
      "Systems"
    ],
    "cover": "clocks",
    "blocks": [
      [
        "tldr",
        "Every computer clock drifts, and synchronisation only narrows the gap. Order events across machines by timestamp and sooner or later an effect will appear before its cause. Use timestamps for people, logical order for correctness, and when you must match records from two clocks, match within a tolerance instead of on equality."
      ],
      [
        "h2",
        "Two watches never agree"
      ],
      [
        "p",
        "Ask a room full of people for the time and the answers will spread over a minute or two. Nobody is lying. Each watch runs a little fast or a little slow, and each was set at a different moment."
      ],
      [
        "p",
        "Computers are no different. A clock is a quartz crystal vibrating at roughly the right frequency, and roughly is the important word. Temperature, age and manufacturing make it gain or lose time. A drift of a few parts per million sounds tiny until you notice it adds up to around a second a day."
      ],
      [
        "p",
        "Phones add their own chaos. Their time can come from the mobile network, from the internet, or from a user who set it by hand. A phone that has been offline for a week can be minutes away from everyone else."
      ],
      [
        "fig",
        "skew",
        "Two clocks on one timeline. The reply can carry an earlier timestamp than the message it answers"
      ],
      [
        "h2",
        "Synchronisation narrows the gap"
      ],
      [
        "p",
        "NTP, the protocol most machines use to set their clocks, asks a time server for the time and corrects for the round trip. On a good local network it keeps machines within a millisecond or so. Over the public internet, tens of milliseconds is more realistic, and a congested or lopsided link makes it worse."
      ],
      [
        "p",
        "Synchronisation also makes clocks jump. When a machine finds it is ahead, it may step its clock backwards. Code that measures a duration by subtracting two wall clock readings can then get a negative number. That is why every serious language offers a monotonic clock, a counter that only moves forward and knows nothing about the date."
      ],
      [
        "ul",
        [
          "Wall clock time answers what date and hour it is. Good for logs and for people.",
          "Monotonic time answers how much time passed. Good for timeouts and measurements.",
          "Neither answers which of two events on two machines happened first."
        ]
      ],
      [
        "h2",
        "When timestamps lie about order"
      ],
      [
        "p",
        "Machine A writes a record at 10:00:00.120 by its own clock and sends a message to machine B. B’s clock is 200 milliseconds behind. B receives the message and writes its record at 09:59:59.950. Sort both records by timestamp and the answer comes before the question."
      ],
      [
        "p",
        "This is not a thought experiment. Last write wins, the default conflict rule in many databases, keeps the write with the largest timestamp. If clocks disagree, a newer write from a slow machine silently loses to an older write from a fast one. No error, no warning, just data that is no longer there."
      ],
      [
        "quote",
        "A timestamp tells you what a clock said. It does not tell you what happened first."
      ],
      [
        "h2",
        "Ordering without trusting clocks"
      ],
      [
        "p",
        "In 1978, Leslie Lamport showed how to order events with no shared clock at all. Every machine keeps a counter. It increments the counter for each event, sends the counter with each message, and when a message arrives it takes the larger of the two counters and adds one."
      ],
      [
        "math",
        "C = max(C<sub>local</sub>, C<sub>received</sub>) + 1",
        "Lamport’s rule, applied on every message received"
      ],
      [
        "p",
        "The guarantee is simple. If event a could have caused event b, then a gets a smaller number than b. Causes always come first. The counter has nothing to do with seconds, so it cannot drift."
      ],
      [
        "p",
        "Later ideas build on the same intuition. Vector clocks keep one counter per machine and can tell when two events are truly concurrent. Hybrid logical clocks pair a physical timestamp with a logical counter, staying close to real time while respecting cause and effect. Google’s Spanner takes the opposite road, measuring clock uncertainty explicitly and waiting it out before it commits."
      ],
      [
        "h2",
        "Matching records from two clocks"
      ],
      [
        "p",
        "A common, very practical case is reconciliation. Your bank statement says a payment happened at 14:02:47. Your own records say 14:02:11. Are they the same payment? Equality will never work. What works is a window, combined with every other field you have."
      ],
      [
        "ol",
        [
          "Filter on the fields that must match exactly, like the amount and the counterpart.",
          "Keep the candidates whose timestamps fall within a tolerance chosen from what you know about both clocks.",
          "If exactly one candidate remains, match it.",
          "If several remain, or none, do not guess. Hand it to a person with the evidence."
        ]
      ],
      [
        "p",
        "The last step is the one people skip. A wrong automatic match is worse than no match, because nobody goes looking for it. A queue of open cases is annoying. A silent mistake in someone’s money is much worse."
      ],
      [
        "take",
        [
          "Clocks drift, and synchronisation only reduces the drift.",
          "Use monotonic time for durations and wall clock time for people.",
          "Never rely on timestamps alone to order events across machines.",
          "Logical clocks give an order that respects cause and effect.",
          "Match records within a tolerance, and send ambiguous cases to a human."
        ]
      ],
      [
        "refs",
        [
          [
            "Lamport, 1978. Time, Clocks, and the Ordering of Events in a Distributed System. Communications of the ACM.",
            "https://doi.org/10.1145/359545.359563"
          ],
          [
            "Mills, Martin, Burbank and Kasch, 2010. RFC 5905, Network Time Protocol Version 4.",
            "https://www.rfc-editor.org/rfc/rfc5905"
          ],
          [
            "Kulkarni, Demirbas and others, 2014. Logical Physical Clocks and Consistent Snapshots in Globally Distributed Databases.",
            "https://cse.buffalo.edu/tech-reports/2014-04.pdf"
          ],
          [
            "Corbett and others, 2012. Spanner: Google’s Globally Distributed Database. OSDI.",
            "https://www.usenix.org/conference/osdi12/technical-sessions/presentation/corbett"
          ],
          [
            "Kleppmann, 2017. Designing Data-Intensive Applications, chapter 8.",
            "https://dataintensive.net/"
          ]
        ]
      ]
    ]
  },
  {
    "k": "quantization",
    "t": "Make a model faster by making it less precise",
    "dek": "How 8 bit integers let a vision model keep up in real time on small hardware, and where it goes wrong.",
    "date": [
      2026,
      7,
      28
    ],
    "tags": [
      "AI"
    ],
    "cover": "quant",
    "blocks": [
      [
        "tldr",
        "Quantization stores weights and activations as 8 bit integers instead of 32 bit floats. The model gets about four times smaller and often much faster, because integer maths is cheaper and far less data moves through memory. Accuracy usually barely moves, as long as you calibrate on real data and keep the fragile layers in higher precision."
      ],
      [
        "h2",
        "Precision you are not using"
      ],
      [
        "p",
        "A trained network stores each weight as a 32 bit floating point number. That format can hold values from tiny fractions to astronomically large ones, with about seven significant digits. A typical layer uses almost none of that. Its weights sit somewhere between −0.5 and 0.5, and the network does not care about the seventh digit."
      ],
      [
        "p",
        "On a desktop GPU, the waste barely hurts. On a Raspberry Pi or a small embedded board, it is the difference between a demo and a product. Memory bandwidth, not arithmetic, is often the real bottleneck, and every weight you read costs four bytes."
      ],
      [
        "h2",
        "Mapping floats to integers"
      ],
      [
        "p",
        "Quantization maps a range of real values onto 256 integer levels. You pick a scale and a zero point, then round."
      ],
      [
        "math",
        "q = round(x / s) + z &nbsp;&nbsp; x ≈ s · (q − z)",
        "s is the scale, z the zero point, q an 8 bit integer"
      ],
      [
        "fig",
        "quant",
        "A continuous range of values snapped onto a small set of integer levels"
      ],
      [
        "p",
        "If a layer’s weights span −0.5 to 0.5, the scale is 1 / 255, about 0.004. Every weight lands on one of 256 steps, and the rounding error is at most half a step. For most layers that error is noise the network never notices."
      ],
      [
        "p",
        "The speed comes from two places. Integer multiply and add units are smaller and faster than floating point ones, and modern accelerators have dedicated paths for 8 bit maths. And moving a quarter of the bytes through memory means the compute units spend less time waiting."
      ],
      [
        "h2",
        "Calibration is the real work"
      ],
      [
        "p",
        "Weights are fixed after training, so their range is easy to measure. Activations, the values flowing between layers, depend on the input. To quantize them you run a few hundred representative inputs through the model and record the ranges you see. That step is called calibration."
      ],
      [
        "ul",
        [
          "Use real data. Calibrating a street scene model on indoor photos produces ranges that clip the inputs it will actually see.",
          "Do not trust the extremes. One outlier can stretch a range so far that every normal value shares a handful of levels. Percentile or entropy based ranges usually beat plain min and max.",
          "Use one scale per channel for weights. Filters in the same layer can have very different ranges, and per channel scales keep the small ones precise."
        ]
      ],
      [
        "h2",
        "Where it goes wrong"
      ],
      [
        "p",
        "Some layers are fragile. The first layer sees raw pixels, the last one produces the scores you act on, and attention or normalisation layers can have wide, spiky activations. Quantizing them can cost more accuracy than the rest of the network combined."
      ],
      [
        "p",
        "The practical fix is mixed precision. Keep the fragile layers in 16 bit floats and quantize everything else. Tools like TensorRT let you choose precision layer by layer. Measure accuracy after each change, on data that looks like the field, not only on the test set you have been tuning against."
      ],
      [
        "p",
        "When post training quantization still loses too much, quantization aware training simulates the rounding during training, so the network learns weights that survive it. It costs another training run, and it usually wins back most of the gap."
      ],
      [
        "quote",
        "Measure accuracy after every precision change. Speed you cannot trust is not speed."
      ],
      [
        "h2",
        "What it bought"
      ],
      [
        "p",
        "On an assistive vision system running on embedded GPU hardware, INT8 quantization with TensorRT took a vision model from 18 to 28 frames per second. For someone relying on the device to describe what is in front of them, that is the difference between a description that lags behind and one that keeps up."
      ],
      [
        "p",
        "Weights stored in 8 bits also take a quarter of the memory, which matters on a board that is running camera, audio and sensor work side by side."
      ],
      [
        "ol",
        [
          "Measure the baseline speed and accuracy first.",
          "Quantize with calibration on real, representative data.",
          "Find the layers that lose the most accuracy and keep them in higher precision.",
          "Measure again on field like data before you ship."
        ]
      ],
      [
        "take",
        [
          "Most networks use a tiny part of the precision that 32 bit floats offer.",
          "8 bit integers cut memory by four and often speed up inference a lot.",
          "Calibration on real data decides whether accuracy survives.",
          "Keep fragile layers in higher precision and measure after every change."
        ]
      ],
      [
        "refs",
        [
          [
            "Jacob and others, 2018. Quantization and Training of Neural Networks for Efficient Integer Arithmetic Only Inference. CVPR.",
            "https://arxiv.org/abs/1712.05877"
          ],
          [
            "Nagel and others, 2021. A White Paper on Neural Network Quantization.",
            "https://arxiv.org/abs/2106.08295"
          ],
          [
            "Wu, Judd, Zhang, Isaev and Micikevicius, 2020. Integer Quantization for Deep Learning Inference, Principles and Empirical Evaluation.",
            "https://arxiv.org/abs/2004.09602"
          ],
          [
            "NVIDIA TensorRT Developer Guide, section on INT8 calibration.",
            "https://docs.nvidia.com/deeplearning/tensorrt/developer-guide/index.html"
          ]
        ]
      ]
    ]
  },
  {
    "k": "morphology",
    "t": "Erosion and dilation, from first principles",
    "dek": "Four operations that clean up binary images, rebuilt with NumPy to see what the libraries really do.",
    "date": [
      2026,
      7,
      9
    ],
    "tags": [
      "Maths",
      "Vision"
    ],
    "cover": "pixels",
    "blocks": [
      [
        "tldr",
        "Mathematical morphology treats an image as a set of pixels and probes it with a small shape called a structuring element. Erosion shrinks shapes, dilation grows them, and chaining the two removes noise or fills gaps without blurring edges. Written by hand with NumPy, it takes about twenty lines, and every library call afterwards feels obvious."
      ],
      [
        "h2",
        "Images as sets"
      ],
      [
        "p",
        "Most image processing treats pixels as numbers to average, filter and transform. Morphology takes another view. In a binary image, the white pixels form a set, and every operation is a question about how a small probe shape fits inside that set or touches it."
      ],
      [
        "p",
        "The probe is called a structuring element. A 3 × 3 square is the usual choice. A cross, a disk or a line works too, and the shape decides what the operation can see. A horizontal line probe, for example, only reacts to horizontal structure."
      ],
      [
        "h2",
        "Erosion and dilation"
      ],
      [
        "p",
        "Erosion keeps a pixel only if the structuring element, centred on it, fits entirely inside the shape. Thin parts vanish, shapes shrink, and isolated specks of noise disappear."
      ],
      [
        "p",
        "Dilation turns a pixel on if the structuring element, centred on it, touches the shape at all. Shapes grow, small holes close, and nearby pieces merge into one."
      ],
      [
        "math",
        "A ⊖ B = { z | B<sub>z</sub> ⊆ A } &nbsp;&nbsp; A ⊕ B = { z | B<sub>z</sub> ∩ A ≠ ∅ }",
        "Erosion keeps the positions where B fits inside A, dilation those where B touches A"
      ],
      [
        "fig",
        "erode",
        "A small shape, eroded and dilated by a 3 × 3 square"
      ],
      [
        "p",
        "The two are duals. Eroding the white pixels is the same as dilating the black ones and flipping the result. That symmetry is a good test for your own implementation."
      ],
      [
        "h2",
        "Opening and closing"
      ],
      [
        "p",
        "On their own, both operations change the size of everything. Chained, they become selective."
      ],
      [
        "ul",
        [
          "Opening is an erosion followed by a dilation. Small specks are erased by the erosion and never come back. Large shapes shrink and then grow back to roughly their original outline.",
          "Closing is a dilation followed by an erosion. Small holes and cracks are filled by the dilation and stay filled. The outer outline returns to where it was.",
          "An opening followed by a closing makes a simple and surprisingly strong cleaning filter for scanned text, masks and segmentation outputs."
        ]
      ],
      [
        "p",
        "This is why morphology still shows up right after neural networks. A segmentation model’s mask often comes out with speckles and pinholes. One opening and one closing clean it up in milliseconds, with no training at all."
      ],
      [
        "quote",
        "Choose the structuring element the way you would choose a question. It decides what the operation can see."
      ],
      [
        "h2",
        "In NumPy, by hand"
      ],
      [
        "p",
        "With a square structuring element, both operations reduce to looking at every neighbourhood and asking whether all, or any, of its pixels are on. Padding and slicing make that fast without a single Python loop over pixels."
      ],
      [
        "code",
        "<span class=\"k\">import</span> numpy <span class=\"k\">as</span> np\n\n<span class=\"k\">def</span> neighbourhoods(img, k=3):\n    r = k // 2\n    p = np.pad(img, r)\n    h, w = img.shape\n    <span class=\"k\">return</span> np.stack([p[i:i + h, j:j + w] <span class=\"k\">for</span> i <span class=\"k\">in</span> range(k) <span class=\"k\">for</span> j <span class=\"k\">in</span> range(k)])\n\n<span class=\"k\">def</span> erode(img, k=3):\n    <span class=\"k\">return</span> neighbourhoods(img, k).all(axis=0)\n\n<span class=\"k\">def</span> dilate(img, k=3):\n    <span class=\"k\">return</span> neighbourhoods(img, k).any(axis=0)\n\n<span class=\"k\">def</span> opening(img, k=3):\n    <span class=\"k\">return</span> dilate(erode(img, k), k)\n\n<span class=\"k\">def</span> closing(img, k=3):\n    <span class=\"k\">return</span> erode(dilate(img, k), k)"
      ],
      [
        "p",
        "The stack holds k² shifted copies of the padded image, one per offset in the square. Taking all or any across that axis is exactly the set definition above, written as array operations. Padding with zeros means the border counts as background, which is the usual convention."
      ],
      [
        "h2",
        "Beyond black and white"
      ],
      [
        "p",
        "The same ideas carry over to grayscale images. Erosion becomes a local minimum and dilation a local maximum over the neighbourhood. From there you get the morphological gradient, dilation minus erosion, which draws the edges, and the top hat, the image minus its opening, which pulls small bright details out of an uneven background."
      ],
      [
        "p",
        "The whole family is still built from min, max and a probe shape. Writing them once by hand is the fastest way I know to stop treating image libraries as black boxes."
      ],
      [
        "take",
        [
          "Morphology treats an image as a set and probes it with a structuring element.",
          "Erosion shrinks shapes, dilation grows them.",
          "Opening removes specks, closing fills holes, and both preserve outlines.",
          "The NumPy version is a stack of shifted images and an all or any."
        ]
      ],
      [
        "refs",
        [
          [
            "Soille, 2003. Morphological Image Analysis, Principles and Applications. Springer.",
            "https://doi.org/10.1007/978-3-662-05088-0"
          ],
          [
            "Mathematical morphology, overview and history. Wikipedia.",
            "https://en.wikipedia.org/wiki/Mathematical_morphology"
          ],
          [
            "OpenCV tutorial, morphological transformations.",
            "https://docs.opencv.org/4.x/d9/d61/tutorial_py_morphological_ops.html"
          ],
          [
            "scikit-image, morphology module reference.",
            "https://scikit-image.org/docs/stable/api/skimage.morphology.html"
          ],
          [
            "My code: github.com/GwadeSteve/Mathematical-Morphology-Image-Processing",
            "https://github.com/GwadeSteve/Mathematical-Morphology-Image-Processing"
          ]
        ]
      ]
    ]
  }
];
