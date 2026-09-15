import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Calendar,
  UserCheck,
  Wrench,
  PieChart,
  ArrowUpRight,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ZoomIn,
  Images,
} from 'lucide-react';

export default function ProjectModal({ project, onClose, isAdmin, onDelete }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Normalize image list
  const imageList = project
    ? (project.images && project.images.length > 0
        ? project.images
        : (project.thumbnail ? [project.thumbnail] : []))
    : [];

  useEffect(() => {
    setActiveImageIndex(0);
    setIsLightboxOpen(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && imageList.length > 1) {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
      } else if (e.key === 'ArrowRight' && imageList.length > 1) {
        setActiveImageIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, isLightboxOpen, imageList.length]);

  if (!project) return null;

  const handleDelete = () => {
    if (window.confirm(`'${project.title}' 프로젝트를 삭제하시겠습니까?`)) {
      onDelete(project.id);
      onClose();
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imageList.length - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < imageList.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      {/* Main Detail Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity animate-fade-in"
          onClick={onClose}
        />

        {/* Modal Dialog Container */}
        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-fade-up">
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80 shrink-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-stone-900 text-white text-xs font-semibold shadow-xs">
                {project.category}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {project.period || '2025 - 2026'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin && (
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-full hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                  title="프로젝트 삭제 (Admin)"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-stone-700">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-1.5">
                {project.title}
              </h2>
              <p className="text-stone-500 text-sm font-medium">
                {project.subtitle || project.summary}
              </p>
            </div>

            {/* Interactive Image Gallery Viewer */}
            {imageList.length > 0 ? (
              <div className="space-y-3">
                {/* Main Large Image Display */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="group relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-950 border border-stone-200/80 cursor-zoom-in shadow-inner"
                  title="클릭하여 원본 크기로 확대 (Lightbox)"
                >
                  <img
                    src={imageList[activeImageIndex]}
                    alt={`${project.title} - ${activeImageIndex + 1}`}
                    className="w-full h-full object-contain bg-stone-900/40 transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Top Right Zoom Hint Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-xl bg-stone-900/80 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity border border-white/10 shadow-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>클릭하여 확대</span>
                  </div>

                  {/* Prev / Next Arrows for Main Gallery */}
                  {imageList.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/75 hover:bg-stone-900 text-white backdrop-blur-md transition-all border border-white/10 shadow-md active:scale-95"
                        aria-label="이전 이미지"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stone-900/75 hover:bg-stone-900 text-white backdrop-blur-md transition-all border border-white/10 shadow-md active:scale-95"
                        aria-label="다음 이미지"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Image Counter Badge */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-stone-900/75 backdrop-blur-md text-white text-xs font-semibold border border-white/10 shadow-sm">
                        {activeImageIndex + 1} / {imageList.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Horizontal Thumbnail Carousel / Selection Strip */}
                {imageList.length > 1 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                    {imageList.map((img, idx) => {
                      const isActive = activeImageIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative h-16 w-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                            isActive
                              ? 'border-terracotta-600 ring-2 ring-terracotta-200 shadow-sm scale-105'
                              : 'border-stone-200 opacity-60 hover:opacity-100 hover:border-stone-400'
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Gradient Banner Fallback if no images */
              <div className={`h-48 rounded-2xl bg-gradient-to-br ${project.themeColor || 'from-stone-800 to-stone-900'} p-6 flex items-end text-white shadow-inner`}>
                <div className="text-sm font-bold opacity-90">{project.subtitle}</div>
              </div>
            )}

            {/* Metadata Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-stone-400 text-[11px] font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>제작 기간</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-900">
                  {project.period || '2025 - 2026'}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-stone-400 text-[11px] font-medium">
                  <PieChart className="w-3.5 h-3.5" />
                  <span>기여도</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-amber-800">
                  {project.contribution || '100%'}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-stone-400 text-[11px] font-medium">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>담당 역할</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-900 truncate" title={project.role}>
                  {project.role || 'UI/UX Design'}
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-stone-400 text-[11px] font-medium">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>사용 도구</span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-900 truncate" title={project.tools?.join(', ')}>
                  {project.tools?.join(', ') || 'Figma'}
                </div>
              </div>
            </div>

            {/* Project Summary / Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                프로젝트 설명
              </h4>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed bg-stone-50/50 border border-stone-100 p-4 rounded-xl whitespace-pre-line">
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

          {/* Footer External Actions */}
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between gap-3 shrink-0">
            <div className="text-[11px] text-stone-400 hidden sm:block">
              ESC 키 또는 외부 영역을 클릭하여 닫을 수 있습니다.
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-all shadow-xs"
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

      {/* Full-Screen Lightbox View */}
      {isLightboxOpen && imageList.length > 0 && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in">
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-4 left-0 right-0 px-6 flex items-center justify-between text-white z-10">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">{project.title}</span>
              <span className="text-xs text-stone-400">
                ({activeImageIndex + 1} / {imageList.length})
              </span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none"
              title="라이트박스 닫기 (ESC)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Centered High-Res Image */}
          <div className="relative max-w-6xl max-h-[85vh] w-full h-full flex items-center justify-center p-2">
            <img
              src={imageList[activeImageIndex]}
              alt={`${project.title} Full View`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
            />

            {/* Left / Right Nav in Lightbox */}
            {imageList.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all active:scale-95"
                  aria-label="이전"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all active:scale-95"
                  aria-label="다음"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnail Strip in Lightbox */}
          {imageList.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 overflow-x-auto max-w-full px-4 py-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-12 w-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-terracotta-500 scale-105 shadow-md'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
