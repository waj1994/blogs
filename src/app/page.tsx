import fs from 'node:fs/promises';

import ArticleList from '@/components/ArticleList';
import Avatar from '@/components/Avatar';
import { type ArticleListItem } from '../components/ArticleList';

export default async function Home() {
  const res = await fs.readFile(`./src/docs-list.json`, 'utf-8');
  const list = JSON.parse(res) as ArticleListItem[];

  return (
    <main>
      <div className="text-32px sm:text-38px md:text-52px my-100px font-600 leading-[1.5] text-black dark:text-white">
        小王说前端
        <br />
        website
      </div>
      <div className="hidden sm:flex items-center text-14px text-#73737D">
        <Avatar className="mr-20px" />
        混迹前端多年的一个很菜很菜的coder
      </div>
      <ArticleList list={list || []} />
    </main>
  );
}
