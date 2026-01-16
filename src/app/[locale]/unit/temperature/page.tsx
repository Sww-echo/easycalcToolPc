'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

type TempUnit = 'C' | 'F' | 'K';

export default function TemperatureConverter() {
  const t = useTranslations('unit.temperature');
  const tc = useTranslations('common');
  
  const [value, setValue] = useState<string>('25');
  const [fromUnit, setFromUnit] = useState<TempUnit>('C');
  const [toUnit, setToUnit] = useState<TempUnit>('F');
  const [result, setResult] = useState<number>(0);

  const convert = (val: number, from: TempUnit, to: TempUnit): number => {
    // Convert to Celsius first
    let celsius = val;
    if (from === 'F') celsius = (val - 32) * 5 / 9;
    if (from === 'K') celsius = val - 273.15;

    // Convert from Celsius to target
    if (to === 'C') return celsius;
    if (to === 'F') return (celsius * 9 / 5) + 32;
    if (to === 'K') return celsius + 273.15;
    return celsius;
  };

  const calculate = () => {
    const val = parseFloat(value);
    if (isNaN(val)) {
      setResult(0);
      return;
    }
    setResult(convert(val, fromUnit, toUnit));
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

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
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/unit">{tc('unit')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/finance">{tc('finance')}</Link>
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
      
      <main className="flex-1 flex justify-center py-12 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col max-w-[800px] flex-1 w-full gap-12">
          <div className="flex flex-col gap-4 text-center md:text-left border-b border-gray-100 pb-10">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
              <Link href="/unit" className="text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-900">{tc('unit')}</Link>
              <span className="text-xs font-medium text-gray-300">/</span>
              <span className="text-xs font-medium text-gray-900 uppercase tracking-wider">{t('title')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t('title')}</h1>
            <p className="text-gray-500 text-lg font-light max-w-2xl leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-end">
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">{t('from')}</label>
                <input 
                  className="w-full bg-transparent text-gray-900 border-b-2 border-gray-200 focus:border-black py-3 text-4xl font-light outline-none transition-colors text-center" 
                  type="text" 
                  value={value}
                  onChange={(e) => setValue(e.target.value.replace(/[^0-9.-]/g, ''))}
                />
                <select 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-black outline-none cursor-pointer"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value as TempUnit)}
                >
                  <option value="C">{t('units.celsius')} (°C)</option>
                  <option value="F">{t('units.fahrenheit')} (°F)</option>
                  <option value="K">{t('units.kelvin')} (K)</option>
                </select>
              </div>

              <button 
                onClick={swapUnits}
                className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors self-center mb-8"
              >
                <span className="material-symbols-outlined text-gray-500">swap_horiz</span>
              </button>

              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">{t('to')}</label>
                <div className="text-4xl font-light text-gray-900 py-3 text-center border-b-2 border-gray-100">
                  {result.toFixed(2)}°{toUnit === 'K' ? 'K' : toUnit}
                </div>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-black outline-none cursor-pointer"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value as TempUnit)}
                >
                  <option value="C">{t('units.celsius')} (°C)</option>
                  <option value="F">{t('units.fahrenheit')} (°F)</option>
                  <option value="K">{t('units.kelvin')} (K)</option>
                </select>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-4">{t('commonReferences')}</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 font-medium">{t('waterFreezes')}</div>
                  <div className="text-gray-500">0°C / 32°F</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-green-600 font-medium">{t('roomTemp')}</div>
                  <div className="text-gray-500">20°C / 68°F</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-red-600 font-medium">{t('waterBoils')}</div>
                  <div className="text-gray-500">100°C / 212°F</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
