'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

interface CalculationResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  schedule: Array<{
    year: number;
    contribution: number;
    interest: number;
    balance: number;
  }>;
}

export default function InvestmentCalculator() {
  const t = useTranslations('finance.investment');
  const tc = useTranslations('common');
  const tMortgage = useTranslations('finance.mortgage'); // Reuse 'years' from mortgage

  const [initialAmount, setInitialAmount] = useState<string>('10000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [years, setYears] = useState<string>('10');
  const [returnRate, setReturnRate] = useState<string>('8');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculate = () => {
    const initial = parseFloat(initialAmount);
    const monthly = parseFloat(monthlyContribution);
    const n = parseInt(years);
    const r = parseFloat(returnRate) / 100 / 12;

    if (isNaN(initial) || isNaN(monthly) || isNaN(n) || isNaN(r) || n <= 0) {
      setResult(null);
      return;
    }

    const months = n * 12;
    const schedule: CalculationResult['schedule'] = [];
    
    let balance = initial;
    let totalContributions = initial;
    
    for (let year = 1; year <= n; year++) {
      let yearlyContribution = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interest = balance * r;
        balance += interest + monthly;
        yearlyContribution += monthly;
        yearlyInterest += interest;
      }
      
      totalContributions += yearlyContribution;
      
      schedule.push({
        year,
        contribution: yearlyContribution,
        interest: yearlyInterest,
        balance,
      });
    }

    const totalInterest = balance - totalContributions;

    setResult({
      futureValue: balance,
      totalContributions,
      totalInterest,
      schedule,
    });
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialAmount, monthlyContribution, years, returnRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('initialInvestment')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-light">$</span>
                    </div>
                    <input 
                      className="w-full bg-transparent border border-gray-200 text-gray-900 rounded-lg py-3 pl-8 px-4 text-base focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-gray-300 outline-none font-light text-lg" 
                      type="text" 
                      value={initialAmount}
                      onChange={(e) => setInitialAmount(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('monthlyContribution')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-light">$</span>
                    </div>
                    <input 
                      className="w-full bg-transparent border border-gray-200 text-gray-900 rounded-lg py-3 pl-8 px-4 text-base focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-gray-300 outline-none font-light text-lg" 
                      type="text" 
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-900">{t('investmentPeriod')}</label>
                    <div className="flex items-center gap-1 border-b border-gray-200 focus-within:border-black transition-colors">
                      <input 
                        className="w-16 text-right border-none bg-transparent py-1 px-0 text-lg font-light focus:ring-0 outline-none" 
                        type="number" 
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                      />
                      <span className="text-gray-500 pr-2">{tMortgage('years')}</span>
                    </div>
                  </div>
                  <input 
                    className="w-full accent-black h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer" 
                    type="range" 
                    min="1" 
                    max="40" 
                    step="1" 
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                  />
                  <div className="flex justify-between text-[10px] text-gray-300 uppercase tracking-widest">
                    <span>1y</span>
                    <span>40y</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-900">{t('expectedReturn')}</label>
                    <div className="flex items-center gap-1 border-b border-gray-200 focus-within:border-black transition-colors">
                      <input 
                        className="w-16 text-right border-none bg-transparent py-1 px-0 text-lg font-light focus:ring-0 outline-none" 
                        type="number" 
                        value={returnRate}
                        onChange={(e) => setReturnRate(e.target.value)}
                        step="0.1"
                      />
                      <span className="text-gray-500 pr-2">%</span>
                    </div>
                  </div>
                  <input 
                    className="w-full accent-black h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer" 
                    type="range" 
                    min="0"
                    max="15"
                    step="0.1"
                    value={returnRate}
                    onChange={(e) => setReturnRate(e.target.value)}
                  />
                  <div className="flex justify-between text-[10px] text-gray-300 uppercase tracking-widest">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => {
                    setInitialAmount('10000');
                    setMonthlyContribution('500');
                    setYears('10');
                    setReturnRate('8');
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
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">{t('futureValue')}</p>
                  <div className="flex items-baseline gap-1">
                    <h2 className="text-5xl font-light tracking-tighter text-gray-900">
                      {result ? formatCurrency(result.futureValue) : '$0'}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 font-light">
                    After {years} {tMortgage('years')} at {returnRate}% annual return
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-6 mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{t('totalContributions')}</p>
                    <p className="text-lg font-medium text-gray-900">
                      {result ? formatCurrency(result.totalContributions) : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{t('totalEarnings')}</p>
                    <p className="text-lg font-medium text-emerald-600">
                      {result ? `+${formatCurrency(result.totalInterest)}` : '-'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-0 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">{t('growthSchedule')}</h3>
                </div>
                <div className="max-h-[250px] overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-white sticky top-0 font-semibold text-gray-500">
                      <tr>
                        <th className="px-6 py-3 text-left border-b border-gray-100">{t('year')}</th>
                        <th className="px-6 py-3 text-right border-b border-gray-100">{t('interest')}</th>
                        <th className="px-6 py-3 text-right border-b border-gray-100">{t('balance')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result?.schedule.map((row) => (
                        <tr key={row.year} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3 text-gray-900">{row.year}</td>
                          <td className="px-6 py-3 text-right text-emerald-600">+{formatCurrency(row.interest)}</td>
                          <td className="px-6 py-3 text-right text-gray-900 font-medium">{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-gray-50 border border-gray-100 flex items-start gap-3">
                <span className="material-symbols-outlined text-gray-400 text-[20px] mt-0.5">lightbulb</span>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-semibold text-gray-900">{t('proTip')}:</span> {t('tip')}
                </p>
              </div>
            </div>
          </div>
          
          <footer className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[11px] text-gray-400 max-w-lg leading-relaxed text-center md:text-left">
                {t('disclaimer')}
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
