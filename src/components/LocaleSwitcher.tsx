'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/config';

const localeNames: Record<string, string> = {
  en: 'EN',
  zh: '中文',
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    // 替换当前路径中的 locale
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="relative inline-flex items-center">
      <select 
        value={locale} 
        onChange={(e) => switchLocale(e.target.value)}
        className="appearance-none bg-transparent border border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <span className="material-symbols-outlined text-gray-400 text-[16px]">expand_more</span>
      </div>
    </div>
  );
}
