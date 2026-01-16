'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'KRW', name: 'Korean Won', symbol: '₩' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
];

const rates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CNY: 7.24,
  KRW: 1320.00,
  AUD: 1.53,
  CAD: 1.36,
};

export default function ExchangeCalculator() {
  const t = useTranslations('currency.exchange');
  const tc = useTranslations('common');
  
  const [amount, setAmount] = useState<string>('1000');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<number>(0);

  const calculate = () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setResult(0);
      return;
    }

    const inUSD = value / rates[fromCurrency];
    const converted = inUSD * rates[toCurrency];
    setResult(converted);
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const exchangeRate = rates[toCurrency] / rates[fromCurrency];

  const formatCurrencyValue = (val: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="bg-white text-slate-800 font-sans antialiased min-h-screen flex flex-col">
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
            <Link className="text-sm font-medium text-gray-900 transition-colors" href="/currency">{tc('currency')}</Link>
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/unit">{tc('unit')}</Link>
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

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-4 text-center md:text-left border-b border-gray-100 pb-10 mb-10">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
            <Link href="/currency" className="text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-900">{tc('currency')}</Link>
            <span className="text-xs font-medium text-gray-300">/</span>
            <span className="text-xs font-medium text-gray-900 uppercase tracking-wider">{t('title')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">{t('amount')}</label>
                <input 
                  className="w-full bg-transparent border border-gray-200 text-gray-900 rounded-lg py-4 px-4 text-2xl font-light focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none" 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('from')}</label>
                  <select 
                    className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg py-3 px-4 text-base focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none cursor-pointer"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={swapCurrencies}
                  className="p-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors self-end mb-0.5"
                >
                  <span className="material-symbols-outlined text-gray-500">swap_horiz</span>
                </button>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('to')}</label>
                  <select 
                    className="w-full bg-white border border-gray-200 text-gray-900 rounded-lg py-3 px-4 text-base focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none cursor-pointer"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">{t('converted')}</p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h2 className="text-5xl font-light tracking-tighter text-gray-900 break-all">
                  {formatCurrencyValue(result, toCurrency)}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mt-6 font-light">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </p>

              <div className="border-t border-gray-100 pt-6 mt-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <span className="text-xs">{t('lastUpdated', { time: 'Demo data' })}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-blue-50 border border-blue-100 flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 text-[20px] mt-0.5">lightbulb</span>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('note')}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-semibold text-gray-900">EasyCalc</span>
          <div className="text-sm text-gray-400">© 2024 EasyCalc</div>
        </div>
      </footer>
    </div>
  );
}
