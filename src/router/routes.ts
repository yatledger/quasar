import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/', // TODO: active-link not for all
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'sign', component: () => import('pages/SignUp.vue') },
      { path: 'remember', component: () => import('pages/RestoreFromMnemonic.vue') },
      { path: 'qr', component: () => import('src/pages/ScanQr.vue') },
      { path: 'help', component: () => import('src/pages/HelpPage.vue') },
      { path: 'global', component: () => import('src/pages/TxGlobal.vue') },
      { path: 'myqr', component: () => import('src/pages/user/UserQR.vue') },
      { path: 'friends', component: () => import('src/pages/user/UserFriends.vue') },
      { path: 'tx', component: () => import('src/pages/user/UserTx.vue') },
      { path: 'profile', component: () => import('src/pages/user/UserProfile.vue') },
      { path: 'receive', component: () => import('src/pages/user/UserReceive.vue') },
      { path: 'crypto', component: () => import('src/pages/user/UserCrypto.vue') },
      { path: 'ask', component: () => import('src/pages/landing/AskPage.vue') },
      { path: 'earn', component: () => import('src/pages/landing/EarnPage.vue') },
      { path: 'spend', component: () => import('src/pages/landing/SpendPage.vue') }
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
