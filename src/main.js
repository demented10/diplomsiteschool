import { createApp} from 'vue';
import App from './App.vue';
import LoadScript from "vue-plugin-load-script";
import router from 'vue-router';
import { Vue3Html2pdf } from 'vue3-html2pdf';


const app = createApp(App);



app.use(router).use(LoadScript).use(Vue3Html2pdf).mount('#app');

