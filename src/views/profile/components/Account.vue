<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id Account.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/02 09:22
 - @uses The profile account page.
-->
<template>
  <v-container>
    <v-form>
      <v-text-field 
        v-model="user.name"
        :label="$t('common.name')"
      >
      </v-text-field>
      <v-text-field 
        v-model="user.email"
        :label="$t('common.email')"
      >
      </v-text-field>
      <v-btn class="mr-4" @click="submit">{{ $t('common.update') }}</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  methods: {
    submit() {
      this.$dialog.message.success(
        'User information has been updated successfully')
    }
  }
}
</script>
