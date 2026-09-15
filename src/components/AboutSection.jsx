import React from 'react';
import { Layers, LayoutGrid, Code2, Users2, Palette } from 'lucide-react';
import { designerProfile } from '../data/projects';

export default function AboutSection() {
  const strengths = [
    {
      icon: <Layers className="w-4 h-4 text-terracotta-700" />,
      title: '디자인 시스템 구축',
      desc: '타이포그래피, 컬러, 컴포넌트 라이브러리를 체계적으로 정의하여 확장성과 일관성을 확보합니다.',
    },
    {
      icon: <LayoutGrid className="w-4 h-4 text-amber-700" />,
      title: '사용자 중심 UI/UX',
      desc: '사용자의 탐색 흐름과 이탈 요인을 분석하여 직관적이고 군더더기 없는 인터페이스를 설계합니다.',
    },
    {
      icon: <Code2 className="w-4 h-4 text-stone-700" />,
      title: '개발 친화적 협업',
      desc: 'HTML/CSS와 반응형 그리드 구조를 고려해 개발 구현이 용이한 정밀한 오토레이아웃을 제작합니다.',
    },
    {
      icon: <Users2 className="w-4 h-4 text-stone-600" />,
      title: '명확한 커뮤니케이션',
      desc: '디자인 의도를 논리적으로 설명하고 기획자·개발자와의 원활한 소통을 통해 최선의 결과물을 도출합니다.',
    },
  ];

  const skillGroups = [
    {
      category: 'UI/UX Design',
      items: ['Design System', 'Wireframing', 'Prototyping', 'User Journey', 'Auto Layout'],
    },
    {
      category: 'Tools',
      items: ['Figma', 'Adobe CC', 'ProtoPie', 'Framer', 'FigJam'],
    },
    {
      category: 'Code & Web',
      items: ['HTML5 / CSS3', 'Tailwind CSS', 'Responsive Web', 'Git / GitHub'],
    },
  ];

  return (
    <section id="about" className="py-16 bg-[#F4EFEA]/60 border-t border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
            About & Skills
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
            기본에 충실하며 문제를 해결하는 디자인을 추구합니다
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            {designerProfile.bio}
          </p>
        </div>

        {/* Strengths 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {strengths.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-center mb-3">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-stone-900 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Skills List */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {skillGroups.map((group, idx) => (
              <div key={idx}>
                <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2.5">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 bg-stone-50 border border-stone-200/80 rounded-lg text-xs font-medium text-stone-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
