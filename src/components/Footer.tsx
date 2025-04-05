'use client';

import {usePathname, useRouter} from 'next/navigation';

const languages = [
  { code: 'en', label: '🇺🇸 English' },
  { code: 'ko', label: '🇰🇷 한국어' }
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const onSelectChange = (newLocale: string) => {
    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    router.push(newPathname);
  };

  const currentLocale = pathname.split('/')[1];

  return (
    <footer 
      className="bg-gray-100 py-4"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            © 2025 dotbydot. All rights reserved.
          </div>
          <div>
            <select
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={(e) => onSelectChange(e.target.value)}
              value={currentLocale}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
