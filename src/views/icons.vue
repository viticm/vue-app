<template>

  <v-container grid-list-xl fluid>
    <iframe :src="uri" scrolling=auto id="show-iframe" />
  </v-container>

</template>

<script>

import iconJson from '@mdi/font/package.json'

export default {

  data () {
    return {
      uri: 'https://cdn.materialdesignicons.com/' + iconJson.version
    }
  },

  mounted(){
    const oIframe = document.getElementById('show-iframe')
    const deviceWidth = document.documentElement.clientWidth
    const deviceHeight = document.documentElement.clientHeight
    oIframe.style.width = deviceWidth + 'px'
    oIframe.style.height = deviceHeight + 'px'
  },

}

</script>
