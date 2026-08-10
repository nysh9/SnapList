# Fashion-Tech Portfolio Projects That Use AWS and Can Actually Get Users

## TL;DR
- **Build a tool for resellers, not shoppers.** The secondhand/resale market is a $393 billion global powerhouse (projected 2030) growing ~2x faster than overall apparel globally — and nearly 4x faster than retail in the US specifically — with large, reachable, tool-hungry communities (r/Flipping, r/Depop, r/poshmark, sneaker Discords with 50,000+ members). Incumbent tools start as low as ~$15/month but visibly frustrate users, leaving room for a solo dev whose distribution is easy and whose AWS story is strong.
- **The single best-ranked idea is an AI reseller listing assistant** (photo → SEO title/description/attributes + accurate sold-comp pricing + non-destructive background removal) using Amazon Bedrock (Nova/Claude), Rekognition, and S3/Lambda. It maps to real, verbatim pain, has a free-tier-friendly cost profile, and demonstrates the exact skills employers want (managed ML integration, event-driven serverless, cost control).
- **Distribution beats novelty.** Rank ideas by whether an unknown dev can reach the first 100 users. Favor free browser extensions and seller tools promoted via "build-in-public" on r/SideProject + weekly feedback threads in reseller subs + Discords, and avoid ToS-risky scraping of Poshmark/Vinted/GOAT/Grailed in favor of official APIs (eBay Sell, Depop partner, StockX).

## Key Findings

**The resale wedge is the strongest.** ThredUp's 14th annual Resale Report (released April 2, 2026, conducted by GlobalData) sizes the global secondhand apparel market at $393 billion by 2030, roughly 10% of total apparel spend, growing at a ~9% CAGR — more than 2x faster than the overall apparel market. The US secondhand market grew 13% in 2025 (nearly 4x faster than the broader US retail clothing market's ~3.6%) and is projected to reach $78.8 billion by 2030 at ~7.3% annual growth. Through 2030, 71% of all market growth is expected to come from Gen Z and millennials. This is a large, still-expanding market whose participants (sellers) actively seek tools and congregate in identifiable communities.

**Reseller pain points are concrete and verbatim.** Sellers hate existing background-removal tools ("that background remover only works effectively about 20% of the time so I now ignore it"; "when trying to remove background, it is removing arms hands," per eBay Community threads). Cross-listing sync failures cause double-sales ("item sold, yet the item not de-listed... I had to issue apologies to customers," per a Trustpilot review of Vendoo). Pricing research is a manual time-sink ("I spent 2 hours manually comparing Nike AF1 prices across just 6 Vinted country sites," per a developer blog on dev.to). And incumbents are pricey: Vendoo's tiers run $14.99 (Starter) / $29.99 (Growth) / $59.99 (Pro) per month, List Perfectly runs $29–$249/month, and ResellKit starts at $49.99/month — so "cheaper than the incumbents" is itself a wedge.

**The digital-closet space is saturated; the resale-tooling space is not.** Whering (10M+ users; $7M seed led by eBay Ventures and the Google AI Futures Fund), Indyx, Acloset, Stylebook (since 2010), Cladwell, Get Wardrobe, Save Your Wardrobe, plus 2026 entrants Vesta, Clueless, Wardrowbe, and Nouva already crowd the consumer wardrobe-organizer niche. AI try-on is heavily VC-funded: Doji raised a $14M seed led by Thrive Capital (with Seven Seven Six), and Veesual raised a $7.5M seed led by AVP (AXA Venture Partners) and Techstars — plus Google Doppl, SpreeAI, Botika, Raspberry AI, Alta, and Phia. A solo dev should avoid competing head-on there and instead serve sellers or build a differentiated free/niche/API/extension play.

**Marketplace API reality shapes what is safe to build.** eBay has an open developer program (Sell APIs open; Browse API production gated behind approval/contracts). Depop launched a private partner Selling API (partnerapi.depop.com, ~July 2025) requiring email application and "circularity" vetting — Vendoo migrated to it in 2026. StockX has an official but limited/frustrating developer portal (25,000 requests/24h, manual review). Poshmark, Vinted, GOAT, and Grailed have NO public API, forcing ToS-risky scraping behind Cloudflare/Datadome. Sold-comps data is the hardest thing to get legitimately everywhere — the biggest reseller pain and the biggest compliance risk.

