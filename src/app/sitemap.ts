import { ArticleListItem } from '@/components/ArticleList';
import { MetadataRoute } from 'next';
import fs from 'node:fs/promises';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fs.readFile(`./public/docs-list.json`, 'utf-8');
  const list = JSON.parse(res) as ArticleListItem[];

  const baseUrl = process.env.BASE_API_URL!;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...list.map((item) => ({
      url: `${baseUrl}/blog/${item.slug}`,
      lastModified: new Date(item.date),
    })),
  ];
}
