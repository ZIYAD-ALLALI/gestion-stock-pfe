import Vue from 'vue'
import VueRouter from 'vue-router'
import Acceuil from '../views/Acceuil.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Acceuil',
    component: Acceuil,
    children: [{
            path: '/Clients',
            component: () =>
                import ('../views/Clients.vue')
        },
        {
            path: '/Fournisseurs',
            component: () =>
                import ('../views/Fournisseurs.vue')
        },
        {
            path: '/Partenaires',
            component: () =>
                import ('../views/Partenaires.vue')
        },
        {
            path: '/CommandesClient',
            component: () =>
                import ('../views/CommandesClient.vue')
        },
        {
            path: '/Produits',
            component: () =>
                import ('../views/Produits.vue')
        },
        {
            path: '/Tissus',
            component: () =>
                import ('../views/Tissus.vue')
        },
        {
            path: '/test',
            component: () =>
                import ('../views/AjoutCommandeClient.vue')
        },

        //   {
        //       path: '/clients',
        //       component: () =>
        //           import ('../views/Clients.vue')
        //   },
        //   {
        //       path: '/clients/nouveau',
        //       component: () =>
        //           import ('../components/AjoutClient.vue')
        //   },
        //   {
        //       path: '/fournisseurs',
        //       component: () =>
        //           import ('../views/Fournisseurs.vue')
        //   },
        //   {
        //       path: '/stock/Tissu',
        //       component: () =>
        //           import ('../views/StockTissu.vue')
        //   },
        //   {
        //       path: '/stock/Produits',
        //       component: () =>
        //           import ('../views/StockProduits.vue')
        //   }

    ]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router