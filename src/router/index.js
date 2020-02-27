import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Memory Game - Home Page',
      metaTags: [
        {
          name: 'description',
          content:
            'This is the home page for the accessible Memory Game using Vue.js.',
        },
      ],
    },
    component: Home,
  },
  {
    path: '/Instructions',
    name: 'Instructions',
    meta: {
      title: 'Memory Game - Instructions Page',
      metaTags: [
        {
          name: 'description',
          content:
            'This is the instructions page for the accessible Memory Game using Vue.js.',
        },
      ],
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Instructions.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
