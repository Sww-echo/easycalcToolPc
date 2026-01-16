'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function MathPage() {
  const t = useTranslations('math');
  const tc = useTranslations('common');

  const mathTools = [
    { 
      id: "percentage",
      name: t('percentage.title'), 
      description: t('percentage.shortDesc'), 
      href: '/math/percentage', 
      icon: 'percent' 
    },
    { 
      id: "scientific",
      name: t('scientific.title'), 
      description: t('scientific.shortDesc'), 
      href: '/math/scientific', 
      icon: 'calculate' 
    },
  ];

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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">functions</span>
                {t('title')}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900">{t('title')}</h1>
            <p className="text-gray-500 text-lg font-light max-w-2xl leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mathTools.map((tool) => (
              <Link 
                key={tool.href}
                href={tool.href}
                className="group p-8 rounded-xl border border-gray-200 bg-white hover:border-black hover:shadow-lg transition-all duration-300 flex items-start gap-6"
              >
                <div className="size-14 rounded-xl bg-gray-50 text-gray-900 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">{tool.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{tool.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{tool.description}</p>
                </div>
                <div className="text-gray-300 group-hover:text-gray-900 transition-colors">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-semibold text-gray-900">EasyCalc</span>
          <div className="text-sm text-gray-400">© 2024 EasyCalc</div>
        </div>
      </footer>
    </div>
  );
}
