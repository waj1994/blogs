/**
 * 文章列表
 */
import dayjs from 'dayjs';
import Image from 'next/image';

export interface ArticleListItem {
  title: string;
  keywords: string;
  date: string;
  minutes: number;
  slug: string;
  description?: string;
}

export default async function ArticleList({
  list,
}: {
  list: ArticleListItem[];
}) {
  return (
    <ul className="mt-100px">
      {list.map((item) => (
        <li
          key={item.slug}
          className="mb-50px group"
        >
          <a
            className="flex flex-col md:flex-row items-center justify-between rounded-5px sm:rounded-0 article-list-item md:gap-24px xl:gap-96px bg-white dark:bg-#1D2128 !sm:bg-transparent list-item-shadow !sm:shadow-none"
            href={`/blog/${item.slug}`}
            target="_blank"
          >
            <div className="relative md:flex-1 w-full md:w-0 h-220px sm:mb-35px md:mb-0px -group-hover:transform-translate-y-1 list-img-shadow">
              <Image
                fill={true}
                src={`/docs-image/${item.slug}.png`}
                alt={`${item.title}图片`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
            <div className="w-full md:w-380px xl:w-488px shrink-0 px-20px py-30px sm:p-0">
              <h2 className="mb-10px text-black dark:text-white text-21px font-bold w-full ellipsis group-hover:text-#6166DC dark:group-hover:text-#E9DAAC">
                {item.title}
              </h2>
              <p className="mb-10px text-#73737D text-16px ellipsis">
                {item.description}
              </p>
              <div className="text-#73737D text-16px opacity-33">
                <span>{dayjs(item.date).format('YYYY-MM-DD')} </span>
                <span>· {item.minutes} min read</span>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
