# SnapList — Project Instructions (read every session)

SnapList is a **pricing tool for secondhand-clothing resellers**: photograph an item → get a confidence-scored resale price from real sold comps + per-platform listing copy. Currently **MVP-first**, staying with SnapList, aiming for ~100 real users. This is also a **portfolio / learn-AWS project** — the owner must be able to *defend every resume bullet in an interview*, so how we work matters as much as what we ship.

Active branch: **`mvp-work`**. Deeper background lives in the assistant's memory files; this doc is the source of truth for the **plan + working agreement**.

---

## ⚙️ Working agreement (IMPORTANT — how the owner wants to collaborate)

The owner is time-constrained but needs to **own and defend** the parts that back their resume. So every task has an **owner tag**:

- 🤖 **Assistant handles** — boilerplate / glue / plumbing (repo structure, config, scaffolding, wiring). Just do it; the owner doesn't need to defend it deeply.
- 🤝 **Shared** — assistant writes the code, but it **backs a resume bullet**. Loop: assistant flags the linked **learning modules** → owner learns them → we finish the task together → **assistant quizzes the owner** before it's marked done.
- 🧑 **Owner drives** — only they can (their AWS account/billing) or it's the **intellectual core** (the pricing math) they must own end-to-end.

**The loop for every 🤝 / 🧑 task:** assistant says *"this maps to learning modules X, Y, Z"* → owner studies those in `learning.md` → owner returns → we complete the task → assistant asks the module's **Defend-it** questions. Task isn't ✅ until the code works **and** the owner can defend it.

### Other conventions
- **Git: the owner handles ALL commits/pushes.** The assistant edits files but does **not** commit. (Note: `learning.md` is intentionally kept local via `.git/info/exclude` — never commit it.)
- **IaC = Amplify Gen 2** (decided). AWS surface: S3 · Lambda · API Gateway · DynamoDB · SQS · EventBridge · Bedrock · Cognito · Amplify CI/CD. Event-driven, **not** an LLM wrapper.
- MVP is **anonymous** (Cognito comes later — don't claim it on the resume until built).
- UI is deferred / low-priority right now — **focus is the backend**. Landing is a barebones static `index.html`; the React port + `web/`+`amplify/` restructure happen later.
- Pricing v1 uses eBay **active** listings (asking prices) labeled honestly as comps; sold-data sources swap in later.

### The learning log
`learning.md` (repo root, **gitignored / local-only**) is the owner's personal 0→100 study doc, organized by module (0.1–6.1) and mapped to three resume bullets **B1/B2/B3**. Task correlations below reference those module numbers. The assistant should use it as the quiz bank for 🤝/🧑 tasks.

---

## ✅ Task tracker (source of truth)

Legend: owner tag · **`L:`** = linked learning modules. Statuses: ⬜ todo · 🔄 in progress · ✅ done.

### Phase 0 — Foundation
- ⬜ **0.a** 🤖 Scaffold Amplify Gen 2 backend + minimal repo structure (`amplify/backend.ts`, root `package.json`, clean stale Vite artifacts). *No deep defense needed.* `L: 0.4`
- ⬜ **0.b** 🧑 AWS account + **$5 budget alarm first** + IAM user (MFA, stop using root) + AWS CLI (`aws sts get-caller-identity` works) + enable **Bedrock model access** (vision). *Blocks all deploys.* `L: 0.1, 0.2, 0.3`

### Phase 1 — Photo → listing (fast value, no comp dependency)
- ⬜ **1.2** 🤝 S3 upload via presigned URL (Gen2 Storage + Lambda mints URLs). `L: 1.6, 1.1, 0.2`
- ⬜ **1.3** 🤝 Attribute extraction — Lambda → Bedrock vision → structured garment JSON (category, brand-guess, color, material, condition). **Define the schema.** `L: 3.1, 1.1`
- ⬜ **1.4** 🤝 Listing copy — Lambda → Bedrock → per-platform title/description/tags (Depop / eBay / Grailed). `L: 3.1`
- ⬜ **1.5** 🤝 Photo coaching — best-shot + missing-shots notes (piggybacks 1.3's vision pass). `L: 3.1`
- ⬜ **1.1** 🤖 Upload UI — drag/drop 1–3 photos, client-side resize. `L: 2.1`
- ⬜ **1.6** 🤖 Results UI — attributes + copy-to-clipboard per platform + coaching. `L: 2.1`

### Phase 2 — Pricing (eBay active comps) — the differentiator + the real AWS pipeline
- ⬜ **2.1** 🧑 eBay developer account + OAuth app (Browse API production keyset — may take ~a day to approve). `L: 5.1`
- ⬜ **2.2** 🤝 Comp-fetch worker — Lambda calls eBay Browse from extracted attributes; token refresh, pagination, rate limits. `L: 5.1, 1.1`
- ⬜ **2.3** 🤝 Normalize + store — raw comps → S3, normalized records → DynamoDB. `L: 4.1, 1.3, 1.6`
- ⬜ **2.4** 🧑 Matching — score comps to the garment (category/brand/keyword/condition). **Quality crux.** `L: 4.1, 4.4`
- ⬜ **2.5** 🧑 Pricing engine — matched comps → suggested price + confidence (trimmed median, recency weight, dispersion). **Intellectual core.** `L: 4.2, 4.3, 4.4`
- ⬜ **2.6** 🤝 Async orchestration — API GW → Lambda enqueues (SQS) → worker → result to DynamoDB; frontend polls. `L: 1.4, 1.5, 1.2, 1.3, 1.7`
- ⬜ **2.7** 🤝 Wire price + evidence into results UI (count / range / confidence). `L: 4.4, 2.1`

### Phase 3 — Ship
- ⬜ **3.1** 🤝 States — no-comps-found, low-confidence, API failure, loading. `L: 4.4, 2.1`
- ⬜ **3.2** 🤝 Analytics — view counter + funnel (uploads → results). `L: 6.1`
- ⬜ **3.3** 🤝 Abuse guard — per-IP throttling (API GW usage plan) for anonymous. `L: 1.2`
- ⬜ **3.4** 🤝 Cost guardrails — Bedrock + eBay call budget per use. `L: 1.1, 5.1`
- ⬜ **3.5** 🧑 Deploy — Amplify Hosting + Gen2 backend, env vars, SPA rewrite. `L: 2.2`
- ⬜ **3.6** 🧑 First-users push — concierge DMs + builder communities → the ~100. `L: 6.1`

**Deferred:** 0.3 react-router (staying pure HTML for now) · 0.4 redesign / full `web/`+`amplify/` restructure (fix UI later).

---

## 📍 Current status (update as we go)
- Landing = barebones static `index.html` (peach palette). Backend **not started**; no `amplify/` dir yet; **no AWS account/credentials configured yet**.
- **Next up: 0.b** (owner sets up AWS — their account) in parallel with **0.a** (assistant scaffolds the backend). Then **1.2 → 1.3**.
