<template>

  <v-container grid-list-xl fluid>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="path"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t('common.routeTable')}}
          </v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                {{ $t('common.new') }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field 
                        v-model="editedItem.name" 
                        :label="$t('common.name')">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field 
                        v-model="editedItem.path" 
                        :label="$t('common.path')">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field 
                        v-model="editedItem.redirect" 
                        :label="$t('common.redirect')">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  {{ $t('common.cancel') }}
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  {{ $t('common.save') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import { getTable } from '@/api/route'
  import i18n from '@/lang'
  export default {
    data: () => ({
      dialog: false,
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        path: '',
        redirect: '',
      },
      defaultItem: {
        name: '',
        path: '',
        redirect: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 
          this.$t('common.new') : 
          this.$t('common.edit')
      },
      headers () {
        return [
          {
            text: i18n.t('common.name'),
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: i18n.t('common.path'), value: 'path' },
          { text: i18n.t('common.component'), value: 'component' },
          { text: i18n.t('common.redirect'), value: 'redirect' },
          { text: i18n.t('common.meta'), value: 'meta', sortable: false},
          { text: i18n.t('common.children'), value: 'children', sortable: false },
          { text: i18n.t('common.alwaysShow'), value: 'alwaysShow'},
          { text: i18n.t('common.hidden'), value: 'hidden'},
          { text: i18n.t('common.root'), value: 'root'},
          { text: i18n.t('common.constant'), value: 'constant'},
          { text: i18n.t('common.actions'), value: 'actions', sortable: false },
        ]
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        const r = await getTable()
        if (20000 == r.code) this.desserts = r.data
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
