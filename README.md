# Project Risk & Issue Register

A modern, offline-first Project Risk and Active Issue Register built with **React**, **Vite**, **Tailwind CSS**, and **JavaScript**. Designed in alignment with PMBOK and PRINCE2 risk management standards, this application enables delivery teams, project managers, and scrum masters to track potential risks and active issues with automated 5×5 severity scoring, mitigation plans, advanced filtering, and RFC 4180-compliant CSV exports.

---

## 🌟 Key Features

- **Modern Executive Dashboard UI**:
  - **About Page & User Guide**: Dedicated in-app hub featuring the Creator Profile (Krishna Chouhan), system architecture, detailed step-by-step user manual, and interactive FAQ.
  - **Dark / Light Theme Toggle**: Seamless switcher between a dark executive mode and a clean light mode with persistent preference.
  - **Interactive 5×5 Heatmap Widget**: Click any cell in the live 5×5 Probability $\times$ Impact grid to filter table records instantly.
  - **Density Toggle**: Switch between **Comfortable** and **Compact** table row density.
  - **Live Risk Exposure Index**: Real-time project exposure score calculation and risk health indicators.
  - **Owner Avatars & Relative Due Dates**: Colorful pastel owner avatar chips and intelligent relative dates (*"Overdue by 3 days"*, *"Due tomorrow"*, *"Due in 5 days"*).
- **Dual Risk & Issue Tracking**: Distinct tracking for potential project risks and active materialized issues with context-specific terminology (e.g., *Mitigation Plan* vs. *Resolution Plan*).
- **Automated Severity Scoring (5×5 Matrix)**:
  - **Risks**: Calculated as $\text{Score} = \text{Probability (1–5)} \times \text{Impact (1–5)}$ (Range: 1–25).
  - **Issues**: Because issues represent materialized events where occurrence has already taken place (100% certainty), probability defaults to `5`, scoring $\text{Score} = 5 \times \text{Impact (1–5)}$.
- **Documented Severity Thresholds**:
  - 🟢 **Low (1 – 5)**: Minor impact or rare occurrence; routine monitoring.
  - 🟡 **Medium (6 – 11)**: Noticeable delay or cost variance; proactive mitigation plan required.
  - 🟠 **High (12 – 19)**: Significant threat to milestones; management escalation and active containment.
  - 🔴 **Critical (20 – 25)**: Severe threat to viability; immediate executive intervention.
- **Unresolved Issues & Risks Management**:
  - Dedicated **Unresolved Issues** quick filter and metric card.
  - Quick status triage: filter and sort unresolved issues by severity, review date, or title.
- **Full CRUD Capabilities**:
  - **Create & Edit**: Responsive modal with live score preview, validation, and category selectors.
  - **Delete**: Accessible confirmation modal preventing accidental removal.
  - **Detail View**: Dedicated drawer view with full descriptions, mitigation/resolution plans, and audit timestamps.
- **Multi-Dimensional Filtering & Sorting**:
  - Live search across title, description, owner, mitigation plan, category, and ID.
  - Type filter (*All*, *Risks*, *Issues*).
  - Status and Category filters.
  - Sort by Score (asc/desc), Review Date, Title, Impact, Probability, or Status.
- **Accessible, Responsive Design**:
  - Semantic `<table>` with `scope="col"`, `aria-sort`, and keyboard navigation on desktop viewports.
  - Card-based mobile alternative layout on smaller screens (< 768px) and manual toggle between Table and Card views.
- **RFC 4180 CSV Export**:
  - Exports all filtered records with properly quoted cells containing commas, quotes, and newlines.
  - Prepended with a UTF-8 Byte Order Mark (`\uFEFF`) to ensure seamless display in Microsoft Excel, Google Sheets, and LibreOffice.
- **Zero-Dependency Persistence**:
  - Automatically persists state in browser `localStorage`.
  - Ships with realistic sample data and a one-click "Reset Samples" option.
- **Comprehensive Vitest Suite**:
  - 32 unit and integration tests covering calculation formulas, boundary thresholds, filtering, CSV formatting, and React components.

---

## 📐 Scoring Formula & Documented Thresholds

### 1. Probability Scale (1 – 5)

| Level | Value | Probability Range | Description |
| :---: | :---: | :--- | :--- |
| **1** | Very Low | $1\% - 20\%$ | Rare occurrence, highly improbable under normal circumstances |
| **2** | Low | $21\% - 40\%$ | Unlikely to occur, but possible during project lifecycle |
| **3** | Moderate | $41\% - 60\%$ | Reasonable chance of occurrence; coin-toss probability |
| **4** | High | $61\% - 80\%$ | Likely to materialize unless explicit preventive controls are active |
| **5** | Very High | $81\% - 100\%$ | Almost certain to occur; or active issue (materialized event) |

