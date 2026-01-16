'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  advice: string;
  position: number;
}

export default function BMICalculator() {
  const t = useTranslations('life.bmi');
  const tc = useTranslations('common');
  
  // Need to get translated categories and advices dynamically, 
  // so we'll access them inside processBmi or render.
  
  const [height, setHeight] = useState<string>('175');
  const [weight, setWeight] = useState<string>('70');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setResult(null);
      return;
    }

    let bmiValue = 0;
    if (unit === 'imperial') {
      bmiValue = 703 * w / (h * h);
    } else {
      const hM = h / 100;
      bmiValue = w / (hM * hM);
    }
    
    processBmi(bmiValue);
  };

  const processBmi = (bmi: number) => {
    // We store keys here to translate in render or use t() immediately if keys are simple.
    // However, best practice is to store raw data and translate in render, 
    // BUT we need 'color' and 'position' logic.
    // Let's store category KEY and advice KEY in state, then translate in JSX.
    
    let categoryKey = '';
    let color = '';
    let adviceKey = '';
    let position = 0;

    const scaleMin = 15;
    const scaleMax = 40;
    const clampedBmi = Math.max(scaleMin, Math.min(scaleMax, bmi));
    position = ((clampedBmi - scaleMin) / (scaleMax - scaleMin)) * 100;

    if (bmi < 18.5) {
      categoryKey = 'underweight';
      color = 'text-blue-500';
      adviceKey = 'underweight';
    } else if (bmi < 25) {
      categoryKey = 'normal';
      color = 'text-emerald-600';
      adviceKey = 'normal';
    } else if (bmi < 30) {
      categoryKey = 'overweight';
      color = 'text-orange-500';
      adviceKey = 'overweight';
    } else {
      categoryKey = 'obesity';
      color = 'text-rose-500';
      adviceKey = 'obesity';
    }

    setResult({ bmi, category: categoryKey, color, advice: adviceKey, position });
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, weight, unit]);

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
          
          <div className="flex flex-col gap-4 px-4 text-center md:text-left md:flex-row md:justify-between md:items-end">
            <div className="max-w-xl space-y-3">
              <h1 className="text-slate-900 text-3xl md:text-4xl font-light tracking-tight">{t('title')}</h1>
              <p className="text-slate-500 text-base font-light leading-relaxed">{t('description')}</p>
            </div>
            <div className="flex items-center gap-2 text-slate-400 self-center md:self-end mt-4 md:mt-0 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span className="text-xs font-medium">{t('privateLocal')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4 mt-2">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="bg-white rounded-xl p-0 md:p-2">
                <div className="flex justify-start mb-8">
                  <div className="inline-flex rounded-lg bg-slate-50 p-1 border border-slate-100">
                    <label className={`cursor-pointer px-4 py-2 rounded-md transition-all ${unit === 'metric' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>
                      <span className="text-sm font-medium">{t('metric')}</span>
                      <input 
                        className="hidden" 
                        name="unit-toggle" 
                        type="radio" 
                        value="metric" 
                        checked={unit === 'metric'}
                        onChange={() => setUnit('metric')}
                      />
                    </label>
                    <label className={`cursor-pointer px-4 py-2 rounded-md transition-all ${unit === 'imperial' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>
                      <span className="text-sm font-medium">{t('imperial')}</span>
                      <input 
                        className="hidden" 
                        name="unit-toggle" 
                        type="radio" 
                        value="imperial" 
                        checked={unit === 'imperial'}
                        onChange={() => setUnit('imperial')}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 group">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider ml-1">{t('height')}</label>
                    <div className="relative flex items-center">
                      <input 
                        className="w-full bg-transparent text-slate-900 border-b border-slate-200 focus:border-slate-800 focus:ring-0 px-1 py-3 text-3xl font-light outline-none transition-colors placeholder:text-slate-200" 
                        placeholder="0" 
                        type="number" 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                      <span className="absolute right-0 text-slate-400 font-light text-lg">{unit === 'metric' ? 'cm' : 'in'}</span>
                    </div>
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider ml-1">{t('weight')}</label>
                    <div className="relative flex items-center">
                      <input 
                        className="w-full bg-transparent text-slate-900 border-b border-slate-200 focus:border-slate-800 focus:ring-0 px-1 py-3 text-3xl font-light outline-none transition-colors placeholder:text-slate-200" 
                        placeholder="0" 
                        type="number" 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                      <span className="absolute right-0 text-slate-400 font-light text-lg">{unit === 'metric' ? 'kg' : 'lbs'}</span>
                    </div>
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

              <div className="border-t border-slate-100 pt-8 mt-2">
                <h3 className="text-slate-800 font-medium text-sm mb-4">{t('referenceRanges')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500">{t('underweight')}</span>
                    <span className="text-slate-900 font-medium">&lt; 18.5</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50 relative">
                    <span className="text-slate-800 font-medium pl-3 before:absolute before:left-0 before:top-3 before:size-1.5 before:bg-emerald-500 before:rounded-full">{t('normal')}</span>
                    <span className="text-slate-900 font-medium">18.5 – 24.9</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500">{t('overweight')}</span>
                    <span className="text-slate-900 font-medium">25 – 29.9</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-50">
                    <span className="text-slate-500">{t('obesity')}</span>
                    <span className="text-slate-900 font-medium">30+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 h-full flex flex-col justify-between" style={{boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)"}}>
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{t('result')}</p>
                    {result && (
                      <span className={`text-xs font-medium bg-emerald-50 px-2 py-1 rounded ${result.color}`}>
                        {t(result.category)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center mb-10">
                    <span className="text-6xl font-extralight text-slate-900 tracking-tighter">
                      {result ? result.bmi.toFixed(1) : '--'}
                    </span>
                    <span className="text-slate-400 text-sm mt-2">{t('bmiScore')}</span>
                  </div>
                  <div className="mb-10 px-2">
                    <div className="relative h-1 w-full bg-slate-100 rounded-full mb-2">
                      <div className="absolute top-0 left-0 h-full w-[14%] bg-blue-200 rounded-l-full"></div>
                      <div className="absolute top-0 left-[14%] h-full w-[26%] bg-emerald-400"></div>
                      <div className="absolute top-0 left-[40%] h-full w-[20%] bg-orange-200"></div>
                      <div className="absolute top-0 left-[60%] h-full w-[40%] bg-red-200 rounded-r-full"></div>
                      {result && (
                        <div 
                          className="absolute top-1/2 -mt-1.5 w-3 h-3 bg-white border-2 border-slate-900 rounded-full shadow-sm z-10 transition-all duration-500" 
                          style={{ left: `${result.position}%`, transform: 'translate(-50%, -50%)' }}
                        ></div>
                      )}
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-300 font-medium font-mono pt-2">
                      <span>15</span>
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                      <span>40</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-50 pt-6">
                    <h4 className="font-medium text-slate-800 mb-2 text-sm">{t('clinicalNote')}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                      {result ? t(`advice.${result.advice}`) : t('description')}
                    </p>
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

          <div className="mt-8 mb-12 px-4 border-t border-slate-100 pt-8">
            <p className="text-slate-400 text-xs max-w-2xl text-center md:text-left leading-relaxed">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
