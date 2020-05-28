<template>
  <v-container grid-list-xl fluid>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="path"
      class="elevation-1"
    >
      <!-- dialog start -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t('common.roleTable')}}
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
                  <v-form ref="editForm" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.key"
                          :rules="keyRules"
                          label="KEY">
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.name"
                          :rules="nameRules"
                          :label="$t('common.name')">
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.description"
                          :rules="descriptionRules"
                          :label="$t('common.description')">
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  {{ $t('common.cancel') }}
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text @click="save"
                >
                  {{ $t('common.save') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- dialog end -->

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
import i18n from '@/lang'
import { getRoles, updateRole, addRole, deleteRole } from '@/api/role'
import { constantRoutes } from '@/router/routes'
import { validAlphabets } from '@/utils/validate'
export default {
  data: () => ({
    dialog: false,
    desserts: [],
    defaultItem: {
      name: '',
      key: '',
      description: '',
      routes: ''
    },
    editedItem: {
      name: '',
      key: '',
      description: '',
      routes: ''
    },
    nameRules: [
      v => !!v || 'Name required',
      v => validAlphabets(v) || 'Name invalid',
    ],
    keyRules: [
      v => !!v || 'Key required',
      v => validAlphabets(v) || 'Name invalid',
    ],
    descriptionRules: [
      v => !!v || 'Description required',
    ],
    editedIndex: -1
  }),

  created () {
    this.initialize()
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  methods: {
    async initialize () {
      const r = await getRoles()
      if (20000 === r.code) {
        this.desserts = r.data
      }
      this.desserts.forEach(role => {
        role.routes = role.routes.join(':')
      })
      const defaultIDs = this.filterRoutes(constantRoutes)
      const routesStr = defaultIDs.join(':')
      this.defaultItem.routes = routesStr
      this.editedItem.routes = routesStr
    },
    filterRoutes (routes) {
      let res = []
      routes.forEach(route => {
        if (! route.hidden) {
          if (route.children) {
            const ids = this.filterRoutes(route.children)
            res = res.concat(ids)
          }
          res.push(route.id)
        }
      })
      return res
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.desserts.indexOf(item)
      const a = await this.$dialog.confirm({
          text: i18n.t('common.confirmRemove'),
          title: i18n.t('common.warning'),
          actions: {
            false: i18n.t('common.cancel'),
            true: {
              text: i18n.t('common.confirm')
            }
          }
      })
      if (a) {
        const r = await deleteRole(item.id)
        if (20000 === r.code) {
          this.desserts.splice(index, 1)
          this.resetRoute()
        }
      }
    },
    async save () {
      if (! this.$refs.editForm.validate()) {
        return
      }
      const id = this.editedItem.id
      const data = this.editedItem
      const r = this.editedIndex > -1 ? 
        await updateRole(id, data) : await addRole(data)
      if (20000 == r.code) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], data)
        } else {
          data.id = r.data.id
          this.desserts.push(data)
        }
      }
      this.close()
    },

    close () {
      this.dialog = false
      this.$refs.editForm.resetValidation()
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  },

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
        { text: i18n.t('common.description'), value: 'description' },
        { text: 'KEY', value: 'key' },
        { text: i18n.t('common.actions'), value: 'actions', sortable: false },
      ]
    },
  },

}
</script>
