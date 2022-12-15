import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import materialKit from "./material-kit";
import * as Icons from '@element-plus/icons-vue'
import axios from 'axios';


const app = createApp(App);

app.config.globalProperties.$http = axios;

for (let iconName in Icons) {
    app.component(iconName, Icons[iconName])
}
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(materialKit);
app.mount('#app');