/**
 * Vue app ( https://github.com/viticm/vue-app )
 * $Id index.js
 * @link https://github.com/viticm/vue-app for the canonical source repository
 * @copyright Copyright (c) 2014- viticm( viticm.ti@gmail.com )
 * @license
 * @user viticm<viticm.ti@gmail.com>
 * @date 2020/04/27 20:06
 * @uses The zh_CN lang.
 */
import route from './route'
import common from './common'

export default {
  route,
  signin: {
    title: '系统登录',
    signin: '登录',
    username: '账号',
    password: '密码',
    forgetPassword: '忘记密码？',
    thirdparty: '第三方登录'
  },
  common: common,
}
