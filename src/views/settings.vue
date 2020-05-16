<template>
  <v-container grid-list-xl fluid>
    <v-card
      class="overflow-hidden"
    >
      <v-toolbar
        flat
      >
        <v-icon>mdi-remote-desktop</v-icon>
        <v-toolbar-title class="font-weight-light">
          {{ $t('common.settings') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          fab
          small
          @click="isEditing = !isEditing"
        >
          <v-icon v-if="isEditing">mdi-close</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form 
          ref="form" 
          v-model="valid"
          :lazy-validation="lazy"
          >

        <v-text-field
          v-model="form.api"
          :rules="uriRules"
          :disabled="!isEditing"
          color="white"
          label="API"
        />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isEditing"
          color="success"
          @click="save"
        >
          {{ $t('common.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
	</v-container>
</template>

<script>

  import { validURL } from '@/utils/validate'

  export default {
    data () {
      return {
        form: {
          api: 'https://leafly.goho.co/lumen-api/',
        },
        uriRules: [
          v => !!v || 'API required',
          v => validURL(v) || 'API must be a right url',
        ],
        hasSaved: false,
        lazy: false,
        valid: true,
        isEditing: null
      }
    },

    methods: {
      save () {
        if (true === this.$refs.form.validate()) {
          this.isEditing = !this.isEditing
          this.hasSaved = true
          console.log('api', this.form.api)
        }  
      },
    },
  }
</script>
