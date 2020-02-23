<template>
  <div class="time-container">
    <p style="font-weight: 500;color:#4e6e8e">创建时间:</p>
    <p style="color:#aaa;margin-left:0.3em">{{$page.frontmatter.date}}</p>
  </div>
</template>
<style scoped>
.time-container {
  display: flex;
  flex-direction: row;
  font-size: 0.9em;
}
</style>