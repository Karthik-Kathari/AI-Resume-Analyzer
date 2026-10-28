/**
 * Comprehensive Technical & Domain Keyword Dictionary.
 * Contains single and multi-word terms across programming languages,
 * frameworks, databases, cloud, DevOps, AI/ML, architecture, and core CS.
 */
const TECH_DICTIONARY: string[] = [
  // Languages & Runtimes
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', '.net', 'golang', 'go',
  'rust', 'ruby', 'php', 'swift', 'kotlin', 'scala', 'r', 'dart', 'solidity',
  'node.js', 'nodejs', 'deno', 'bun', 'html', 'html5', 'css', 'css3', 'sass', 'scss',
  'bash', 'shell', 'powershell', 'sql', 'nosql',

  // Frontend & UI
  'react', 'react.js', 'reactjs', 'next.js', 'nextjs', 'vue', 'vue.js', 'vuejs', 'nuxt.js',
  'angular', 'angularjs', 'svelte', 'sveltekit', 'redux', 'redux toolkit', 'zustand', 'mobx',
  'tailwind', 'tailwind css', 'bootstrap', 'material-ui', 'mui', 'chakra ui', 'shadcn',
  'styled-components', 'webpack', 'vite', 'turbopack', 'rollup', 'babel', 'esbuild',
  'responsive design', 'web accessibility', 'a11y', 'seo', 'pwa', 'spa',

  // Backend Frameworks & Libraries
  'express', 'express.js', 'nest.js', 'nestjs', 'fastapi', 'flask', 'django',
  'spring', 'spring boot', 'ruby on rails', 'rails', 'laravel', 'asp.net', 'asp.net core',
  'graphql', 'rest', 'rest api', 'restful api', 'grpc', 'trpc', 'apollo graphql',
  'microservices', 'monorepo', 'serverless', 'event-driven architecture',

  // Databases & Caching
  'mongodb', 'postgresql', 'postgres', 'mysql', 'mariadb', 'sqlite', 'redis', 'memcached',
  'elasticsearch', 'cassandra', 'dynamodb', 'couchdb', 'neo4j', 'prisma', 'typeorm',
  'mongoose', 'sequelize', 'drizzle orm', 'supabase', 'firebase', 'firestore',

  // Cloud & Infrastructure
  'aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudfront', 'rds', 'sqs', 'sns',
  'azure', 'microsoft azure', 'google cloud', 'gcp', 'cloud run', 'bigquery',
  'docker', 'kubernetes', 'k8s', 'helm', 'terraform', 'ansible', 'pulumi',
  'nginx', 'apache', 'cloudflare', 'load balancing', 'cdn',

  // CI/CD, DevOps & Tools
  'git', 'github', 'gitlab', 'bitbucket', 'ci/cd', 'github actions', 'jenkins', 'circleci',
  'argocd', 'travis ci', 'prometheus', 'grafana', 'datadog', 'new relic', 'sentry',
  'linux', 'ubuntu', 'centos', 'debian', 'unix',

  // Testing & Quality
  'jest', 'mocha', 'chai', 'jasmine', 'cypress', 'playwright', 'selenium', 'puppeteer',
  'vitest', 'unit testing', 'integration testing', 'end-to-end testing', 'e2e testing',
  'test driven development', 'tdd', 'bdd',

  // AI, Data & Machine Learning
  'machine learning', 'deep learning', 'artificial intelligence', 'ai', 'data science',
  'natural language processing', 'nlp', 'computer vision', 'large language models', 'llm',
  'generative ai', 'genai', 'rag', 'retrieval-augmented generation', 'vector database',
  'vector search', 'embeddings', 'langchain', 'llamaindex', 'hugging face', 'openai',
  'gemini', 'claude', 'pinecone', 'chromadb', 'weaviate', 'milvus', 'qdrant',
  'pytorch', 'tensorflow', 'scikit-learn', 'pandas', 'numpy', 'keras',
  'prompt engineering', 'fine-tuning',

  // Message Brokers & Real-Time
  'apache kafka', 'kafka', 'rabbitmq', 'redis pub/sub', 'activemq', 'socket.io',
  'websockets', 'webrtc', 'grpc', 'message queue',

  // Security & Auth
  'jwt', 'json web tokens', 'oauth', 'oauth2', 'oauth 2.0', 'saml', 'sso', 'single sign-on',
  'rbac', 'role-based access control', 'cors', 'csrf', 'xss', 'encryption', 'bcrypt',
  'https', 'ssl/tls', 'penetration testing', 'zero trust',

  // Architecture & Engineering Practices
  'system design', 'distributed systems', 'object-oriented programming', 'oop',
  'functional programming', 'design patterns', 'solid principles', 'clean architecture',
  'domain-driven design', 'ddd', 'data structures', 'algorithms', 'concurrency',
  'multithreading', 'caching', 'rate limiting', 'performance optimization',
  'high availability', 'fault tolerance', 'scalability', 'agile', 'scrum', 'kanban',
  'jira', 'api design', 'code review',
];

