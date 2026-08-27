import type { Locale } from '@/types/locale';
import type { WorkMeta, WritingMeta } from '@/types/content';

export const profileCopy = {
  ko: {
    headline: '기술을 만들고, 이해시키고, 함께 완성합니다.',
    introduction:
      '프론트엔드와 AX 구현 경험을 바탕으로 제품을 만들고, 기업교육·PBL·해커톤 현장에서 팀이 아이디어를 배포 가능한 프로젝트로 완성하도록 돕습니다.',
    roles: ['Freelance Frontend Developer', 'Project Execution Mentor', 'AX · PBL · Hackathon Tutor'],
    focus: [
      {
        label: 'FREELANCE DEVELOPMENT',
        title: '아이디어를 빠르고 선명한 웹 경험으로 구현합니다.',
        description: 'React와 Next.js를 중심으로 서비스, 웹앱, 랜딩페이지를 기획 의도부터 배포까지 연결합니다.',
      },
      {
        label: 'PROJECT EXECUTION',
        title: '막연한 고민을 구현 가능한 프로젝트로 구체화합니다.',
        description: '문제와 사용자를 정의하고 핵심 흐름, 기능 범위, 데이터 관계와 개발 순서를 함께 결정합니다.',
      },
      {
        label: 'MENTORING & TUTORING',
        title: '대신 만들기보다 스스로 끝까지 만들 수 있게 돕습니다.',
        description: '기업교육, PBL, 해커톤에서 팀의 막힘을 발견하고 현실적인 다음 행동과 배포 방법을 제안합니다.',
      },
    ],
    activities: [
      { type: '문제 정의', role: 'What should we build?', description: '실무의 고민을 사용자와 상황이 분명한 하나의 문제로 좁힙니다.' },
      { type: '제품 구조', role: 'How should it work?', description: '핵심 사용자 흐름과 화면, 기능 우선순위, 데이터 관계를 함께 설계합니다.' },
      { type: '구현과 배포', role: 'How can we ship it?', description: '팀의 경험과 기간에 맞는 기술, 구현 순서, 배포와 시연 방법을 정리합니다.' },
    ],
  },
  en: {
    headline: 'I build digital products—and help teams ship theirs.',
    introduction:
      'I’m a freelance frontend developer based in Seoul. I also mentor teams in corporate training, project-based learning, and hackathons—turning real workplace problems into working projects they can deploy and demonstrate.',
    roles: ['Freelance Frontend Developer', 'Project Execution Mentor', 'AI · PBL · Hackathon Tutor'],
    focus: [
      {
        label: 'FREELANCE DEVELOPMENT',
        title: 'From a rough brief to a deployed web experience.',
        description: 'I use React and Next.js to connect product intent, interface decisions, implementation, and deployment.',
      },
      {
        label: 'PROJECT EXECUTION',
        title: 'Turn an ambiguous workplace problem into a buildable plan.',
        description: 'Together, we define the user, core flow, scope, data relationships, and a realistic build order.',
      },
      {
        label: 'MENTORING & TUTORING',
        title: 'Unblock the team without taking over the keyboard.',
        description: 'In corporate training, project-based learning, and hackathons, I turn technical and product questions into clear next actions.',
      },
    ],
    activities: [
      { type: 'PROBLEM', role: 'What should we build?', description: 'Turn a broad workplace issue into one clear problem, user, and situation.' },
      { type: 'PRODUCT', role: 'How should it work?', description: 'Map the core journey, screens, feature priorities, and data relationships.' },
      { type: 'DELIVERY', role: 'How can we ship it?', description: 'Choose a realistic stack, build order, deployment path, and demo plan.' },
    ],
  },
} as const;

