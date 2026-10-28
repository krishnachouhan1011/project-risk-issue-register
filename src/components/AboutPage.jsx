import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  ShieldAlert,
  Clock,
  BarChart3,
  Download,
  BookOpen,
  ArrowLeft,
  HelpCircle,
  FileSpreadsheet,
  Search,
  AlertTriangle,
  AlertCircle,
  Gauge,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37z" />
  </svg>
);

const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export default function AboutPage({ onBackToRegister, isDark = false }) {
  const [copiedField, setCopiedField] = useState(null);
  const [activeTab, setActiveTab] = useState('creator'); // 'creator' | 'guide' | 'app' | 'faq'

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const skills = [
    'Project Management',
    'Agile & Scrum',
    'Business Design',
    'JIRA Workflows',
    'Power BI & Analytics',
    'React.js + Vite',
    'Tailwind CSS',
    'JavaScript (ESNext)',
    'ERP / HRM Systems',
    'AI Sales & Digital Strategy',
    'Figma to Code',
    'Sprint Planning',
    'RFC 4180 CSV Engine',
    'PMBOK Risk Framework',
  ];

  const projects = [
    {
      title: 'SoapRemedies',
      url: 'https://soapremedies.com',
      role: 'Project Manager & Tech Lead',
      description:
        'Astrology-focused wellness and e-commerce platform connecting spirituality, beauty, and wellness.',
      badge: 'Product Launch',
      color: '#059669',
    },
    {
      title: 'Astro Raagas',
      url: 'https://astroraagas.com',
      role: 'Project Manager',
      description:
        'Innovative digital entertainment platform exploring the harmony between Indian classical music, mood, and astrology.',
      badge: 'Product Launch',
      color: '#7c3aed',
    },
    {
      title: 'Neal Foundation',
      url: 'https://nealfoundation.org',
      role: 'Web Development & Delivery',
      description:
        'Official NGO portal showcasing social campaigns, impact metrics, and volunteer onboarding.',
      badge: 'Non-Profit',
      color: '#d97706',
    },
    {
      title: 'Vahlay Astro EdTech',
      url: 'https://vahlayastro.com',
      role: 'Project Manager & Developer',
      description:
        'Comprehensive digital learning platform with automated consultation booking workflows and student management.',
      badge: 'EdTech Portal',
      color: '#4f46e5',
    },
  ];

  const experience = [
    {
      company: 'Vahlay Consulting Inc',
      period: '2024 – Present (2 yrs)',
      role: 'Developer - Project Manager & Team Lead Digital',
      location: 'Ahmedabad, Gujarat, India',
      description:
        'Led cross-functional teams of developers and designers through sprint planning, daily standups, code reviews, and stakeholder alignment. Spearheaded development of responsive web applications, custom CRM/ERP solutions, and product launches including SoapRemedies and Astro Raagas.',
      highlights: [
        'Agile Team Leadership',
        'Figma to React + Vite + Tailwind',
        'Client Requirements Translation',
      ],
    },
    {
      company: 'JSpiders - Training & Development Center',
      period: 'Jun 2024 – Nov 2024 (6 mos)',
      role: 'Java Specialist & Trainee',
      location: 'Ahmedabad, Gujarat, India',
      description:
        'Intensive training covering Core Java, OOP architecture, data structures, and backend fundamentals with practical enterprise applications.',
      highlights: ['Core Java', 'OOP Design Patterns', 'Database Systems'],
    },
    {
      company: 'Nuclear Power Corporation of India Limited (NPCIL)',
      period: 'Jun 2022 – Jul 2022 (2 mos)',
      role: 'Web Development Intern',
      location: 'Vyara, Gujarat, India',
      description:
        'Designed and delivered a dynamic PHP township centralization portal with administrative security controls and user access management.',
      highlights: [
        'Dynamic PHP/HTML/CSS',
        'Role-Based Access Control',
        'Township Centralization',
      ],
    },
    {
      company: 'Teachnook',
      period: 'May 2021 – Jul 2021 (3 mos)',
      role: 'Development Intern',
      location: 'Bangalore, Karnataka, India',
      description:
        'Developed Android mobile application using Android Studio, resolving performance bottlenecks and integrating offline local storage.',
      highlights: [
        'Android Studio',
        'Bug Fixing & Testing',
        'Offline Local Storage',
      ],
    },
  ];

  const certifications = [
    {
      title: 'Agile Project Management',
      issuer: 'HP LIFE / HP Foundation',
      year: '2024',
      badge: 'Agile / Scrum / Kanban',
    },
    {
      title: 'Introduction to JIRA',
      issuer: 'Simplilearn SkillUp',
      year: '2024',
      badge: 'Sprints & Epic Tracking',
    },
    {
      title: 'Project Management Professional',
      issuer: 'Simplilearn SkillUp',
      year: '2024',
      badge: 'Scope, Risk & Stakeholders',
    },
    {
      title: 'Power BI for Beginners',
      issuer: 'Microsoft & Simplilearn',
      year: '2024',
      badge: 'Data Visualizations & Dashboards',
    },
  ];

  const guideSections = [
    {
      id: 'concepts',
      title: '1. Understanding Risks vs. Active Issues',
      icon: Layers,
      content: (
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Project delivery involves two fundamentally different types of governance items:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-amber-950/20 border-amber-800/60' : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-amber-500 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Project Risk (Potential Uncertainty)</span>
              </div>
              <p className="text-xs opacity-90">
                An uncertain future event that, if it occurs, has an effect on project objectives.
                Assessed by estimating both <strong>Probability (1–5)</strong> and <strong>Impact (1–5)</strong>.
                Requires a proactive <strong>Mitigation Plan</strong> to reduce likelihood or consequences.
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-rose-950/20 border-rose-800/60' : 'bg-rose-50/70 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-rose-500 mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>Active Issue (Materialized Event)</span>
              </div>
              <p className="text-xs opacity-90">
                A problem that has already happened or is occurring right now (100% certainty).
                Probability is effectively fixed at <strong>5 (materialized)</strong>, and its severity score
                is determined by its <strong>Impact (1–5)</strong>. Requires an immediate <strong>Resolution Plan</strong>.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'scoring',
      title: '2. 5×5 Scoring Formula & Documented Thresholds',
      icon: Gauge,
      content: (
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            The register computes an initial severity score on a standard <strong>1 to 25 scale</strong>:
          </p>
          <div
            className={`p-3.5 rounded-xl border font-mono text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-sky-400' : 'bg-slate-100 border-slate-200 text-sky-700'
            }`}
          >
            Risk Score = Probability (1–5) × Impact (1–5) [Range: 1 – 25]
            <br />
            Issue Score = 5 (Materialized) × Impact (1–5) [Range: 5 – 25]
          </div>
          <p className="text-xs opacity-90">
            Documented Severity Thresholds categorize items into four priority bands:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>Low</span>
                <span className="font-mono">1 – 5</span>
              </div>
              <p className="text-[11px] mt-1 opacity-80">Routine monitoring &amp; periodic team backlog reviews.</p>
            </div>
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-amber-950/30 border-amber-800/60 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>Medium</span>
                <span className="font-mono">6 – 11</span>
              </div>
              <p className="text-[11px] mt-1 opacity-80">Proactive mitigation required with assigned owner.</p>
            </div>
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-orange-950/30 border-orange-800/60 text-orange-300' : 'bg-orange-50 border-orange-200 text-orange-800'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>High</span>
                <span className="font-mono">12 – 19</span>
              </div>
              <p className="text-[11px] mt-1 opacity-80">Management escalation &amp; weekly status checkpoints.</p>
            </div>
            <div
              className={`p-3 rounded-xl border ${
                isDark ? 'bg-rose-950/30 border-rose-800/60 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>Critical</span>
                <span className="font-mono">20 – 25</span>
              </div>
              <p className="text-[11px] mt-1 opacity-80">Immediate executive attention &amp; containment sprint.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'managing',
      title: '3. Managing Items (Create, Edit, Delete, View)',
      icon: Sparkles,
      content: (
        <div className="space-y-2 text-sm leading-relaxed">
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Creating a Record:</strong> Click the <strong>&ldquo;+ New Entry&rdquo;</strong> button in the top toolbar. Choose between <em>Project Risk</em> and <em>Active Issue</em>. Use the 1–5 selector pills for Probability and Impact to watch your calculated score and severity preview in real time.
            </li>
            <li>
              <strong>Inspecting Details:</strong> Click any title or the <strong>View eye icon</strong> to open the full inspection drawer, containing complete background descriptions, dates, category tags, and action history.
            </li>
            <li>
              <strong>Editing a Record:</strong> Click the <strong>Edit pencil icon</strong> on any row or card. Make modifications and save; timestamps are updated automatically.
            </li>
            <li>
              <strong>Deleting a Record:</strong> Click the <strong>Delete trash icon</strong> to trigger an accessible confirmation modal, ensuring no accidental deletions take place.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'filtering',
      title: '4. Triage, Filtering & Sorting Workflows',
      icon: Search,
      content: (
        <div className="space-y-2 text-sm leading-relaxed">
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
            <li>
              <strong>Active Unresolved Issues Triage:</strong> Click the <em>&ldquo;Active Issues (Unresolved)&rdquo;</em> metric card or the <em>&ldquo;Unresolved Only&rdquo;</em> button to filter out resolved/closed items.
            </li>
            <li>
              <strong>Keyword Search:</strong> Instant live search across record IDs (e.g., <code>RSK-001</code>), titles, owners, mitigation steps, and categories.
            </li>
            <li>
              <strong>Interactive 5×5 Heatmap Matrix:</strong> Click the <strong>Heatmap icon</strong> in the header to open the 25-cell grid. Click any matrix cell (e.g., Prob 4 × Impact 5) to isolate records matching those exact severity coordinates.
            </li>
            <li>
              <strong>Multi-Column Sorting:</strong> Click any table column header (Score, Review Date, Title, Impact, Probability, Status) to toggle ascending/descending order.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'export-privacy',
      title: '5. CSV Export, Data Portability & Offline Privacy',
      icon: FileSpreadsheet,
      content: (
        <div className="space-y-2 text-sm leading-relaxed">
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
            <li>
              <strong>RFC 4180 CSV Export:</strong> Click <strong>&ldquo;Export CSV&rdquo;</strong> to download a compliant CSV with properly escaped commas, quotes, and newlines. Includes a UTF-8 BOM so Microsoft Excel and Google Sheets open foreign characters and formatting without corruption.
            </li>
            <li>
              <strong>Zero-Server Privacy:</strong> All data is stored in your browser&apos;s <code>localStorage</code>. No telemetry, no external databases, and no cloud cookies.
            </li>
            <li>
              <strong>Sample Data Reset:</strong> You can restore the realistic starter dataset at any time using the <strong>Reset</strong> button in the toolbar.
            </li>
          </ul>
        </div>
      ),
    },
  ];

  const faqs = [
    {
      q: 'How is the score calculated for an active issue?',
      a: 'In PMBOK standards, an active issue is an event that has already occurred (probability = 100%, represented as 5 on a 1-5 scale). The severity score is 5 × Impact (range 5 to 25), mapping directly to the same documented severity thresholds as risks.',
    },
    {
      q: 'Will my data be lost if I refresh or close my browser?',
      a: 'No. The application automatically syncs every creation, edit, and deletion to your browser’s localStorage instantly.',
    },
    {
      q: 'Can I export the register to Microsoft Excel?',
      a: 'Yes! The CSV export complies with RFC 4180 and automatically prepends a UTF-8 Byte Order Mark (BOM) so that Excel, Numbers, and Google Sheets display special characters, line breaks, and quotation marks perfectly.',
    },
    {
      q: 'Can I switch between table and mobile card views?',
      a: 'Yes. Use the View switcher in the header to switch between Table and Cards view at any time. On mobile screens (< 768px), the register automatically adapts to a responsive card layout.',
    },
  ];

  return (
    <div className={`max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Top Header Return Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-700/40">
        <button
          type="button"
          onClick={onBackToRegister}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-sky-400 hover:bg-slate-800'
              : 'bg-white border-slate-200 text-sky-600 hover:bg-slate-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Risk & Issue Register</span>
        </button>

        {/* Tab Switcher Pills */}
        <div className={`inline-flex p-1 rounded-xl border text-xs font-bold ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab('creator')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'creator'
                ? isDark ? 'bg-slate-800 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Creator Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'guide'
                ? isDark ? 'bg-slate-800 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            User Manual &amp; Guide
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'faq'
                ? isDark ? 'bg-slate-800 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            FAQ
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className={`rounded-2xl border p-6 sm:p-8 shadow-xs relative overflow-hidden transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar with Initials */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white flex items-center justify-center text-3xl font-extrabold shadow-xl shadow-indigo-500/25 ring-4 ring-white/10 select-none">
              KC
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px]"
              title="Active & Available"
            >
              ✓
            </span>
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Krishna Chouhan
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                Project Manager &amp; Lead
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-slate-400 mb-3 leading-snug">
              Specializing in Business Design, AI Sales, Custom Enterprise Software (ERP/HRM), &amp; Digital Strategy
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Ahmedabad, Gujarat, India
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Vahlay Consulting Inc
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                NMIMS (BTech IT)
              </span>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-6 pt-6 border-t border-slate-700/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Phone */}
          <div className={`flex items-center justify-between p-3 rounded-xl border ${
            isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone</p>
                <a
                  href="tel:9294872858"
                  className="text-xs font-bold text-slate-200 hover:text-indigo-400 truncate block"
                >
                  9294872858
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('9294872858', 'phone')}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
              title="Copy phone"
            >
              {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Email */}
          <div className={`flex items-center justify-between p-3 rounded-xl border ${
            isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-500 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                <a
                  href="mailto:krish.chouhan1025@gmail.com"
                  className="text-xs font-bold text-slate-200 hover:text-indigo-400 truncate block"
                  title="krish.chouhan1025@gmail.com"
                >
                  krish.chouhan1025@...
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('krish.chouhan1025@gmail.com', 'email')}
              className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
              title="Copy email"
            >
              {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/krishna-chouhan-4948231a0/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${
              isDark
                ? 'bg-slate-800/60 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/30'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">LinkedIn</p>
                <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 truncate">
                  krishna-chouhan
                </p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/krishnachouhan1011"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3 rounded-xl border transition-all group ${
              isDark
                ? 'bg-slate-800/60 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200/80 hover:border-indigo-400 hover:bg-indigo-50/30'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center shrink-0">
                <GithubIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">GitHub</p>
                <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 truncate">
                  krishnachouhan1011
                </p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
          </a>
        </div>
      </div>

      {/* TAB 1: CREATOR PROFILE CONTENT */}
      {activeTab === 'creator' && (
        <div className="space-y-6">
          {/* About & Philosophy Card */}
          <div className={`rounded-2xl border p-6 sm:p-7 shadow-xs ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-base font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              About Me &amp; Business Philosophy
            </h2>

            <div className="text-sm text-slate-300 leading-relaxed space-y-3">
              <p>
                I love the <strong>&ldquo;blank canvas&rdquo;</strong> stage of a business. Most companies start with a great idea but struggle to connect the dots between their brand, their website, and their daily operations. That&apos;s where I come in.
              </p>
              <p>
                With a background in development and a dedicated focus on <strong>Business Design</strong>, I help companies build their entire digital world from scratch. I don&apos;t just build websites; I build the systems that help businesses actually run.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5 pt-5 border-t border-slate-700/40">
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="text-lg font-black text-indigo-400 mb-1">01. Identity</div>
                <h3 className="text-xs font-bold mb-1">Brand &amp; Web Platform</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Crafting distinctive visual identities, logos, and responsive web platforms that define market presence.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="text-lg font-black text-emerald-400 mb-1">02. Growth</div>
                <h3 className="text-xs font-bold mb-1">Digital &amp; Performance</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strategy-backed performance marketing, social calendars, and conversion optimization to scale revenue.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="text-lg font-black text-amber-400 mb-1">03. Efficiency</div>
                <h3 className="text-xs font-bold mb-1">Custom Software (ERP/HRM)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Designing unified CRM, ERP, and HRM software so teams run their work in one seamless digital ecosystem.
                </p>
              </div>
            </div>
          </div>

          {/* Core Skills & Competencies */}
          <div className={`rounded-2xl border p-6 shadow-xs ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-base font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Core Skills &amp; Capabilities
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Application: Project Risk & Issue Register */}
          <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-purple-950/40 rounded-2xl border-2 border-indigo-500/40 p-6 sm:p-7 shadow-xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/25">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Project Risk &amp; Issue Register — PMBOK &amp; PRINCE2 Architecture
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500 text-white">
                      Current Application
                    </span>
                  </div>
                  <p className="text-xs text-indigo-400 font-semibold">
                    Designed &amp; Developed by Krishna Chouhan
                  </p>
                </div>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2.5 mb-5">
              <p>
                <strong>What is the Project Risk &amp; Issue Register?</strong> An executive, client-side risk governance system designed for Project Managers, Scrum Masters, and Delivery Directors. Built with <strong>React 18, Vite, Tailwind CSS, and Vitest</strong>, it replaces fragile spreadsheets with automated 5×5 severity scoring, interactive heatmap filtering, and deterministic triage workflows.
              </p>
              <p>
                <strong>The Problem it Solves:</strong> Project risks and active blockers are often commingled in unstructured tools. This application establishes standard governance: risks are evaluated by Probability × Impact, while active materialized issues have certain occurrence (Probability = 5), ensuring clear containment urgency across Low, Medium, High, and Critical thresholds.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center gap-2 font-bold text-slate-200 text-xs mb-1">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dual Domain Governance</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Distinct workflows for potential project risks and active materialized issues with customized plans.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center gap-2 font-bold text-slate-200 text-xs mb-1">
                  <Gauge className="w-3.5 h-3.5 text-rose-400" />
                  <span>Automated 5×5 Severity Scoring</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Calculates scores from 1 to 25 and maps to documented thresholds: Low, Medium, High, and Critical.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center gap-2 font-bold text-slate-200 text-xs mb-1">
                  <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Interactive 5×5 Matrix Heatmap</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Live distribution grid showing counts in each probability/impact cell with 1-click filtering.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center gap-2 font-bold text-slate-200 text-xs mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Unresolved Issues Triage</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Dedicated 1-click toggle and KPI card to isolate open issues by severity and target review date.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center gap-2 font-bold text-slate-200 text-xs mb-1">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
                  <span>RFC 4180 CSV Export</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Compliant export with cell quoting, quote-doubling, newlines, and UTF-8 Byte Order Mark (BOM).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                <div className="flex items-center gap-2 font-bold text-slate-200 text-xs mb-1">
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Client-Side Privacy</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Zero cloud telemetry. Data is securely stored in localStorage with corrupt-safe JSON recovery.
                </p>
              </div>
            </div>

            {/* Tech Stack Footer */}
            <div className="pt-3 border-t border-slate-700/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <div className="flex flex-wrap items-center gap-1.5 font-medium">
                <span className="font-semibold text-slate-300">Stack:</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">React 18</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">JavaScript ESNext</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Vite 6</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Tailwind CSS</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Vitest</span>
              </div>

              <span className="font-semibold text-indigo-400">
                100% Verified &bull; 33 Automated Tests Passing
              </span>
            </div>
          </div>

          {/* Featured Projects Shipped */}
          <div className={`rounded-2xl border p-6 shadow-xs ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-base font-bold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Featured Shipped Products &amp; Platforms
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className={`p-4 rounded-xl border flex flex-col justify-between ${
                    isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        {p.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                      }`}>
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-400 font-semibold mb-1">{p.role}</p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {p.description}
                    </p>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-slate-300 hover:text-indigo-400 flex items-center gap-1 mt-auto pt-2 border-t border-slate-700/40"
                  >
                    <span>Visit {p.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience & Education Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Experience Timeline */}
            <div className={`lg:col-span-2 rounded-2xl border p-6 shadow-xs ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h2 className="text-base font-bold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Experience Timeline
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.company} className="relative pl-5 border-l-2 border-indigo-500/30">
                    <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/10" />
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <h3 className="text-sm font-bold">{exp.role}</h3>
                      <span className="text-[11px] font-semibold text-slate-400">{exp.period}</span>
                    </div>
                    <p className="text-xs font-semibold text-indigo-400 mb-1.5">
                      {exp.company} • <span className="text-slate-400 font-normal">{exp.location}</span>
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                            isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="space-y-6">
              {/* Education */}
              <div className={`rounded-2xl border p-6 shadow-xs ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h2 className="text-base font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Education
                </h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xs font-bold">
                      Bachelor of Technology (BTech) — IT
                    </h3>
                    <p className="text-xs text-indigo-400 font-medium">
                      SVKM&rsquo;s NMIMS (Mukesh Patel MPSTME)
                    </p>
                    <p className="text-[11px] text-slate-400">2019 – 2023</p>
                  </div>
                  <div className="pt-2 border-t border-slate-700/40">
                    <h3 className="text-xs font-bold">High School Diploma</h3>
                    <p className="text-xs text-slate-400">CBSE Board</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className={`rounded-2xl border p-6 shadow-xs ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <h2 className="text-base font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Certifications
                </h2>
                <div className="space-y-2.5">
                  {certifications.map((c) => (
                    <div
                      key={c.title}
                      className={`p-2.5 rounded-xl border ${
                        isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>{c.title}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{c.year}</span>
                      </div>
                      <p className="text-[11px] text-indigo-400 font-medium">{c.issuer}</p>
                      <span className="text-[10px] font-medium text-slate-400">{c.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER MANUAL & GUIDE */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-sky-400" />
              Complete User Guide &amp; Operating Manual
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Learn how to effectively identify, evaluate, and resolve project risks and active blockers.
            </p>

            <div className="space-y-8">
              {guideSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <div key={sec.id} className="border-t border-slate-700/40 pt-6">
                    <h3 className="text-sm sm:text-base font-bold text-sky-400 flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4" />
                      {sec.title}
                    </h3>
                    {sec.content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-400" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <h3 className="font-bold text-xs sm:text-sm text-sky-400 mb-1">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Return Action */}
      <div className="pt-6 text-center">
        <button
          type="button"
          onClick={onBackToRegister}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/25 transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Risk & Issue Register</span>
        </button>
      </div>
    </div>
  );
}
