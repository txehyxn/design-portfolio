import React, { useState, useEffect, useRef } from 'react';
import { Lock, X, Check, KeyRound, AlertCircle } from 'lucide-react';

export default function AdminModal({ isOpen, onClose, onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      onUnlock();
      onClose();
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* PIN Box */}
      <div className={`relative w-full max-w-xs bg-white rounded-3xl p-6 shadow-xl border border-stone-200 z-10 animate-fade-up ${error ? 'animate-shake' : ''}`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 mx-auto mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-stone-900">
            관리자 모드 인증
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            작업물 추가 및 수정을 위한 PIN 번호를 입력하세요.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={inputRef}
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN 입력 (기본: 1234)"
              className="w-full text-center tracking-widest text-lg font-bold py-2.5 px-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100 transition-all placeholder:text-stone-400 placeholder:text-xs placeholder:tracking-normal placeholder:font-normal"
            />
            {error && (
              <div className="flex items-center justify-center gap-1 text-[11px] text-red-600 font-medium mt-2">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>비밀번호가 일치하지 않습니다. (1234)</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-all active:scale-95 shadow-sm"
          >
            확인 및 잠금 해제
          </button>
        </form>
      </div>
    </div>
  );
}
