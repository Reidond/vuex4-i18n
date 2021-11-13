<script>
import Intro from "../../example-shared/components/intro.vue";

export default {
  components: {
    Intro,
  },
};
</script>

<template>
  <div :class="$style.app">
    <Intro />
    <router-view :class="$style.content" />
  </div>
</template>

<style lang="stylus" module>
@require('../../example-shared/styles/reset.styl');

:global body {
  background: #fff;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  color: rgb(64, 64, 64);
}

.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 20px;
  max-width: 640px;
  margin: 40px auto;
}
</style>
