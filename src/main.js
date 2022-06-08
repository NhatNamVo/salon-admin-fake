import { createApp } from 'vue';

import App from './App.vue';
import router from './routes/routes';
import './templates/template.scss';

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

const app = createApp(App);

app.use(router);
app.use(ElementPlus)

app.mount('#app')
