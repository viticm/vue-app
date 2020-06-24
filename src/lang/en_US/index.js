/**
 * Vue app ( https://github.com/viticm/vue-app )
 * $Id route.js
 * @link https://github.com/viticm/vue-app for the canonical source repository
 * @copyright Copyright (c) 2014- viticm( viticm.ti@gmail.com )
 * @license
 * @user viticm<viticm.ti@gmail.com>
 * @date 2020/04/27 20:04
 * @uses The vue app en_US route lang.
 */

import route from './route'
import common from './common'
import setting from './setting'
import errorLog from './error-log'
import table from './table'

export default {
  route: route,
  signin: {
    title: 'System login',
    signin: 'Signin',
    signout: 'Signout',
    username: 'Username',
    password: 'Password',
    forgetPassword: 'Forget Password?',
    thirdparty: 'Thirdparty',
    signoutComfirm: 'Are you sure sign out?'
  },
  errorLog: errorLog,
  common: common,
  setting: setting,
  table: table
}
