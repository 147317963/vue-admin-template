//引入 element-ui
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/display.css";

import "@/styles/element-variables.scss";//修改过后的替换UI

Vue.use(ElementUI, {
  size: "small",
});
