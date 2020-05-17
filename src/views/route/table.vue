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

                    <v-col cols="12">
                      <v-textarea 
                        v-model="editedItem.meta" 
                        :label="$t('common.meta')"
                        auto-grow
                      >
                      </v-textarea>
                    </v-col>

										<v-col cols="12">
											<v-autocomplete
												v-model="editItem.children"
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
                              <!--<v-list-item-subtitle v-html="data.item.group" />-->
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
                </v-container>
              </v-card-text>

              <v-card-actions>
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
  import { getTable } from '@/api/route'
  import { isEmpty } from '@/utils'
  import i18n from '@/lang'
	const srcs = {
		1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
		2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
		3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
		4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
		5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
	}
  export default {
    data: () => ({
			autoUpdate: true,
      dialog: false,
      editting: false,
			isUpdating: false,
      desserts: [],
      editedIndex: -1,
			// friends: ['Sandra Adams', 'Britta Holt'],
			people: [
				{ header: 'Group 1' },
				{ name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
				{ name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
				{ name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
				{ name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
				{ divider: true },
				{ header: 'Group 2' },
				{ name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
				{ name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
				{ name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
				{ name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
			],
      routeList: [ { headers: i18n.t('route.routes') } ],
      rouetHash: [],
      editedItem: {
        name: '',
        path: '',
        redirect: '',
        component: '',
        meta: '',
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
        meta: '',
        children: [],
        alwaysShow: false,
        hidden: false,
        root: false,
        constant: false
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
        if (20000 == r.code) {
          this.desserts = r.data
          this.desserts.forEach(route => { 
            if (! isEmpty(route.name)) {
              this.routeList[route.id] = {name: route.name, id: route.id}
            }
          })
          console.log('this.routeList', this.routeList)
        }
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        if (! isEmpty(item.children)) {
          const childrenStr = item.children
          console.log("childrenStr", childrenStr)
          const childrenArray = childrenStr.split(':')
          this.editItem.children = []
          childrenArray.forEach(id => {
            const route = this.routeList[id]
            if (route) {
              this.editItem.children.push(route)
            }
          })
        }
        console.log(this.editItem.children)
        this.dialog = true
        this.editting = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.editting = false
        this.editItem.children = []
        this.$nextTick(() => {
          // Why assign not reset the editItem.children ?
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        console.log('this.editItem.children', this.editItem.children)
        if (this.editedIndex > -1) {
          const children = this.editItem.children.join(":")
          console.log('this.editItem.children1', this.editItem.children)
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          this.desserts[this.editedIndex].children = children
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },

      remove (item) {
        console.log('this.editItem.children', this.editItem.children)
        const index = this.editItem.children.indexOf(item.id)
        if (index >= 0) this.editItem.children.splice(index, 1)
      },

    },
  }
</script>
