import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { designerProfile } from '../data/projects';

export default function Hero() {
  return (
    <section id="hero" className="pt-28 pb-12 sm:pt-36 sm:pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        {/* Minimal Role Label */}
        <div className="text-xs font-bold tracking-wider uppercase text-amber-700 mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
          <span>Web & UI/UX Designer Portfolio</span>
        </div>

        {/* Clean Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.2] mb-4">
          정지원 <span className="text-stone-400 font-normal text-2xl sm:text-3xl">/ Jiwon Jung</span>
        </h1>

        <p className="text-lg sm:text-xl font-medium text-stone-800 leading-relaxed mb-3">
          본질에 집중한 간결하고 명확한 디지털 프로덕트를 만듭니다.
        </p>

        {/* Focused Minimal Description */}
        <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-2xl mb-8">
          복잡한 사용자 문제를 단순하고 정제된 시각 언어로 구조화합니다. 
          Figma 기반의 체계적인 디자인 시스템과 웹 표준 및 퍼블리싱 구조를 고려한 UI 설계를 지향합니다.
        </p>

        {/* Direct Scroll Action */}
        <div className="flex items-center gap-4">
          <a
            href="#works"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-900 hover:text-terracotta-600 group transition-colors"
          >
            <span>작업물 둘러보기</span>
            <ArrowDown className="w-4 h-4 text-stone-400 group-hover:translate-y-0.5 group-hover:text-terracotta-600 transition-all" />
          </a>
        </div>
      </div>
    </section>
  );
}
