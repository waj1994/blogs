/**
 * 文章详情
 */
import dayjs from 'dayjs';
import matter from 'gray-matter';
import highlight from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'node:fs/promises';
import readingTime from 'reading-time';

import { ArticleListItem } from '@/components/ArticleList';
import Avatar from '@/components/Avatar';
import 'highlight.js/styles/panda-syntax-dark.css';
import Image from 'next/image';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await fs.readFile(`./src/docs/${params.slug}.md`, 'utf-8');

  const {
    data: { title, description, keywords },
  } = matter(res) as unknown as {
    data: ArticleListItem;
  };
  if (!title) {
    return {};
  }
  return {
    title,
    description,
    keywords: keywords?.split(',').join(),
  };
}

export async function generateStaticParams() {
  const res = await fs.readFile(`./src/docs-list.json`, 'utf-8');
  return (JSON.parse(res) as ArticleListItem[]).map(({ slug }) => ({
    slug,
  }));
}

export default async function Details({ params: { slug }, ...obj }: Props) {
  if (!slug) {
    notFound();
  }

  const res = await fs.readFile(`./src/docs/${slug}.md`, 'utf-8');

  const { data, content } = matter(res) as unknown as {
    data?: ArticleListItem;
    content: string;
  };

  if (!data?.title) {
    notFound();
  }

  const { minutes } = readingTime(content);

  const marked = new Marked(
    markedHighlight({
      highlight(code, lang) {
        const language = highlight.getLanguage(lang) ? lang : 'plaintext';
        return highlight.highlight(code, { language }).value;
      },
    }),
  );
  const h = marked.parse(content);

  return (
    <>
      <div>
        <header className="max-w-680px mx-auto mt-100px mb-70px sm:mb-120px">
          <h2 className="text-black dark:text-white text-32px sm:text-48px leading-[1.32] break-keep mb-25px font-bold">
            {data.title}
          </h2>
          <div className="flex items-center text-14px sm:text-18px text-#73737D">
            <Avatar
              className="hidden sm:block mr-14px"
              width={31}
              height={31}
            />
            <span className="font-bold">小王说前端</span>
            <span>
              ，{dayjs(data.date).format('YYYY-MM-DD')}
              <span> · {Math.ceil(minutes)} min read</span>
            </span>
          </div>
        </header>
        <main>
          <div className="max-w-944px mx-auto relative article-cover-img">
            <Image
              fill={true}
              src={`/docs-image/${slug}.png`}
              alt=""
            />
          </div>
          <div
            className="markdown-body max-w-680px mx-auto pt-160px pb-35px"
            dangerouslySetInnerHTML={{ __html: h }}
          ></div>
        </main>
      </div>
    </>
  );
}
