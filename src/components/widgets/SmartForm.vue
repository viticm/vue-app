<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id SmartForm.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/05/19 20:31
 - @uses This is a smart form widget.
-->
<template>
  <v-card shaped raised>
    <v-card-title class="cyan--text text--lighten-1">
      {{ title || defaultTitle }}
    </v-card-title>
    <v-col cols="12">
      <template v-for="(value, key) in items">
        <template v-if="typeof value === 'boolean'">
          <v-switch v-model="items[key]" :key="key">
            <template v-slot:label>
              {{ key }}
              <v-btn icon @click="smartFormRemove(key)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-switch>
        </template>
        <template v-else>
          <v-text-field
            :key="key"
            :label="key"
            :rules="rules || defaultRules"
            v-model="items[key]"
            hide-details="auto"
            append-icon="mdi-delete"
            @click:append="smartFormRemove(key)"
            >
          </v-text-field>
        </template>
      </template>
      <v-spacer />
      <v-form ref="smartForm">
        <v-row align="center">
          <v-col sm="6" md="4">
            <v-text-field 
              :label="$t('common.name')" 
              v-model="name" 
              :rules="nameRules" 
              />
          </v-col>
          <v-col sm="6" md="4">
            <v-text-field :label="$t('common.value')" v-model="value" />
          </v-col>
          <v-col md="2">
            <v-btn color="primary" @click="add()">{{ $t('common.new') }}</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-card>
</template>

<script>

import i18n from '@/lang'

export default {

  data: () => {
    return {
      // defaultItems: {name: 'Test', value: 'test'},
      defaultRules: [
        v => !!v || 'Value is required',
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => /^[A-Za-z]+([A-Za-z-]*)[A-Za-z]$/.test(v) || 'Name is invalid'
      ],
      defaultTitle: 'Smart Form',
      name: '',
      value: ''
    }
  },
  methods: {
    smartFormRemove (key) {
      const newItems = Object.assign({}, this.items)
      delete newItems[key]
      this.$emit('update:items', newItems)
      // this.items = Object.assign({}, this.items)
    },
    reset () {
      this.name = ''
      this.value = ''
      this.$refs.smartForm.resetValidation()
    },
    add () {
      if (! this.$refs.smartForm.validate()) {
        return
      }
      if (this.items[this.name]) {
        this.$dialog.message.error(
            i18n.t('common.nameRepeat'), {position: 'top'})
        return
      }
      const newItems = Object.assign({}, this.items)
      let value = this.value
      if ('true' === value || 'false' === value) {
        value = 'true' === value ? true : false
      }
      newItems[this.name] = value
      this.$emit('update:items', newItems)
      // console.log('name value', this.name, this.value)
    }
  },
  props: ['items', 'rules', 'title']

}

</script>
