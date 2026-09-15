import React, { useState, useRef } from 'react';
import {
  X,
  Plus,
  FolderPlus,
  Palette,
  Upload,
  Image as ImageIcon,
  Check,
  Trash2,
  Star,
  Link as LinkIcon,
  Loader2,
} from 'lucide-react';
import { compressImageFile } from '../utils/imageCompressor';

const THEME_PRESETS = [
  { label: '테라코타 (Terracotta)', value: 'from-terracotta-700 to-stone-900' },
  { label: '웜 앰버 (Warm Amber)', value: 'from-amber-800 to-stone-900' },
  { label: '다크 차콜 (Dark Charcoal)', value: 'from-stone-800 to-stone-950' },
  { label: '브론즈 어스 (Deep Bronze)', value: 'from-stone-700 to-amber-900' },
  { label: '클레이 웜 (Clay Warm)', value: 'from-stone-800 to-terracotta-800' },
];

export default function NewProjectModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('브로슈어/카탈로그');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [contribution, setContribution] = useState('기여도 100%');
  const [tools, setTools] = useState('Figma, Tailwind CSS');
  const [period, setPeriod] = useState(new Date().toISOString().slice(0, 7).replace('-', '.'));
  const [themeColor, setThemeColor] = useState(THEME_PRESETS[0].value);
  const [figmaLink, setFigmaLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [tags, setTags] = useState('UI/UX, Responsive');

  // Multi-image state
  const [images, setImages] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle local file uploads with auto-compression
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsCompressing(true);
    try {
      const compressedList = await Promise.all(
        files.map((file) => compressImageFile(file, 1200, 0.82))
      );
      setImages((prev) => [...prev, ...compressedList]);
    } catch (err) {
      console.error('Image compression failed', err);
      alert('이미지 처리 중 오류가 발생했습니다.');
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Handle adding image via direct URL
  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setImages((prev) => [...prev, urlInput.trim()]);
    setUrlInput('');
  };

  // Remove individual image
  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => {
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      if (coverIndex >= updated.length) {
        setCoverIndex(Math.max(0, updated.length - 1));
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      alert('프로젝트 제목과 요약 설명은 필수입니다.');
      return;
    }

    const selectedCover = images.length > 0 ? images[coverIndex] || images[0] : '';

    const newProject = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || title.trim(),
      category,
      summary: summary.trim(),
      description: description.trim() || summary.trim(),
      thumbnail: selectedCover,
      images: images.length > 0 ? images : (selectedCover ? [selectedCover] : []),
      period: period.trim() || '2026.01 - 현재',
      contribution: contribution.trim() || '기여도 100%',
      role: 'UI/UX Design',
      tools: tools.split(',').map((t) => t.trim()).filter(Boolean),
      themeColor,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      figmaLink: figmaLink.trim() || 'https://figma.com',
      liveLink: liveLink.trim() || 'https://portfolio-jiwon.vercel.app',
      isCustom: true,
    };

    onAdd(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 max-h-[92vh] flex flex-col animate-fade-up">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-terracotta-500/10 text-terracotta-700 flex items-center justify-center">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                새 프로젝트 등록 (Admin)
              </h3>
              <p className="text-xs text-stone-500">
                다중 이미지 업로드 및 대표 썸네일을 지정할 수 있습니다.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm text-stone-700">
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                프로젝트 제목 <span className="text-terracotta-600">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: Velvet 에스테틱 모바일 앱"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                카테고리
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900"
              >
                <option value="브로슈어/카탈로그">브로슈어/카탈로그</option>
                <option value="웹 포스터/템플릿">웹 포스터/템플릿</option>
                <option value="웹 서비스/랜딩페이지">웹 서비스/랜딩페이지</option>
              </select>
            </div>
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              부제 / 슬로건
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="예: 프리미엄 스킨케어 예약 및 큐레이션 서비스"
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900"
            />
          </div>

          {/* One line summary */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              한 줄 요약 설명 <span className="text-terracotta-600">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="카드 목록에 노출될 직관적인 한 줄 요약을 작성하세요."
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900 resize-none"
            />
          </div>

          {/* Detailed description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              상세 설명 (선택)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="상세 팝업 모달에 노출될 프로젝트 기획 배경 및 디자인 의도를 작성하세요."
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900 resize-none"
            />
          </div>

          {/* Section 2: Multi-Image Upload & Management */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/90 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-terracotta-600" />
                <span>디자인 이미지 등록 (다중 선택 가능)</span>
              </label>
              <span className="text-[11px] text-stone-500 font-medium">
                {images.length}장 등록됨 (클릭하여 대표 썸네일 지정)
              </span>
            </div>

            {/* Upload Options: Local File Upload & URL Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* File Upload Button Area */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="multi-image-input"
                />
                <label
                  htmlFor="multi-image-input"
                  className={`flex items-center justify-center gap-2 p-3 bg-white border border-dashed border-stone-300 hover:border-terracotta-500 rounded-xl cursor-pointer transition-all ${
                    isCompressing ? 'opacity-60 pointer-events-none' : ''
                  }`}
                >
                  {isCompressing ? (
                    <>
                      <Loader2 className="w-4 h-4 text-terracotta-600 animate-spin" />
                      <span className="text-xs font-semibold text-stone-700">이미지 압축 중...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 text-terracotta-600" />
                      <span className="text-xs font-semibold text-stone-700">내 PC에서 사진 여러 장 선택</span>
                    </>
                  )}
                </label>
              </div>

              {/* URL Input */}
              <div className="flex items-center gap-1.5">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="이미지 URL 직접 추가..."
                  className="flex-1 px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 text-xs text-stone-900"
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold transition-colors shrink-0"
                >
                  추가
                </button>
              </div>
            </div>

            {/* Thumbnails Preview Grid */}
            {images.length > 0 && (
              <div className="pt-2">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                  {images.map((img, idx) => {
                    const isCover = coverIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setCoverIndex(idx)}
                        className={`group relative h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          isCover
                            ? 'border-terracotta-600 ring-2 ring-terracotta-200 shadow-md'
                            : 'border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100'
                        }`}
                        title="클릭하여 대표 썸네일로 지정"
                      >
                        <img
                          src={img}
                          alt={`Uploaded preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Cover Badge */}
                        {isCover ? (
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-terracotta-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            <span>대표</span>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-[10px] text-white font-bold bg-black/60 px-1.5 py-0.5 rounded">
                              대표로 지정
                            </span>
                          </div>
                        )}

                        {/* Delete Single Image Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(idx);
                          }}
                          className="absolute top-1 right-1 p-1 rounded-full bg-stone-900/80 hover:bg-red-600 text-white transition-colors"
                          title="이미지 삭제"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Specs (Contribution, Tools, Period, Tags) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                기여도
              </label>
              <input
                type="text"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                placeholder="기여도 100% (개인 작업)"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                사용 툴 (쉼표 구분)
              </label>
              <input
                type="text"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                placeholder="Figma, ProtoPie, Tailwind CSS"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                제작 기간
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="2026.01 - 2026.02"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                태그 (쉼표 구분)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="UI/UX, Mobile App, Design System"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900"
              />
            </div>
          </div>

          {/* Theme Color Presets */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-stone-500" />
              <span>카드 비주얼 테마 색상 (이미지 없을 시 배경)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {THEME_PRESETS.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setThemeColor(preset.value)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition-all ${
                    themeColor === preset.value
                      ? 'border-stone-900 bg-stone-50 font-bold'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${preset.value} shrink-0`} />
                  <span className="truncate">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: External Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Figma 링크 URL
              </label>
              <input
                type="url"
                value={figmaLink}
                onChange={(e) => setFigmaLink(e.target.value)}
                placeholder="https://figma.com/..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                라이브 웹/결과물 URL
              </label>
              <input
                type="url"
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:bg-white transition-all text-stone-900"
              />
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isCompressing}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs shadow-md shadow-terracotta-600/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>작업물 즉시 등록</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
