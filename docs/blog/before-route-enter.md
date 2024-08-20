---
groups: vue
title: script setup中使用beforeRouteEnter的方法
description: vue-router在vue3的script setup中没有提供beforeRouteEnter方法，通过曲线救国的方法使用beforeRouteEnter
outline: [2, 3]
---

# {{$frontmatter.title}}

vue-router 在 vue3 的 script setup 中没有提供 beforeRouteEnter 方法，通过曲线救国的方法使用 beforeRouteEnter：

```vue
<script lang="ts">
export default {
  beforeRouteEnter(to, form, next) {
    console.log("beforeRouteEnter", to, form);
    next((e) => {
      // @ts-ignore 这里ts识别不到。。
      e.beforeRouteEnter("一些数据");
    });
  },
};
</script>

<script setup lang="ts">
const beforeRouteEnter = (data: string) => {
  console.log(data);
};

defineExpose({
  beforeRouteEnter,
});
</script>
```
