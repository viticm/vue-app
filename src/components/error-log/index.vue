<template>
  <div v-if="errorLogs.length > 0">
    <v-dialog v-model="visible">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" color="pink">
          <v-icon>mdi-bug</v-icon>
        </v-btn>
      </template>
       <v-card>
         <v-card-title>
           <span class="headline">Error Log</span>
         </v-card-title>
        <v-card-text>
          <v-container>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Message</th>
                    <th class="text-left">Stack</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in errorLogs" :key="item">
                    <td>
                      <div>
                        <span class="mr-4">Msg:</span>
                        <v-chip class="ma-2" color="red">
                          {{ item.err.message }}
                        </v-chip>
                      </div>
                      <br>
                      <div>
                        <span class="mr-4">Info: </span>
                        <v-chip class="ma-2" color="green">
                          {{ item.vm.$vnode.tag }} error in {{ item.info }}
                        </v-chip>
                      </div>
                      <br>
                      <div>
                        <span class="mr-4"> Url: </span>
                        <v-chip class="ma-2" color="secondary">
                          {{ item.url }}
                        </v-chip>
                      </div>
                    </td>
                    <td>
                      {{ item.err.stack }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'ErrorLog',
  data() {
    return {
      visible: false
    }
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs
    }
  },
  methods: {
    clearAll() {
      this.visible = false
      this.$store.dispatch('errorLog/clearErrorLog')
    }
  },
}
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
