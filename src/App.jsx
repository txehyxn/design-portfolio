import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterToolbar from './components/FilterToolbar';
import ProjectGrid from './components/ProjectGrid';
import ProjectModal from './components/ProjectModal';
import AboutSection from './components/AboutSection';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import NewProjectModal from './components/NewProjectModal';
import { defaultProjects } from './data/projects';
import { Plus, Check, Lock, Unlock, ShieldAlert } from 'lucide-react';

const STORAGE_KEY = 'jiwon_portfolio_projects_v4';
const ADMIN_STORAGE_KEY = 'jiwon_portfolio_admin_v4';

export default function App() {
  const [projectsList, setProjectsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load projects from localStorage', e);
    }
    return defaultProjects;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  });

  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Save projects to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsList));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [projectsList]);

  // Show Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // Admin Login
  const handleUnlockAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem(ADMIN_STORAGE_KEY, 'true');
    showToast('관리자 모드가 활성화되었습니다. (+ 새 작업물 등록 가능)');
  };

  // Admin Logout
  const handleLockAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    showToast('관리자 모드가 종료되었습니다.');
  };

  // Add New Project
  const handleAddProject = (newProject) => {
    setProjectsList((prev) => [newProject, ...prev]);
    showToast(`'${newProject.title}' 프로젝트가 등록되었습니다.`);
  };

  // Delete Project
  const handleDeleteProject = (projectId) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== projectId));
    showToast('프로젝트가 삭제되었습니다.');
  };

  // Reset to default sample projects if needed
  const handleResetToDefault = () => {
    if (window.confirm('기본 프로젝트 목록으로 초기화하시겠습니까?')) {
      setProjectsList(defaultProjects);
      showToast('기본 프로젝트 목록으로 복원되었습니다.');
    }
  };

  // Category Counts
  const categoryCounts = useMemo(() => {
    const counts = {
      '웹 서비스': 0,
      '랜딩페이지': 0,
      '모바일 UI': 0,
    };
    projectsList.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, [projectsList]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projectsList.filter((project) => {
      const matchCategory =
        activeCategory === '전체' || project.category === activeCategory;

      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchTitle = project.title?.toLowerCase().includes(q);
      const matchSubtitle = project.subtitle?.toLowerCase().includes(q);
      const matchSummary = project.summary?.toLowerCase().includes(q);
      const matchTags = project.tags?.some((tag) => tag.toLowerCase().includes(q));
      const matchTools = project.tools?.some((tool) => tool.toLowerCase().includes(q));

      return matchTitle || matchSubtitle || matchSummary || matchTags || matchTools;
    });
  }, [projectsList, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col selection:bg-terracotta-600 selection:text-white">
      {/* Admin Status Banner (Only when active) */}
      {isAdmin && (
        <div className="bg-amber-100/90 border-b border-amber-200 text-amber-900 text-xs px-4 py-1.5 flex items-center justify-between font-semibold fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center gap-1.5 max-w-6xl mx-auto w-full justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              <span>관리자 모드 활성중 (새 작업물 등록 및 삭제 가능)</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleResetToDefault}
                className="text-stone-600 hover:text-stone-900 underline text-[11px]"
              >
                기본값 복원
              </button>
              <button
                onClick={handleLockAdmin}
                className="text-amber-800 hover:text-amber-950 underline font-bold"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className={isAdmin ? 'mt-7' : ''}>
        <Header
          isAdmin={isAdmin}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
          onLockAdmin={handleLockAdmin}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Minimal Hero Section */}
        <Hero />

        {/* Works Section */}
        <section id="works" className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Selected Works
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                실제 기여한 주요 웹 & UI/UX 프로젝트입니다.
              </p>
            </div>
          </div>

          {/* Filter & Search Toolbar */}
          <FilterToolbar
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryCounts={categoryCounts}
            totalCount={projectsList.length}
            isAdmin={isAdmin}
            onOpenNewProject={() => setIsNewProjectModalOpen(true)}
          />

          {/* Projects Grid */}
          <ProjectGrid
            projects={filteredProjects}
            onSelectProject={(project) => setSelectedProject(project)}
            onResetFilter={() => {
              setActiveCategory('전체');
              setSearchQuery('');
            }}
            isAdmin={isAdmin}
            onDeleteProject={handleDeleteProject}
          />
        </section>

        {/* About & Skills Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        isAdmin={isAdmin}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onLockAdmin={handleLockAdmin}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Floating Action Button for Admin */}
      {isAdmin && (
        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="fixed bottom-20 sm:bottom-8 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-terracotta-600/30 transition-all hover:scale-105 active:scale-95"
          title="새 작업물 추가"
        >
          <Plus className="w-4 h-4" />
          <span>새 작업물 추가</span>
        </button>
      )}

      {/* Detail Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          isAdmin={isAdmin}
          onDelete={handleDeleteProject}
        />
      )}

      {/* Admin PIN Unlock Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onUnlock={handleUnlockAdmin}
      />

      {/* Admin New Project Form Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onAdd={handleAddProject}
      />

      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
