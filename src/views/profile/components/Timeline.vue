<!--
 - VUE ELEMENT ADMIN ( https://github.com/viticm/vue-element-admin )
 - $Id Timeline.vue
 - @link https://github.com/viticm/vue-element-admin for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/02 14:29
 - @uses The timeline page.
-->
<template>
  <v-container fluid>
    <v-timeline>
      <v-timeline-item 
        small
        v-for="(item,index) of timeline" 
        :key="index" 
				:color="item.color"
        placement="top">
				<template v-slot:opposite>
					<span
						:class="`headline font-weight-bold ${item.color}--text`"
						v-text="item.timestamp"
					></span>
				</template>

        <v-card>
          <h2 :class="`headline font-weight-light mb-4 ${item.color}--text`">
						{{ item.title }}
					</h2>
          <p>{{ item.content }}</p>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2020/5/20',
          color: 'cyan',
          title: 'Update Github template',
          content: 'Leafly committed 2020/5/20 20:01'
        },
        {
          timestamp: '2020/5/20',
          color: 'green',
          title: 'Update Github template',
          content: 'Leafly committed 2020/5/20 20:01'
        },
        {
          timestamp: '2020/5/20',
          color: 'pink',
          title: 'Update Github template',
          content: 'Leafly committed 2020/5/20 20:01'
        },
        {
          timestamp: '2020/5/20',
          color: 'amber',
          title: 'Update Github template',
          content: 'Leafly committed 2020/5/20 20:01'
        },
        {
          timestamp: '2020/5/20',
          color: 'orange',
          title: 'Update Github template',
          content: 'Leafly committed 2020/5/20 20:01'
        },

      ]
    }
  }
}
</script>

