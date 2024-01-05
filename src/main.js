import { createApp } from "vue";  
import "normalize.css/normalize.css"
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as ElIcons from "@element-plus/icons-vue";
import i18n from "./i18n";
import './mock'
import CmTable from '@/components/CmTable.vue'

const app = createApp(App);
for (const name in ElIcons) {
  app.component(name, ElIcons[name]);
}

app.component(CmTable.name, CmTable)
app.use(router);
app.use(store);
app.use(i18n);
app.mount("#app");
