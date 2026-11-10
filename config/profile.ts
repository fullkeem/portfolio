export const profile = {
  name: '김충만',
  brandName: 'Fullkeem',
  email: process.env.NEXT_PUBLIC_EMAIL || 'cm7307@kakao.com',
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/fullkeem',
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    'https://www.linkedin.com/in/%EC%B6%A9%EB%A7%8C-%EA%B9%80-11b378305/',
  capabilities: [
    'AI-assisted workflow design',
    'Rapid prototyping',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Product UI',
    'PBL mentoring',
  ],
} as const;

export function buildMailto(type: 'career' | 'project' | 'education', locale: 'ko' | 'en' = 'ko') {
  const subjects = locale === 'ko'
    ? {
        career: '[채용/협업 문의] Fullkeem에게 연락드립니다',
        project: '[프로젝트 문의] 웹·AX 프로젝트 상담',
        education: '[교육/멘토링 문의] 기업교육 및 프로그램 협업',
      }
    : {
        career: '[Opportunity] Collaboration with Fullkeem',
        project: '[Project inquiry] Web or AX project',
        education: '[Mentoring inquiry] Training, PBL, or hackathon program',
      };
  const bodies = locale === 'ko'
    ? {
        career: '안녕하세요.\n\n소속과 제안 내용을 남겨주세요.\n',
        project: '안녕하세요.\n\n프로젝트 목적, 예상 일정, 필요한 범위를 남겨주세요.\n',
        education: '안녕하세요.\n\n프로그램명, 대상, 일정, 요청 역할을 남겨주세요.\n',
      }
    : {
        career: 'Hello,\n\nPlease share your organization and the opportunity.\n',
        project: 'Hello,\n\nPlease share the project goal, expected timeline, and scope.\n',
        education: 'Hello,\n\nPlease share the program, audience, schedule, and requested role.\n',
      };

  return `mailto:${profile.email}?subject=${encodeURIComponent(subjects[type])}&body=${encodeURIComponent(bodies[type])}`;
}