### 2. Impact Scale (1 – 5)

| Level | Value | Impact Definition | Project Consequences |
| :---: | :---: | :--- | :--- |
| **1** | Negligible | Minimal disruption | Negligible budget variance ($<1\%$), negligible delay ($<1$ week) |
| **2** | Minor | Minor localized variance | Budget variance $1-5\%$, absorbed within buffer; minimal milestone slip |
| **3** | Moderate | Noticeable impact | Budget variance $5-10\%$, secondary milestone delay, re-planning required |
| **4** | Major | Critical breach | Budget variance $10-20\%$, primary release gate slip, scope de-scoping |
| **5** | Critical | Severe derailment | Budget variance $>20\%$, legal/regulatory non-compliance, project cancellation |

### 3. Severity Matrix & Documented Thresholds

$$\text{Severity Score} = \text{Probability} \times \text{Impact}$$

```
Probability  5 |   5 (Low)   10 (Med)    15 (High)   20 (Crit)   25 (Crit)
             4 |   4 (Low)    8 (Med)    12 (High)   16 (High)   20 (Crit)
             3 |   3 (Low)    6 (Med)     9 (Med)    12 (High)   15 (High)
             2 |   2 (Low)    4 (Low)     6 (Med)     8 (Med)    10 (Med)
             1 |   1 (Low)    2 (Low)     3 (Low)     4 (Low)     5 (Low)
               +-------------------------------------------------------
                   1          2           3           4           5      Impact
```

- **🟢 Low (1 – 5)**: Routine monitoring and periodic backlog review.
- **🟡 Medium (6 – 11)**: Assigned risk owner; documented mitigation plan required.
- **🟠 High (12 – 19)**: Weekly status review; management escalation; contingency budget reserve.
- **🔴 Critical (20 – 25)**: Immediate steering committee attention; daily standup tracking; executive mitigation sponsor.

---

## 🔍 Unresolved Issues Definition & Handling

In project governance:
- **Unresolved Risks**: Any risk item whose status is **not** `Mitigated` or `Closed` (i.e. `Identified`, `Open`, `In Progress`, or `Accepted`).
- **Unresolved Issues**: Any active issue whose status is **not** `Resolved` or `Closed` (i.e. `Reported`, `Investigating`, `In Progress`, or `Escalated`).

The register provides:
1. **Interactive KPI Badge**: Displays active unresolved issues count; clicking automatically filters the register to only unresolved issues.
2. **Dedicated Quick Filter**: 1-click toggle to isolate active unresolved issues.
3. **Sorting**: Sort unresolved issues by highest score/severity or closest target resolution date to prioritize remediation.

---

## 🏗️ Architecture & Project Structure

```
project-risk-issue-register/
├── index.html                 # Entry HTML with meta description and favicon
├── package.json               # Dependencies and scripts (React 18, Vite, Vitest, Tailwind)
├── postcss.config.js          # PostCSS configuration for Tailwind
├── tailwind.config.js         # Tailwind styling tokens and brand palette
├── vite.config.js             # Vite configuration with Vitest setup
├── README.md                  # System documentation (assumptions, setup, deploy)
└── src/
    ├── main.jsx               # Application bootstrap
    ├── App.jsx                # Core state coordinator (CRUD, filtering, dialogs)
    ├── index.css              # Tailwind base layer and custom scrollbar styling
    ├── components/
    │   ├── Header.jsx         # App header, view switcher, and toolbar actions
    │   ├── MetricCards.jsx    # Interactive KPI dashboard cards
    │   ├── FilterBar.jsx      # Search input, type pills, and advanced filters
    │   ├── RiskTable.jsx      # Accessible desktop table with sorting headers
    │   ├── RiskCardList.jsx   # Mobile-friendly card alternative
    │   ├── RecordModal.jsx    # Create/Edit form with live 5x5 score preview
    │   ├── DetailModal.jsx    # Complete item metadata inspection drawer
    │   ├── DeleteConfirmModal.jsx # Accessible confirmation modal dialog
    │   └── SeverityGuideModal.jsx # Interactive 5x5 Matrix visual guide
    ├── data/
    │   └── sampleRecords.js   # Realistic starter sample records
    ├── types/
    │   └── constants.js       # Statuses, categories, severity levels, scales
    ├── utils/
    │   ├── calculations.js    # Clamping, scoring formulas, metrics aggregator
    │   ├── filterAndSort.js   # Multi-criteria filtering and sorting engine
    │   ├── csvExport.js       # RFC 4180 CSV generator and file downloader
    │   └── storage.js         # localStorage manager with fallback resilience
    └── test/
        ├── setup.js           # Vitest DOM & localStorage mock setup
        ├── calculations.test.js # Unit tests for scores, thresholds, metrics
        ├── filterAndSort.test.js# Unit tests for search, filters, sorting
        ├── csvExport.test.js  # Unit tests for CSV escaping and RFC 4180
        ├── storage.test.js    # Unit tests for persistence and corruption safety
        └── App.test.jsx       # Integration tests with React Testing Library
```

