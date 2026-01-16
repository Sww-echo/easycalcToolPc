'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function CurrencyPage() {
  const t = useTranslations('currency');
  const tc = useTranslations('common');

  const currencyTools = [
    {
      id: "exchange",
      name: t('exchange.title'),
      desc: t('exchange.shortDesc'),
      icon: "currency_exchange",
      href: "/currency/exchange",
      color: "bg-blue-600 text-white", // Blue 600 for Business blue
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="material-symbols-outlined text-[20px]">calculate</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">EasyCalc</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">{tc('home')}</Link>
              <Link href="/finance" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">{tc('finance')}</Link>
              <Link href="/life" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">{tc('life')}</Link>
              <Link href="/currency" className="text-sm font-medium text-blue-600 transition-colors">{tc('currency')}</Link>
              <Link href="/unit" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">{tc('unit')}</Link>
              <Link href="/math" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">{tc('math')}</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <button className="text-sm font-semibold bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800 transition-all">
              {tc('getStarted')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-[16px]">payments</span>
            {t('title')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currencyTools.map((tool) => (
            <Link 
              key={tool.id}
              href={tool.href}
              className="group relative bg-slate-50 rounded-2xl p-8 hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <span className="material-symbols-outlined text-[100px] text-white">arrow_outward</span>
              </div>
              
              <div className={`size-12 rounded-lg ${tool.color} flex items-center justify-center mb-6 shadow-sm group-hover:bg-white group-hover:text-blue-600 transition-colors duration-300`}>
                <span className="material-symbols-outlined text-[24px]">{tool.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-white transition-colors">
                {tool.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 group-hover:text-blue-100 transition-colors">
                {tool.desc}
              </p>
              
              <div className="flex items-center text-sm font-bold text-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all">
                {tc('calculate')}
                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EasyCalc. {tc('privacy')} &bull; {tc('terms')}</p>
        </div>
      </footer>
    </div>
  );
}
