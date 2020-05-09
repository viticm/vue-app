/**
 * Vue app ( https://github.com/viticm/vue-app )
 * $Id vuetify.js
 * @link https://github.com/viticm/vue-app for the canonical source repository
 * @copyright Copyright (c) 2014- viticm( viticm.ti@gmail.com )
 * @license
 * @user viticm<viticm.ti@gmail.com>
 * @date 2020/04/27 22:49
 * @uses vue app vuetify plugin.
 */
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import * as directives from 'vuetify/es5/directives'
// import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import 'material-design-icons/iconfont/material-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from '@/lang'
import Snackbar from '@/components/snackbar/index'
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'
import echarts from 'echarts'

Vue.use(Vuetify)

const opts = {
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
  customProperties: true,
  directives,
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  }
}

const vuetify = new Vuetify(opts)

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

Vue.prototype.$message = Snackbar
Vue.prototype.$echarts = echarts

export default vuetify
