'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthday: number;
}

export default function AgeCalculator() {
  const t = useTranslations('life.age');
  const tc = useTranslations('common');
  
  const [dob, setDob] = useState<string>('2000-01-01');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculate = () => {
    const start = new Date(dob);
    const end = new Date(targetDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    if (start > end) {
      setResult(null);
      return;
    }

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;

    // Next birthday calculation
    const today = new Date();
    const currentYear = today.getFullYear();
    let nextBday = new Date(currentYear, start.getMonth(), start.getDate());
    
    if (today > nextBday) {
      nextBday.setFullYear(currentYear + 1);
    }
    
    const diffTimeBday = Math.abs(nextBday.getTime() - today.getTime());
    const daysToNextBirthday = Math.ceil(diffTimeBday / (1000 * 60 * 60 * 24)); 

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: daysToNextBirthday
    });
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dob, targetDate]);

  return (
    <div className="bg-white text-slate-800 min-h-screen flex flex-col font-sans antialiased">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 md:px-12 py-4 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-black text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">calculate</span>
            </div>
            <h2 className="text-lg font-semibold tracking-tight">EasyCalc</h2>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/">{tc('home')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/finance">{tc('finance')}</Link>
            <Link className="text-sm font-medium text-gray-900 transition-colors" href="/life">{tc('life')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/math">{tc('math')}</Link>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center border-b border-gray-200 focus-within:border-black transition-colors px-2 py-1">
            <span className="material-symbols-outlined text-[18px] text-gray-400">search</span>
            <input className="w-32 border-none bg-transparent p-1 text-sm focus:ring-0 placeholder:text-gray-300 outline-none" placeholder={tc('searchShort')} type="text"/>
          </div>
          <LocaleSwitcher />
          <button className="text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">{tc('signIn')}</button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center px-4 md:px-10 lg:px-40 py-12">
        <div className="w-full max-w-[960px] flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-2 px-4 text-sm text-slate-400">
            <Link className="hover:text-slate-800 transition-colors" href="/">{tc('home')}</Link>
            <span className="text-slate-300">/</span>
            <Link className="hover:text-slate-800 transition-colors" href="/life">{tc('life')}</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-medium">{t('title')}</span>
          </div>
          
          <div className="flex flex-col gap-4 px-4 text-center md:text-left">
            <h1 className="text-slate-900 text-3xl md:text-4xl font-light tracking-tight">{t('title')}</h1>
            <p className="text-slate-500 text-base font-light leading-relaxed max-w-2xl">{t('description')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 mt-2">
            <div className="lg:col-span-6 flex flex-col gap-8">
              <div className="bg-white rounded-xl p-0 md:p-2 space-y-8">
                <div className="space-y-3 group">
                  <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider ml-1">{t('dateOfBirth')}</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                
                <div className="space-y-3 group">
                  <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider ml-1">{t('targetDate')}</label>
                  <input 
                    type="date" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setDob('2000-01-01');
                      setTargetDate(new Date().toISOString().slice(0, 10));
                    }}
                    className="text-xs font-medium text-slate-400 hover:text-slate-800 underline decoration-dotted underline-offset-4 transition-colors"
                  >
                    {tc('reset')}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 h-full flex flex-col justify-between" style={{boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)"}}>
                <div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-8">{t('yourAge')}</p>
                  
                  <div className="flex flex-col gap-2 mb-10">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-light text-slate-900 tracking-tighter">
                          {result ? result.years : '--'}
                        </span>
                        <span className="text-sm text-slate-400">{t('years')}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-light text-slate-900 tracking-tighter">
                          {result ? result.months : '--'}
                        </span>
                        <span className="text-sm text-slate-400">{t('months')}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-light text-slate-900 tracking-tighter">
                          {result ? result.days : '--'}
                        </span>
                        <span className="text-sm text-slate-400">{t('days')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{t('totalDays')}</p>
                      <p className="font-medium text-slate-900">{result ? result.totalDays.toLocaleString() : '-'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{t('totalWeeks')}</p>
                      <p className="font-medium text-slate-900">{result ? result.totalWeeks.toLocaleString() : '-'}</p>
                    </div>
                    <div className="col-span-1">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{t('totalMonths')}</p>
                      <p className="font-medium text-slate-900">{result ? result.totalMonths.toLocaleString() : '-'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex items-center gap-3 text-slate-500 text-sm bg-blue-50/50 p-4 rounded-lg border border-blue-50">
                    <span className="material-symbols-outlined text-blue-400">cake</span>
                    <span>{result ? t('daysToBirthday', { days: result.nextBirthday }) : '...'}</span>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  <button className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors">
                    {tc('save')}
                  </button>
                  <button className="flex-1 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors">
                    {tc('share')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
