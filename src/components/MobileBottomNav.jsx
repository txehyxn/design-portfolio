import React, { useState, useEffect } from 'react';
import { Home, LayoutGrid, User, Mail } from 'lucide-react';

export default function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'about', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: '홈', icon: <Home className="w-4 h-4" /> },
    { id: 'works', label: '작업물', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'about', label: '소개', icon: <User className="w-4 h-4" /> },
    { id: 'contact', label: '연락처', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200 px-4 py-2 shadow-sm"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)' }}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-terracotta-700 font-bold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'bg-amber-100 scale-105 text-amber-900' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px]">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
