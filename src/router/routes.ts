import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/', // TODO: active-link not for all
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'sign', component: () => import('pages/SignUp.vue') },
      { path: 'remember', component: () => import('pages/RestoreFromMnemonic.vue') },
      { path: 'qr', component: () => import('pages/QrPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
