<template>
  <v-container>
    <v-row>
      <v-checkbox v-model="checkboxVal" label="apple" value="apple">
      </v-checkbox>
      <v-checkbox v-model="checkboxVal" label="banana" value="banana">
        banana
      </v-checkbox>
      <v-checkbox v-model="checkboxVal" label="orange" value="orange">
        orange
      </v-checkbox>
    </v-row>
    <v-row>
      <v-data-table 
        :headers="headers" 
        :items="desserts" 
        :key="key"
        hide-default-footer />
    </v-row>
  </v-container>
</template>

<script>
const defaultFormThead = ['apple', 'banana']

export default {
  data () {
    return {
      desserts: [
        {
          name: 'fruit-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'fruit-2',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-20'
        }
      ],
      key: 1,
      formTheadOptions: ['apple', 'banana', 'orange'],
      checkboxVal: defaultFormThead, // checkboxVal
      formThead: defaultFormThead // 默认表头 Default header
    }
  },
  computed: {
    headers () {
      let r = []
      this.formThead.forEach(name => {
        let one = {text: name, value: name}
        r.push(one)
      })
      return r
    }
  },
  watch: {
    checkboxVal (valArr) {
      this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
      this.key = this.key + 1
    }
  }
}
</script>
