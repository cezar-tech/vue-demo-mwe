import MovieInstagram from "@/components/MovieInstagram";
import "primeicons/primeicons.css";
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Card from 'primevue/card';
import Column from 'primevue/column';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-blue/theme.css";
import TabMenu from 'primevue/tabmenu';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';


const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/ashero/:user",
            component: MovieInstagram, name: "ashero"
        }
    ]
});

app.use(PrimeVue);
app.use(InputText);
app.use(AvatarGroup);
app.use(Avatar);
app.use(DataTable);
app.use(Column);
app.use(Card);
app.use(TabMenu);
app.use(Divider);
app.use(router);
app.mount('#app');
