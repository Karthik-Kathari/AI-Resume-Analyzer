import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRoadmapStep, setActiveRoadmapStep] = useState(0);
  const [activePreviewTab, setActivePreviewTab] = useState('score');
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [gaugeAnimated, setGaugeAnimated] = useState(false);

  // Scroll listener for sticky navbar blur & elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for 60fps smooth scroll-reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    // Trigger gauge animation shortly after mount
    const timer = setTimeout(() => setGaugeAnimated(true), 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const roadmapSteps = [
    {
      num: '01',
      title: 'Get Started & Verify',
      subtitle: 'Secure, spam-free account activation',
      desc: 'Sign up in seconds and verify with a 6-digit email OTP. Disposable emails are blocked to maintain a secure, private environment.',
      tag: 'Step 1: Identity & Security',
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      detail: 'Enter your name, email, and password. Our enterprise-grade verification guarantees private ownership of your data.'
    },
    {
      num: '02',
      title: 'Upload Resume & Paste Job',
      subtitle: 'PDF extraction & role specification',
      desc: 'Drag & drop your resume PDF and paste the target job description. You can also load our curated sample job description with a single click.',
      tag: 'Step 2: Input & Ingestion',
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      ),
      detail: 'Supports standard PDF resumes. The job description accepts text inputs up to 10,000 characters for comprehensive matching.'
    },
    {
      num: '03',
      title: 'In-Memory PDF Extraction',
      subtitle: 'Punctuation-preserving tokenization',
      desc: 'Our engine extracts text directly in memory without writing files to disk. Punctuation is preserved so Node.js, C++, and .NET remain intact.',
      tag: 'Step 3: Processing & Privacy',
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      detail: 'Zero disk persistence. Stop words and job filler text are filtered out while programming languages and frameworks are isolated.'
    },
    {
      num: '04',
      title: 'Algorithmic Keyword Matching',
      subtitle: 'Deterministic skill taxonomy comparison',
      desc: 'Cross-references your resume skills against required keywords. Eliminates generic AI hallucinations in favor of exact mathematical logic.',
      tag: 'Step 4: Algorithmic Analysis',
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      detail: 'Score formula: (Matched Skills ÷ Required Skills) × 100. Transparent, objective, and aligned with corporate ATS scanning practices.'
    },
    {
      num: '05',
      title: 'Actionable Results & History',
      subtitle: 'Gauge, skill matrix & revision tracking',
      desc: 'Review your visual gauge, inspect missing tech keywords, implement tailored recommendations, and compare saved iterations in History.',
      tag: 'Step 5: Output & Next Steps',
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      detail: 'Apply the suggested bullet-point refinements, re-analyze your updated PDF, and track your match score climb from 40% to 90%+.'
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Punctuation-Aware Tokenizer',
      desc: 'Standard ATS checkers strip symbols, turning C++ into C or Node.js into Node js. ResumeIQ is engineered with custom regex that preserves developer tech terms perfectly.',
      benefit: 'Prevents false negatives on critical frameworks and languages.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'In-Memory PDF Buffer Parsing',
      desc: 'Your resume is processed dynamically in memory using stream buffers and immediately discarded after analysis. No files are ever saved to hard disks or cloud buckets.',
      benefit: 'Total privacy. Your personal and career information is never stored or sold.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Matched & Missing Skills Matrix',
      desc: 'Instantly view a color-coded matrix separating verified competencies from missing requirements. Clickable badges give you direct clarity on what to add.',
      benefit: 'Eliminates guesswork so you know exactly which keywords to target.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: 'Deterministic Match Scoring',
      desc: 'Receive an honest 0-100% circular alignment gauge based on actual mathematical ratios: (Matched Skills ÷ Total Required Skills) × 100.',
      benefit: 'Objective benchmark without arbitrary AI black-box ratings.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Actionable Bullet-Point Advice',
      desc: 'Get tailored recommendations on how to naturally incorporate missing tools into your experience bullets with measurable impact metrics.',
      benefit: 'Transforms passive resumes into compelling, high-impact profiles.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Persistent Revision History',
      desc: 'Every scan is automatically organized in your private history. Compare before-and-after scores across different resume drafts and job applications.',
      benefit: 'Quantifiable proof of your resume improvement over time.'
    }
  ];

  const faqs = [
    {
      q: 'What is ResumeIQ and how does it help job seekers?',
      a: 'ResumeIQ is an algorithmic ATS resume optimization platform. It compares your resume PDF against any job description, extracts relevant technical keywords, and calculates an exact match score. It highlights which required skills are matched, reveals missing keywords, and gives actionable advice to ensure your resume passes automated screening systems.'
    },
    {
      q: 'How does the match scoring algorithm work?',
      a: 'The scoring formula is transparent and mathematical: (Matched Keywords ÷ Total Required Keywords) × 100. Our engine normalizes developer tokens, filters out common conversational filler words, and detects technical skills using an extensive engineering taxonomy. Scores above 75% represent strong ATS alignment.'
    },
    {
      q: 'Is ResumeIQ completely free to use?',
      a: 'Yes! ResumeIQ is built on a zero-cost architecture philosophy. There are no paid tiers, no credit limits, and no subscription traps. You can scan as many resumes and job descriptions as you need.'
    },
    {
      q: 'Are my uploaded resumes stored or shared?',
      a: 'Never. Resumes are parsed entirely in-memory buffers using multer and pdf-parse. The raw PDF files are never written to server storage or database disks, and your data is never shared with third-party advertisers or recruitment agencies.'
    },
    {
      q: 'Why is punctuation preservation important for tech resumes?',
      a: 'Most generic resume checkers use naive text splitters that strip punctuation, converting "Node.js" to "Node" and "js", or "C++" to "C". In modern tech recruiting, these are completely different technologies. ResumeIQ specifically preserves smart punctuation for terms like React.js, Vue.js, CI/CD, .NET, and C++.'
    },
    {
      q: 'What happens if I forget my password or lose access?',
      a: 'ResumeIQ features a secure 3-step password recovery flow. Simply click "Forgot Password", enter your email, verify the 6-digit one-time code sent to your inbox, and set a new password securely.'
    },
    {
      q: 'Can I track multiple versions of my resume?',
      a: 'Yes. Every analysis is saved to your private History dashboard. You can search by job title, score, or keyword, inspect previous breakdowns, and compare how your score improves after revising your resume.'
    }
  ];

  // SVG Gauge calculations
  const circumference = 2 * Math.PI * 54;
  const targetOffset = circumference * (1 - 0.85);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Background Radial Glow & Floating Ambient Lights */}
      <div className="absolute top-0 inset-x-0 h-[700px] bg-radial-gradient pointer-events-none"></div>
      <div className="absolute top-48 left-1/4 w-[480px] h-[280px] bg-indigo-600/12 blur-[130px] pointer-events-none rounded-full animate-float-slow"></div>
      <div className="absolute top-96 right-1/4 w-[420px] h-[260px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full animate-float-reverse"></div>

      {/* ─────────────────────────────────────────────────────────────
          2. Premium Glassmorphism Navbar
      ───────────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/30'
            : 'bg-slate-950/60 backdrop-blur-lg border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <img
              src={logoImg}
              alt="ResumeIQ"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/5 backdrop-blur-md shadow-inner shadow-white/5">
            {[
              { label: 'Home', href: '#hero' },
              { label: 'About', href: '#about' },
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Roadmap', href: '#roadmap' },
              { label: 'FAQs', href: '#faqs' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-all duration-200 hover:shadow-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/history')}
                  className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-900 transition-colors"
                >
                  History
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-shimmer px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group"
                >
                  Go to Dashboard
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300 shadow-inner">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-900/60"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-shimmer px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 group"
                >
                  Sign Up Free
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Strictly Mobile Only, Never Leaks to Desktop) */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-slate-800 px-6 py-5 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {[
                { label: 'Home', href: '#hero' },
                { label: 'About', href: '#about' },
                { label: 'Features', href: '#features' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Roadmap', href: '#roadmap' },
                { label: 'FAQs', href: '#faqs' }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/history');
                    }}
                    className="w-full text-center py-2 px-4 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-900 transition-colors"
                  >
                    View History
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-shimmer w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20"
                  >
                    Sign Up Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. Hero Section
      ───────────────────────────────────────────────────────────── */}
      <section id="hero" className="relative pt-3 pb-16 sm:pt-6 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Top Pill Badge with Smooth Glow */}
            <div className="reveal inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs sm:text-sm font-medium mb-4 sm:mb-5 backdrop-blur-md shadow-sm shadow-indigo-500/10">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span>100% Free & Algorithmic ATS Optimization</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Zero AI Hallucinations</span>
            </div>

            {/* Powerful Headline with Smooth Entrance */}
            <h1 className="reveal delay-100 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Optimize Your Resume For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                ATS Algorithms
              </span>{' '}
              & Win More Interviews
            </h1>

            {/* Engaging Subtitle */}
            <p className="reveal delay-150 mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Over 75% of qualified engineering candidates are rejected by automated ATS parsers before a human recruiter sees their resume. ResumeIQ extracts required technical keywords, calculates exact match ratios, and pinpoints your skill gaps in seconds.
            </p>

            {/* CTA Buttons with Shimmer & Spring Lift */}
            <div className="reveal delay-200 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                className="btn-shimmer w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-xl shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-indigo-500/50 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base group"
              >
                <span>{isAuthenticated ? 'Open Dashboard' : 'Get Started Free'}</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:scale-95 shadow-sm"
              >
                <svg className="w-4 h-4 text-indigo-400 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Explore How It Works</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="reveal delay-250 mt-10 pt-8 border-t border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {[
                { icon: '✓', title: '100% Free', sub: 'Zero cost, no credits', color: 'emerald' },
                { icon: '🛡️', title: 'Privacy First', sub: 'No disk file storage', color: 'indigo' },
                { icon: '🎯', title: 'Deterministic', sub: 'Exact math matching', color: 'purple' },
                { icon: '⚙️', title: 'Smart Punctuation', sub: 'C++, Node.js, .NET', color: 'cyan' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 rounded-xl transition-all duration-300 hover:bg-slate-900/40">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-indigo-400">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{item.title}</div>
                    <div className="text-[11px] text-slate-400">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Product Showcase / Mockup with Live Gauge Fill */}
          <div className="reveal-scale delay-300 mt-14 max-w-5xl mx-auto">
            <div className="glass-panel rounded-2xl border border-white/10 p-2 sm:p-3 shadow-2xl shadow-indigo-950/50 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-indigo-900/30">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 rounded-t-xl border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                    resumeiq-engine :: Senior Full Stack Engineer (Node.js & React)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Rule-Based Engine Active
                </div>
              </div>

              {/* Mockup Dashboard Content */}
              <div className="p-4 sm:p-6 bg-slate-950/80 rounded-b-xl space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Animated Circular Score Gauge */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
                    <div className="relative flex items-center justify-center my-2">
                      <svg width="140" height="140" className="transform -rotate-90">
                        <circle cx="70" cy="70" r="54" stroke="#1e293b" strokeWidth="10" fill="transparent" />
                        <circle
                          cx="70"
                          cy="70"
                          r="54"
                          stroke="#10b981"
                          strokeWidth="10"
                          strokeDasharray={circumference}
                          strokeDashoffset={gaugeAnimated ? targetOffset : circumference}
                          strokeLinecap="round"
                          fill="transparent"
                          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold text-white">85%</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Match Score</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mt-2 shadow-sm">
                      <span>Strong ATS Alignment</span>
                    </div>
                    <div className="mt-3 text-xs text-slate-400 flex items-center justify-center gap-4">
                      <span>✓ 23 Matched</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-amber-400">⚠️ 4 Missing</span>
                    </div>
                  </div>

                  {/* Skills Breakdown Tags with Interactive Micro-Springs */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-emerald-400 flex items-center justify-between mb-2">
                        <span>MATCHED SKILLS (23)</span>
                        <span className="text-[11px] text-slate-400 font-normal">Identified in resume</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Node.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'RESTful APIs', 'Express.js', 'Git', 'Unit Testing', 'Jest'].map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 transition-all duration-200 hover:scale-105 hover:bg-emerald-500/20 cursor-default"
                          >
                            <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-rose-400 flex items-center justify-between mb-2">
                        <span>MISSING KEYWORDS (4)</span>
                        <span className="text-[11px] text-slate-400 font-normal">Add to experience bullet points</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Docker', 'CI/CD Pipelines', 'Redis', 'AWS (S3/EC2)'].map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 transition-all duration-200 hover:scale-105 hover:bg-rose-500/20 cursor-default"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Recommendation */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/20 text-xs text-slate-300 flex items-start gap-2.5 shadow-sm transition-all duration-300 hover:border-indigo-500/40">
                      <span className="text-indigo-400 font-bold text-sm">💡</span>
                      <p>
                        <strong className="text-white">Pro Tip:</strong> Add 1-2 bullet points mentioning your containerization with <em>Docker</em> and caching strategy with <em>Redis</em> to elevate your score to 95%+.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. About the Platform Section
      ───────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 border-t border-slate-800/80 bg-slate-950/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">
              About The Platform
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bridging the Gap Between Your Resume and Modern ATS
            </h3>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Applicant Tracking Systems are rigid algorithmic filters. We built ResumeIQ to give candidates the exact same diagnostic visibility that corporate recruiting pipelines have.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ),
                color: 'rose',
                title: 'The ATS Filtering Dilemma',
                desc: 'Over 75% of job applications are filtered out automatically before a human recruiter reads them. If your resume misses specific technical terms or writes them unconventionally, you are silently filtered out.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                color: 'indigo',
                title: 'Why ResumeIQ Was Created',
                desc: 'Candidates were tired of applying into a black hole. We created ResumeIQ to provide an objective, mathematical feedback loop so you know with certainty if your resume matches the job description.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                color: 'purple',
                title: 'Built for Tech Professionals',
                desc: 'Engineered specifically for software engineers, frontend/backend developers, DevOps specialists, data scientists, and technical leaders targeting high-growth companies.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                color: 'emerald',
                title: 'What Sets Us Apart',
                desc: 'Zero AI hallucinations, zero file retention, and zero subscriptions. You get clear mathematical scores, smart punctuation preservation, and private revision tracking for free.'
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`reveal delay-${(idx + 1) * 100} glass-card rounded-2xl p-6 relative group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl`}
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-${card.color}-400 mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  {card.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{card.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Features & Benefits Section
      ───────────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">
              Features & Practical Benefits
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered With Every Tool You Need To Stand Out
            </h3>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Every feature in ResumeIQ was designed based on real recruiter ATS workflows and candidate pain points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className={`reveal delay-${(idx % 3 + 1) * 100} glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/50 flex flex-col justify-between group`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:border-indigo-500/40">
                    {feat.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 transition-colors duration-200 group-hover:text-indigo-200">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{feat.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 text-xs font-medium text-indigo-300 flex items-center gap-1.5">
                  <span className="text-indigo-400">✨ Benefit:</span>
                  <span>{feat.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. How It Works – Connected Horizontal Workflow Roadmap
      ───────────────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 border-t border-slate-800/80 bg-slate-950/60 relative">
        <div id="roadmap" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              Interactive Workflow Roadmap
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Connected 5-Step Journey
            </h3>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              From raw resume PDF to an interview-ready application in under 60 seconds. Click or hover any step to explore.
            </p>
          </div>

          {/* DESKTOP CONNECTED ROADMAP (0 ───── 0 ───── 0 ───── 0 ───── 0) */}
          <div className="reveal hidden lg:block relative my-12">
            {/* Connected Horizontal Line */}
            <div className="absolute top-7 left-14 right-14 h-1 bg-slate-800 rounded-full z-0 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-sm shadow-indigo-500"
                style={{ width: `${(activeRoadmapStep / (roadmapSteps.length - 1)) * 100}%` }}
              ></div>
            </div>

            {/* 5 Connected Circular Nodes */}
            <div className="relative z-10 grid grid-cols-5 gap-4">
              {roadmapSteps.map((step, idx) => {
                const isActive = activeRoadmapStep === idx;
                const isPassed = activeRoadmapStep > idx;

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveRoadmapStep(idx)}
                    onMouseEnter={() => setActiveRoadmapStep(idx)}
                    className="flex flex-col items-center cursor-pointer group focus:outline-none"
                  >
                    {/* Glowing Numbered Node */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 relative ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/40 ring-4 ring-indigo-500/30 scale-110'
                          : isPassed
                          ? 'bg-indigo-900/90 border-2 border-indigo-400 text-indigo-200'
                          : 'bg-slate-900 border-2 border-slate-700 text-slate-400 group-hover:border-slate-500 group-hover:text-slate-200'
                      }`}
                    >
                      {step.num}
                      {isActive && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-ping"></span>
                      )}
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="mt-4 text-center px-1">
                      <div
                        className={`text-xs font-bold transition-colors duration-200 ${
                          isActive ? 'text-indigo-400' : 'text-slate-200 group-hover:text-white'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{step.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Interactive Card for Active Step */}
            <div className="mt-12 glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 max-w-3xl mx-auto shadow-xl transition-all duration-300 animate-fadeIn">
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 scale-105">
                  {roadmapSteps[activeRoadmapStep].icon}
                </div>
                <div className="space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                    {roadmapSteps[activeRoadmapStep].tag}
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    {roadmapSteps[activeRoadmapStep].title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {roadmapSteps[activeRoadmapStep].desc}
                  </p>
                  <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <strong className="text-slate-200">Implementation detail:</strong> {roadmapSteps[activeRoadmapStep].detail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE POLISHED VERTICAL TIMELINE */}
          <div className="lg:hidden relative space-y-8 pl-6 border-l-2 border-indigo-500/30 ml-4 my-8">
            {roadmapSteps.map((step, idx) => (
              <div key={idx} className="reveal relative group">
                {/* Timeline Circular Indicator */}
                <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-xs font-bold text-indigo-300 shadow-md shadow-indigo-500/30">
                  {step.num}
                </div>

                {/* Timeline Content Card */}
                <div className="glass-card rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-indigo-400">{step.tag}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">{step.desc}</p>
                  <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. Why Choose Our Platform?
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">
              Why Choose ResumeIQ?
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered Differently From Generic AI & Paywalled Checkers
            </h3>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              See how ResumeIQ stacks up against old-fashioned resume checkers and generic chat tools.
            </p>
          </div>

          {/* Comparison Table with Fluid Card Style */}
          <div className="reveal-scale delay-150 glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 hover:border-indigo-500/30">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60">
                    <th className="py-4 px-6 font-semibold text-slate-300">Feature Comparison</th>
                    <th className="py-4 px-6 font-bold text-indigo-400 bg-indigo-500/10 border-x border-indigo-500/20">
                      ResumeIQ (Our Platform)
                    </th>
                    <th className="py-4 px-6 font-semibold text-slate-400">Traditional Resume Scanners</th>
                    <th className="py-4 px-6 font-semibold text-slate-400">Generic AI Chatbots</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-xs sm:text-sm">
                  {[
                    {
                      feat: 'Scoring Transparency',
                      our: '✓ Exact Mathematical Ratio (Matched ÷ Total)',
                      trad: 'Proprietary opaque algorithm',
                      ai: 'Hallucinated rating without math'
                    },
                    {
                      feat: 'Tech Punctuation Handling',
                      our: '✓ Preserves Node.js, C++, .NET, CI/CD',
                      trad: 'Strips symbols, breaks tech terms',
                      ai: 'Inconsistent across prompts',
                      tradWarn: true
                    },
                    {
                      feat: 'Privacy & File Retention',
                      our: '✓ In-memory buffer parsing (0 disk saves)',
                      trad: 'Resumes stored and shared with recruiters',
                      ai: 'Used for model training'
                    },
                    {
                      feat: 'Pricing & Access',
                      our: '✓ 100% Free Forever (₹0 cost)',
                      trad: '$19 - $39 / month subscription',
                      ai: 'Requires $20/mo Plus plan',
                      tradWarn: true
                    },
                    {
                      feat: 'Revision History Tracking',
                      our: '✓ Included with search & breakdown',
                      trad: 'Locked behind premium tiers',
                      ai: 'Lost in disorganized chat logs',
                      aiWarn: true
                    }
                  ].map((row, idx) => (
                    <tr key={idx} className="transition-colors duration-150 hover:bg-slate-900/30">
                      <td className="py-4 px-6 font-medium text-white">{row.feat}</td>
                      <td className="py-4 px-6 text-emerald-400 font-semibold bg-indigo-500/5 border-x border-indigo-500/20">
                        {row.our}
                      </td>
                      <td className={`py-4 px-6 ${row.tradWarn ? 'text-rose-400' : 'text-slate-400'}`}>
                        {row.trad}
                      </td>
                      <td className={`py-4 px-6 ${row.aiWarn ? 'text-rose-400' : 'text-slate-400'}`}>
                        {row.ai}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. Product Preview Section
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">
              Inside The Dashboard
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything You Experience Upon Registration
            </h3>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Explore the exact analysis reports, metrics, and actionable tools waiting in your personal dashboard.
            </p>

            {/* Interactive Preview Tabs */}
            <div className="mt-8 inline-flex p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
              {[
                { id: 'score', label: '1. Match Gauge & Breakdown' },
                { id: 'skills', label: '2. Skills Matrix' },
                { id: 'recommendations', label: '3. Action Recommendations' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    activePreviewTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Preview Panel with Smooth Tab Switch */}
          <div className="reveal-scale delay-150 glass-panel rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto border border-white/10 shadow-2xl transition-all duration-300">
            {activePreviewTab === 'score' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-900 border border-indigo-500/20">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-indigo-500 flex flex-col items-center justify-center shadow-lg shadow-indigo-500/20">
                      <span className="text-2xl font-black text-white">88%</span>
                      <span className="text-[9px] uppercase font-bold text-indigo-300">Strong</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Senior Software Engineer Match</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        High technical overlap detected with specified job criteria.
                      </p>
                      <div className="mt-2 text-xs text-slate-300">
                        <span className="font-semibold text-emerald-400">22 skills matched</span> •{' '}
                        <span className="font-semibold text-rose-400">3 skills missing</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
                    <span className="text-xs text-slate-400">Algorithm</span>
                    <div className="text-xs font-semibold text-indigo-300">Rule-Based Punctuation Engine</div>
                    <span className="text-[11px] text-slate-500">Latency: 420ms</span>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'skills' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Verified Matched Skills (Detected in Resume)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Git', 'REST APIs', 'Unit Testing', 'Jest'].map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 transition-transform hover:scale-105 cursor-default"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h4 className="text-sm font-bold text-rose-400 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    Missing Job Requirements (Keywords to Incorporate)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Redis Caching', 'Docker Containers', 'AWS Lambda'].map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 transition-transform hover:scale-105 cursor-default"
                      >
                        ✕ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'recommendations' && (
              <div className="space-y-4 animate-fadeIn">
                {[
                  {
                    num: '1',
                    title: 'Embed Missing Containerization Keywords',
                    desc: 'Integrate Docker into your recent project bullet points. For example: "Containerized microservices using Docker, decreasing onboarding setup time by 40%."'
                  },
                  {
                    num: '2',
                    title: 'Highlight Caching Performance',
                    desc: 'The job description emphasizes low-latency APIs. Reference Redis in your backend descriptions to satisfy this required skill.'
                  },
                  {
                    num: '3',
                    title: 'Preserve Technical Spelling',
                    desc: 'Always write Node.js and React.js with standard punctuation to ensure maximum alignment across older legacy ATS parsers.'
                  }
                ].map((rec) => (
                  <div
                    key={rec.num}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 transition-all duration-200 hover:border-slate-700 hover:bg-slate-900/90"
                  >
                    <span className="text-indigo-400 font-bold text-lg">{rec.num}</span>
                    <div>
                      <h5 className="text-sm font-bold text-white">{rec.title}</h5>
                      <p className="text-xs text-slate-300 mt-1">{rec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. FAQs Section with Smooth Height Accordion
      ───────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-20 border-t border-slate-800/80 bg-slate-950/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">
              Frequently Asked Questions
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Got Questions? We Have Answers.
            </h3>
            <p className="mt-4 text-base text-slate-300">
              Clear, transparent answers about how ResumeIQ works, our privacy standards, and ATS scoring.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`reveal delay-${(index % 4 + 1) * 75} glass-card rounded-xl border border-white/5 overflow-hidden transition-all duration-200`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">{faq.q}</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center bg-slate-900 border border-slate-700 text-xs font-bold transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400 border-indigo-500/50' : 'text-slate-400'}`}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div className={`accordion-wrapper ${isOpen ? 'open' : ''}`}>
                    <div className="accordion-inner">
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. Final Call to Action
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal-scale rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 shadow-2xl shadow-indigo-950/60 text-center relative overflow-hidden transition-all duration-300 hover:border-indigo-500/50">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none animate-float-slow"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full pointer-events-none animate-float-reverse"></div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6">
              🚀 Ready To Stop The Rejections?
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
              Supercharge Your Resume & Start Landing Tech Interviews
            </h3>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
              Join software engineers optimizing their resumes for top tech companies. 100% free, private, and instant.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
                className="btn-shimmer w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-xl shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-indigo-500/50 active:scale-95 text-sm sm:text-base cursor-pointer"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started Free — In 60 Seconds'}
              </button>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 transition-all duration-300 text-sm sm:text-base text-center transform hover:-translate-y-0.5 active:scale-95"
                >
                  Sign In to Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. Professional Footer
      ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3 group">
                <img src={logoImg} alt="ResumeIQ" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                ResumeIQ is an algorithmic ATS resume optimization platform engineered specifically for software engineers and tech professionals. Get transparent keyword breakdowns, deterministic scores, and tailored advice.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                All Systems Operational • Zero Cost Engine
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Navigation</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Platform</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features & Benefits</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#roadmap" className="hover:text-white transition-colors">Workflow Roadmap</a></li>
                <li><a href="#faqs" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Application Links */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Account & Tools</h5>
              <ul className="space-y-2 text-xs">
                <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">ATS Dashboard</Link></li>
                <li><Link to="/history" className="hover:text-white transition-colors">Analysis History</Link></li>
                <li><Link to="/forgot-password" className="hover:text-white transition-colors">Password Recovery</Link></li>
              </ul>
            </div>

            {/* Technical Architecture */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Security & Standards</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>In-Memory PDF Buffers</li>
                <li>Zero Disk File Storage</li>
                <li>6-Digit Email OTP Verification</li>
                <li>Disposable Email Blacklist</li>
                <li>Smart Punctuation Preservation</li>
                <li>Strict Data Isolation</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} ResumeIQ. Built for Software Engineers & Tech Professionals.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Karthik-Kathari/AI-Resume-Analyzer"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-300 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub Repository
              </a>
              <span className="text-slate-700">|</span>
              <span>MIT Licensed</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
