import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";

const ROUTE_PATH = {
    HOME: "/",
    RESUME: "/resume",
};

const Home = () => import(/* webpackChunkName: "home" */ "./home/Home.vue");
const Resume = () =>
    import(/* webpackChunkName: "resume" */ "./resume/Resume.vue");
const MissingPage = () =>
    import(/* webpackChunkName: "missing-page" */ "./MissingPage.vue");

const routes = [
    {
        path: ROUTE_PATH.HOME,
        component: Home,
        meta: { title: "Personal Website" },
    },
    {
        path: ROUTE_PATH.RESUME,
        component: Resume,
        meta: { title: "Resume" },
    },
    {
        path: "*",
        component: MissingPage,
        meta: { title: "This page does not exist." },
    },
];

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.fullPath === ROUTE_PATH.HOME) {
        document.title = "vkolmakov.me";
    } else {
        document.title = `${to.meta.title} | vkolmakov.me`;
    }
    next();
});

const app = new Vue({
    router,
    el: "#app",
    render: (h) => h(App),
});

// Handle possible GH pages redirect
const GH_PAGES_REDIRECT_KEY = "_GH_PAGES_REDIRECT";
const potentialGhPagesRedirect = window.localStorage.getItem(
    GH_PAGES_REDIRECT_KEY
);

window.localStorage.removeItem(GH_PAGES_REDIRECT_KEY);

switch (potentialGhPagesRedirect) {
    case ROUTE_PATH.RESUME: {
        app.$router.push(potentialGhPagesRedirect);
        break;
    }
}
