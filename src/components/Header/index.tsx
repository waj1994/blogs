/**
 * 头部
 */
'use client';
import { Metadata } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import GithubIcon from '@/assets/svg/github.svg';
import MoonIcon from '@/assets/svg/moon.svg';
import ReactIcon from '@/assets/svg/react.svg';
import SunIcon from '@/assets/svg/sun.svg';

export default function Header({ metadata }: { metadata: Metadata }) {
  const router = useRouter();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    setTheme(theme);
    document.documentElement.setAttribute('class', theme);
  }, []);

  /**
   * 切换主题
   */
  const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('class', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="w-full flex pt-66px">
      <div className="w-full flex justify-between">
        <h1 className="leading-60px">
          <a
            className="flex items-center text-20px font-600 text-black dark:text-white"
            href="#"
            onClick={() => router.push('/')}
          >
            <ReactIcon className="mr-10px w-42px h-42px" />
            {metadata.title as string}
          </a>
        </h1>
      </div>
      <div className="flex items-center">
        <a
          className="icon-btn mr-20px"
          href="https://github.com/wjie1994/blogs"
          target="_blank"
        >
          <GithubIcon />
        </a>
        <button
          hidden={usePathname() !== '/'}
          className="icon-btn"
          onClick={handleTheme}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </div>
  );
}
