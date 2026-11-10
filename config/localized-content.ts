import type { Locale } from '@/types/locale';
import type { WorkMeta, WritingMeta } from '@/types/content';

export const profileCopy = {
  ko: {
    headline: '아이디어를 구현하다.',
    introduction:
      '고객에게 필요한 웹사이트와 업무 도구를 만듭니다. 화면과 서버 기능, 콘텐츠 관리와 배포를 연결하고, 공개 이후의 개선까지 함께합니다. AI를 업무에 적용하는 교육과 프로젝트 멘토링도 진행합니다.',
    roles: ['Developer,', 'AX Tutor/Mentor'],
    focus: [
      {
        label: 'PRODUCT DEVELOPMENT',
        title: '고객이 쓰고 관리할 수 있는 웹을 만듭니다.',
        description: '요구사항 정리부터 화면·서버 개발, 콘텐츠 관리(CMS), 배포와 유지보수까지 연결합니다.',
      },
      {
        label: 'AI IN PRACTICE',
        title: '업무에 맞는 AI 활용을 설계합니다.',
        description: '반복 업무와 정보 탐색의 흐름을 살펴보고, AI를 적용할 지점과 검증할 프로토타입을 정리합니다.',
      },
      {
        label: 'MENTORING & TUTORING',
        title: '실습과 프로젝트의 막힘을 짚습니다.',
        description: '기업교육·PBL·해커톤에서 보조강사와 멘토로 참여해 구현 문제를 점검하고 배포·시연을 지도합니다.',
      },
    ],
    activities: [
      { type: '문제 정의', role: 'What should we build?', description: '실무의 고민을 사용자와 상황이 분명한 하나의 문제로 좁힙니다.' },
      { type: '제품 구조', role: 'How should it work?', description: '핵심 사용자 흐름과 화면, 기능 우선순위, 데이터 관계를 함께 설계합니다.' },
      { type: '구현과 배포', role: 'How can we ship it?', description: '팀의 경험과 기간에 맞는 기술, 구현 순서, 배포와 시연 방법을 정리합니다.' },
    ],
  },
  en: {
    headline: 'Ideas, implemented.',
    introduction:
      'I build websites and tools around what clients need. I connect the interface, backend, content management, and deployment, then help improve the product after launch. I also teach teams to apply AI to their work and mentor project implementation.',
    roles: ['Developer,', 'AX Tutor/Mentor'],
    focus: [
      {
        label: 'PRODUCT DEVELOPMENT',
        title: 'Build a website the client can use and manage.',
        description: 'I connect requirements, frontend and backend development, a content management system (CMS), deployment, and ongoing maintenance.',
      },
      {
        label: 'AI IN PRACTICE',
        title: 'Plan AI use around the actual workflow.',
        description: 'I review repetitive tasks and information workflows to identify where AI fits and what a prototype should validate.',
      },
      {
        label: 'MENTORING & TUTORING',
        title: 'Work through practical project blockers.',
        description: 'As a teaching assistant and mentor in corporate training, PBL, and hackathons, I guide implementation, deployment, and demos.',
      },
    ],
    activities: [
      { type: 'PROBLEM', role: 'What should we build?', description: 'Turn a broad workplace issue into one clear problem, user, and situation.' },
      { type: 'PRODUCT', role: 'How should it work?', description: 'Map the core journey, screens, feature priorities, and data relationships.' },
      { type: 'DELIVERY', role: 'How can we ship it?', description: 'Choose a realistic stack, build order, deployment path, and demo plan.' },
    ],
  },
} as const;

