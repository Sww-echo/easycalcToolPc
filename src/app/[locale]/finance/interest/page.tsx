'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

type InterestType = 'simple' | 'compound';

interface InterestResult {
  finalAmount: number;
  totalInterest: number;
  schedule: Array<{
    period: number;
    principal: number;
    interest: number;
    total: number;
  }>;
}

export default function InterestCalculator() {
  const t = useTranslations('finance.interest');
  const tMortgage = useTranslations('finance.mortgage');
  const tc = useTranslations('common');

  const [principal, setPrincipal] = useState<string>('10000');
  const [rate, setRate] = useState<string>('5');
  const [periods, setPeriods] = useState<string>('3');
  const [periodUnit, setPeriodUnit] = useState<'year' | 'month' | 'day'>('year');
  const [interestType, setInterestType] = useState<InterestType>('compound');
  const [result, setResult] = useState<InterestResult | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    let r = parseFloat(rate) / 100;
    const n = parseInt(periods);

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) {
      setResult(null);
      return;
    }

    if (periodUnit === 'month') {
      r = r / 12;
    } else if (periodUnit === 'day') {
      r = r / 365;
    }

    let finalAmount: number;
    let totalInterest: number;
    const schedule: InterestResult['schedule'] = [];

    if (interestType === 'simple') {
      totalInterest = p * r * n;
      finalAmount = p + totalInterest;

      for (let i = 1; i <= n; i++) {
        const periodInterest = p * r;
        schedule.push({
          period: i,
          principal: p,
          interest: periodInterest * i,
          total: p + periodInterest * i,
        });
      }
    } else {
      finalAmount = p * Math.pow(1 + r, n);
      totalInterest = finalAmount - p;

      let currentTotal = p;
      for (let i = 1; i <= n; i++) {
        const newTotal = p * Math.pow(1 + r, i);
        const periodInterest = newTotal - currentTotal;
        schedule.push({
          period: i,
          principal: currentTotal,
          interest: periodInterest,
          total: newTotal,
        });
        currentTotal = newTotal;
      }
    }

    setResult({ finalAmount, totalInterest, schedule });
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [principal, rate, periods, periodUnit, interestType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
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
            <Link className="text-sm font-medium text-gray-900 transition-colors" href="/finance">{tc('finance')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/life">{tc('life')}</Link>
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
      
      <main className="flex-1 flex justify-center py-12 px-4 md:px-10 lg:px-20 pb-24">
        <div className="flex flex-col max-w-[1100px] flex-1 w-full gap-12">
          <div className="flex flex-col gap-4 text-center md:text-left border-b border-gray-100 pb-10">
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
              <Link href="/finance" className="text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-900">{tc('finance')}</Link>
              <span className="text-xs font-medium text-gray-300">/</span>
              <span className="text-xs font-medium text-gray-900 uppercase tracking-wider">{t('title')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t('title')}</h1>
            <p className="text-gray-500 text-lg font-light max-w-2xl leading-relaxed">
              {t('description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 flex flex-col gap-10">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 block">{t('interestType')}</label>
                <div className="flex border border-gray-200 rounded-lg w-full sm:w-fit overflow-hidden divide-x divide-gray-100">
                  <label className="cursor-pointer flex-1 sm:flex-none">
                    <input 
                      type="radio" 
                      name="interestType" 
                      className="peer sr-only"
                      checked={interestType === 'simple'}
                      onChange={() => setInterestType('simple')}
                    />
                    <div className="px-6 py-3 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-gray-900 peer-checked:font-semibold transition-all text-center">
                      {t('simple')}
                    </div>
                  </label>
                  <label className="cursor-pointer flex-1 sm:flex-none">
                    <input 
                      type="radio" 
                      name="interestType" 
                      className="peer sr-only"
                      checked={interestType === 'compound'}
                      onChange={() => setInterestType('compound')}
                    />
                    <div className="px-6 py-3 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-gray-900 peer-checked:font-semibold transition-all text-center">
                      {t('compound')}
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('principalAmount')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-light">$</span>
                    </div>
                    <input 
                      className="w-full bg-transparent border border-gray-200 text-gray-900 rounded-lg py-3 pl-8 px-4 text-base focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-gray-300 outline-none font-light text-lg" 
                      type="text" 
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-900">{tMortgage('interestRate')}</label>
                    <div className="flex items-center gap-1 border-b border-gray-200 focus-within:border-black transition-colors">
                      <input 
                        className="w-16 text-right border-none bg-transparent py-1 px-0 text-lg font-light focus:ring-0 outline-none" 
                        type="number" 
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        step="0.01"
                      />
                      <span className="text-gray-500 pr-2">%</span>
                    </div>
                  </div>
                  <input 
                    className="w-full accent-black h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer" 
                    type="range" 
                    min="0"
                    max="20"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                  <div className="flex justify-between text-[10px] text-gray-300 uppercase tracking-widest">
                    <span>0%</span>
                    <span>20%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-900">{t('duration')}</label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 border-b border-gray-200 focus-within:border-black transition-colors">
                        <input 
                          className="w-16 text-right border-none bg-transparent py-1 px-0 text-lg font-light focus:ring-0 outline-none" 
                          type="number" 
                          value={periods}
                          onChange={(e) => setPeriods(e.target.value)}
                        />
                      </div>
                      <select 
                        value={periodUnit}
                        onChange={(e) => setPeriodUnit(e.target.value as 'year' | 'month' | 'day')}
                        className="bg-transparent border-none text-gray-500 text-sm font-medium outline-none cursor-pointer"
                      >
                        <option value="year">{tMortgage('years').charAt(0).toUpperCase() + tMortgage('years').slice(1)}</option>
                        <option value="month">{tMortgage('years') === 'years' ? 'Months' : 'Months'}</option> 
                        <option value="day">{tMortgage('years') === 'years' ? 'Days' : 'Days'}</option>
                      </select>
                    </div>
                  </div>
                  <input 
                    className="w-full accent-black h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer" 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1" 
                    value={periods}
                    onChange={(e) => setPeriods(e.target.value)}
                  />
                  <div className="flex justify-between text-[10px] text-gray-300 uppercase tracking-widest">
                    <span>1</span>
                    <span>30</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => {
                    setPrincipal('10000');
                    setRate('5');
                    setPeriods('3');
                    setInterestType('compound');
                  }}
                  className="text-xs font-medium text-gray-500 hover:text-gray-900 underline decoration-dotted underline-offset-4 transition-colors"
                >
                  {tc('reset')}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm flex flex-col justify-between min-h-[300px]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">{t('totalAmount')}</p>
                  <div className="flex items-baseline gap-1">
                    <h2 className="text-5xl font-light tracking-tighter text-gray-900">
                      {result ? formatCurrency(result.finalAmount) : '$0.00'}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 font-light">
                    After {periods} {periodUnit}s at {rate}% interest.
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-6 mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{tMortgage('totalInterest')}</p>
                    <p className="text-lg font-medium text-emerald-600">
                      {result ? `+${formatCurrency(result.totalInterest)}` : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{tMortgage('principal')}</p>
                    <p className="text-lg font-medium text-gray-900">
                      {result ? formatCurrency(parseFloat(principal)) : '-'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-0 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">{t('schedule')}</h3>
                  <span className="text-[10px] text-gray-500">{interestType === 'simple' ? t('linearGrowth') : t('exponentialGrowth')}</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-white sticky top-0 font-semibold text-gray-500">
                      <tr>
                        <th className="px-6 py-3 text-left border-b border-gray-100">Period</th>
                        <th className="px-6 py-3 text-right border-b border-gray-100">{tMortgage('interest')}</th>
                        <th className="px-6 py-3 text-right border-b border-gray-100">{tMortgage('total')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result?.schedule.map((row, idx) => (
                        <tr key={row.period} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3 text-gray-900">{row.period}</td>
                          <td className="px-6 py-3 text-right text-emerald-600">
                            +{formatCurrency(idx > 0 ? row.interest : row.total - parseFloat(principal))}
                          </td>
                          <td className="px-6 py-3 text-right text-gray-900 font-medium">{formatCurrency(row.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {!result && <div className="p-8 text-center text-gray-500 text-sm italic">Calculate to view schedule</div>}
                </div>
              </div>

              <div className="rounded-lg p-4 bg-gray-50 border border-gray-100 flex items-start gap-3">
                <span className="material-symbols-outlined text-gray-400 text-[20px] mt-0.5">lightbulb</span>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-semibold text-gray-900">{t('ruleof72')}:</span> {t('ruleof72Text', { rate: rate, years: (72 / parseFloat(rate || '1')).toFixed(1) })}
                </p>
              </div>
            </div>
          </div>
          
          <footer className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[11px] text-gray-400 max-w-lg leading-relaxed text-center md:text-left">
                *Calculations are estimates. Simple vs Compound interest can significantly affect long-term results.
              </p>
              <div className="flex gap-4">
                <a className="text-[11px] font-medium text-gray-400 hover:text-black" href="#">{tc('terms')}</a>
                <a className="text-[11px] font-medium text-gray-400 hover:text-black" href="#">{tc('privacy')}</a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
