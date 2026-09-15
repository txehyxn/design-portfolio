import React from 'react';
import { ArrowUpRight, Trash2, Smartphone, Layout, Monitor, Images } from 'lucide-react';

export default function ProjectCard({ project, onClick, isAdmin, onDelete }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case '모바일 UI':
        return <Smartphone className="w-3 h-3" />;
      case '랜딩페이지':
        return <Layout className="w-3 h-3" />;
      default:
        return <Monitor className="w-3 h-3" />;
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`'${project.title}' 프로젝트를 삭제하시겠습니까?`)) {
      onDelete(project.id);
    }
  };

  const coverImage = project.thumbnail || (project.images && project.images[0]);
  const imageCount = project.images ? project.images.length : (project.thumbnail ? 1 : 0);

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl border border-stone-200/90 hover:border-stone-400 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1"
    >
      {/* Full Cover Thumbnail Header */}
      <div className={`relative h-52 sm:h-56 bg-gradient-to-br ${project.themeColor || 'from-stone-800 to-stone-900'} p-4 flex flex-col justify-between overflow-hidden`}>
        {/* Representative Thumbnail Image */}
        {coverImage ? (
          <>
            <img
              src={coverImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            {/* Elegant dark-warm gradient overlay for badge and text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-stone-950/40" />
          </>
        ) : (
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
        )}

        {/* Top Badges & Admin Delete */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-900/75 backdrop-blur-md text-white text-[11px] font-medium border border-white/10 shadow-xs">
            {getCategoryIcon(project.category)}
            {project.category}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Multi-image Count Indicator */}
            {imageCount > 1 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900/70 backdrop-blur-md text-white text-[10px] font-semibold border border-white/10">
                <Images className="w-3 h-3" />
                <span>{imageCount}</span>
              </span>
            )}

            {/* Admin Delete Action */}
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="p-1.5 rounded-lg bg-stone-900/80 hover:bg-red-600 text-white transition-colors border border-white/10"
                title="프로젝트 삭제 (Admin)"
                aria-label="Delete project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail Title Graphic Preview */}
        <div className="relative z-10 mt-auto">
          <div className="text-stone-300 text-[11px] font-medium tracking-wide">
            {project.period || '2025 - 2026'}
          </div>
          <div className="text-white text-sm font-bold truncate drop-shadow-sm">
            {project.subtitle || project.title}
          </div>
        </div>
      </div>

      {/* Card Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & View Icon */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <div className="text-stone-400 group-hover:text-stone-800 transition-colors shrink-0 pt-0.5">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* One line summary */}
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
            {project.summary}
          </p>

          {/* Tools & Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tools?.map((tool, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer: Contribution */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <span className="text-[11px] font-medium text-stone-600">
            {project.role || 'UI/UX Design'}
          </span>
          <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px] border border-amber-200/60">
            {project.contribution || '기여도 100%'}
          </span>
        </div>
      </div>
    </div>
  );
}
