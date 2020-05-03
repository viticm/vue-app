<template>
  <v-row justify="center">
   <v-dialog
      v-model="dialog"
      max-width="290"
      :color="color || type"
    >
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>

        <v-card-text>
          {{ text  }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            {{ cancelButtonText }}
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            {{ confirmButtonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
				titile: 'Title',
        color: null,
        text: 'The dialog message',
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
      }
    },
  }
</script>
