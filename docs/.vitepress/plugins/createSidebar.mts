/**
 * 生成左侧菜单
 */
import { type DefaultTheme } from "vitepress/types/default-theme";
import path from "node:path";
import fs from "node:fs/promises";
import matter from "gray-matter";

const resolve = (...dir: string[]) => path.resolve(__dirname, ...dir);

interface Frontmatter {
  data: { title: string; groups: string };
}

/**
 * 解析文章  获取头部信息
 */
function analysis(str: string) {
  const valueBuffer = Buffer.from(str);
  try {
    return matter(valueBuffer) as unknown as Frontmatter;
  } catch (err) {
    console.log(err);
    return {} as Frontmatter;
  }
}

async function deepResolve(url: string) {
  const dirs = await fs.readdir(resolve(url));
  const excludeDir = [".vitepress", "public"];
  const result: (DefaultTheme.SidebarItem & { groups: string })[] = [];

  for (let index = 0; index < dirs.length; index++) {
    const item = dirs[index];
    if (excludeDir.includes(item)) {
      continue;
    }
    const uri = `${url}${item}`;
    const stat = await fs.stat(resolve(uri));
    // 文件夹
    if (stat.isDirectory()) {
      result.push(...(await deepResolve(uri)));
      continue;
    }
    const text = await fs.readFile(resolve(uri), "utf-8");
    const obj = analysis(text);
    result.push({
      text: obj.data.title,
      link: '/' + uri.replace(/\.\.\/\.\.\//g, "").split(".md")[0],
      groups: obj.data.groups,
    });
  }
  return result;
}

const createSidebar = async (): Promise<DefaultTheme.SidebarItem[]> => {
  const flatArr = await deepResolve("../../blog/");
  const result: DefaultTheme.Sidebar = [];
  flatArr.forEach((item) => {
    const { text, link, groups } = item;
    const target = result.find((el) => el.text === groups);
    if (target) {
      target.items = [...(target.items || []), { text, link }];
      return;
    }
    result.push({
      text: groups,
      items: [
        {
          text,
          link,
        },
      ],
    });
  });
  return result;
};

export default await createSidebar()