/**
 * Stop words set covering:
 * 1. Standard English prepositions, pronouns, articles, conjunctions, auxiliary verbs
 * 2. Job description filler vocabulary and generic corporate nouns/adverbs
 */
const STOP_WORDS = new Set([
  // Articles, prepositions, conjunctions
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'also', 'am', 'an', 'and',
  'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
  'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did',
  'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each', 'few',
  'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having',
  'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him',
  'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in',
  'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most',
  'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t',
  'she', 'she\'d', 'she\'ll', 'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than',
  'that', 'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there',
  'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve', 'this', 'those',
  'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d',
  'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
  'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with',
  'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your',
  'yours', 'yourself', 'yourselves',

  // Generic Job Description / Corporate Filler Words
  'looking', 'candidate', 'closely', 'ideal', 'responsible', 'responsibility', 'responsibilities',
  'requirement', 'requirements', 'qualification', 'qualifications', 'opportunity', 'team',
  'teams', 'work', 'working', 'worked', 'worker', 'job', 'jobs', 'role', 'roles', 'position',
  'positions', 'company', 'companies', 'client', 'clients', 'culture', 'values', 'strong',
  'good', 'great', 'excellent', 'proven', 'demonstrated', 'ability', 'abilities', 'capable',
  'experience', 'experiences', 'experienced', 'year', 'years', 'plus', 'preferred', 'must',
  'required', 'skills', 'skill', 'skilled', 'knowledge', 'understanding', 'familiar',
  'familiarity', 'background', 'hands', 'hands-on', 'track', 'record', 'passion', 'passionate',
  'driven', 'motivated', 'self-starter', 'fast-paced', 'dynamic', 'environment', 'collaborative',
  'cross-functional', 'stakeholders', 'deliver', 'delivering', 'delivery', 'build', 'building',
  'built', 'maintain', 'maintaining', 'maintained', 'support', 'supporting', 'supported',
  'lead', 'leading', 'leadership', 'manage', 'managing', 'management', 'create', 'creating',
  'develop', 'developing', 'developer', 'development', 'engineer', 'engineering', 'designer',
  'designing', 'design', 'help', 'helping', 'provide', 'providing', 'contribute', 'contributing',
  'solve', 'solving', 'solution', 'solutions', 'problem', 'problems', 'high', 'quality',
  'best', 'practices', 'day', 'days', 'daily', 'week', 'weeks', 'month', 'months', 'time',
  'full-time', 'part-time', 'remote', 'hybrid', 'onsite', 'level', 'senior', 'junior', 'mid',
  'lead', 'principal', 'intern', 'apply', 'applying', 'interview', 'offer', 'compensation',
  'benefits', 'salary', 'degree', 'bachelor', 'bachelors', 'master', 'masters', 'phd',
  'equal', 'employment', 'race', 'color', 'religion', 'gender', 'orientation', 'disability',
  'veteran', 'status', 'applicable', 'including', 'without', 'regard', 'notes', 'misc', 'etc',
]);

/**
 * Smart punctuation trimmer:
 * Strips leading & trailing punctuation (dots, commas, quotes, colons, brackets, etc.)
 * while PRESERVING internal punctuation necessary for technical identifiers
 * (e.g. "node.js", "c++", "c#", ".net", "ci/cd").
 */
