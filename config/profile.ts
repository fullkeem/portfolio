export const profile = {
  name: '김충만',
  brandName: 'Fullkeem',
  headline: '기술을 만들고, 이해시키고, 함께 완성합니다.',
  introduction:
    'AX 개발과 프론트엔드 구현을 바탕으로 제품을 만들고, 기업교육 현장과 PBL·해커톤에서 학습자의 실행을 돕습니다.',
  roles: ['AX Developer', 'Frontend Developer', 'Educator & Mentor'],
  email: process.env.NEXT_PUBLIC_EMAIL || 'cm7307@kakao.com',
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/fullkeem',
  linkedin:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    'https://www.linkedin.com/in/%EC%B6%A9%EB%A7%8C-%EA%B9%80-11b378305/',
  focus: [
    {
      index: '01',
      label: 'AX DEVELOPMENT',
      title: '업무의 맥락을 읽고 AI가 실제로 쓰이는 흐름을 설계합니다.',
      description:
        '기술 시연에 머무르지 않고 반복 업무, 정보 탐색, 콘텐츠 생산 같은 구체적인 문제를 실행 가능한 도구와 프로토타입으로 바꿉니다.',
    },
    {
      index: '02',
      label: 'FRONTEND & CLIENT WORK',
      title: '아이디어를 빠르고 선명한 웹 경험으로 구현합니다.',
      description:
        'React와 Next.js를 중심으로 서비스, 웹앱, 랜딩페이지를 만들며 작은 화면에서도 핵심 메시지와 행동이 분명한 경험을 지향합니다.',
    },
    {
      index: '03',
      label: 'EDUCATION & MENTORING',
      title: '정답을 전달하기보다 스스로 완성할 수 있도록 돕습니다.',
      description:
        '기업교육 보조강사, PBL 및 해커톤 멘토로 참여해 문제 정의부터 구현과 발표까지 학습자의 다음 행동을 구체화합니다.',
    },
  ],
  activities: [
    {
      type: '기업교육',
      role: '보조강사',
      description: '실습 흐름을 점검하고 학습자의 막힘을 빠르게 발견해 수업의 완주를 지원합니다.',
    },
    {
      type: 'PBL',
      role: '프로젝트 멘토',
      description: '모호한 아이디어를 문제 정의, 사용자 흐름, 구현 우선순위로 구체화합니다.',
    },
    {
      type: '해커톤',
      role: '기술·제품 멘토',
      description: '제한된 시간 안에 팀이 핵심 가설을 검증하고 발표 가능한 결과를 만들도록 돕습니다.',
    },
  ],
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
