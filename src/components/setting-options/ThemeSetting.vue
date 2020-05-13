<template>
  <div>
    <v-subheader class="pl-0">
      {{ $t('setting.theme') }}
    </v-subheader>
    <v-flex>
      <chrome-picker
        :class="[$style.colorPicker]"
        v-model="color"
      />
    </v-flex>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'

export default {
  name: 'ThemeSetting',
  components: {
    'chrome-picker': Chrome,
  },
  data() {
    return {
      color: '#1976D2',
    }
  },
  watch: {
    color(newVal) {
      console.log('newVal', newVal)
      const dark = this.$vuetify.theme.dark
      if (true === dark) {
        this.$vuetify.theme.themes.dark.primary = newVal.hex
      } else if (false === dark) {
        this.$vuetify.theme.themes.light.primary = newVal.hex
      } else {
        this.$vuetify.theme.primary = newVal.hex
      }
      // const { rgba } = newVal
      // this.$vuetify.theme.primary = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
    },
  },
  created() {
    // console.log('this.$vuetify.theme.primary', this.$vuetify.theme.primary)
  },
}
</script>

<style lang="scss" module>
.colorPicker {
  margin: auto
}
</style>
