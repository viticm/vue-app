<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id SomeoneDetail.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/12/22 19:53
 - @uses Someone detail component.
-->
<template>
  
  <v-container fluid>
    <v-form ref="form">
      <v-row>
        <v-col cols="12">
           <v-text-field 
            v-model="item.name" 
            :label="$t('common.name')"
            :rules="nameRules"/>
        </v-col>
        <v-col cols="12">
					<v-radio-group v-model="item.sex" mandatory :label="$t('common.sex')">
						<v-radio value="1" :label="$t('common.male')">
						</v-radio>
						<v-radio value="0" :label="$t('common.female')">
						</v-radio>
					</v-radio-group>
        </v-col>
        <v-col cols="12">
           <v-text-field 
            v-model="item.age" 
            :label="$t('common.age')"
            :rules="ageRules"/>
        </v-col>
        <v-col cols="12">
           <v-textarea 
            v-model="item.description" 
            :label="$t('common.description')"
            :rules="descriptionRules"/>
        </v-col>
        <v-col cols="12">
           <v-text-field 
            v-model="item.height" 
            :label="$t('common.height')"
            :rules="heightRules"/>
        </v-col>
        <v-col cols="12">
           <v-text-field 
            v-model="item.weight" 
            :label="$t('common.weight')"
            :rules="weightRules"/>
        </v-col>
        <v-col cols="12">
           <v-text-field 
            v-model="item.tel" 
            :label="$t('common.tel')"
            :rules="telRules"/>
        </v-col>

        <v-col cols="12">
          <v-spacer />
          <v-btn @click="save">{{ $t('common.submit') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

</template>

<script>

import { saveSomeone } from '@/api/someone'
import { validTel } from '@/utils/validate'

const defaultItem = {
  name: '懒猪',
  sex: 0,
  age: 20,
  description: '这家伙很懒，什么都没留下',
  height: '保密',
  weight: '保密',
  tel: 13611111111,
}

export default {
  
  data: () => {
    return {
      item: Object.assign({}, defaultItem),
      nameRules: [
        v => !!v || 'Name is required',
      ],
      ageRules: [
        v => !!v || 'Age is required',
        v => (v > 18 && v < 99) || 'Age error(18-99)'
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
      ],
      heightRules: [
        v => !!v || 'Height is required',
        // v => (v > 100 && v < 299) || 'Height error(100-299)'
      ],
      weightRules: [
        v => !!v || 'Weight is required',
        // v => (v > 50 && v < 299) || 'Weight error(50-299)'
      ],
      telRules: [
        v => !!v || 'Telephone is required',
        v => validTel(v) || 'Telephone error'
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
        console.log('the data', this.item)
        const r = await saveSomeone(this.item)
        if (20000 == r.code) {
          // this.item.id = r.data.id
          this.$dialog.message.success('你的申请已提交', {position: 'top'})
        }
      }
    },
  },
  created () {
    if (this.isEdit) {
      // const id = this.$route.params && this.$route.params.id
      // this.fetchData(id)
    }
  },


}

</script>
