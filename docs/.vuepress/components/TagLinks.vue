<template lang="html">
  <div class="tag-container">
    <!-- <router-link class="tag-style"
      v-for="tag in $page.frontmatter.tags"
      :key="tag"
      :to="{ path: `/tags.html#${tag}` }"
    >
        <p>{{ tag }}</p>
    </router-link> -->
    <div v-for="tag in $page.frontmatter.tags"
      :key="tag"  class="tag-style" @click="goto(tag)">
        <p>{{ tag }}</p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goto: function(tag) {
      let path = `/tags.html#` + tag;
      this.$router.push(path);
    }
  }
};
</script>
<style scoped>
.tag-container {
  display: flex;
  flex-direction: row;
}
.tag-style {
  margin-right: 1em;
  cursor: pointer;
}
p {
  margin: 0;
  padding: 0.3em 0.9em;
  background-color: #6495ed;
  color: #fff;
  border-radius: 0.3em;
}
p:hover {
  background-color: #2b4490;
}
</style>