import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
// import OrderList from 'primevue/orderlist';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);
// app.use(OrderList);
app.use(DataTable);
app.use(Column);
app.use(Card);
app.mount('#app');