const workEnglish: Record<string, { summary: string; role: string; sections: Array<{ title: string; paragraphs?: string[]; items?: string[] }> }> = {
  magplus: {
    summary: 'An editorial web magazine designed to help readers discover new places, experiences, and tastes.',
    role: 'Frontend Development',
    sections: [
      { title: 'Keep the story in focus', paragraphs: ['MagPlus turns a plain place directory into an editorial discovery experience. The interface gives each story a distinct visual identity while keeping the next article or place easy to reach.'] },
      { title: 'What I focused on', items: ['A content hierarchy led by imagery and headlines', 'Consistent movement between lists, stories, and discovery', 'Responsive typography and spacing across screen sizes', 'Maintainable components and state as content grows'] },
      { title: 'What this project demonstrates', paragraphs: ['Visual character and usability are not separate concerns. The frontend can protect a publication’s identity while keeping reading and exploration straightforward.'] },
    ],
  },
  shoong: {
    summary: 'A platform that brings photocard trading and birthday-cafe discovery into one fan-community experience.',
    role: 'Frontend Development',
    sections: [
      { title: 'Connect two fan activities in one flow', paragraphs: ['Shoong! brings photocard trading and birthday-cafe discovery into one web experience. The goal was to make both finding information and connecting with a trading partner easier to understand.'] },
      { title: 'What I focused on', items: ['Responsive exploration on small screens', 'Clear hierarchy across trading and venue content', 'Cards and detail views that reveal the next action', 'Predictable state management for complex screens'] },
      { title: 'What this project demonstrates', paragraphs: ['For products connected to identity and emotion, preserving context matters more than adding more features.'] },
    ],
  },
  seoullette: {
    summary: 'A playful web roulette for choosing a meetup area in Seoul.',
    role: 'Product UI · Frontend',
    sections: [
      { title: 'Turn decision fatigue into play', paragraphs: ['Seoullette turns the repeated task of choosing a meetup area into a familiar roulette interaction. The experience is designed to work without instructions.'] },
      { title: 'What I focused on', items: ['A simple input-to-result flow', 'Motion that makes waiting part of the experience', 'Touch-friendly controls and feedback', 'A lightweight structure that is easy to share and reuse'] },
      { title: 'What this project demonstrates', paragraphs: ['Good interaction is not decoration. It reduces hesitation and helps users make the next decision.'] },
    ],
  },
  'at-the-place': {
    summary: 'A recommendation service that matches people with cafés based on their preferences.',
    role: 'Frontend Development',
    sections: [
      { title: 'Ask about taste before showing results', paragraphs: ['At the Place first learns what a person likes, then recommends matching cafés. The questions and recommendation result form one continuous experience.'] },
      { title: 'Core experience', items: ['Step-by-step preference questions', 'Recommendation results with an understandable information hierarchy', 'Predictable UI states separated from data requests'] },
    ],
  },
  'seojae-check': {
    summary: 'A personal reading service for finding books and organizing a private library.',
    role: 'Frontend Development',
    sections: [
      { title: 'From finding books to building a library', paragraphs: ['Seojae-check extends book search into a personal collection. Search results, saved states, and the private library are connected in one clear flow.'] },
      { title: 'Core experience', items: ['Cards that make search results easy to compare', 'Immediate feedback for saved states', 'A calm library view for continuously growing personal data'] },
    ],
  },
};

export function localizeWorkMeta(metadata: WorkMeta, locale: Locale): WorkMeta {
  if (locale === 'ko') return metadata;
  const translation = workEnglish[metadata.slug];
  return translation ? { ...metadata, summary: translation.summary, role: translation.role } : metadata;
}

export function getEnglishWorkSections(slug: string) {
  return workEnglish[slug]?.sections ?? [];
}

export const writingEnglish: Record<string, { metadata: WritingMeta; sections: Array<{ title: string; paragraphs?: string[]; items?: string[]; quote?: string }> }> = {
  'seo-aeo-geo': {
    metadata: {
      slug: 'seo-aeo-geo',
      title: 'SEO, AEO, and GEO Explained',
      summary: 'Even in the age of AI search, the fundamentals remain the same: create a useful answer and structure it so people and machines can trust it.',
      category: 'Web & AI',
      publishedAt: '2025-07-16',
      tags: ['SEO', 'AEO', 'GEO', 'Web Development'],
      draft: false,
    },
    sections: [
      { title: 'Search results are changing from links into answers', paragraphs: ['People no longer see only a list of links. Search engines and generative AI systems read multiple sources and compose an answer first. A website now needs to be both a useful document and a source that machines can understand and cite.'] },
      { title: 'SEO, AEO, and GEO are not replacements for one another', paragraphs: ['SEO helps search engines discover and understand a page. AEO structures content so it can answer a clear question. GEO considers whether generative systems can understand and use the content as reliable evidence.', 'They are different views of the same foundation: fast pages, clear structure, direct answers, and claims supported by evidence.'] },
      { title: 'A practical checklist for developers', items: ['Choose one clear search intent for each page.', 'Answer the main question in the title and opening paragraph.', 'Use headings and lists so people and machines can scan the structure.', 'Show authorship, update dates, sources, and real experience.', 'Treat Core Web Vitals and mobile usability as baseline quality.'], quote: 'Optimization is not about tricking an algorithm. It is about making a good answer discoverable, understandable, and trustworthy.' },
      { title: 'The same principle applies to a portfolio', paragraphs: ['A visitor asks what you can do, how you work, and why they should trust you. Concrete roles, outcomes, and decisions should answer those questions before decorative introductions do.'] },
    ],
  },
};
