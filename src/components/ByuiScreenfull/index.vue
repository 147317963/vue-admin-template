<template>
<!--  全屏插件-->
  <span :title="isFullscreen ? '退出全屏' : '进入全屏'">
    <svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="click"
  /></span>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      this.Message({
        offset: 60,
        showClose: true,
        message: '开启全屏失败',
        type: "error",
        dangerouslyUseHTMLString: true,
        duration: messageDuration,
      });
      if (!screenfull.isEnabled) {

        return false;
      }
      screenfull.toggle();
      this.$emit("refresh");
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
