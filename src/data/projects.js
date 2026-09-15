export const categories = ['전체', '웹 서비스', '랜딩페이지', '모바일 UI'];

export const designerProfile = {
  name: '정지원',
  englishName: 'Jiwon Jung',
  title: 'Web & UI/UX Designer',
  email: 'jiwon.design.pro@gmail.com',
  location: 'Seoul, Korea',
  bio: '사용자의 행동을 관찰하고 명확한 구조를 설계합니다. 불필요한 장식을 덜어내고 본질에 집중하는 웹 & UI/UX 디자이너 정지원입니다.',
  socials: {
    github: 'https://github.com',
    behance: 'https://behance.net',
    linkedin: 'https://linkedin.com',
    vercel: 'https://portfolio-jiwon.vercel.app'
  }
};

export const defaultProjects = [
  {
    id: 'cloudflow-saas',
    title: 'CloudFlow SaaS 대시보드',
    subtitle: '클라우드 인프라 모니터링 & 비용 분석 B2B 웹 플랫폼',
    category: '웹 서비스',
    summary: '복잡한 인프라 메트릭과 비용 데이터를 직관적으로 파악할 수 있는 모듈형 위젯 대시보드를 설계했습니다.',
    description: '서버 리소스 사용 현황과 실시간 트래픽, 비용 이상 징후를 명확하게 시각화한 엔터프라이즈 B2B 대시보드입니다. 일관된 디자인 시스템과 재사용 가능한 컴포넌트 세트를 구축하여 개발 생산성을 높였습니다.',
    period: '2025.09 - 2025.12',
    contribution: '기여도 90% (UI/UX 리드)',
    role: 'UI/UX Design, Design System',
    tools: ['Figma', 'Tailwind CSS', 'ProtoPie'],
    themeColor: 'from-stone-800 to-stone-900',
    tags: ['B2B SaaS', 'Design System', 'Dashboard'],
    figmaLink: 'https://figma.com/@jiwon_cloudflow',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  },
  {
    id: 'learnwave-lms',
    title: 'LearnWave 에듀테크 플랫폼',
    subtitle: '인터랙티브 온라인 강의 수강 및 학습 관리 웹 서비스',
    category: '웹 서비스',
    summary: '학습 집중도를 높이는 2분할 강의 플레이어와 직관적인 학습 진도 관리 UI를 디자인했습니다.',
    description: '온라인 환경에서 학습 몰입도를 극대화하기 위해 영상 시청과 실시간 필기/질의응답을 결합한 레이아웃을 구축했습니다. 반응형 웹 브레이크포인트를 꼼꼼히 설계하여 태블릿과 모바일에서도 일관된 경험을 제공합니다.',
    period: '2025.05 - 2025.08',
    contribution: '기여도 85% (UI 디자인)',
    role: 'User Research, UI Design',
    tools: ['Figma', 'Framer'],
    themeColor: 'from-amber-800 to-stone-900',
    tags: ['Edutech', 'Video Player', 'LMS'],
    figmaLink: 'https://figma.com/@jiwon_learnwave',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  },
  {
    id: 'nexus-ai-landing',
    title: 'Nexus AI 기업 솔루션 랜딩',
    subtitle: '엔터프라이즈 생성형 AI 솔루션 론칭 랜딩페이지',
    category: '랜딩페이지',
    summary: '신뢰감을 주는 타이포그래피와 인터랙티브 ROI 계산기로 상담 전환율을 최적화했습니다.',
    description: 'B2B 고객에게 AI 도입 효과를 명확하게 전달하기 위해 인터랙티브 스크롤 스토리텔링과 비용 절감 계산기를 설계했습니다. 따뜻하고 세련된 톤앤매너로 기업의 신뢰도를 전달합니다.',
    period: '2025.03 - 2025.04',
    contribution: '기여도 100% (기획 & 디자인)',
    role: 'Visual UI Design, Storytelling',
    tools: ['Figma', 'Tailwind CSS'],
    themeColor: 'from-terracotta-700 to-stone-900',
    tags: ['Landing Page', 'B2B Tech', 'Conversion'],
    figmaLink: 'https://figma.com/@jiwon_nexusai',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  },
  {
    id: 'habitpulse-app',
    title: 'HabitPulse 루틴 관리 앱',
    subtitle: '일상 속 작은 습관 형성을 돕는 모바일 UI/UX',
    category: '모바일 UI',
    summary: '한 손 조작 반경에 최적화된 바텀 인터랙션과 제스처 기반 완료 애니메이션을 구현했습니다.',
    description: '바쁜 일상에서 간편하게 루틴을 기록하고 성취감을 느낄 수 있도록 돕는 모바일 전용 앱입니다. 미니멀한 인터페이스와 햅틱 감성의 시각 피드백으로 지속적인 사용을 유도합니다.',
    period: '2024.11 - 2025.02',
    contribution: '기여도 100% (모바일 UI/UX)',
    role: 'Mobile UI/UX, User Flow',
    tools: ['Figma', 'ProtoPie'],
    themeColor: 'from-stone-700 to-stone-800',
    tags: ['Mobile App', 'iOS & Android', 'Habit Tracker'],
    figmaLink: 'https://figma.com/@jiwon_habitpulse',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  },
  {
    id: 'aura-smart-ring',
    title: 'Aura 스마트 링 프로모션',
    subtitle: '웨어러블 헬스케어 디바이스 글로벌 사전예약 쇼케이스',
    category: '랜딩페이지',
    summary: '제품의 미려한 텍스처와 주요 센서 기술을 극대화하는 감각적인 360도 뷰어 레이아웃을 디자인했습니다.',
    description: '초경량 티타늄 웰니스 디바이스의 특징을 직관적으로 전달하기 위해 여백의 미와 섬세한 라이팅 효과를 결합했습니다. 글로벌 고객을 위한 다국어 그리드를 선제적으로 반영했습니다.',
    period: '2024.08 - 2024.10',
    contribution: '기여도 90% (반응형 디자인)',
    role: 'Visual UI Design, Prototyping',
    tools: ['Figma', 'Photoshop'],
    themeColor: 'from-amber-700 to-stone-800',
    tags: ['Product Showcase', 'Branding', 'E-Commerce'],
    figmaLink: 'https://figma.com/@jiwon_auraring',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  },
  {
    id: 'wandertrip-app',
    title: 'WanderTrip 여행 플래너 앱',
    subtitle: '맞춤형 동선 최적화 & 동행 공유 모바일 플랫폼',
    category: '모바일 UI',
    summary: '지도 중심의 타임라인 핀과 카드형 스와이프 탐색으로 여행 계획의 번거로움을 줄였습니다.',
    description: '동행자와 지도 위에서 실시간으로 일정을 조율할 수 있는 협업형 여행 앱입니다. 복잡한 여행 일정표를 시간대별 경로와 지도로 동기화하여 직관적인 정보 탐색을 제공합니다.',
    period: '2024.04 - 2024.07',
    contribution: '기여도 95% (전체 UX/UI)',
    role: 'Mobile UI/UX, Map Interaction',
    tools: ['Figma', 'ProtoPie'],
    themeColor: 'from-stone-800 to-terracotta-800',
    tags: ['Travel UI', 'Map Interface', 'Mobile App'],
    figmaLink: 'https://figma.com/@jiwon_wandertrip',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  }
];
