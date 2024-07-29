import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import Script from 'next/script';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: `process.env.SITE_TITLE`,
  description:
    '欢迎来到一个跟前端相关的博客。这里有js、vue、react、node等相关的知识点，还有常见的面识题，日常开发中遇到的一些比较难搞的问题等等；我们从基本使用，到底层原理，从方方面面带您领略前端的魅力。让我们一起加油，成为优秀的前端coder。',
  other: {
    'msvalidate.01': '37DF9FCEF8FB058D63E35D0264ED92D8',
    'baidu-site-verification': 'codeva-7WLMk36AAG',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="/js/baidu.js" />
      <body className="relative bg-white dark:bg-#111216">
        <div className="max-w-full sm:max-w-567px md:max-w-850px xl:max-w-1220px mx-auto px-20px sm:px-40px">
          <Header metadata={metadata} />
          <div>{children}</div>
          <Footer />
        </div>
        <SpeedInsights />
        <div className="absolute bottom-0 left-0 -z-1 w-full h-590px pointer-events-none bottom-shadow"></div>
        <div className="absolute bottom-0 left-0 -z-1 w-full h-590px pointer-events-none bottom-shadow"></div>
      </body>
    </html>
  );
}