**AWS costs are free-tier-friendly if you avoid the traps.** The dangerous services for a solo dev are Rekognition Custom Labels (always-on inference endpoints at ~$4/hour ≈ ~$2,900/month if left running) and OpenSearch Serverless (historically a 4-OCU minimum). The safe backbone is S3 + CloudFront + Lambda + API Gateway + DynamoDB + Cognito + Amplify, plus Bedrock Nova (extremely cheap per token) and standard Rekognition DetectLabels ($0.001/image). New AWS accounts (post-July 15, 2025) get up to $200 in credits (expiring after 6 months).

## Details

### 1. Gaps and opportunities in fashion tech (2025–2026)

**Underserved needs, ranked by how reachable the audience is:**

1. **Reseller productivity (listing, pricing, photo, inventory).** Strongest verbatim demand and easiest distribution. Sellers are motivated (it's income), congregate in dedicated subs/Discords, and openly complain about existing tools. Native AI listing tools now exist on Depop (Sept 2024 description generator, used by roughly half of testers) and Poshmark ("Smart List AI"), which validates demand but means solo tools must differentiate on accuracy, cross-platform coverage, or price.
2. **Sneaker/streetwear drop + resale-price tracking.** Highly engaged; huge Discord infrastructure (USASneakers, Resell Calendar, Peachy Pings; paid "cook groups" $10–299/mo). Data reachable via community APIs (Sneaks-API scrapes StockX/GOAT/Flight Club/Stadium Goods) and StockX's official API. Distribution via existing Discords is a genuine advantage.
3. **Fit/size translation across brands.** Real, universal pain ("you can be a four in one brand, and an eight in another"). Underserved by software, but distribution is harder (no single community) and data (brand size charts) is scattered.
4. **Dupe-finding.** Popular but crowded and increasingly commoditized (Dupe.com, Beaver, dozens of GPTs) and legally sensitive (trademark, affiliate ToS).
5. **Digital closet / outfit planning.** Saturated. Avoid unless you have a sharp niche wedge.

**Communities easiest for a solo dev to reach:** reseller subs (r/Flipping, r/Depop, r/poshmark, r/vintageclothing), sneaker Discords (some 50,000+ members), and build-in-public indie subs (r/SideProject, ~628K members). The advice subs r/malefashionadvice (~6.3M) and r/femalefashionadvice are curated and hostile to tool-dropping; note that much of the r/MFA community migrated to a Discord + Substack after the 2023 API protest, which may be more welcoming venues.

### 2. What already exists and where the gaps are

- **Digital closets (SATURATED):** Whering, Indyx, Acloset, Stylebook, Cladwell, Get Wardrobe, Save Your Wardrobe, plus 2026 entrants Vesta, Clueless, Wardrowbe, Nouva. Gaps: none worth a solo dev's time head-on. Note Stylebook has no AI and is iOS-only; there is documented migration of frustrated Cladwell/Acloset users seeking alternatives ("best alternatives" content) — a possible wedge for a *free, cross-platform, better-AI* niche closet, but distribution is hard.
- **Resale marketplaces:** Vestiaire, GOAT, StockX, Depop, Poshmark, Vinted, Grailed — you don't compete with these; you build tools *for their sellers*.
- **Cross-listing tools (competitive but flawed):** Crosslist, Vendoo, List Perfectly, PrimeLister, Flyp, Nifty, Voolist. Gaps: reliable auto-delist (oversell is the #1 failure), lower price, better UX, single-marketplace niche depth.
- **AI try-on/styling (VC-saturated):** Doji, Veesual, Doppl (Google), SpreeAI, Botika, Raspberry AI, Alta, Phia. Avoid direct competition.
- **Dupe-finders (crowded):** Dupe.com, Beaver, YesChat GPTs.
- **Sneaker tools:** SneakerMarket.app, Sneaks-API, many Apify scrapers. Gap: a clean, free collection-management + portfolio-value tracker tied into Discords.

**Dead/abandoned-tool demand:** frustrated Cladwell and Acloset users (documented "best alternatives" content) and users of any cross-lister with sync bugs represent ready-made demand for replacements.

### 3. AWS services that map to fashion tech (with cost realities)

- **Amazon Bedrock** — text (Nova Micro $0.035/$0.14 per 1M input/output tokens; Nova Pro $0.80/$3.20; Claude Sonnet ~$3/$15) for listing-description/title generation, styling text, attribute extraction; image models (Titan/Stable Diffusion ~$0.036/image) for generation. No permanent free tier; new accounts get $200 credits (expire 6 months). Use Nova Micro/Lite for cheap classification and batch inference (50% off) to control cost. Bedrock bills commonly run 1.5–2x naive estimates once Knowledge Bases/Guardrails/embeddings are added — keep the architecture lean.
- **Amazon Rekognition** — standard DetectLabels at $0.001/image (first 1M/mo), free tier 5,000 images/mo for 12 months, for garment classification, color/dominant-color detection, moderation. **Cost trap:** Custom Labels requires always-on inference endpoints billed ~$4/hour (~$2,900/mo if left running) — avoid for a hobby project; prefer standard APIs or Bedrock vision.
- **Vector search** — for visual similarity / "find the dupe" / duplicate detection: **pgvector on RDS/Aurora** is cheapest for small/medium apps and integrates with your relational DB. **S3 Vectors** is dramatically cheaper for infrequent/low-query workloads. **OpenSearch Serverless** historically had a 4-OCU minimum (a cost trap), though NextGen scale-to-zero now makes PoCs cost cents (with a 10–30s cold-start tradeoff). Start with pgvector.
- **App backbone** — S3 (storage), CloudFront (CDN), Lambda + API Gateway (serverless compute), DynamoDB (NoSQL), Cognito (auth), Step Functions/EventBridge/SQS (orchestration for listing pipelines), AWS Amplify (rapid full-stack deploy). These fit comfortably in free tier at 100–1,000 users.
- **SageMaker** — JumpStart pre-trained models and serverless inference for embeddings/fit prediction if you want to show deeper ML; heavier to operate than Bedrock/Rekognition.

### 4. Concrete project proposals (ranked by realistic likelihood of getting users)

**#1 — "SnapList": AI reseller listing assistant (browser extension + web app).**
- *Value prop / user:* For Depop/Poshmark/eBay/Vinted sellers — snap or upload a garment photo and get an SEO title, description, tags, and suggested attributes, plus a suggested price from real sold comps, and a clean non-destructive background cutout.
- *Wedge / first 100 users:* Fixes three of the most-complained-about workflows at once (bad background removal, slow pricing research, tedious descriptions) and undercuts the ~$15–50/mo incumbents. First users from r/Flipping, r/Depop, r/poshmark weekly feedback threads (with disclosure), reseller Discords, and build-in-public on r/SideProject; offer it free.
- *AWS architecture:* S3 (image upload) → Lambda trigger → Rekognition DetectLabels (garment type/color) + Bedrock (Claude/Nova vision → title/description/tags) → background removal (Bedrock image model or open-source model on Lambda) → results to DynamoDB; Cognito auth; CloudFront + Amplify frontend; EventBridge for async pipeline. Pricing via eBay Browse/Sell API sold data where permitted.
- *MVP scope:* 4–6 weeks for one intermediate dev (start with title/description + background removal; add pricing later).
- *AWS cost:* ~$0–10/mo at 100 users (free tier + $200 credits); ~$30–80/mo at 1,000 users (Bedrock + Rekognition dominate); ~$300–700/mo at 10,000 users (use Nova Micro + batch to stay low).
- *Data:* User-uploaded photos (UGC, no scraping needed); pricing from eBay official API; optionally DeepFashion/Fashionpedia for any classification fine-tuning (non-commercial license — training/demo only).
- *Resume value:* Demonstrates managed ML integration (Bedrock + Rekognition), event-driven serverless, image pipelines, auth, and cost engineering — a full production AWS system.
- *Risks:* Depop/Poshmark launched native versions (differentiate on accuracy + cross-platform + price); scraping for comps is ToS-risky (use official APIs); background-removal quality is make-or-break.
- *Monetization:* Freemium — free tier of N listings/mo, then $5–9/mo (undercutting incumbents).

**#2 — "DropVault": sneaker/streetwear collection manager + resale-value tracker with Discord alerts.**
- *Value prop / user:* For sneakerheads/collectors — log your collection, see live resale value (StockX/GOAT), and get drop/price-drop alerts pushed to Discord/Telegram.
- *Wedge / first 100 users:* Distribution is built-in — partner with or post in existing sneaker Discords (50,000+ members) and r/sneakers-adjacent communities; the Discord alert bot is the hook.
- *AWS architecture:* EventBridge scheduled Lambda → pull prices (StockX official API + community APIs) → DynamoDB → SNS/Lambda → Discord/Telegram webhooks; Cognito + Amplify web dashboard; S3 for images.
- *MVP:* 3–5 weeks.
- *AWS cost:* ~$0–5/100 users; ~$15–40/1,000; ~$150–400/10,000 (scheduled polling + notifications are cheap).
- *Data:* StockX official API (rate-limited 25k/day), Sneaks-API; user-entered collection.
- *Resume value:* Event-driven architecture, scheduled jobs, third-party API integration, real-time notifications, bot development.
- *Risks:* GOAT has no official API (scraping risk); StockX API is limited; sneaker resale is time-sensitive so reliability matters.
- *Monetization:* Free core; premium alerts/portfolio analytics.

**#3 — "FitTranslate": cross-brand size recommender (browser extension).**
- *Value prop / user:* For online apparel shoppers — enter your measurements/known good-fitting items once; get a size recommendation on any brand's product page.
- *Wedge / first 100 users:* Universal pain; extension surfaces on product pages. Harder distribution (no single community) — lean on r/femalefashionadvice discussion (not tool-dropping), programmatic SEO ("[Brand] size chart / runs small?"), and Product Hunt.
- *AWS architecture:* DynamoDB (user profile + brand size charts) → Lambda/API Gateway → optional SageMaker/Bedrock for fit inference; Cognito; CloudFront.
- *MVP:* 5–7 weeks (data collection on brand size charts is the hard part).
- *AWS cost:* ~$0–5/100; ~$10–30/1,000; ~$100–300/10,000.
- *Data:* Brand size charts (public, factual — low copyright risk), user-entered fit feedback (UGC), academic fit datasets.
- *Resume value:* Recommendation logic, browser extension, data modeling.
- *Risks:* Data sourcing (size charts) is laborious; distribution is the weakest of the top ideas.
- *Monetization:* Affiliate links (Rakuten/Awin/ShareASale/Impact) on recommended sizes.

**#4 — "DupeLens": visual similarity "find it cheaper" tool (extension + web).**
- *Value prop:* Upload/paste a product; get visually similar cheaper alternatives from affiliate feeds.
- *Wedge:* TikTok "dupe" culture; but crowded and legally sensitive.
- *AWS architecture:* S3 → Rekognition/Bedrock embeddings → pgvector on RDS for similarity → affiliate feed catalog; Lambda/API Gateway; CloudFront.
- *MVP:* 5–7 weeks.
- *Cost:* ~$5–15/100; ~$40–100/1,000; ~$300–800/10,000 (embeddings + vector search).
- *Data:* Affiliate product feeds (Rakuten, Awin, ShareASale, CJ, Impact — legitimate catalog + images + monetization); DeepFashion for embedding experiments (non-commercial).
- *Resume value:* Vector search / embeddings — a strong, trendy ML-systems signal.
- *Risks:* Crowded; trademark/affiliate ToS; image copyright — use affiliate-provided images only.
- *Monetization:* Affiliate commissions (built in).

**#5 — "ClosetSync": free, cross-platform digital closet with better AI, targeting abandoned-app refugees.**
- *Value prop:* Free wardrobe organizer + outfit generation for users leaving Cladwell/Acloset.
- *Wedge:* Ready-made replacement demand; free + cross-platform + privacy.
- *AWS architecture:* S3 + Rekognition (auto-tag garments) + Bedrock (outfit suggestions) + DynamoDB + Cognito + Amplify.
- *MVP:* 6–8 weeks.
- *Cost:* similar profile to #1.
- *Data:* UGC (user photos); DeepFashion/Fashionpedia for tagging models (non-commercial).
- *Resume value:* Full-stack + ML tagging.
- *Risks:* Saturated; distribution hard; retention challenges. Lower ranked for that reason.
- *Monetization:* Freemium.

**#6 — "PoshComps": a free sold-comps pricing API/tool for resellers.**
- *Value prop:* Aggregate real sold prices for a query across marketplaces via official APIs.
- *Wedge:* The single hardest data to get legitimately; huge demand.
- *Risks:* This is exactly where APIs are most restricted (eBay limits sold data; others have none) — high compliance risk; recommended only if built strictly on permitted eBay data. Lower ranked due to legal fragility.

### 5. Practical execution advice

**Distribution playbook (2026):**
- Reddit has overtaken Product Hunt for early traction for indie devs; a genuine post in r/SideProject can outperform weeks of tweeting. Treat Product Hunt as a one-day launch event, not a channel.
- Follow the 90/10 rule (no more than ~10% self-promotional activity); warm up in a community for 2–4 weeks before mentioning your tool; lead with value; disclose you built it ("Full disclosure: I built this"); use "Feedback Friday"/weekly threads; offer free access; avoid marketing language ("revolutionary," "game-changing").
- Welcoming: r/SideProject, r/indiehackers, r/EntrepreneurRideAlong, reseller Discords, the r/MFA Substack/Discord. Hostile/restricted: r/malefashionadvice, r/femalefashionadvice, r/streetwear, and eBay Community forums (self-promo explicitly banned under Rule 13).
- Use programmatic SEO for search-intent tools (size charts, sold comps, drop calendars).

**API/ToS realities:** Prefer official APIs — eBay Sell (open), Depop partner Selling API (apply by email, circularity-vetted), StockX (manual review, limited). Poshmark, Vinted, GOAT, Grailed have no public API; scraping them risks ToS violations, Cloudflare/Datadome blocks, and IP bans. Scraping *public, factual* price data is generally lawful in the US post-hiQ v. LinkedIn (reaffirmed 2022), but ToS violations still create civil risk; never scrape behind logins.

**Free/cheap data sources:** DeepFashion (800K+ images, 50 categories, 1,000 attributes — non-commercial research only), DeepFashion2 (491K images, 801K items), Fashionpedia (48,825 images, fine-grained attributes), ModaNet, Street2Shop, Open Images; affiliate feeds (Rakuten, Awin, ShareASale, CJ, Impact) for real catalog + images + monetization; UGC (user uploads) to avoid scraping entirely.

**Demonstrating to employers:** Track and display real metrics (signups, weekly active users, listings processed, images analyzed). On the resume, describe the AWS architecture and the specific skills (Bedrock/Rekognition integration, event-driven serverless, vector search, cost optimization keeping it in free tier while serving real users). Open-source the code (great signal) but keep secrets/keys out. A live URL with real users is far more impressive than a dead demo.

## Recommendations

**Stage 1 (weeks 0–2): Validate and pick.** Build #1 SnapList's thinnest slice — photo → title/description via Bedrock + one clean background cutout. Post a build-in-public thread in r/SideProject and lurk/comment in r/Flipping and r/Depop. **Go/no-go benchmark:** 20+ genuine "I'd use this" responses or 50 waitlist signups.

**Stage 2 (weeks 3–6): Ship the MVP free.** Add sold-comp pricing via eBay official API and ship the browser extension. Distribute via reseller Discords and weekly feedback threads. **Benchmark:** 100 registered users and 500+ listings processed → keep going; if <30 users after two weeks of honest posting, pivot to #2 DropVault (built-in Discord distribution), which has the easiest audience access.

**Stage 3 (weeks 7–12): Retain and instrument.** Add analytics, track WAU and listings/user, and write the case study for your resume/portfolio. **Benchmark for "resume-ready":** sustained WAU, a public metrics dashboard, and costs demonstrably held in free tier / under $50/mo.

**Fallback ranking if distribution stalls:** #1 SnapList → #2 DropVault → #3 FitTranslate → #4 DupeLens → #5 ClosetSync → #6 PoshComps. Choose #2 first if you already have access to a sneaker Discord community, because distribution is the deciding factor.

**Thresholds that change the plan:** If a marketplace revokes or restricts the API you depend on, pivot to UGC-only features. If Bedrock/Rekognition costs exceed ~$50/mo before you have 1,000 users, switch to Nova Micro + batch inference or open-source models on Lambda.

## Caveats
- Cost estimates are order-of-magnitude engineering estimates based on published AWS unit pricing (Bedrock per-token, Rekognition $0.001/image, free-tier limits), not measured bills; actual costs vary with usage patterns, and Bedrock bills commonly run 1.5–2x naive estimates once adjacent services are included.
- Native AI listing tools now exist on Depop and Poshmark, so #1's differentiation must be real (accuracy, cross-platform, price) — this is a competitive, not empty, space.
- Marketplace API access changes frequently; verify current terms before building. Depop's API is private/application-only and circularity-vetted; StockX's is limited.
- DeepFashion, DeepFashion2, and Fashionpedia are licensed for non-commercial research only — use them for model training/experiments and demos, not as a commercial catalog.
- Some pain-point quotes were sourced from adjacent seller forums (eBay Community, Trustpilot, dev blogs) rather than the specific fashion subreddits, because Reddit thread text is poorly indexed by search; weight accordingly.
- ThredUp is a resale company and its report (via GlobalData) may carry a pro-resale framing, though the underlying market-size methodology is third-party.