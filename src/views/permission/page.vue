<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id page.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/05/22 19:37
 - @uses The page permission page.
-->
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
            <!--
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                {{ $t('common.new') }}
              </v-btn>
            </template>
            -->
            <v-card
              class="mx-auto"
              max-width="500"
            >
              <v-sheet class="pa-4 indigo darken-3">
                <v-text-field
                  v-model="search"
                  :label="$t('common.search')"
                  dark
                  flat
                  solo-inverted
                  hide-details
                  clearable
                  clear-icon="mdi-close-circle-outline"
                ></v-text-field>
                <v-checkbox
                  v-model="caseSensitive"
                  dark
                  hide-details
                  :label="$t('common.sensitive') + $t('common.search')"
                ></v-checkbox>
              </v-sheet>
              <v-card-text>
                <v-treeview
                  :items="items"
                  v-model="selection"
                  :search="search"
                  :filter="filter"
                  :open.sync="open"
                  item-disabled="locked"
                  :selection-type="selectionType"
                  item-key="id"
                  selectable
                >
                  <template v-slot:prepend="{ item }">
                    <v-icon
                      v-if="item.children"
                      v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
                    ></v-icon>
                  </template>
                </v-treeview>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue darken-1" @click="close">
                  {{ $t('common.cancel') }}
                </v-btn>
                <v-btn color="blue darken-1" @click="save">
                  {{ $t('common.save') }}
                </v-btn>
              </v-card-actions>
            </v-card>
            <!--
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
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
            -->
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- dialog end -->

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          @click="edit(item)"
          color="primary"
        >
        {{ $t('common.editPermission') }}
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>

    </v-data-table>
  </v-container>
</template>

<script>
import i18n from '@/lang'
import { getRoles, updateRole } from '@/api/role'
import { asyncRoutes, constantRoutes } from '@/router/routes'
import { isEmpty } from '@/utils'
export default {
  data: () => ({
    dialog: false,
    items: [],
    selection: [],
    editedItem: null,
    open: [1, 2],
    search: null,
    caseSensitive: false,
    desserts: [],
    // 这个树的体验并不好，可以使用leaf模式，但必须让组件返回对象，而且要
    // 构建子树的父ID，以便在保存时保证子对象的情况下保存父对象
    selectionType: 'independent',
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
      this.generateTree()
      const r = await getRoles()
      if (20000 === r.code) {
        this.desserts = r.data
      }
    },
    edit (item) {
      this.selection = item.routes
      this.editedItem = item // Ref.
      this.dialog = true
    },
    async save () {
      if (isEmpty(this.editedItem)) {
        return
      }
      const data = {routes: this.selection.join(':')}
      const r = await updateRole(this.editedItem.id, data)
      if (20000 === r.code) {
        this.editedItem.routes = this.selection
      }
      this.close()
    },
    generateTree () {
      this.items = this.filterRoutes(constantRoutes, true)
      this.items = this.items.concat(this.filterRoutes(asyncRoutes))
    },
    filterRoutes (routes, constant) {
      const res = []
      routes.forEach(route => {
        const tmp = {}
        if (! route.hidden) {
          if (route.children) {
            tmp.children = this.filterRoutes(route.children, constant)
          } else if (constant) {
            tmp.locked = true
          }
          tmp.id = route.id
          const meta = route.meta ?? {}
          tmp.name = isEmpty(meta.title) ?
            route.name : i18n.t('route.' + meta.title)
          res.push(tmp)
        }
      })
      return res
    },

    close () {
      this.editedItem = null
      this.dialog = false
      this.$nextTick(() => {
        this.selection = []
        this.search = null
      })
    }
  },

  computed: {
    filter () {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
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
        { text: i18n.t('common.actions'), value: 'actions', sortable: false },
      ]
    },
  },

}
</script>
