import React from 'react';
import ProjectCard from './ProjectCard';
import { SearchX, FolderOpen } from 'lucide-react';

export default function ProjectGrid({
  projects,
  onSelectProject,
  onResetFilter,
  isAdmin,
  onDeleteProject,
}) {
  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center max-w-md mx-auto shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-stone-900 mb-1">
          해당 조건의 작업물이 없습니다
        </h3>
        <p className="text-xs text-stone-500 mb-5 leading-relaxed">
          검색어를 변경하거나 카테고리 필터를 '전체'로 전환해 보세요.
        </p>
        <button
          onClick={onResetFilter}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all active:scale-95"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>전체 작업물 보기</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onSelectProject(project)}
          isAdmin={isAdmin}
          onDelete={onDeleteProject}
        />
      ))}
    </div>
  );
}
