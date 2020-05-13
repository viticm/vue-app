<template>
  <div>
    <v-subheader class="pl-0">
      {{ $t('setting.other') }}
    </v-subheader>
    <v-flex>
      <!-- <v-switch
        :label="`Clipped: ${clipped.toString()}`"
        v-model="clipped"
      ></v-switch> -->
      <v-switch
        color="primary"
        v-model="themeDark"
        :label="`${$t('setting.darkModel')}: ${themeDark.toString()}`"
        @change="changeThemeDark"
      />
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data() {
    return {
      clipped: false,
      themeDark: this.$store.state.settings.themeDark
    }
  },
  watch: {
    themeDark(value) {
      this.$vuetify.theme.dark = value
      this.$store.dispatch('settings/changeSetting', {
        key: 'themeDark',
        value: value
      })
    }
  },
  methods: {
    changeThemeDark() {
      this.$emit('toggleThemeDark', this.themeDark)
    }
  }
}
</script>
