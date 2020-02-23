<template lang="html">
  <div class="tag-container">
    <h3>标签：</h3>
    <router-link
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/tags.html#${tag}` }"
    >
      <h3>{{ tag }}</h3>
    </router-link>
  </div>
</template>
<style scoped>
.tag-container {
  display: flex;
  flex-direction: row;
}
h3 {
  margin-right: 1em;
}
</style>