'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function LifePage() {
  const t = useTranslations('life');
  const tc = useTranslations('common');

  const lifeTools = [
    {
      id: "bmi",
      name: t('bmi.title'),
      desc: t('bmi.shortDesc'),
      icon: "monitor_weight",
      href: "/life/bmi",
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "age",
      name: t('age.title'),
      desc: t('age.shortDesc'),
      icon: "cake",
      href: "/life/age",
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: "date",
      name: t('date.title'),
      desc: t('date.shortDesc'),
      icon: "calendar_month",
      href: "/life/date",
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="size-8 rounded-xl bg-black text-white flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-[20px]">calculate</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:opacity-80 transition-opacity">EasyCalc</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">{tc('home')}</Link>
              <Link href="/finance" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">{tc('finance')}</Link>
              <Link href="/life" className="text-sm font-medium text-gray-900 transition-colors">{tc('life')}</Link>
              <Link href="/currency" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">{tc('currency')}</Link>
              <Link href="/unit" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">{tc('unit')}</Link>
              <Link href="/math" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">{tc('math')}</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <button className="text-sm font-semibold bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              {tc('getStarted')}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-[16px]">favorite</span>
            {t('title')}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifeTools.map((tool) => (
            <Link 
              key={tool.id}
              href={tool.href}
              className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                <span className="material-symbols-outlined text-[80px] text-black">arrow_outward</span>
              </div>
              
              <div className={`size-14 rounded-xl ${tool.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-symbols-outlined text-[28px]">{tool.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {tool.desc}
              </p>
              
              <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:translate-x-1 transition-transform">
                {tc('calculate')}
                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} EasyCalc. {tc('privacy')} &bull; {tc('terms')}</p>
        </div>
      </footer>
    </div>
  );
}
