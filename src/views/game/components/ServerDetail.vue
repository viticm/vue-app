<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id serverDetail.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/07/17 09:44
 - @uses your description
-->
<template>
  
  <v-container fluid>
    <v-form ref="form">
      <v-row>
        <v-col cols="12">
           <v-text-field 
            v-model="item.host_name" 
            :label="$t('game.hostName')"
            :rules="hostNameRules"/>
        </v-col>
        <v-col cols="12">
           <v-text-field 
            v-model="item.inner_ip" 
            :label="$t('game.innerIP')"
            :rules="innerIPRules"/>
        </v-col>
        <v-col cols="12">
           <v-text-field 
            v-model="item.net_ip" 
            :label="$t('game.netIP')"
            :rules="netIPRules"/>
        </v-col>
        <v-col cols="12">
          <v-spacer />
          <v-btn @click="save">{{ $t('common.save') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

</template>

<script>

import { fetchServer, saveServer } from '@/api/game'
import { validIP } from '@/utils/validate'

const defaultItem = {
  id: undefined,
  host_name: '',
  inner_ip: '',
  net_ip: ''
}

export default {
  
  data: () => {
    return {
      item: Object.assign({}, defaultItem),
      hostNameRules: [
        v => !!v || 'Username is required',
      ],
      innerIPRules: [
        v => !!v || 'Inner IP is required',
				v => validIP(v) || 'Inner IP error'
      ],
      netIPRules: [
        v => !!v || 'Net IP is required',
				v => validIP(v) || 'Net IP error'
      ],
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async save () {
      if (true === this.$refs.form.validate()) {
        const r = await saveServer(this.item)
        if (20000 == r.code) {
          this.item.id = r.data.id
          this.$dialog.message.success('保存成功')
        }
      }
    },
    fetchData(id) {
      fetchServer(id).then(response => {
        this.item = response.data
      })
    }
  },
  created () {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },


}

</script>
