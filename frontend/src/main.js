import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import TabMenu from 'primevue/tabmenu';
import {createRouter, createWebHistory} from "vue-router";
import MovieInstagram from "@/components/MovieInstagram";
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';


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
