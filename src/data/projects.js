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
    id: 'ordinary-house',
    title: '오디너리 하우스 (Ordinary House)',
    subtitle: '라이프스타일 리빙 브랜드 쇼핑몰 리뉴얼',
    category: '웹 서비스',
    thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: '여백과 따뜻한 텍스처를 살린 라이프스타일 리빙 브랜드 쇼핑몰 리뉴얼',
    description: '브랜드 감성을 극대화하기 위해 크림/샌드 톤 베이스 그리드를 구축하고, 복잡했던 주문 결제 플로우를 간소화하여 구매 전환 경험을 개선한 반응형 웹 디자인 프로젝트입니다.',
    period: '2025.10 - 2026.01',
    contribution: 'UI/UX 디자인 100%',
    role: 'UI/UX Design',
    tools: ['Figma', 'Photoshop'],
    themeColor: 'from-stone-800 to-stone-900',
    tags: ['E-Commerce', 'Living Brand', 'Responsive Web'],
    figmaLink: 'https://figma.com/@jiwon_ordinary',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  },
  {
    id: 'stay-forest',
    title: '스테이 포레스트 (Stay Forest)',
    subtitle: '자연 속 프라이빗 감성 스테이 예약 플랫폼',
    category: '랜딩페이지',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: '자연 속 프라이빗 감성 스테이를 소개하는 몰입형 예약 랜딩페이지',
    description: '공간의 채광과 분위기를 시각적으로 전달할 수 있도록 와이드 비주얼 레이아웃과 감성적인 타이포그래피를 적용했습니다. 스크롤 인터랙션을 고려해 설계되었습니다.',
    period: '2025.07 - 2025.09',
    contribution: '기여도: 기획 50%, UI 디자인 100%',
    role: 'Concept & UI Design',
    tools: ['Figma', 'Illustrator'],
    themeColor: 'from-amber-800 to-stone-900',
    tags: ['Stay Landing', 'Visual Storytelling', 'Booking UI'],
    figmaLink: 'https://figma.com/@jiwon_stayforest',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  },
  {
    id: 'mind-routine',
    title: '마인드루틴 (Mind Routine)',
    subtitle: '마음 챙김과 데일리 습관 형성 모바일 앱',
    category: '모바일 UI',
    thumbnail: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: '시각적 피로도를 덜어주는 데일리 습관 형성 및 기록 모바일 앱',
    description: '사용자가 매일 편안하게 기록할 수 있도록 카드형 인터페이스와 직관적인 인터랙션을 디자인했으며 일관된 컴포넌트 시스템을 구축했습니다.',
    period: '2025.03 - 2025.06',
    contribution: 'UI 디자인 100%',
    role: 'Mobile UI Design',
    tools: ['Figma'],
    themeColor: 'from-terracotta-700 to-stone-900',
    tags: ['Mobile App', 'Habit Routine', 'Component System'],
    figmaLink: 'https://figma.com/@jiwon_mindroutine',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  }
];