export const cleanToken = (token: string): string => {
  if (!token) return '';
  let str = token.trim();

  // Strip leading punctuation except dots that denote tech names like .net
  if (!str.startsWith('.net')) {
    str = str.replace(/^[^\w#+]+/, '');
  }

  // Strip trailing punctuation (periods, commas, semicolons, colons, brackets, quotes, dashes)
  str = str.replace(/[.,;:!?()[\]{}"'~*\\/]+$/, '');

  return str.trim();
};

/**
 * Normalize text by lowercasing and replacing excessive whitespace.
 */
export const normalizeText = (text: string): string => {
  return text.toLowerCase().replace(/[\r\n\t]+/g, ' ');
};

/**
 * Extract clean, deduplicated keywords from text using:
 * 1. Curated Multi-word phrase matching (e.g. 'machine learning', 'ci/cd', 'react.js')
 * 2. Smart single-token extraction with leading/trailing punctuation stripping
 * 3. Stop-word filtering against an extensive dictionary
 * 4. Technical validity check against known technologies or domain skill patterns
 */
export const extractKeywords = (text: string): Set<string> => {
  const normalized = normalizeText(text);
  const keywords = new Set<string>();

  // 1. Scan for curated multi-word & special technical terms first
  for (const term of TECH_DICTIONARY) {
    if (term.includes(' ') || term.includes('.') || term.includes('/') || term.includes('+') || term.includes('#')) {
      // Create word-boundary or isolated match regex
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-z0-9_#+.-])${escaped}([^a-z0-9_#+.-]|$)`, 'i');
      if (regex.test(normalized)) {
        keywords.add(term);
      }
    }
  }

  // 2. Tokenize into individual words by whitespace
  const rawTokens = normalized.split(/\s+/);

  for (const raw of rawTokens) {
    const cleaned = cleanToken(raw);

    // Skip empty, single char (unless 'r' or 'c'), numbers, or stop words
    if (!cleaned || cleaned.length < 2) continue;
    if (/^\d+$/.test(cleaned)) continue;
    if (STOP_WORDS.has(cleaned)) continue;

    // Check if the cleaned token is an acknowledged technology in our dictionary
    if (TECH_DICTIONARY.includes(cleaned)) {
      keywords.add(cleaned);
      continue;
    }

    // Secondary check: allow common software engineering domain nouns
    // e.g., 'microservices', 'concurrency', 'multithreading', 'nosql', 'api', 'etl', 'iam'
    if (cleaned.length >= 3 && !STOP_WORDS.has(cleaned)) {
      // If it contains tech special chars (like . or + or # or /) or ends in known tech suffixes
      if (
        /[#+./]/.test(cleaned) ||
        cleaned.endsWith('db') ||
        cleaned.endsWith('js') ||
        cleaned.endsWith('ql') ||
        cleaned.endsWith('ops') ||
        cleaned.startsWith('cloud') ||
        cleaned.startsWith('data')
      ) {
        keywords.add(cleaned);
      }
    }
  }

  return keywords;
};

export interface AnalysisResult {
  matchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

/**
 * Core analyzer — rule-based with smart tokenization, punctuation trimming,
 * comprehensive stop-word removal, and strict technical skill extraction.
 */
export const analyzeResume = (resumeText: string, jobDescription: string): AnalysisResult => {
  const jdKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);

  const matchedSet = new Set<string>();
  const missingSet = new Set<string>();

  for (const keyword of jdKeywords) {
    // Check direct membership or substring presence in normalized resume text
    const normalizedResume = normalizeText(resumeText);
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-z0-9_#+.-])${escaped}([^a-z0-9_#+.-]|$)`, 'i');

    if (resumeKeywords.has(keyword) || regex.test(normalizedResume)) {
      matchedSet.add(keyword);
    } else {
      missingSet.add(keyword);
    }
  }

  // Deduplicate and sort alphabetically for clean presentation
  const matched = Array.from(matchedSet).sort();
  const missing = Array.from(missingSet).sort();

  const total = matched.length + missing.length;
  const matchScore = total === 0 ? 0 : Math.round((matched.length / total) * 100);

  const suggestions = buildSuggestions(missing, matchScore);

  return {
    matchScore,
    matchedKeywords: matched,
    missingKeywords: missing,
    suggestions,
  };
};

/**
 * Generate actionable, high-impact resume improvement suggestions.
 */
const buildSuggestions = (missing: string[], score: number): string[] => {
  const suggestions: string[] = [];

  if (score < 40) {
    suggestions.push(
      'Low JD alignment detected (<40%). Consider restructuring your professional summary and project bullets to mirror key requirements of this role.'
    );
  } else if (score < 70) {
    suggestions.push(
      'Solid foundational match! Embedding the target keywords in your project impact metrics will elevate your ATS ranking.'
    );
  } else {
    suggestions.push(
      'Exceptional alignment (>70%)! Focus your resume on quantifiable achievements (e.g. latency reductions, scale managed) for maximum interview impact.'
    );
  }

  if (missing.length > 0) {
    const topMissing = missing.slice(0, 6);
    suggestions.push(`High Priority Keywords to add: ${topMissing.join(', ')}.`);
  }

  // Cloud & DevOps check
  const devopsMatches = missing.filter(k =>
    ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'terraform', 'linux'].includes(k)
  );
  if (devopsMatches.length > 0) {
    suggestions.push(
      `Cloud & DevOps gaps identified (${devopsMatches.join(', ')}). Mention your deployment pipeline or infrastructure experience.`
    );
  }

  // Testing & Quality check
  const testingMatches = missing.filter(k =>
    ['jest', 'cypress', 'playwright', 'unit testing', 'integration testing', 'tdd'].includes(k)
  );
  if (testingMatches.length > 0) {
    suggestions.push(
      `Quality engineering skills highlighted in JD (${testingMatches.join(', ')}). Include specific testing frameworks and test coverage achievements.`
    );
  }

  // System Design & Architecture check
  const archMatches = missing.filter(k =>
    ['microservices', 'system design', 'distributed systems', 'redis', 'kafka', 'scalability'].includes(k)
  );
  if (archMatches.length > 0) {
    suggestions.push(
      `Architectural concepts requested (${archMatches.join(', ')}). Frame your past projects around throughput, caching, or distributed communication.`
    );
  }

  return suggestions;
};
