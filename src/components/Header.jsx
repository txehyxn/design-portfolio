import React, { useState, useEffect } from 'react';
import { Mail, Check, Send, Lock, Unlock, ShieldCheck, Menu, X } from 'lucide-react';
import { designerProfile } from '../data/projects';

export default function Header({ isAdmin, onOpenAdminModal, onLockAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(designerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3.5'
          : 'bg-[#FAF8F5]/70 backdrop-blur-sm border-b border-stone-200/40 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-stone-900 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:bg-terracotta-600 transition-colors">
              J
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-stone-900 group-hover:text-terracotta-700 transition-colors flex items-center gap-1.5">
                JIWON.DESIGN
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold text-stone-600">
            <a
              href="#works"
              className="hover:text-stone-900 transition-colors py-1"
            >
              작업물 (Works)
            </a>
            <a
              href="#about"
              className="hover:text-stone-900 transition-colors py-1"
            >
              소개 (About)
            </a>
            <a
              href="#contact"
              className="hover:text-stone-900 transition-colors py-1"
            >
              연락처 (Contact)
            </a>
          </nav>

          {/* Right Action: Admin Lock & Contact CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Discrete Admin Mode Switch */}
            {isAdmin ? (
              <button
                onClick={onLockAdmin}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300/80 transition-colors"
                title="관리자 모드 활성화됨 (클릭 시 로그아웃)"
              >
                <Unlock className="w-3.5 h-3.5 text-amber-700" />
                <span>Admin ON</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminModal}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
                title="관리자 모드 로그인"
                aria-label="Admin Login"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Email Copy CTA */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 transition-all border border-stone-200 shadow-xs"
              title="이메일 복사"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">복사완료</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{designerProfile.email}</span>
                </>
              )}
            </button>

            {/* Direct Contact Button */}
            <a
              href={`mailto:${designerProfile.email}?subject=[포트폴리오 제안] 웹디자이너 정지원`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>문의하기</span>
            </a>
          </div>

          {/* Mobile Right */}
          <div className="flex sm:hidden items-center gap-2">
            {isAdmin ? (
              <button
                onClick={onLockAdmin}
                className="px-2 py-1 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold"
              >
                Admin ON
              </button>
            ) : (
              <button
                onClick={onOpenAdminModal}
                className="p-1.5 text-stone-400 hover:text-stone-700"
                aria-label="Admin Mode"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-stone-700 rounded-lg"
              aria-label="메뉴"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden pt-3 pb-2 border-t border-stone-200 mt-3 space-y-1 text-xs font-semibold text-stone-700">
            <a
              href="#works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              작업물 목록 (Works)
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              소개 (About)
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-stone-100"
            >
              연락처 (Contact)
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