const workEnglish: Record<string, { title?: string; summary: string; role: string; sections: Array<{ title: string; paragraphs?: string[]; items?: string[] }> }> = {
  ggomggom: {
    title: 'Ggomggom',
    summary: 'A service website connecting clear-out and waste-disposal information with quote requests and staff notifications.',
    role: 'Planning · Design · Full-stack · Deployment (solo)',
    sections: [
      {
        title: 'From service information to a consultation',
        paragraphs: ['Ggomggom connects an estate clear-out and waste-disposal business with people requesting a quote. Visitors can review estimated costs and before-and-after examples, then leave their site details and contact information. The business receives the request by email to prepare for the next consultation.'],
      },
      {
        title: 'A request flow that reaches the business',
        paragraphs: ['The form separates service type and volume, site conditions and address, and scheduling and contact details into three steps. Address search and validation messages guide each step. The server checks the input and Turnstile token before sending the request through Resend. If sending fails, the interface offers a retry and phone or Kakao consultation. Site photos are sent through the Kakao channel after submission rather than uploaded in the form.'],
      },
      {
        title: 'Adapt the interface to the customer',
        paragraphs: ['Before-and-after examples changed from a draggable comparison to fixed side-by-side images so visitors can compare the work without operating a control. On mobile, visitors can swipe through the examples. The form supports an undecided date, formats contact numbers, and locks input during submission to reduce repeated interaction. Address search and security scripts load when the relevant step needs them.'],
      },
      {
        title: 'Improve the site after launch',
        paragraphs: ['Conversion tracking distinguishes a contact-button click from a successful request. The completion page consumes a submission-success flag once before calling the conversion event. After launch, client feedback informed CTA and mobile layout changes, Safari date input fixes, search metadata, structured data, favicon updates, and email recipient settings. Images were converted to WebP and resized for display before deployment.'],
      },
      {
        title: 'Scope and collaboration',
        paragraphs: ['I handled planning, UI/UX design, frontend development, the submission API, email integration, and deployment in a solo, two-week build. I organized the service information and site materials supplied by the business into pages and form fields, incorporated review feedback, and launched the site. Receipt of the basic request email was confirmed. Improvements after the initial build continued as separate maintenance work.'],
      },
    ],
  },
  'instructor-profile-cms': {
    title: 'Instructor Profile + CMS',
    summary: 'A profile website and CMS for editing teaching, research, and activity records, then previewing and publishing them.',
    role: 'Full-stack Development · CMS',
    sections: [
      {
        title: 'Give the client a way to maintain their profile',
        paragraphs: ['I built a public profile and an administrator CMS so the client can update their own profile and activity records. The CMS manages introduction text, photos, Research, Publication, Awards, and News, along with menu labels and section titles. Administrators can add academic profile links and activities, reorder entries, and choose what to show.'],
      },
      {
        title: 'Review a draft before publishing',
        paragraphs: ['Draft saving and publishing are separate so unfinished edits do not appear to visitors. Administrators save a draft, preview it in the public layout, and then publish. The CMS warns before leaving with unsaved changes and detects a newer save in another window to prevent overwriting it. The published version remains separate, and republishing unchanged content does not create an unnecessary history entry.'],
      },
      {
        title: 'Manage text and images together',
        paragraphs: ['React powers the administrator interface, while Hono renders the public profile. HTML generated at publication is stored in Cloudflare D1 and served to visitors. Profile and News images are kept in private R2 storage; only images included in the current published version are public. Before upload, images are resized and converted to WebP. Replacing a photo does not remove the image from the existing published version. Administrator authentication and protected preview access are part of the same editing flow.'],
      },
      {
        title: 'Turn client feedback into editing controls',
        paragraphs: ['Requests about photos and captions became image, date, title, and description fields for each News card. Home supports adding email and academic profile links. Long Research and Publication lists initially show three entries, with a control to expand the rest and a collapse button at the end. News cards grow with caption length, align their heights within each desktop row, and use a single column on mobile.'],
      },
      {
        title: 'Verification and public demo',
        paragraphs: ['The recorded checks passed lint, type checking, the build, 43 unit tests, and three desktop and mobile browser tests. Saving, previewing, publishing, image display, and layouts at 1440px and 390px were checked before deployment. The public link and screenshots use sample content to demonstrate the CMS. The displayed person’s career is not an outcome of this project.'],
      },
    ],
  },
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
  return translation ? { ...metadata, title: translation.title ?? metadata.title, summary: translation.summary, role: translation.role } : metadata;
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
