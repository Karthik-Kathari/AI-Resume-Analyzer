// STOP WORDS — common English words that carry no keyword meaning
const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with',
  'by','from','is','are','was','were','be','been','being','have','has',
  'had','do','does','did','will','would','could','should','may','might',
  'shall','can','need','that','this','these','those','it','its','we','our',
  'they','their','you','your','he','she','his','her','i','my','me','us',
  'as','if','when','while','than','then','so','not','no','nor','yet','both',
  'either','each','all','any','both','few','more','most','other','some','such',
  'into','through','during','before','after','above','below','between','own',
  'same','too','very','just','because','until','although','though','since',
  'including','across','within','without','also','about','up','out','over',
  'under','again','further','once','here','there','where','why','how','what',
  'which','who','whom','must','only','own','than','then','take','make','use',
  'used','using','work','working','worked','strong','good','great','able',
  'well','new','high','large','small','real','full','current','multiple',
  'using','experience','years','year','knowledge','skills','skill','ability'
]);

// Keyword importance boosters (skills recruiters care about)
const TECH_KEYWORDS = new Set([
  'react','node','express','mongodb','typescript','javascript','python','java',
  'docker','kubernetes','aws','gcp','azure','redis','postgresql','mysql','sql',
  'nosql','graphql','rest','api','git','ci/cd','agile','scrum','jest','testing',
  'tailwind','css','html','next','vue','angular','flask','django','fastapi',
  'machine learning','deep learning','nlp','tensorflow','pytorch','langchain',
  'openai','gemini','llm','rag','vector','embedding','microservices','kafka',
  'rabbitmq','nginx','linux','bash','devops','terraform','ansible','prometheus',
  'grafana','figma','ui/ux','responsive','accessibility','performance','seo',
  'oauth','jwt','authentication','authorization','rbac','stripe','payment',
  'websocket','socket.io','real-time','caching','optimization','scalability',
]);

/**
 * Tokenize and clean text into meaningful keyword tokens.
 */
const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9#+./\s-]/g, ' ')     // keep tech chars like C++, C#, .NET
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 2 && !STOP_WORDS.has(w));
};

/**
 * Extract high-value keywords from job description.
 * Prioritises tech keywords + nouns with length > 3.
 */
const extractKeywords = (text: string): Set<string> => {
  const tokens = tokenize(text);
  const keywords = new Set<string>();

  // Multi-word tech phrases first
  const lower = text.toLowerCase();
  for (const tech of TECH_KEYWORDS) {
    if (lower.includes(tech)) keywords.add(tech);
  }

  // Single-word tokens that are likely skill/tool names
  for (const token of tokens) {
    if (token.length > 3 || TECH_KEYWORDS.has(token)) {
      keywords.add(token);
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
 * Core analyzer — rule-based, zero API cost.
 * Drop-in point for Gemini API: replace this function body later.
 */
export const analyzeResume = (resumeText: string, jobDescription: string): AnalysisResult => {
  const jdKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);

  const matched: string[] = [];
  const missing: string[] = [];

  for (const keyword of jdKeywords) {
    if (resumeKeywords.has(keyword)) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  }

  const total = jdKeywords.size;
  const matchScore = total === 0 ? 0 : Math.round((matched.length / total) * 100);

  const suggestions = buildSuggestions(missing, matchScore);

  return { matchScore, matchedKeywords: matched, missingKeywords: missing, suggestions };
};

/**
 * Generate human-readable suggestions based on missing keywords and score.
 */
const buildSuggestions = (missing: string[], score: number): string[] => {
  const suggestions: string[] = [];

  if (score < 40) {
    suggestions.push('Your resume has low alignment with this job. Consider tailoring it specifically for this role.');
  } else if (score < 70) {
    suggestions.push('Good foundation! Adding more specific skills from the job description will significantly improve your chances.');
  } else {
    suggestions.push('Strong match! Minor keyword additions could push you to the top of the applicant pool.');
  }

  if (missing.length > 0) {
    const topMissing = missing.slice(0, 5);
    suggestions.push(`Add these high-priority missing keywords to your resume: ${topMissing.join(', ')}.`);
  }

  if (missing.some(k => ['docker','kubernetes','ci/cd','devops'].includes(k))) {
    suggestions.push('Consider adding DevOps or containerization experience — these are explicitly listed in the job description.');
  }

  if (missing.some(k => ['typescript','javascript','python','java','node','react'].includes(k))) {
    suggestions.push('Mention specific programming languages from the job description prominently in your Skills section.');
  }

  if (missing.some(k => ['testing','jest','unit test','integration'].includes(k))) {
    suggestions.push('Include testing experience (unit/integration) — it is mentioned in the job description and often overlooked on resumes.');
  }

  return suggestions;
};
