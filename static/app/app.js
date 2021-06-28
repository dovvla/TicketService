const Registration = {template: '<registration></registration>'}
const Login = {template: '<login></login>'}
const NewManifestation = {template: '<newmanifestation></newmanifestation>'}
const HomePage = {template: '<homepage></homepage>'}
const Manifestation = {template: '<manifestation></manifestation>'}
const Cart = {template: '<cart></cart>'}


axios.defaults.baseURL = 'http://localhost:8080/api/'
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {path: '/', component: HomePage},
        {path: '/registration', component: Registration},
        {path: '/login', component: Login},
        {path: '/newManifestation', component: NewManifestation},
        {path: '/manifestation/:id', name: 'Manifestation', component: Manifestation},
        {path: '/cart', component: Cart}

    ]
});


var app = new Vue({
    router,
    el: '#tickets'
});