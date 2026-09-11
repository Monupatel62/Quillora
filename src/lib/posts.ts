import type { BlogPost, Category } from "@/types/blog";
import { AUTHORS } from "./authors";
import { siteConfig } from "./config";

// ============================================================
//  QUILLORA — BLOG POST DATA
//  SEO-optimized: titles, excerpts, tags — research based
// ============================================================

const RAW_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "ai-reshaping-every-industry",
    // Primary keyword: "how AI is reshaping industries" (high intent, 2026 trending)
    // LSI: artificial intelligence business transformation, AI future of work
    title: "How AI is Quietly Reshaping Every Industry in 2026",
    excerpt:
      "Artificial intelligence isn't arriving with fanfare — it's already embedded in the tools, workflows, and decisions defining modern business. Here's what's really happening beneath the surface.",
    category: "Technology",
    tags: [
      "artificial intelligence",
      "AI in business",
      "future of work",
      "machine learning",
      "AI automation",
      "digital transformation",
      "AI trends 2026",
      "industry disruption",
    ],
    author: AUTHORS.arjun,
    publishedAt: "2026-09-08T09:00:00Z",
    updatedAt: "2026-09-10T12:00:00Z",
    readingTime: 7,
    featured: true,
    coverEmoji: "🤖",
    coverGradient: "from-violet-600 to-purple-700",
    content: `
<p class="lead">Artificial intelligence isn't some distant future technology anymore. It's quietly embedded in the tools you use every day — from the emails that get sorted to the suggestions that appear in your code editor.</p>

<h2>The Invisible Layer</h2>
<p>What makes this transformation remarkable is its invisibility. Unlike previous technological shifts that demanded explicit adaptation, AI has integrated itself into existing workflows with minimal friction. Doctors get diagnostic assistance. Lawyers receive document summaries. Engineers see pattern-based bug predictions.</p>

<blockquote><p>"The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it." — Mark Weiser</p></blockquote>

<h2>Three Industries Being Quietly Transformed</h2>

<h3>1. Healthcare</h3>
<p>AI-assisted diagnostics are catching diseases earlier. Radiology departments that once required a specialist for every scan now use AI as a first-pass filter, reducing misdiagnosis rates and freeing radiologists for complex cases. The technology doesn't replace judgment — it amplifies it.</p>

<h3>2. Education</h3>
<p>Adaptive learning platforms now tailor curriculum in real-time to each student's pace and comprehension. The result isn't just faster learning — it's fundamentally more personalized education at a scale previously impossible.</p>

<h3>3. Supply Chain</h3>
<p>Global logistics companies use predictive AI to anticipate disruptions before they happen. When a port slows down, algorithms reroute shipments hours before human analysts even see the data.</p>

<h2>What This Means For Workers</h2>
<p>The fear of job displacement, while understandable, misses the more nuanced reality. Jobs aren't disappearing — they're transforming. The skills that matter most are shifting from execution to curation, from doing to directing.</p>
<p>The silent revolution is already here. The only question is whether you're participating in it or watching from the sidelines.</p>
    `.trim(),
  },

  {
    id: 2,
    slug: "minimalism-in-ui-design",
    // Primary keyword: "minimalism in UI design" (strong design community search)
    // LSI: minimal UX, clean interface design, less is more design
    title: "Why Minimalism in UI Design is Harder Than It Looks",
    excerpt:
      "Stripping a design down to its essentials requires more skill than adding to it. Great minimal UI isn't about absence — it's about deliberate, ruthless precision.",
    category: "Design",
    tags: [
      "ui design",
      "minimalism",
      "ux design",
      "product design",
      "minimal interface",
      "design principles",
      "clean design",
      "user experience",
      "web design",
    ],
    author: AUTHORS.priya,
    publishedAt: "2026-09-05T10:00:00Z",
    readingTime: 5,
    featured: false,
    coverEmoji: "🎨",
    coverGradient: "from-cyan-500 to-sky-600",
    content: `
<p class="lead">Open any design portfolio and you'll see a consistent aesthetic: clean lines, ample white space, muted palettes. Minimalism has become the dominant design language of our era. But spend time trying to execute it, and you'll quickly discover that making something look effortless is the hardest kind of work.</p>

<h2>The Paradox of Subtraction</h2>
<p>Adding things to a design is easy. You can always add another element, another color, another tooltip. Removing things is terrifying — every subtraction risks losing meaning or functionality. Minimalism isn't about being sparse; it's about being ruthlessly intentional about every single element that remains.</p>

<blockquote><p>"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry</p></blockquote>

<h2>What Most Minimal Designs Get Wrong</h2>
<p>A common mistake is confusing minimal with empty. Interfaces stripped of all visual cues may look clean in a mockup but fail users in practice. Affordances — the visual signals that tell users what they can interact with — must survive the minimalist cut.</p>

<h2>The Three Principles That Actually Work</h2>

<h3>1. Hierarchy Without Decoration</h3>
<p>Typography and spacing can establish hierarchy more powerfully than colored boxes or heavy borders. Size, weight, and whitespace communicate importance — no ornamentation required.</p>

<h3>2. Motion as Information</h3>
<p>In a minimal interface, animation carries meaning. A button press that creates a ripple, a modal that slides in from a specific direction — these microinteractions replace the visual clutter that would otherwise explain system state.</p>

<h3>3. The 80% Rule</h3>
<p>Design for the 80% use case, not every edge case. Minimal interfaces stay minimal by making the common path effortless and allowing the rare paths to require a bit more effort to access.</p>

<p>Minimalism done well is invisible. The user never thinks about the design — they just accomplish their goal.</p>
    `.trim(),
  },

  {
    id: 3,
    slug: "reading-in-2026",
    // Primary keyword: "reading habits 2026" + "long form reading digital age"
    // LSI: attention economy, deep reading, digital reading culture
    title: "The Reading Renaissance: Why Long-Form Content is Thriving in 2026",
    excerpt:
      "Despite shrinking attention spans and infinite scrolling, long-form reading is making a comeback. Here's what changed — and what it means for how we consume ideas.",
    category: "Culture",
    tags: [
      "reading habits",
      "long form content",
      "attention economy",
      "digital culture",
      "books",
      "deep reading",
      "media consumption",
      "newsletter",
      "content culture 2026",
    ],
    author: AUTHORS.sana,
    publishedAt: "2026-09-02T08:00:00Z",
    readingTime: 6,
    featured: false,
    coverEmoji: "📚",
    coverGradient: "from-orange-500 to-amber-600",
    content: `
<p class="lead">Something strange is happening in 2026. Despite living in the most distraction-saturated media environment in history, long-form reading is quietly having a moment. Newsletter subscriptions are at record highs. Bookstore sales reversed their decade-long decline.</p>

<h2>The Attention Recession</h2>
<p>The algorithmic feed that dominated the 2010s optimized for engagement over depth. Endless scrolling, infinite content, constant novelty — it rewired how millions of people consumed information. The side effect was predictable: difficulty sustaining focus on anything complex or slow-moving.</p>

<h2>The Backlash</h2>
<p>But humans aren't passive consumers. The generation that grew up on social media is now deliberately seeking out longer, deeper content. Not because of nostalgia — because of satisfaction. There's a qualitative difference between how you feel after 45 minutes of scrolling versus 45 minutes of reading a well-argued essay.</p>

<blockquote><p>Reading is an act of resistance in the attention economy. Every page you finish is time you chose to spend on your own terms.</p></blockquote>

<h2>What's Changed About What We Read</h2>
<p>The content itself has evolved. The best long-form writing today is more visual than ever — not in a literal sense, but in how it builds scenes, moves through time, and constructs arguments. Writers have learned from film. Readers have been trained by it.</p>

<h2>The Recommendation Layer</h2>
<p>Curated newsletters, reading clubs, and thoughtful recommendation engines have replaced the algorithmic randomness of social feeds. What you read is increasingly shaped by people you trust, not engagement metrics.</p>
    `.trim(),
  },

  {
    id: 4,
    slug: "science-of-habit-formation",
    // Primary keyword: "science of habit formation" (high volume, informational intent)
    // LSI: how long to form a habit, habit loop, behavior change science
    title: "The Science of Habit Formation: What Research Actually Says",
    excerpt:
      "The 21-day habit myth is wrong. Here's what neuroscience and behavioral research actually reveal about building habits that stick — and why identity matters more than willpower.",
    category: "Science",
    tags: [
      "habit formation",
      "neuroscience",
      "behavior change",
      "psychology",
      "habit loop",
      "how to build habits",
      "21 day myth",
      "basal ganglia",
      "productivity science",
      "self improvement",
    ],
    author: AUTHORS.rahul,
    publishedAt: "2026-08-28T07:00:00Z",
    readingTime: 8,
    featured: false,
    coverEmoji: "🧠",
    coverGradient: "from-emerald-500 to-green-600",
    content: `
<p class="lead">The "21 days to form a habit" claim has been repeated so often it's achieved the status of fact. There's just one problem: it isn't true. The research behind habit formation is far more interesting — and far more useful — than the simplified version that circulates in productivity culture.</p>

<h2>Where the 21-Day Myth Comes From</h2>
<p>The claim traces back to Dr. Maxwell Maltz, a plastic surgeon who observed in the 1960s that patients took roughly 21 days to get used to their new appearance. That casual observation got distorted into a universal rule about behavior change.</p>

<h2>What the Research Shows</h2>
<p>A 2010 study by Phillippa Lally at University College London found that it takes anywhere from 18 to 254 days for a behavior to become automatic — with an average of 66 days. The wide range reflects genuinely meaningful variation based on the complexity of the behavior and the individual doing it.</p>

<blockquote><p>A habit isn't formed when you've done something for X days. It's formed when the behavior becomes the path of least resistance.</p></blockquote>

<h2>The Neurological Mechanism</h2>
<p>Habits are stored in the basal ganglia, a region involved in procedural learning. When a behavior is repeated consistently in the same context, the brain creates a compressed neurological "chunk" — a routine that can be triggered automatically by a cue without engaging the prefrontal cortex.</p>

<h3>The Habit Loop</h3>
<p>Every habit runs on a cue-routine-reward structure. The critical insight is that you can't simply delete a habit — you can only replace the routine while keeping the cue and reward. This is why cold turkey rarely works.</p>

<h2>Practical Implications</h2>
<p>Stop counting days. Track consistency of context — same time, same place, same trigger. The environmental cue matters more than the calendar. The most durable habits don't feel like discipline after a while. They feel like identity.</p>
    `.trim(),
  },

  {
    id: 5,
    slug: "financial-independence-at-35",
    // Primary keyword: "financial independence at 35" (FIRE movement, high intent)
    // LSI: FIRE movement, retire early, savings rate, FI number
    title: "Financial Independence at 35: A Realistic Step-by-Step Framework",
    excerpt:
      "Financial independence is not just for the ultra-wealthy. With the right savings rate, investment strategy, and mindset shift, it's achievable for ordinary earners — here's the proven framework.",
    category: "Finance",
    tags: [
      "financial independence",
      "FIRE movement",
      "retire early",
      "personal finance",
      "investing",
      "savings rate",
      "index funds",
      "FI number",
      "wealth building",
      "financial freedom",
    ],
    author: AUTHORS.vikram,
    publishedAt: "2026-08-22T09:00:00Z",
    readingTime: 9,
    featured: false,
    coverEmoji: "💰",
    coverGradient: "from-yellow-500 to-amber-500",
    content: `
<p class="lead">Financial independence means having enough invested assets that the returns cover your living expenses — without needing to work. It's often assumed to be the province of high earners or the lucky. In reality, it's primarily a function of savings rate and time.</p>

<h2>The Core Math</h2>
<p>The fundamental equation is simple: your FI number is your annual expenses multiplied by 25, based on the 4% safe withdrawal rate from the Trinity Study. If you spend ₹12 lakhs per year, your target is ₹3 crore invested in diversified assets.</p>

<h2>The Savings Rate Is Everything</h2>
<p>Most financial planning focuses on investment returns — which you can't reliably control. The variable you can control is your savings rate. Someone saving 50% of income can reach FI in roughly 17 years. Someone saving 70% gets there in under 9.</p>

<blockquote><p>It's not about how much you earn. It's about the gap between what you earn and what you spend — and what you do with that gap.</p></blockquote>

<h2>The Three Levers</h2>

<h3>1. Reduce Fixed Costs</h3>
<p>Housing is typically the largest expense. Geographic arbitrage — living in a lower cost-of-living area — can dramatically accelerate timelines without reducing quality of life.</p>

<h3>2. Increase Income</h3>
<p>Skill development that increases earning capacity is the highest-ROI investment most people can make.</p>

<h3>3. Invest Consistently</h3>
<p>Low-cost index funds with automatic monthly contributions beat sophisticated strategies abandoned during market downturns.</p>

<h2>The Non-Financial Piece</h2>
<p>FI planning forces you to answer a question most people never explicitly ask: what do I actually want my life to look like? The answer often reveals that the target is closer than you think.</p>
    `.trim(),
  },

  {
    id: 6,
    slug: "sleep-recovery-performance",
    // Primary keyword: "sleep and athletic performance" + "sleep optimization"
    // LSI: sleep recovery athletes, sleep science, performance sleep
    title: "Sleep Science: How Elite Athletes Optimize Recovery for Peak Performance",
    excerpt:
      "Sleep is the most underutilized performance advantage in sport and life. Here's what the research shows, what elite athletes actually do, and the simple protocols that work.",
    category: "Health",
    tags: [
      "sleep optimization",
      "athletic performance",
      "sleep science",
      "recovery",
      "sleep and health",
      "elite athletes sleep",
      "performance recovery",
      "sleep deprivation effects",
      "health optimization",
      "wellness",
    ],
    author: AUTHORS.ananya,
    publishedAt: "2026-08-15T08:00:00Z",
    readingTime: 6,
    featured: false,
    coverEmoji: "💤",
    coverGradient: "from-sky-500 to-blue-600",
    content: `
<p class="lead">Every major sports organization in the world now employs sleep specialists. Elite performance is inseparable from elite recovery, and recovery lives or dies on sleep quality.</p>

<h2>What Happens During Sleep</h2>
<p>Sleep is not passive rest — it's active biological maintenance. During deep NREM sleep, the pituitary gland releases growth hormone essential for muscle repair. REM sleep consolidates motor learning, embedding the neural patterns of skills practiced during the day.</p>

<h2>The Performance Cost of Under-Sleeping</h2>
<p>Matthew Walker's research showed that sleeping less than 7 hours for even two weeks produces deficits equivalent to staying awake for 24 hours — while subjects themselves report feeling "fine." The dangerous part is that under-slept people don't know how impaired they are.</p>

<blockquote><p>You cannot sleep-deprive your way to peak performance. The body keeps score — and it bills with interest.</p></blockquote>

<h2>What Elite Athletes Actually Do</h2>
<p>LeBron James reportedly sleeps 12 hours a night. Roger Federer and Usain Bolt have cited sleep as a primary performance factor. A Stanford study asked basketball players to sleep 10 hours for six weeks — the result was 9% faster sprint times and 41% improved shooting accuracy.</p>

<h2>Practical Protocols</h2>
<p>Keep a consistent sleep and wake time including weekends. Drop room temperature to 18–19°C. Eliminate blue light exposure for 90 minutes pre-bed. These changes alone produce measurable performance improvements within two weeks.</p>
    `.trim(),
  },

  {
    id: 7,
    slug: "slow-travel-30-days-one-city",
    // Primary keyword: "slow travel" + "digital nomad living" (high growth searches)
    // LSI: long term travel, living abroad, slow travel benefits
    title: "Slow Travel: Why Living in One City for 30 Days Changes How You See the World",
    excerpt:
      "Speed tourism gives you a checklist. Slow travel gives you a life. The philosophy, economics, and surprising discoveries of staying long enough to actually know a place.",
    category: "Travel",
    tags: [
      "slow travel",
      "digital nomad",
      "long term travel",
      "travel lifestyle",
      "living abroad",
      "travel philosophy",
      "budget travel",
      "remote work travel",
      "expat life",
      "mindful travel",
    ],
    author: AUTHORS.meera,
    publishedAt: "2026-08-08T10:00:00Z",
    readingTime: 5,
    featured: false,
    coverEmoji: "✈️",
    coverGradient: "from-orange-400 to-rose-500",
    content: `
<p class="lead">Most travel is a kind of structured anxiety. You're perpetually optimizing — best time to visit, must-see spots, Instagram-worthy angles. You arrive exhausted, race through attractions, and leave without ever having been present enough to let the place touch you.</p>

<h2>The Case for Staying</h2>
<p>Slow travel inverts the assumption. Instead of trying to see ten cities in two weeks, you spend a month in one. The first week, you're still in tourist mode. The second week, you start noticing things. By the third week, you have a regular café. By the fourth, you have opinions about the neighborhood.</p>

<blockquote><p>A city reveals itself in layers. Speed tourism sees the facade. Slow travel finds the interior.</p></blockquote>

<h2>The Economics Are Often Better</h2>
<p>Renting a monthly apartment in Lisbon, Tbilisi, or Chiang Mai often costs less than a week of hotels. Cooking some meals, finding the markets locals shop at, avoiding tourist-trap pricing — the daily cost frequently drops below urban life at home.</p>

<h2>What You Actually Get</h2>
<p>You get time to be bored. Boredom in a foreign city is creative pressure — it forces you to discover things not in any guidebook, conversations with people with no agenda, pleasures that can't be scheduled.</p>

<p>The best travel experiences I've had weren't at famous landmarks. They were Tuesday afternoons in unremarkable neighborhoods, talking to someone I wouldn't have met if I'd been moving faster.</p>
    `.trim(),
  },

  {
    id: 8,
    slug: "stoicism-and-second-chances",
    // Primary keyword: "stoicism and failure" + "stoic philosophy practical"
    // LSI: Marcus Aurelius lessons, Epictetus dichotomy of control, resilience mindset
    title: "Stoicism and Failure: What Ancient Philosophy Teaches Us About Second Chances",
    excerpt:
      "The Stoics weren't passive fatalists — they were relentless reframers. Here's what Epictetus, Marcus Aurelius, and modern psychology agree on about recovering from setbacks.",
    category: "Life",
    tags: [
      "stoicism",
      "philosophy",
      "failure and resilience",
      "Marcus Aurelius",
      "Epictetus",
      "growth mindset",
      "second chances",
      "mental resilience",
      "self improvement",
      "life philosophy",
      "dichotomy of control",
    ],
    author: AUTHORS.kabir,
    publishedAt: "2026-08-01T09:00:00Z",
    readingTime: 7,
    featured: false,
    coverEmoji: "🌱",
    coverGradient: "from-pink-500 to-rose-600",
    content: `
<p class="lead">Stoicism has enjoyed a genuine cultural revival, and for good reason: it's one of the few philosophical traditions built specifically for adversity — not for contemplating the good life in abstract, but for functioning in a world that regularly doesn't go as planned.</p>

<h2>What Most People Get Wrong About Stoicism</h2>
<p>Stoicism is often misunderstood as emotional suppression — the stiff-upper-lip tradition of refusing to feel things. This misses the entire point. The Stoics weren't arguing against emotions; they were arguing against being controlled by emotions you haven't examined.</p>

<h2>The Dichotomy of Control</h2>
<p>Epictetus, who was born a slave, developed what may be the most practical philosophical principle: the dichotomy of control. Some things are up to us — our judgments, impulses, desires, aversions. Everything else is not fully up to us.</p>

<blockquote><p>"Make the best use of what is in your power, and take the rest as it happens." — Epictetus</p></blockquote>

<h2>On Failure Specifically</h2>
<p>Marcus Aurelius, arguably history's most powerful man, wrote daily journal entries about his own failings, frustrations, and struggles. He didn't do this to wallow — he did it to process, to reframe, and to recommit. The Meditations aren't a monument to Stoic success; they're a record of Stoic practice.</p>

<h3>The Obstacle is the Way</h3>
<p>What impedes action advances action, when reframed correctly. The failure that feels like a wall is also information. It tells you where the design was wrong, where the assumptions failed, where you need to adapt.</p>

<h2>The Practice, Not the Theory</h2>
<p>Stoicism isn't a belief system to be adopted intellectually. It's a daily practice of asking: what actually happened versus what story am I telling about what happened? Most suffering is in the story. The facts, taken plainly, are often manageable.</p>
    `.trim(),
  },
];

// ============================================================
//  DATA ACCESS FUNCTIONS
// ============================================================

export function getAllPosts(): BlogPost[] {
  return [...RAW_POSTS].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return RAW_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: Category): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPost(): BlogPost {
  return getAllPosts().find((p) => p.featured) ?? getAllPosts()[0];
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return getAllPosts().slice(0, limit);
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit)
    .concat(
      getAllPosts()
        .filter((p) => p.slug !== slug && p.category !== current.category)
        .slice(0, limit)
    )
    .slice(0, limit);
}

export function getAllSlugs(): string[] {
  return RAW_POSTS.map((p) => p.slug);
}

export function getUsedCategories(): Category[] {
  return [...new Set(RAW_POSTS.map((p) => p.category))];
}

export function postUrl(slug: string): string {
  return `${siteConfig.url}/blog/${slug}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
