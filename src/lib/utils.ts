interface TreeNode {
  key?: string;
  title?: string;
  path?: string;
  children?: TreeNode[];
}

interface MenuItem {
  title: any;
  path: string;
  group: string[];
}

export function getMenuTree(arr: MenuItem[]) {
  const map = new Map();
  const tree: TreeNode[] = [];

  // 构建map以快速查找路径对应的数据
  arr.forEach((item) => map.set(item.path, item));

  arr.forEach((item) => {
    const group = item.group;
    let currentNode = tree;

    // 遍历除了最后一级的所有层级
    for (let i = 0; i < group.length - 1; i++) {
      const key = group[i];
      let node = currentNode.find((n) => n.key === key);

      if (!node) {
        node = {
          key,
          path: item.path.slice(0, item.path.indexOf("/", i + 1)),
          children: [],
        };
        currentNode.push(node);
      }

      currentNode = node.children || [];
    }

    // 处理最后一级
    const lastKey = group[group.length - 1];
    let leaf = currentNode.find((n) => n.key === lastKey);

    if (!leaf) {
      leaf = {
        key: lastKey,
        title: item.title,
        path: item.path,
      };
      currentNode.push(leaf);
    } else {
      Object.assign(leaf, { title: item.title, path: item.path });
    }
  });

  return tree;
}
