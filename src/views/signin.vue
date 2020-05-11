<template>
  <div class="panel-wrapper">
    <!--
    <span class="logo">
      <img
        src="../assets/logo.png"
        alt=""
      >
    </span>
    -->

    <div class="slogan-wrapper">
      <div class="slogan">
        <img
          src="../assets/login-bg2.svg"
          alt=""
        >
      </div>
    </div>

    <div class="panel-content">
      <v-app class="login-con">
        <!-- <v-spacer></v-spacer> -->
        <div align="right">
          <locales-menu />
        </div>
        <v-content>
          <v-container
            fluid
            fill-height
          >
            <v-layout
              align-center
              justify-center
            >
              <v-flex class="frame">
                <h1 v-if="!isMobile">
                  {{ $t('signin.title')}}
                </h1>
                <v-form 
                  ref="form" 
                  v-model="valid"
                  :lazy-validation="lazy"
                  >
                  <v-text-field
                    v-model="form.username"
                    :rules="usernameRules"
                    prepend-icon="mdi-account"
                    clearable
                    :label="$t('signin.username')"
                    @keyup.enter.native="login"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="form.password"
                    :rules="passwordRules"
                    prepend-icon="mdi-lock"
                    @keyup.enter.native="login"
                    :append-icon="showPwd ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPwd ? 'text' : 'password'"
                    @click:append="showPwd = !showPwd"
                    :label="$t('signin.password')"
                    required
                  ></v-text-field>
                  <v-layout
                    column
                    wrap
                    justify-end
                    align-end
                  >
                    <v-flex>
                      <v-btn
                        small
                        color="primary"
                        @click="redirectForgotPassword"
                      >
                        {{ $t('signin.forgetPassword') }}
                      </v-btn>
                    </v-flex>
                    <v-flex>
                      <v-btn
												class="ma-2"
												small
                        :loading="loginLoading"
                        :disabled="!valid"
                        @click="handleLogin"
												color="success"
                      >
                         {{ $t('signin.signin') }}
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>

        <!--
        <v-footer
          height="auto"
        >
          <v-layout>
            <v-flex text-xs-center>
              <span>&copy; {{ currentYear }}</span>
            </v-flex>
          </v-layout>
        </v-footer>
        -->
      </v-app>
    </div>
  </div>
</template>

<script>
import { isMobile } from '@/utils/util'
import { validUsername, validEmail  } from '@/utils/validate'
// import BaseLangbar from '@/components/widgets/BaseLangbar.vue';
import LocalesMenu from '@/components/widgets/LocalesMenu.vue'

export default {
  name: 'Signin',
  components: {
    // BaseLangbar,
    LocalesMenu,
  },
  data() {
    return {
      form: {
        username: 'leafly.ti@hotmail.com',
        password: '123456'
      },
      capsTooltip: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      currentYear: new Date().getFullYear(),
      showPwd: false,
      loginLoading: false,
      valid: true,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (validUsername(v) || validEmail(v)) || 'Userame must be valid',
      ],
      passwordRules: [
        v => !!v || 'E-mail is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],
      lazy: false,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
   },
  computed: { 
    isMobile() {
      return isMobile()
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
    this.$vuetify.theme.dark = this.$store.state.settings.themeDark
  },
  mounted() {
    if (this.form.username === '') {
      this.$refs.username.focus()
    } else if (this.form.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    redirectForgotPassword() {
      console.log('redirectForgotPassword');
      this.$message({
        type: 'info',
        text: 'Ahem: Please add redirect function',
      })
    },
    handleLogin() {
      if (true === this.$refs.form.validate()) {
        this.loginLoading = true
        this.$store.dispatch('user/login', this.form)
          .then(() => {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          })
          .catch((res) => {
            console.log('login-failed', res)
          })
          .finally(() => {
            this.loginLoading = false
          })
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }  
  }
}
</script>

<style lang="scss">
@import '../styles/signin.scss';
@import '../styles/animation.scss';
</style>
