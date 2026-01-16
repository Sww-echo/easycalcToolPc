'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

type CalculationType = 'percentage-of' | 'what-percent' | 'increase' | 'decrease';

export default function PercentageCalculator() {
  const t = useTranslations('math.percentage');
  const tc = useTranslations('common');
  
  const [calcType, setCalcType] = useState<CalculationType>('percentage-of');
  const [value1, setValue1] = useState<string>('100');
  const [value2, setValue2] = useState<string>('25');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || isNaN(v2)) {
      setResult('-');
      return;
    }

    let res = 0;
    switch (calcType) {
      case 'percentage-of':
        res = (v2 / 100) * v1;
        setResult(res.toFixed(2));
        break;
      case 'what-percent':
        res = (v1 / v2) * 100;
        setResult(`${res.toFixed(2)}%`);
        break;
      case 'increase':
        res = v1 * (1 + v2 / 100);
        setResult(res.toFixed(2));
        break;
      case 'decrease':
        res = v1 * (1 - v2 / 100);
        setResult(res.toFixed(2));
        break;
    }
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcType, value1, value2]);

  const getLabel1 = () => {
    switch (calcType) {
      case 'percentage-of': return t('baseNumber');
      case 'what-percent': return t('part');
      case 'increase': return t('originalValue');
      case 'decrease': return t('originalValue');
    }
  };

  const getLabel2 = () => {
    switch (calcType) {
      case 'percentage-of': return t('percentage');
      case 'what-percent': return t('whole');
      case 'increase': return t('percentage'); // Reusing percentage key for Increase %
      case 'decrease': return t('percentage'); // Reusing percentage key for Decrease %
    }
  };
  
  // Note: For 'increase' and 'decrease', keys like 'Increase %' might not exist exactly, using 'percentage' is safe or add specific keys if needed. 
  // Checking en.json: "increase": "Increase", "decrease": "Decrease", "percentage": "Percentage".
  // So maybe separate labels for input? Or just "Percentage". "Percentage" works.

  const getFormula = () => {
    switch (calcType) {
      case 'percentage-of': return `${value2 || 0}% ${tc('of')} ${value1 || 0} = ?`;
      case 'what-percent': return `${value1 || 0} ${tc('isWhatPercent')} ${value2 || 0}?`;
      case 'increase': return `${value1 || 0} + ${value2 || 0}% = ?`;
      case 'decrease': return `${value1 || 0} - ${value2 || 0}% = ?`;
    }
  };
  // Note: 'of' and 'isWhatPercent' might not be in common.
  // en.json check needed. 'of' is common. 'isWhatPercent'?
  // en.json math.percentage keys: percentageOf, whatPercent.
  // I should probably use formatted message or simplified display to avoid grammar issues.
  // Actually, keeping the formula mathematical is language neutral mostly, except "of" "is what % of".
  // Let's simplified formula: 
  // percentage-of: 25% * 100 = ?
  // what-percent: (25 / 100) * 100% = ?
  // This is safer.

  const getFormulaSafe = () => {
      switch (calcType) {
      case 'percentage-of': return `${value2}% × ${value1} = ?`;
      case 'what-percent': return `(${value1} ÷ ${value2}) × 100% = ?`;
      case 'increase': return `${value1} × (1 + ${value2}%) = ?`;
      case 'decrease': return `${value1} × (1 - ${value2}%) = ?`;
    }
  }

  return (
    <div className="bg-white text-gray-900 font-sans antialiased flex flex-col min-h-screen">
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
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/life">{tc('life')}</Link>
            <Link className="text-sm font-medium text-gray-900 transition-colors" href="/math">{tc('math')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/unit">{tc('unit')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/currency">{tc('currency')}</Link>
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
      
      <main className="flex-1 flex justify-center py-12 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col max-w-[1100px] flex-1 w-full gap-12">
          <div className="flex flex-col gap-4 text-center md:text-left border-b border-gray-100 pb-10">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
              <Link href="/math" className="text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-900">{tc('math')}</Link>
              <span className="text-xs font-medium text-gray-300">/</span>
              <span className="text-xs font-medium text-gray-900 uppercase tracking-wider">{t('title')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t('title')}</h1>
            <p className="text-gray-500 text-lg font-light max-w-2xl leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 block">{t('calculationType')}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label className="cursor-pointer">
                    <input type="radio" name="calcType" className="peer sr-only" checked={calcType === 'percentage-of'} onChange={() => setCalcType('percentage-of')} />
                    <div className="px-4 py-3 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-gray-900 peer-checked:border-gray-300 transition-all text-center capitalize">
                      {t('percentageOf')}
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="calcType" className="peer sr-only" checked={calcType === 'what-percent'} onChange={() => setCalcType('what-percent')} />
                    <div className="px-4 py-3 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-gray-900 peer-checked:border-gray-300 transition-all text-center capitalize">
                      {t('whatPercent')}
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="calcType" className="peer sr-only" checked={calcType === 'increase'} onChange={() => setCalcType('increase')} />
                    <div className="px-4 py-3 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-gray-900 peer-checked:border-gray-300 transition-all text-center capitalize">
                      {t('increase')}
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="calcType" className="peer sr-only" checked={calcType === 'decrease'} onChange={() => setCalcType('decrease')} />
                    <div className="px-4 py-3 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-gray-900 peer-checked:border-gray-300 transition-all text-center capitalize">
                      {t('decrease')}
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{getLabel1()}</label>
                  <input 
                    className="w-full bg-transparent border border-gray-200 text-gray-900 rounded-lg py-3 px-4 text-lg font-light focus:ring-1 focus:ring-black focus:border-black transition-all outline-none" 
                    type="text" 
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{getLabel2()}</label>
                  <input 
                    className="w-full bg-transparent border border-gray-200 text-gray-900 rounded-lg py-3 px-4 text-lg font-light focus:ring-1 focus:ring-black focus:border-black transition-all outline-none" 
                    type="text" 
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 font-mono">{getFormulaSafe()}</p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">{t('result')}</p>
                <div className="flex items-baseline justify-center py-8">
                  <h2 className="text-6xl font-light tracking-tighter text-gray-900">{result}</h2>
                </div>
                <div className="border-t border-gray-100 pt-6 mt-4">
                  <p className="text-sm text-gray-500 text-center">{getFormulaSafe()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
