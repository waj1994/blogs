/**
 * 必应收录提交
 * indexNow
 */
import axios from "axios";
import { exec } from "child_process";

const host = "https://wj1994.cn";

async function submit(urlList) {
  try {
    const res = await axios("https://api.indexnow.org/IndexNow", {
      method: "post",
      data: {
        host,
        key: "4c4d9bc5972846db81278b68848e416c",
        keyLocation: `${host}/4c4d9bc5972846db81278b68848e416c.txt`,
        urlList,
      },
    });
    console.log(res.status, urlList, "链接已推送");
  } catch (error) {
    console.log(error);
  }
}

exec("git diff --name-status HEAD HEAD~1", (error, data) => {
  console.log(data);
  const list = data.split(/[\t\n]/).reduce((prev, next, index) => {
    if (
      index % 2 === 0 ||
      !next.startsWith("docs") ||
      !/\.(md|png|jpg|webp|jpeg|gif)/.test(next)
    ) {
      return prev;
    }
    let path = next.replace(/^docs\/(public\/image\/)?/, "");
    if (path.endsWith(".md")) {
      path = path.replace(/\.md$/, ".html");
      path === "index.html" && (path = "");
      return [...prev, path];
    }
    const [fileName, ...imagePath] = path.split("/").reverse();
    return [...prev, `${imagePath.reverse().join("/")}.html`];
  }, []);
  list.length && submit([...new Set(list)].map((item) => `${host}/${item}`));
});
