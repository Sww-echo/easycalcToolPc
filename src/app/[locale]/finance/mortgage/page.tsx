'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

type PaymentType = 'equal-principal-interest' | 'equal-principal';

interface CalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remaining: number;
  }>;
}

export default function MortgageCalculator() {
  const t = useTranslations('finance.mortgage');
  const tc = useTranslations('common');
  
  const [loanAmount, setLoanAmount] = useState<string>('450,000');
  const [loanYears, setLoanYears] = useState<string>('30');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [paymentType, setPaymentType] = useState<PaymentType>('equal-principal-interest');
  const [startDate, setStartDate] = useState<string>('2023-10');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculate = () => {
    const principal = parseFloat(loanAmount.replace(/,/g, ''));
    const years = parseInt(loanYears);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = years * 12;

    if (isNaN(principal) || isNaN(years) || isNaN(rate) || principal <= 0 || years <= 0 || rate <= 0) {
      setResult(null);
      return;
    }

    const schedule: CalculationResult['schedule'] = [];
    let totalPayment = 0;
    let totalInterest = 0;
    let monthlyPayment = 0;

    if (paymentType === 'equal-principal-interest') {
      monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      let remaining = principal;

      for (let i = 1; i <= months; i++) {
        const interest = remaining * rate;
        const principalPart = monthlyPayment - interest;
        remaining -= principalPart;
        totalInterest += interest;

        schedule.push({
          month: i,
          payment: monthlyPayment,
          principal: principalPart,
          interest: interest,
          remaining: Math.max(0, remaining),
        });
      }
      totalPayment = monthlyPayment * months;
    } else {
      const monthlyPrincipal = principal / months;
      let remaining = principal;

      for (let i = 1; i <= months; i++) {
        const interest = remaining * rate;
        const payment = monthlyPrincipal + interest;
        remaining -= monthlyPrincipal;
        totalInterest += interest;
        totalPayment += payment;

        if (i === 1) monthlyPayment = payment;

        schedule.push({
          month: i,
          payment: payment,
          principal: monthlyPrincipal,
          interest: interest,
          remaining: Math.max(0, remaining),
        });
      }
    }

    setResult({ monthlyPayment, totalPayment, totalInterest, schedule });
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, loanYears, interestRate, paymentType]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    setLoanAmount(rawValue);
  };

  const currentYear = new Date().getFullYear();
  const endYear = currentYear + (parseInt(loanYears) || 0);

  const total = result ? result.totalPayment : 100;
  const principalAmount = result ? parseFloat(loanAmount.replace(/,/g, '')) : 0;
  const interestAmount = result ? result.totalInterest : 0;
  
  const principalPercent = result ? (principalAmount / total) * 100 : 42;
  const interestPercent = result ? (interestAmount / total) * 100 : 58;

  const principalDash = `${principalPercent} 100`;
  const interestDash = `${interestPercent} 100`;
  const interestOffset = -principalPercent;

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
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 block">{t('paymentMethod')}</label>
                <div className="flex border border-gray-200 rounded-lg w-full sm:w-fit overflow-hidden divide-x divide-gray-100">
                  <label className="cursor-pointer flex-1 sm:flex-none">
                    <input 
                      type="radio" 
                      name="loanType" 
                      className="peer sr-only"
                      checked={paymentType === 'equal-principal-interest'}
                      onChange={() => setPaymentType('equal-principal-interest')}
                    />
                    <div className="px-6 py-3 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-gray-900 peer-checked:font-semibold transition-all text-center">
                      {t('equalPayment')}
                    </div>
                  </label>
                  <label className="cursor-pointer flex-1 sm:flex-none">
                    <input 
                      type="radio" 
                      name="loanType" 
                      className="peer sr-only"
                      checked={paymentType === 'equal-principal'}
                      onChange={() => setPaymentType('equal-principal')}
                    />
                    <div className="px-6 py-3 text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 peer-checked:bg-gray-100 peer-checked:text-gray-900 peer-checked:font-semibold transition-all text-center">
                      {t('equalPrincipal')}
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-8">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('loanAmount')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 font-light">$</span>
                    </div>
                    <input 
                      className="w-full bg-transparent border border-gray-200 text-gray-900 rounded-lg py-3 pl-8 px-4 text-base focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-gray-300 outline-none font-light text-lg" 
                      type="text" 
                      value={loanAmount}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-900">{t('interestRate')}</label>
                    <div className="flex items-center gap-1 border-b border-gray-200 focus-within:border-black transition-colors">
                      <input 
                        className="w-16 text-right border-none bg-transparent py-1 px-0 text-lg font-light focus:ring-0 outline-none" 
                        type="number" 
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
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
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                  />
                  <div className="flex justify-between text-[10px] text-gray-300 uppercase tracking-widest">
                    <span>0%</span>
                    <span>15%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="block text-sm font-medium text-gray-900">{t('loanTerm')}</label>
                    <div className="flex items-center gap-1 border-b border-gray-200 focus-within:border-black transition-colors">
                      <input 
                        className="w-16 text-right border-none bg-transparent py-1 px-0 text-lg font-light focus:ring-0 outline-none" 
                        type="number" 
                        value={loanYears}
                        onChange={(e) => setLoanYears(e.target.value)}
                      />
                      <span className="text-gray-500 pr-2">{t('years')}</span>
                    </div>
                  </div>
                  <input 
                    className="w-full accent-black h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer" 
                    type="range" 
                    min="5" 
                    max="40" 
                    step="1" 
                    value={loanYears}
                    onChange={(e) => setLoanYears(e.target.value)}
                  />
                  <div className="flex justify-between text-[10px] text-gray-300 uppercase tracking-widest">
                    <span>5y</span>
                    <span>40y</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('startDate')}</label>
                  <input 
                    className="w-full bg-transparent border border-gray-200 text-gray-900 rounded-lg py-3 px-4 text-base focus:ring-1 focus:ring-black focus:border-black transition-all placeholder:text-gray-300 outline-none font-light" 
                    type="month" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => {
                    setLoanAmount('450000');
                    setLoanYears('30');
                    setInterestRate('6.5');
                    setPaymentType('equal-principal-interest');
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
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">{t('monthlyPayment')}</p>
                  <div className="flex items-baseline gap-1">
                    <h2 className="text-6xl font-light tracking-tighter text-gray-900">
                      {result ? formatCurrency(result.monthlyPayment).split('.')[0] : '$0'}
                    </h2>
                    <span className="text-2xl text-gray-300 font-light">
                      {result ? '.' + (formatCurrency(result.monthlyPayment).split('.')[1] || '00') : '.00'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 font-light">
                    Based on a {loanYears}-year fixed-rate loan.
                  </p>
                </div>
                <div className="border-t border-gray-100 pt-6 mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{t('totalInterest')}</p>
                    <p className="text-lg font-medium text-gray-900">
                      {result ? formatCurrency(result.totalInterest) : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1">{t('totalCost')}</p>
                    <p className="text-lg font-medium text-gray-900">
                      {result ? formatCurrency(result.totalPayment) : '-'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">{t('paymentBreakdown')}</h3>
                  <button className="text-gray-300 hover:text-black transition-colors">
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                  </button>
                </div>
                <div className="flex flex-row items-center gap-6 justify-between py-2">
                  <div className="relative size-32 flex-shrink-0">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                      <path 
                        className="text-gray-200" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeDasharray={interestDash}
                        strokeDashoffset={interestOffset}
                        strokeWidth="2.5"
                      ></path>
                      <path 
                        className="text-black" 
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeDasharray={principalDash}
                        strokeWidth="2.5"
                      ></path>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wide">{t('endDate')}</span>
                      <span className="text-xs font-bold text-gray-900">{endYear}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 flex-1 min-w-0 justify-center">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-black"></div>
                        <span className="text-xs font-medium text-gray-500">{t('principal')}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {result ? formatCurrency(principalAmount) : '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-gray-200"></div>
                        <span className="text-xs font-medium text-gray-500">{t('interest')}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {result ? formatCurrency(interestAmount) : '-'}
                      </span>
                    </div>
                    <div className="h-px bg-gray-100 my-1 w-full"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 pl-4">{t('total')}</span>
                      <span className="text-sm font-bold text-gray-900">
                        {result ? formatCurrency(result.totalPayment) : '-'}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 rounded-lg border border-gray-200 text-gray-900 font-medium text-xs hover:bg-gray-50 transition-colors uppercase tracking-wide">
                  {t('viewSchedule')}
                </button>
              </div>

              <div className="rounded-lg p-4 bg-gray-50 border border-gray-100 flex items-start gap-3">
                <span className="material-symbols-outlined text-gray-400 text-[20px] mt-0.5">lightbulb</span>
                <p className="text-sm text-gray-500 leading-relaxed">
                  <span className="font-semibold text-gray-900">{t('proTip')}:</span> {t('proTipText')}
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
