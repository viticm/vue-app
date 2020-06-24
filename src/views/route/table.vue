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
                  <v-form ref="editForm">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field 
                          v-model="editedItem.name" 
                          :label="$t('common.name')">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field 
                          v-model="editedItem.path" 
                          :label="$t('common.path')">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field 
                          v-model="editedItem.redirect" 
                          :label="$t('common.redirect')">
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field 
                          v-model="editedItem.component" 
                          :label="$t('common.component')">
                        </v-text-field>
                      </v-col>

                      <!--
                      <v-col cols="12">
                        <v-textarea 
                          v-model="editedItem.meta" 
                          :label="$t('common.meta')"
                          auto-grow
                        >
                        </v-textarea>
                      </v-col>
                      -->

                      <smart-form 
                          ref="metaForm"
                          :items.sync="editedItem.meta" 
                          :title="$t('common.meta')" />

                      <v-col cols="12">
                        <v-autocomplete
                          v-model="editedItem.children"
                          :disabled="isUpdating"
                          :items="routeList"
                          filled
                          chips
                          color="blue-grey lighten-2"
                          :label="$t('common.children')"
                          item-text="name"
                          item-value="id"
                          multiple
                        >
                          <!-- cn: 这里也可以用v-combobox来实现 -->
                          <template v-slot:selection="data">
                            <v-chip
                              v-bind="data.attrs"
                              :input-value="data.selected"
                              close
                              @click="data.select"
                              @click:close="remove(data.item)"
                            >
                              <!--
                              <v-avatar left>
                                <v-img :src="data.item.avatar"></v-img>
                              </v-avatar>
                              -->
                              {{ data.item.name }}
                            </v-chip>
                          </template>
                          <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                              <v-list-item-content v-text="data.item" />
                            </template>
                            <template v-else>
                              <!--
                              <v-list-item-avatar>
                                <img :src="data.item.avatar">
                              </v-list-item-avatar>
                              -->
                              <v-list-item-content>
                                <v-list-item-title v-html="data.item.name" />
                              </v-list-item-content>
                            </template>
                          </template>
                        </v-autocomplete>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-switch
                          color="primary"
                          :label="$t('common.alwaysShow')"
                          v-model="editedItem.alwaysShow"
                          />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-switch
                          color="primary"
                          :label="$t('common.hidden')"
                          v-model="editedItem.hidden"
                          />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-switch
                          color="primary"
                          :label="$t('common.root')"
                          v-model="editedItem.root"
                          />
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-switch
                          color="primary"
                          :label="$t('common.constant')"
                          v-model="editedItem.constant"
                          />
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <!--
                <template v-if="editting">
                <v-switch
                  v-model="autoUpdate"
                  :disabled="isUpdating"
                  class="mt-0"
                  color="green lighten-2"
                  hide-details
                  :label="$t('common.autoUpdate')"
                ></v-switch>
                </template>
                -->

                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  {{ $t('common.cancel') }}
                </v-btn>
                <v-btn 
                  color="blue darken-1" 
                  text @click="save" 
                  :disabled="autoUpdate && editting">
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
import { getRouteList, saveRoute, deleteRoute } from '@/api/route'
import { isEmpty } from '@/utils'
import i18n from '@/lang'
import SmartForm from '@/components/widgets/SmartForm'
export default {
  components: {
    SmartForm
  },
  data: () => ({
    autoUpdate: false,
    dialog: false,
    editting: false,
    isUpdating: false,
    desserts: [],
    editedIndex: -1,
    routeHash: [],
    routeList: [ { header: i18n.t('route.routes') } ],
    editedItem: {
      name: '',
      path: '',
      redirect: '',
      component: '',
      meta: {},
      children: [],
      alwaysShow: false,
      hidden: false,
      root: false,
      constant: false
    },
    defaultItem: {
      name: '',
      path: '',
      redirect: '',
      component: '',
      meta: {},
      children: [],
      alwaysShow: false,
      hidden: false,
      root: false,
      constant: false
    },
    boolOptions: [
      'alwaysShow',
      'hidden',
      'root',
      'constant'
    ],
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
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      const r = await getRouteList()
      if (20000 === r.code) {
        this.desserts = r.data
        this.resetRoute()
      }
    },

    resetRoute () {
        this.routeHash = []
        this.routeList = []
        this.desserts.forEach(route => { 
          if (route.root !== 1 && ! isEmpty(route.meta)) {
            const meta = JSON.parse(route.meta)
            if (meta && ! isEmpty(meta.title)) {
              this.routeHash[route.id] = {
                name: i18n.t('route.' + meta.title), id: route.id}
              this.routeList.push(this.routeHash[route.id])
            }
          }
        })
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.children = []
      if (! isEmpty(item.children)) {
        const childrenStr = item.children
        // console.log("childrenStr", childrenStr)
        const childrenArray = childrenStr.split(':')
        childrenArray.forEach(id => {
          const route = this.routeHash[id]
          if (route) {
            this.editedItem.children.push(route.id)
          }
        })
      }
      this.editedItem.meta = isEmpty(item.meta) ? {} : JSON.parse(item.meta)
      // console.log(this.editedItem.meta)
      this.dialog = true
      this.editting = true
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
      // const a = confirm(i18n.t('common.confirmRemove'))
      if (a) {
        const r = await deleteRoute(item.id)
        if (20000 === r.code) {
          this.desserts.splice(index, 1)
          this.resetRoute()
        }
      }
    },

    close () {
      this.dialog = false
      this.editting = false
      this.editedItem.children = []
      this.editedItem.meta = {}
      this.$nextTick(() => {
        // Why assign not reset the editedItem.children ? // 因为这里是浅拷贝
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.$refs.metaForm.reset()
    },

    async save () {

      if (! this.$refs.editForm.validate()) {
        return
      }

      // Convert items.
      this.boolOptions.forEach(name => {
        const value = this.editedItem[name]
        this.editedItem[name] = true === value || 1 === value ? 1 : 0
      })
      const childrenStr = this.editedItem.children.join(":")
      const meta = JSON.stringify(this.editedItem.meta)
      const item = { children: childrenStr, meta: meta }
      for (let key in this.editedItem) {
        if (key !== 'children' && key !== 'meta') {
          item[key] = this.editedItem[key]
        }
      }
      const r = await saveRoute(item)
      if (20000 === r.code) {
        item.id = r.data.id
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], item)
        } else {
          this.desserts.push(item)
        }
        this.resetRoute()
      }
      this.close()
    },

    remove (item) {
      const index = this.editedItem.children.indexOf(item.id)
      if (index >= 0) this.editedItem.children.splice(index, 1)
    },

  },
}
</script>
