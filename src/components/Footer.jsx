import React, { useState } from 'react';
import { Mail, Check, Send, ExternalLink, Lock, Unlock } from 'lucide-react';
import { designerProfile } from '../data/projects';

export default function Footer({ isAdmin, onOpenAdminModal, onLockAdmin }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(designerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="bg-[#1C1917] text-stone-300 pt-14 pb-20 sm:pb-14 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-stone-800">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
              함께 일할 기회가 있다면 언제든 연락해 주세요.
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              채용 제안이나 프로젝트 문의에 관해 빠르게 답변드리겠습니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-all border border-stone-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">이메일 복사완료</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{designerProfile.email}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${designerProfile.email}?subject=[포트폴리오 문의]`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold shadow-xs transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>이메일 보내기</span>
            </a>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-300">JIWON.DESIGN</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} Jiwon Jung.</span>
            <span>•</span>
            {isAdmin ? (
              <button
                onClick={onLockAdmin}
                className="text-amber-500 hover:underline flex items-center gap-1"
              >
                <Unlock className="w-3 h-3" />
                <span>관리자 모드 활성중 (종료)</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminModal}
                className="hover:text-stone-300 flex items-center gap-1 transition-colors"
                title="관리자 로그인"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-5">
            <a
              href={designerProfile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={designerProfile.socials.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition-colors flex items-center gap-1"
            >
              <span>Behance</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://portfolio-jiwon.vercel.app"
              className="hover:text-stone-300 transition-colors"
            >
              portfolio-jiwon.vercel.app
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
