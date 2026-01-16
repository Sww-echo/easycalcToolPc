'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function UnitPage() {
  const t = useTranslations('unit');
  const tc = useTranslations('common');

  const unitTools = [
    {
      id: "length",
      name: t('length.title'),
      desc: t('length.shortDesc'),
      icon: "straigntens",
      href: "/unit/length",
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      id: "temperature",
      name: t('temperature.title'),
      desc: t('temperature.shortDesc'),
      icon: "thermostat",
      href: "/unit/temperature",
      color: "text-orange-600 bg-orange-50",
    },
    {
      id: "weight",
      name: t('weight.title'),
      desc: t('weight.shortDesc'),
      icon: "weight",
      href: "/unit/weight",
      color: "text-teal-600 bg-teal-50",
    },
  ];

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
            <Link className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors" href="/currency">{tc('currency')}</Link>
            <Link className="text-sm font-medium text-gray-900 transition-colors" href="/unit">{tc('unit')}</Link>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">straighten</span>
              {t('title')}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unitTools.map((tool) => (
            <Link 
              key={tool.id}
              href={tool.href}
              className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-black transition-all duration-300 flex flex-col items-start gap-4 hover:shadow-lg"
            >
              <div className={`size-12 rounded-xl ${tool.color} flex items-center justify-center transition-colors`}>
                <span className="material-symbols-outlined text-[24px]">{tool.icon}</span>
              </div>
              
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:underline decoration-1 underline-offset-4">{tool.name}</h3>
                  <span className="material-symbols-outlined text-gray-300 group-hover:text-black transition-colors">arrow_forward</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
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
