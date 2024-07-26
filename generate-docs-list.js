const fs = require('fs/promises');
const matter = require('gray-matter');
const readingTime = require('reading-time');

async function generate() {
  const docs = await fs.readdir('./src/docs');
  const res = await Promise.all(
    docs.map(async (doc) => {
      const file = await fs.readFile(`./src/docs/${doc}`);
      const { data, content } = matter(file);
      const { minutes } = readingTime(content);
      return {
        ...data,
        minutes: Math.ceil(minutes),
        slug: doc.replace('.md', ''),
      };
    }),
  );
  await fs.writeFile(
    './src/docs-list.json',
    JSON.stringify(res.sort((a, b) => b.date - a.date)),
  );
}

generate();
