# CAPACITY CONNECT
### Digital Capacity Building & Learning Management Portal

**CAPACITY CONNECT** is an enterprise-grade digital capacity building and learning management platform engineered around three foundational pillars:
1. **Training Delivery** (modular courses, interactive quizzes, video/markdown lessons, and virtual workshops).
2. **Competency Development** (Level 1–5 proficiency frameworks, live personal Skill Radars, team heatmaps, and AI career gap planning).
3. **Peer Knowledge Sharing** (engineering wiki articles, peer upvotes, and "Ask an Expert" Q&A routing).

---

## 🏛️ System Architecture

```
                               ┌──────────────────────────────────────────────┐
                               │               CAPACITY CONNECT               │
                               │        Enterprise Unified Data Layer         │
                               └──────────────────────┬───────────────────────┘
                                                      │
              ┌─────────────────────────┬─────────────┴───────────┬─────────────────────────┐
              │                         │                         │                         │
              ▼                         ▼                         ▼                         ▼
   ┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
   │  Employee Learner  │    │   People Manager   │    │    L&D Trainer     │    │    Super Admin     │
   │    (/learner)      │    │     (/manager)     │    │     (/trainer)     │    │      (/admin)      │
   ├────────────────────┤    ├────────────────────┤    ├────────────────────┤    ├────────────────────┤
   │ • Live Skill Radar │    │ • Team Heatmap     │    │ • Course Builder   │    │ • Master Framework │
   │ • AI Gap Advisor   │    │ • 1-Click Nudges   │    │ • AI Quiz Gen      │    │ • Org-Wide Heatmap │
   │ • Course Player    │    │ • Nominations      │    │ • Cohort Analytics │    │ • ROI Analytics    │
   │ • Knowledge Hub    │    │ • At-Risk Queue    │    │ • Live Workshops   │    │ • User Directory   │
   └────────────────────┘    └────────────────────┘    └────────────────────┘    └────────────────────┘
```

---

## 🚀 Judges' Quick Tour (Test in 2 Minutes)

Follow these direct steps to evaluate all competition-winning differentiators:

### 1. Multi-Role Gatekeeper (`/login`)
- Navigate to **[http://localhost:3000/login](http://localhost:3000/login)**.
- Notice the **1-Click Judge Fast-Pass buttons** for all 4 roles (**Learner**, **Manager**, **Trainer**, **Super Admin**).
- Click **"Learner (Alex R.)"** to enter the Employee Learner workspace.

### 2. Live Skill Radar & AI Skill Gap Advisor (`/learner`)
- Scroll to the **Skill Radar Matrix**: view Alex Rivera's live 1–5 competency levels compared against the *Senior Cloud Solutions Architect* benchmark.
- In the **AI Skill Gap Advisor**, switch the target career role to see real-time gap calculations and auto-synthesized course pathways.
- Scroll to **Active Learning Curricula** and click **"Continue Lesson & Take Quiz"** on *Production Kubernetes*.
- Answer the quiz questions (or click **"Level-Up Skill"** in the floating bottom Demo Bar):
  - Notice the instant **+250 XP**, course completion, and **immediate level-up of Kubernetes to Level 3 on the Skill Radar**!

### 3. People Manager Hub & 1-Click Nudge System (`/manager`)
- Click **"Manager"** in the bottom Demo Bar or top profile switcher.
- Explore the **Team Competency Heatmap** (color-coded L1–L5 matrix). Click any cell to view assessment logs.
- In the **At-Risk Learners Queue**, click **"1-Click Nudge"** on Devon Reed to dispatch an immediate encouragement alert.

### 4. Trainer Studio & AI Quiz Generator (`/trainer`)
- Click **"Trainer"** in the bottom Demo Bar.
- Click **"AI Quiz Synthesizer"**: paste technical markdown and click **"Generate Auto-Graded Assessment"** to see instant 3-question MCQ generation with explanations.

### 5. Public Certificate Verification (`/verify/CERT-CC-84920`)
- Navigate to **[http://localhost:3000/verify/CERT-CC-84920](http://localhost:3000/verify/CERT-CC-84920)**.
- View the authentic digital credential verifying candidate name, score, issue date, and SHA-256 verification status.

---

## 🔑 Pre-Configured Demo Credentials

| Role | Name & Title | Email | Access Path |
| :--- | :--- | :--- | :--- |
| **Learner** | Alex Rivera (Fullstack Dev L2) | `alex.rivera@capacityconnect.io` | `/learner` |
| **Manager** | Sarah Chen (Director of Eng) | `sarah.chen@capacityconnect.io` | `/manager` |
| **Trainer** | Marcus Vance (Principal L&D) | `marcus.vance@capacityconnect.io` | `/trainer` |
| **Admin** | Dr. Elena Rostova (Chief Learning Officer) | `elena.rostova@capacityconnect.io` | `/admin` |

---

## 🛠️ Tech Stack & Architecture Justification

- **Next.js 14 (App Router) + React 18**: High-performance streaming SSR and statically optimized routes for instant loading.
- **TypeScript**: Strict type-safe models for competencies, proficiency levels, and role permissions.
- **Tailwind CSS + Glassmorphic Design System**: Modern enterprise SaaS UI inspired by Linear, Notion, and Coursera for Business.
- **SVG Skill Radar & Canvas Ecosystem**: Interactive 60fps data visualizations without heavy external bundle overhead.
- **Universal Search (`Ctrl + K`)**: Instant keyboard-driven navigation across courses, competencies, and wiki articles.

---

## 📦 Setup & Local Run

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```