---

## ⚙️ Setup & Local Development

### Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Installation

```bash
# Clone or navigate to the repository
cd Project4

# Install dependencies
npm install
```

### Running Locally

```bash
# Start Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧪 Testing

The project uses **Vitest** and **React Testing Library** for fast, reliable unit and integration testing.

```bash
# Run all tests once
npm test

# Run tests in watch mode during development
npx vitest
```

### Test Coverage Highlights

- **`calculations.test.js`**:
  - Tests Probability $\times$ Impact multiplication and boundary clamping.
  - Tests Issue score defaults ($\text{Probability} = 5$).
  - Validates exact severity boundary thresholds: $5 \to \text{Low}$, $6 \to \text{Medium}$, $11 \to \text{Medium}$, $12 \to \text{High}$, $19 \to \text{High}$, $20 \to \text{Critical}$.
  - Tests summary metrics aggregation.
- **`csvExport.test.js`**:
  - Tests escaping of commas, quotes (`"..."` $\to$ `""...""`), newlines (`\n` and `\r\n`), and empty values.
- **`filterAndSort.test.js`**:
  - Tests text search across title, description, owner, category, and ID.
  - Tests unresolved items filtering for risks and issues.
  - Tests sorting ascending/descending by score, date, and title.
- **`storage.test.js`**:
  - Tests loading from and saving to `localStorage`.
  - Tests graceful fallback to sample records when storage is empty or contains malformed JSON.
- **`App.test.jsx`**:
  - Tests full component mounting, KPI rendering, modal opening, and filter dispatching.

---

## 🚀 Building & Production Deployment

### 1. Build Production Bundle

```bash
npm run build
```

This compiles optimized HTML, CSS, and JavaScript bundles into the `dist/` directory.

### 2. Preview the Production Build Locally

```bash
npm run preview
```

### 3. Deployment Options

#### Option A: Vercel (Recommended)
```bash
npx vercel
```
*Or connect your GitHub repository to Vercel with framework preset `Vite`.*

#### Option B: Netlify
Create a `netlify.toml` or set build command to `npm run build` with publish directory `dist`.

#### Option C: GitHub Pages
1. Install `gh-pages`:
   ```bash
   npm install -D gh-pages
   ```
2. Set `base: './'` in `vite.config.js`.
3. Add deploy script to `package.json`:
   ```json
   "deploy": "vite build && gh-pages -d dist"
   ```
4. Run `npm run deploy`.

#### Option D: Docker / Nginx
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 💡 Assumptions & Limitations

### Assumptions
1. **Single-Project Scope**: The application operates as a dedicated register for a single project or initiative at a time. Multi-project workspaces can be managed by exporting separate CSV registers.
2. **Probability for Active Issues**: In PMBOK standards, an issue is a materialized risk (probability is $100\%$, represented as $5/5$ on the 1–5 scale). Severity is therefore directly proportional to impact ($\text{Score} = 5 \times \text{Impact}$).
3. **Browser Storage (`localStorage`)**: Designed for modern client-side storage without requiring an external database or backend server.
4. **RFC 4180 CSV Standard**: The CSV export conforms to RFC 4180 with UTF-8 BOM encoding for broad spreadsheet compatibility.

### Limitations
1. **Storage Limits**: `localStorage` has a typical quota of $\sim 5\text{MB}$ per origin, sufficient for thousands of risk records but not intended for large image attachments.
2. **Concurrent Multi-User Collaboration**: Does not include real-time WebSocket syncing across multiple simultaneous editors. For distributed team collaboration, teams can export/import registers or link to central project management repositories.
3. **Historical Audit Trail**: Version history tracks `createdAt` and `updatedAt` timestamps for each entry; detailed revision-by-revision change diffing is not currently stored.

---

## 📄 License

MIT License. Designed and crafted for modern software engineering teams and project managers.

