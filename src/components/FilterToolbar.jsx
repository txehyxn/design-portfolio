import React from 'react';
import { Search, X, Plus, Sparkles } from 'lucide-react';
import { categories } from '../data/projects';

export default function FilterToolbar({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categoryCounts,
  totalCount,
  isAdmin,
  onOpenNewProject,
}) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl overflow-x-auto no-scrollbar">
          {categories.map((category) => {
            const count = category === '전체' ? totalCount : (categoryCounts[category] || 0);
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap active:scale-95 ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-stone-300/60 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Search & (Admin) Add Button */}
        <div className="flex items-center gap-2">
          {/* Real-time Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="작업물 검색..."
              className="w-full pl-8.5 pr-8 py-1.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-200 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Admin "+ 새 작업물 추가" Button */}
          {isAdmin && (
            <button
              onClick={onOpenNewProject}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-semibold text-xs shadow-xs transition-all active:scale-95 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">새 작업물 추가</span>
              <span className="sm:hidden">추가</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Feedback */}
      {searchQuery && (
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
          <span>
            '<strong className="text-stone-800">{searchQuery}</strong>' 검색 결과 {totalCount}개
          </span>
          <button
            onClick={() => onSearchChange('')}
            className="text-amber-700 hover:underline font-medium"
          >
            검색 초기화
          </button>
        </div>
      )}
    </div>
  );
}
