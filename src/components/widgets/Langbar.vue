<template>
  <div align="right">
    <v-menu
      v-model="value"
      :disabled="disabled"
      :absolute="absolute"
      :open-on-hover="openOnHover"
      :close-on-click="closeOnClick"
      :close-on-content-click="closeOnContentClick"
      :offset-x="offsetX"
      :offset-y="offsetY"
      transition="slide-x-transition"
      bottom
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
          icon
        >
          <v-icon>spellcheck</v-icon>
        </v-btn>
      </template>
      <v-list dense subheader>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
					:disabled="language===item.value"
          @click="handleSetLanguage(item.value)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
		computed: {                                                                      
			language() {                                                                   
				return this.$store.getters.language                                          
			}                                                                              
		},                                                                               
		methods: {                                                                       
			handleSetLanguage(lang) {                                                      
				this.$i18n.locale = lang                                                     
				this.$store.dispatch('app/setLanguage', lang)                                
        this.$dialog.message.success('Switch Language Success', {position: 'top'})
			}                                                                              
		},      
    data: () => ({
      items: [
        { title: '中文', value: 'zh' },
        { title: 'English', value: 'en' }
      ],
      disabled: false,
      absolute: false,
      openOnHover: false,
      value: false,
      closeOnClick: true,
      closeOnContentClick: true,
      offsetX: false,
      offsetY: true,
    }),
  }
</script>
