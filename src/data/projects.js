export const categories = ['전체', '브로슈어/카탈로그', '웹 포스터/템플릿', '웹 서비스/랜딩페이지'];

export const designerProfile = {
  name: '정지원',
  englishName: 'Jiwon Jung',
  title: 'Web & VIP Travel Content Designer',
  email: 'jiwon.design.pro@gmail.com',
  location: 'Seoul, Korea',
  bio: 'VIP 여행센터의 품격을 높이는 브로슈어, 웹 포스터, 컨시어지 디지털 플랫폼을 기획 및 디자인합니다. 감성적인 비주얼과 정갈한 타이포그래피로 브랜드 가치를 전달합니다.',
  socials: {
    github: 'https://github.com',
    behance: 'https://behance.net',
    linkedin: 'https://linkedin.com',
    vercel: 'https://portfolio-jiwon.vercel.app'
  }
};

export const defaultProjects = [
  {
    id: 'vip-luxury-brochure',
    title: 'VIP 럭셔리 크루즈 & 리조트 브로슈어',
    subtitle: '프리미엄 하이엔드 고객을 위한 인쇄/디지털 럭셔리 카탈로그',
    category: '브로슈어/카탈로그',
    thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: '골드 앤 샌드 톤의 절제된 타이포그래피와 하이엔드 여백을 살린 24p 프리미엄 여행 카탈로그',
    description: 'VIP 고객의 여행 품격을 높이기 위해 고급스러운 웜베이지 & 골드 컬러 팔레트와 정갈한 타이포그래피를 적용한 브랜드 브로슈어 디자인입니다. 지류 인쇄 사양(박 가공, 특수지)과 모바일 디지털 카탈로그(PDF) 뷰어를 모두 고려하여 가독성과 심미성을 극대화했습니다.',
    period: '2025.11 - 2026.01',
    contribution: '기획 40%, 에디토리얼 디자인 100%',
    role: 'Editorial & Print Design, Typography',
    tools: ['InDesign', 'Photoshop', 'Illustrator', 'Figma'],
    themeColor: 'from-amber-800 to-stone-900',
    tags: ['VIP Brochure', 'Editorial Design', 'Luxury Catalog', 'Print & Digital'],
    figmaLink: 'https://figma.com/@jiwon_vipbrochure',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  },
  {
    id: 'swiss-alps-poster-kit',
    title: '스위스 알프스 프라이빗 투어 웹 포스터 & 템플릿',
    subtitle: 'SNS 홍보 및 온·오프라인 VIP 패키지 프로모션 그래픽 템플릿 세트',
    category: '웹 포스터/템플릿',
    thumbnail: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: '알프스 설경과 파노라마 뷰를 담아낸 감성 웹 포스터 및 인스타그램·뉴스레터 템플릿 키트',
    description: 'VIP 맞춤 프라이빗 알프스 기차 여행 및 럭셔리 샬레 상품의 독보적인 분위기를 전달하기 위해 시선을 사로잡는 대담한 비주얼과 모듈형 템플릿 시스템을 설계했습니다. 마케팅팀이 즉시 활용할 수 있도록 다양한 비율(1:1, 9:16, 4:5)의 카드뉴스 및 포스터 에셋을 제작했습니다.',
    period: '2025.08 - 2025.10',
    contribution: '비주얼 그래픽 디자인 100%',
    role: 'Visual Design, Poster & Social Kit',
    tools: ['Photoshop', 'Illustrator', 'Figma'],
    themeColor: 'from-stone-700 to-amber-900',
    tags: ['Web Poster', 'Social Template', 'Visual Branding', 'Marketing Kit'],
    figmaLink: 'https://figma.com/@jiwon_alpsposter',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  },
  {
    id: 'vip-travel-concierge-web',
    title: 'VIP 여행 컨시어지 큐레이션 웹 & 랜딩',
    subtitle: '맞춤형 프라이빗 여행 일정 설계 및 1:1 전담 컨시어지 예약 플랫폼',
    category: '웹 서비스/랜딩페이지',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    summary: '엄선된 프리미엄 여행지 큐레이션과 원스톱 전담 컨시어지 상담 신청 반응형 웹 서비스',
    description: 'VIP 고객들이 복잡한 검색 없이 취향(프라이빗 빌라, 미식 투어, 요트 투어 등)에 맞는 맞춤 여정을 추천받고 전담 여행 플래너와 즉각 소통할 수 있는 인터랙티브 웹 플랫폼입니다. 직관적인 인터페이스와 우아한 마이크로 모션으로 브랜드 신뢰도를 극대화했습니다.',
    period: '2025.04 - 2025.07',
    contribution: 'UI/UX 디자인 100%, 반응형 설계',
    role: 'UI/UX Design, Interaction, Prototyping',
    tools: ['Figma', 'Tailwind CSS', 'ProtoPie'],
    themeColor: 'from-terracotta-700 to-stone-900',
    tags: ['Concierge Web', 'VIP Travel', 'Responsive Landing', 'UI/UX'],
    figmaLink: 'https://figma.com/@jiwon_travelconcierge',
    liveLink: 'https://portfolio-jiwon.vercel.app'
  }
];
