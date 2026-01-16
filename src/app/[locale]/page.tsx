'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

export default function Home() {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const tCat = useTranslations('categories');

  return (
    <div className="bg-white text-text-main font-sans antialiased min-h-screen flex flex-col selection:bg-primary/10 selection:text-primary">
      <header className="sticky top-0 z-50 w-full bg-white border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            <div className="flex items-center gap-2 shrink-0">
              <div className="size-8 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl font-light">calculate</span>
              </div>
              <h1 className="hidden sm:block text-xl font-semibold tracking-tight text-text-main">EasyCalc</h1>
            </div>
            <div className="flex-1 max-w-lg hidden md:block">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 font-light">search</span>
                </div>
                <input 
                  className="block w-full pl-10 pr-3 py-2.5 border border-border-subtle rounded-lg leading-5 bg-gray-50 text-text-main placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200 sm:text-sm hover:bg-white" 
                  placeholder={tc('search')} 
                  type="text" 
                />
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <LocaleSwitcher />
              <button className="text-sm font-medium text-text-secondary hover:text-primary transition-colors px-3 py-2">
                {tc('login')}
              </button>
              <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                <span>{tc('getStarted')}</span>
              </button>
            </div>
          </div>
          <div className="md:hidden pb-4">
            <input 
              className="block w-full px-4 py-2 border border-border-subtle rounded-lg bg-gray-50 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none" 
              placeholder={tc('searchShort')} 
              type="text" 
            />
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-semibold uppercase tracking-wider border border-blue-100">
              {t('version')}
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-text-main">
              {t('title')}<br />
              <span className="text-primary">{t('titleHighlight')}</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              {t('description')}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/finance/mortgage" className="h-12 px-8 rounded-lg bg-text-main hover:bg-black text-white font-medium transition-all hover:-translate-y-0.5 shadow-lg shadow-gray-200 flex items-center gap-2">
                {t('startNow')}
              </Link>
              <a href="#" className="h-12 px-8 rounded-lg border border-border-subtle hover:border-gray-300 text-text-main font-medium transition-colors flex items-center gap-2 bg-white">
                <span className="material-symbols-outlined text-[20px]">star</span>
                {t('github')}
              </a>
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[400px]">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gray-50 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute inset-0 bg-white rounded-2xl border border-border-subtle shadow-xl shadow-gray-100/50 p-6 flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-50 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <div>
                    <div className="h-2 w-24 bg-gray-100 rounded mb-1.5"></div>
                    <div className="h-2 w-16 bg-gray-50 rounded"></div>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full border border-dashed border-gray-200"></div>
              </div>
              <div className="space-y-6 flex-1">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="h-2 w-20 bg-gray-100 rounded"></div>
                    <div className="text-3xl font-light text-text-main">$12,450<span className="text-gray-300">.00</span></div>
                  </div>
                  <div className="h-8 w-20 bg-green-50 text-green-600 rounded-md flex items-center justify-center text-xs font-medium">+2.4%</div>
                </div>
                <div className="h-32 w-full flex items-end gap-2 px-1">
                  <div className="w-full bg-gray-50 rounded-t-sm h-[40%]"></div>
                  <div className="w-full bg-gray-100 rounded-t-sm h-[60%]"></div>
                  <div className="w-full bg-blue-100 rounded-t-sm h-[35%]"></div>
                  <div className="w-full bg-primary/80 rounded-t-sm h-[80%]"></div>
                  <div className="w-full bg-gray-50 rounded-t-sm h-[55%]"></div>
                  <div className="w-full bg-gray-100 rounded-t-sm h-[45%]"></div>
                </div>
                <div className="pt-4 border-t border-gray-50 flex gap-4">
                  <div className="h-2 w-full bg-gray-50 rounded"></div>
                  <div className="h-2 w-1/2 bg-gray-50 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-text-main">{t('popularTools')}</h2>
            <Link className="text-sm font-medium text-text-secondary hover:text-primary transition-colors flex items-center gap-1" href="#">
              {tc('viewAll')} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="group flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border border-border-subtle bg-white hover:border-primary/30 hover:shadow-sm transition-all" href="/finance/mortgage">
              <div className="w-8 h-8 rounded-full bg-gray-50 text-text-main group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[18px]">real_estate_agent</span>
              </div>
              <span className="text-sm font-medium text-text-main">Mortgage</span>
            </Link>
            <Link className="group flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border border-border-subtle bg-white hover:border-primary/30 hover:shadow-sm transition-all" href="/life/bmi">
              <div className="w-8 h-8 rounded-full bg-gray-50 text-text-main group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[18px]">monitor_heart</span>
              </div>
              <span className="text-sm font-medium text-text-main">BMI Calculator</span>
            </Link>
            <Link className="group flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border border-border-subtle bg-white hover:border-primary/30 hover:shadow-sm transition-all" href="/currency/exchange">
              <div className="w-8 h-8 rounded-full bg-gray-50 text-text-main group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[18px]">currency_exchange</span>
              </div>
              <span className="text-sm font-medium text-text-main">Exchange Rate</span>
            </Link>
            <Link className="group flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border border-border-subtle bg-white hover:border-primary/30 hover:shadow-sm transition-all" href="/math/percentage">
              <div className="w-8 h-8 rounded-full bg-gray-50 text-text-main group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[18px]">percent</span>
              </div>
              <span className="text-sm font-medium text-text-main">Percentage</span>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text-main mb-8">{t('categories')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link className="group p-6 rounded-xl border border-border-subtle bg-white hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col items-start gap-4 h-full" href="/finance">
              <div className="w-12 h-12 rounded-lg bg-gray-50 text-text-main group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-2xl font-light">payments</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-main">{tCat('finance.title')}</h3>
                <p className="text-sm text-text-secondary mt-1">{tCat('finance.description')}</p>
              </div>
            </Link>
            <Link className="group p-6 rounded-xl border border-border-subtle bg-white hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col items-start gap-4 h-full" href="/currency">
              <div className="w-12 h-12 rounded-lg bg-gray-50 text-text-main group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-2xl font-light">currency_exchange</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-main">{tCat('currency.title')}</h3>
                <p className="text-sm text-text-secondary mt-1">{tCat('currency.description')}</p>
              </div>
            </Link>
            <Link className="group p-6 rounded-xl border border-border-subtle bg-white hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col items-start gap-4 h-full" href="/unit">
              <div className="w-12 h-12 rounded-lg bg-gray-50 text-text-main group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-2xl font-light">square_foot</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-main">{tCat('unit.title')}</h3>
                <p className="text-sm text-text-secondary mt-1">{tCat('unit.description')}</p>
              </div>
            </Link>
            <Link className="group p-6 rounded-xl border border-border-subtle bg-white hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col items-start gap-4 h-full" href="/life">
              <div className="w-12 h-12 rounded-lg bg-gray-50 text-text-main group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-2xl font-light">ecg_heart</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-main">{tCat('life.title')}</h3>
                <p className="text-sm text-text-secondary mt-1">{tCat('life.description')}</p>
              </div>
            </Link>
            <Link className="group p-6 rounded-xl border border-border-subtle bg-white hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col items-start gap-4 h-full" href="/math">
              <div className="w-12 h-12 rounded-lg bg-gray-50 text-text-main group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-2xl font-light">functions</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-main">{tCat('math.title')}</h3>
                <p className="text-sm text-text-secondary mt-1">{tCat('math.description')}</p>
              </div>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-xl border border-border-subtle bg-gray-50/50 flex flex-col justify-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined">lock</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-main mb-2">{t('privacyFirst')}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{t('privacyDesc')}</p>
            </div>
          </div>
          <div className="p-8 rounded-xl border border-border-subtle bg-gray-50/50 flex flex-col justify-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-main mb-2">{t('lightningFast')}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{t('lightningDesc')}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border-subtle bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="size-6 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined font-bold text-xl">calculate</span>
            </div>
            <span className="font-semibold text-text-main">EasyCalc</span>
          </div>
          <div className="flex gap-8 text-sm text-text-secondary">
            <a className="hover:text-primary transition-colors" href="#">{tc('privacy')}</a>
            <a className="hover:text-primary transition-colors" href="#">{tc('terms')}</a>
            <a className="hover:text-primary transition-colors" href="#">{tc('about')}</a>
          </div>
          <div className="text-sm text-gray-400">
            © 2024 EasyCalc
          </div>
        </div>
      </footer>
    </div>
  );
}
