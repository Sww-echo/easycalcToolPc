'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

interface DateResult {
  days: number;
  weeks: number;
  months: number;
  years: number;
  workdays: number;
}

export default function DateCalculator() {
  const t = useTranslations('life.date');
  const tc = useTranslations('common');
  
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  });
  const [result, setResult] = useState<DateResult | null>(null);

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setResult(null);
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    
    // Calculate months and years
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth();
    months = Math.abs(months);
    
    const years = Math.floor(months / 12);

    // Calculate workdays (Mon-Fri)
    let workdays = 0;
    const current = new Date(start < end ? start : end);
    const endCheck = start < end ? end : start;
    while (current <= endCheck) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workdays++;
      }
      current.setDate(current.getDate() + 1);
    }

    setResult({ days, weeks, months, years, workdays });
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

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
            <p className="text-slate-500 text-base font-light leading-relaxed max-w-xl">{t('description')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 mt-2">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="bg-white rounded-xl p-0 md:p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider ml-1">{t('startDate')}</label>
                    <input 
                      className="w-full bg-transparent text-slate-900 border border-slate-200 focus:border-slate-800 focus:ring-0 rounded-lg px-4 py-3 text-lg font-light outline-none transition-colors" 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider ml-1">{t('endDate')}</label>
                    <input 
                      className="w-full bg-transparent text-slate-900 border border-slate-200 focus:border-slate-800 focus:ring-0 rounded-lg px-4 py-3 text-lg font-light outline-none transition-colors" 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-12 flex justify-start">
                  <button 
                    onClick={calculate}
                    className="bg-slate-900 hover:bg-slate-800 active:scale-[0.99] transition-all rounded-lg text-white px-8 py-4 text-sm font-medium shadow-lg shadow-slate-200 flex items-center gap-3"
                  >
                    <span>{tc('calculate')}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 flex flex-col gap-6" style={{boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)"}}>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{t('difference')}</p>
                
                <div className="flex flex-col items-center py-6">
                  <span className="text-6xl font-extralight text-slate-900 tracking-tighter">{result?.days ?? '--'}</span>
                  <span className="text-slate-400 text-sm mt-2">{t('totalDays')}</span>
                </div>

                <div className="border-t border-slate-50 pt-6 grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{tc('weeks')}</p>
                    <p className="text-2xl font-light text-slate-900">{result?.weeks ?? '-'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{tc('months')}</p>
                    <p className="text-2xl font-light text-slate-900">{result?.months ?? '-'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{tc('years')}</p>
                    <p className="text-2xl font-light text-slate-900">{result?.years ?? '-'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{t('workdays')}</p>
                    <p className="text-2xl font-light text-slate-900">{result?.workdays ?? '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
