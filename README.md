# LifeOS AI - "One AI. Every Problem. One Solution."

LifeOS AI is a production-level Artificial Intelligence Personal Operating System built to optimize human decision-making, goal planning, and problem resolution. Rather than a simple chatbot, LifeOS works as a unified multi-agent system executing structured diagnostic pipelines (from root-cause analysis to milestone tracking) across key life verticals: Career, Business, Finance, and Education.

## Key Features & Core Modules

### 1. AI Problem Solver Engine
- Unified entry point for users to input real-life roadblocks.
- Context Category detection (Finance, Career, Business, Growth, Education).
- **Stepped Workflow Execution Engine:**
  1. **Problem Detection:** Categorizes logs and isolates symptoms.
  2. **Root Cause Analysis (RCA):** Traces core behavioral/structural variables.
  3. **Data Analysis:** Runs quantitative metrics verification.
  4. **Prediction Modeling:** Predicts future outcomes if variables remain uncorrected.
  5. **AI Recommendation:** Outputs specific, high-yield tactical recommendations.
  6. **Action Plan Generation:** Spits out deployable goals checklist nodes that can be synced with the Goal Planner.

### 2. Personal AI Memory System
- Maintains a persistent store of user skills, goals, constraints, and business ideas.
- Digital Twin context injection: Automatically contextualizes new inputs against existing capabilities (e.g. knowing a user completed React basics influences suggestions for their Career goals).

### 3. Career AI Module
- **ATS Resume Core Scorer:** Upload mock resume items to measure compatibility, identify missing tools/tech, and suggest formatting optimizations.
- **Practice Mock Interview AI:** Choose roles (React Developer, Node Backend, Startup Business) to practice questions, write technical answers, and analyze scoring matrices (out of 10) with AI feedback cards detailing gaps.

### 4. Finance AI System
- Balance sheet manager to track income margins alongside category outlays.
- Visual SVG comparison chart computing total runway and surplus margins.
- Proactive budget scanner triggers identifying recurring subscription leakages or excess discretionary orders.

### 5. Business Idea Validator
- SWOT analysis canvas generator mapping Strengths, Weaknesses, Opportunities, and Threats for any startup concept.
- investment sizing calculator and marketing launch roadmap generator.

### 6. Learning Roadmap Center
- Chronological tree timeline mapping frontend developer or backend architect syllabi.
- Custom competence quizzes validating learning modules.

---

## Technical Stack & Architecture

### Frontend Architecture
- **Framework:** React 19 (scaffolded with Vite for instantaneous HMR).
- **Icons:** Lucide Icons.
- **Styling:** Premium Custom Dark UI with Glassmorphic backdrops, grid system, state animations, and CSS custom columns chart elements (engineered inside `src/index.css` to circumvent stylesheet library compilation issues).

---

## Local Development Guide

1. Clone or navigate to the repository directory:
   ```bash
   cd "c:\Users\NISHANT\OneDrive\Desktop\Project start"
   ```

2. Install the workspace dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Compile the production bundle:
   ```bash
   npm run build
   ```

---

## Database Design Schemas Mapped

### Users Collection
```json
{
  "userId": "string (uuid)",
  "name": "string",
  "email": "string",
  "passwordHash": "string",
  "profile": {
    "digitalTwinPersona": "analytical | direct | encouraging",
    "createdAt": "date"
  }
}
```

### Goals & Tasks Collections
```json
{
  "goalId": "string",
  "userId": "string",
  "title": "string",
  "category": "Career | Business | Finance | Education",
  "deadline": "date",
  "progress": "integer (0-100)"
}
```
*Tasks:*
```json
{
  "taskId": "string",
  "goalId": "string",
  "task": "string",
  "status": "pending | completed"
}
```
