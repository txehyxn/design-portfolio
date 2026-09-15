import React, { useEffect } from 'react';
import {
  X,
  ExternalLink,
  Calendar,
  UserCheck,
  Wrench,
  PieChart,
  ArrowUpRight,
  Trash2,
} from 'lucide-react';

export default function ProjectModal({ project, onClose, isAdmin, onDelete }) {
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleDelete = () => {
    if (window.confirm(`'${project.title}' 프로젝트를 삭제하시겠습니까?`)) {
      onDelete(project.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-fade-up">
        {/* Header Visual Banner */}
        <div className={`relative min-h-[180px] sm:min-h-[220px] bg-gradient-to-br ${project.themeColor || 'from-stone-800 to-stone-900'} p-6 sm:p-7 text-white shrink-0 overflow-hidden flex flex-col justify-between`}>
          {/* Real Thumbnail Background */}
          {project.thumbnail ? (
            <>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-stone-950/50" />
            </>
          ) : (
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
          )}

          {/* Close & Delete Button */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span className="inline-block px-2.5 py-1 rounded-md bg-stone-900/70 backdrop-blur-md text-white text-xs font-medium border border-white/10">
              {project.category}
            </span>

            <div className="flex items-center gap-2">
              {isAdmin && (
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-full bg-stone-900/70 hover:bg-red-600 text-white transition-colors border border-white/10"
                  title="프로젝트 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-stone-900/70 hover:bg-stone-800 text-white transition-colors focus:outline-none border border-white/10"
                aria-label="닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-1.5 drop-shadow-xs">
              {project.title}
            </h2>
            <p className="text-stone-200 text-xs sm:text-sm font-medium drop-shadow-xs">
              {project.subtitle || project.summary}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-stone-700">
          {/* Metadata Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-stone-400 text-[11px] font-medium">
                <Calendar className="w-3 h-3" />
                <span>제작 기간</span>
              </div>
              <div className="text-xs font-bold text-stone-900">
                {project.period || '2025 - 2026'}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-stone-400 text-[11px] font-medium">
                <PieChart className="w-3 h-3" />
                <span>기여도</span>
              </div>
              <div className="text-xs font-bold text-amber-800">
                {project.contribution || '100%'}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-stone-400 text-[11px] font-medium">
                <UserCheck className="w-3 h-3" />
                <span>담당 역할</span>
              </div>
              <div className="text-xs font-bold text-stone-900 truncate" title={project.role}>
                {project.role || 'UI/UX Design'}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-stone-400 text-[11px] font-medium">
                <Wrench className="w-3 h-3" />
                <span>사용 도구</span>
              </div>
              <div className="text-xs font-bold text-stone-900 truncate" title={project.tools?.join(', ')}>
                {project.tools?.join(', ') || 'Figma'}
              </div>
            </div>
          </div>

          {/* Project Summary / Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              프로젝트 설명
            </h4>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed bg-stone-50/50 border border-stone-100 p-4 rounded-xl">
              {project.description || project.summary}
            </p>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                키워드 태그
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-[11px] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-stone-400 hidden sm:block">
            ESC 키를 눌러 닫을 수 있습니다.
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 font-semibold text-xs transition-all"
            >
              닫기
            </button>
            {project.figmaLink && (
              <a
                href={project.figmaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Figma 프로토타입</span>
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs shadow-xs transition-all"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>결과물 확인</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
