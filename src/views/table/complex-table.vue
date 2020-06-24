<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id complex-table.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/15 15:14
 - @uses The complex table page.
-->
<template>
  <v-container grid-list-xl fluid>

    <v-sheet class="pa-4 indigo darken-3">
      <v-row>
        <v-col xs="12" sm="2">
          <v-text-field v-model="listQuery.title" :label="$t('table.title')" />
        </v-col>
        <v-col xs="12" sm="1">
          <v-select
            v-model="listQuery.importance"
            :items="importanceOptions"
            :label="$t('table.importance')"
            clearable
            >
          </v-select>
        </v-col>
        <v-col xs="12" sm="2">
          <v-select
            v-model="listQuery.type"
            :items="calendarTypeOptions"
            :label="$t('table.type')"
            item-text="display_name"
            item-value="key"
            clearable
            >
          </v-select>
        </v-col>
        <v-col xs="12" sm="2">
          <v-select
            v-model="listQuery.sort"
            :items="sortOptions"
            item-text="label"
            item-value="key"
            >
          </v-select>
        </v-col>
        <v-col xs="12" sm="3">
          <v-btn @click="handleFilter" color="primary" class="ma-2">
            <v-icon left>mdi-table-search</v-icon> {{ $t('table.search') }}
          </v-btn>
          <v-btn @click="handleCreate" color="primary" class="ma-2">
            <v-icon left>mdi-pencil</v-icon> {{ $t('table.add') }}
          </v-btn>
          <v-btn @click="handleDownload" color="primary" class="ma-2">
            <v-icon left>mdi-download</v-icon> {{ $t('table.export') }}
          </v-btn>
        </v-col>
        <v-col xs="12" sm="2">
          <v-checkbox
            v-model="showReviewer"
            color="primary"
            :label="$t('table.reviewer')"
            @change="tableKey=tableKey+1"
            >
          </v-checkbox>
        </v-col>
      </v-row>
    </v-sheet>
    <v-dialog v-model="dialog" max-width="500px" :fullscreen="isMobile">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="editForm" lazy-validation v-model="editFormValid">
              <v-row>
                <v-col cols="12">
                  <v-select
                    v-model="editedItem.type"
                    :items="calendarTypeOptions"
                    :label="$t('table.type')"
                    :rules="typeRules"
                    item-text="display_name"
                    item-value="key"
                    >
                  </v-select>
                </v-col>
                <v-col cols="6">
									<v-menu
										ref="dateMenu"
										v-model="dateMenu"
										:close-on-content-click="false"
										:return-value.sync="editedItem.date"
										transition="scale-transition"
										offset-y
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="editedItem.date"
												:label="$t('table.displayDate')"
												prepend-icon="mdi-timetable"
												readonly
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-date-picker
                      :locale="dateLocale"
                      v-model="editedItem.date"
                      no-title
                      scrollable>
											<v-spacer></v-spacer>
											<v-btn text color="primary" @click="dateMenu = false">
                        {{ $t('common.cancel') }}
                      </v-btn>
											<v-btn text color="primary"
                        @click="$refs.dateMenu.save(editedItem.date)">
                        {{ $t('common.confirm') }}
                      </v-btn>
										</v-date-picker>
									</v-menu>
                </v-col>
                <v-col cols="6">
									<v-menu
										ref="timeMenu"
										v-model="timeMenu"
										:close-on-content-click="false"
										:return-value.sync="editedItem.time"
										transition="scale-transition"
										offset-y
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="editedItem.time"
												:label="$t('table.displayTime')"
												readonly
												v-bind="attrs"
												v-on="on"
											></v-text-field>
										</template>
										<v-time-picker
											v-if="timeMenu"
											v-model="editedItem.time"
											full-width
											@click:minute="$refs.timeMenu.save(editedItem.time)"
										></v-time-picker>
									</v-menu>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.title"
                    :label="$t('table.title')"
                    :rules="titleRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="editedItem.status"
                    :items="statusOptions"
                    :label="$t('table.status')"
                    >
                  </v-select>
                </v-col>
                <v-col cols="12">
                  <span>{{ $t('table.importance') }}</span>
                  <v-rating
                    v-model="editedItem.importance"
                    :length="3"
                    color="red lighten-3"
                    background-color="grey lighten-1"
                    ></v-rating>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.remark"
                    :label="$t('table.remark')"
                  ></v-text-field>
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
            text
            @click="save"
            >
            {{ $t('common.save') }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="list"
      :loading="listLoading"
      >
      <!--
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <template v-for="name in headers">
              <th :key="name" v-if="name !== 'reviewer' || showReviewer">
                {{ $t('table.' + name) }}
              </th>
            </template>
          </tr>
        </thead>
      </template>
      -->

      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              {{ item.display_time | parseTime('{y}-{m}-{d} {h}:{i}') }}
            </td>
            <td>
              <a @click="handleUpdate(item)">{{ item.title }}</a>
              <v-chip class="ma-2" label>{{ item.type | typeFilter }}</v-chip>
            </td>
            <td>{{ item.author }}</td>
            <td v-if="showReviewer" class="text--red">{{ item.reviewer }}</td>
            <td>
              <v-rating
                v-model="item.importance"
                :length="item.importance"
                color="red lighten-3"
                background-color="grey lighten-1"
                readonly
                ></v-rating>
            </td>
            <td>{{ item.pageviews }}</td>
            <td>{{ item.status }}</td>
            <td>
              <v-btn
                color="primary"
                class="ma-2"
                @click="handleUpdate(item)" small>
                {{ $t('table.edit') }}
              </v-btn>
              <v-btn
                v-if="item.status !== 'published'"
                class="ma-2"
                color="success"
                @click="handleModifyStatus(item,'published')" small>
                {{ $t('table.publish') }}
              </v-btn>
              <v-btn
                v-if="item.status !== 'draft'"
                class="ma-2"
                @click="handleModifyStatus(item,'draft')" small>
                {{ $t('table.draft') }}
              </v-btn>
               <v-btn
                v-if="item.status !== 'delete'"
                class="ma-2"
                color="error"
                @click="handleDelete(item)" small>
                {{ $t('table.delete') }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { 
  fetchList, 
  fetchPv, 
  createArticle, 
  deleteArticle, 
  updateArticle 
} from '@/api/article'
import { isMobile } from '@/utils/util'
import { parseTime } from '@/utils'
import i18n from '@/lang'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  filters: {
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
			dialog: false,
      editedIndex: -1,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      editedItem: {
        id: undefined,
        importance: 1,
        remark: '',
        title: '',
        type: '',
        status: 'published',
        date: null,
        time: null
      },
      editFormValid: true,
      dateMenu: false,
      timeMenu: false,
      defaultItem: {
        id: undefined,
        importance: 1,
        remark: '',
        title: '',
        type: '',
        status: 'published',
        date: null,
        time: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      typeRules: [
        v => !!v || 'Type is required',
      ],
      titleRules: [
        v => !!v || 'Title is required',
      ],
      headerList: [
        "id",
        "date",
        "title",
        "author",
        "reviewer",
        "importance",
        "readings",
        "status",
        "actions"
      ],
      downloadLoading: false
    }
  },
  created () {
    this.getList()
  },
  computed: {
    headers () {
      let r = []
      this.headerList.forEach(name => {
        if (name !== 'reviewer' || this.showReviewer) {
          const one = { text: i18n.t('table.' + name) }
          if (name !== 'id') {
            one.sortable = false
          } else {
            one.value = 'id' // For sort.
          }
          r.push(one)
        }
      })
      return r
    },
    formTitle () {
      return this.editedIndex === -1 ?
        this.$t('common.new') :
        this.$t('common.edit')
    },
    dateLocale () {
      const locale = this.$i18n.locale
      return locale.toLowerCase()
    },
    isMobile () {
      return isMobile()
    }
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        console.log('list', this.list)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleCreate() {
      this.editedItem = Object.assign({}, this.defaultItem)
      const now = new Date()
      this.editedItem.date = parseTime(now, "{y}-{m}-{d}")
      this.editedItem.time = parseTime(now, "{h}:{i}")
      this.dialog = true
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    async handleModifyStatus (row, status) {
      const data = { id: row.id, status: status }
      const r = await updateArticle(data)
      if (20000 === r.code) {
        row.status = status
        this.$dialog.message.success('Success!!!')
      }
    },
    sortChange (data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID (order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    handleUpdate (row) {
      this.editedIndex = this.list.indexOf(row)
      this.editedItem = Object.assign({}, row)
      this.editedItem.date = parseTime(row.display_time, "{y}-{m}-{d}")
      this.editedItem.time = parseTime(row.display_time, "{h}:{i}")
      this.dialog = true
    },
    async handleDelete (row) {
      const r = await deleteArticle(row.id)
      if (20000 === r.code) {
        this.$dialog.message.success('Delete success')
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }
     },
    handleFetchPv (pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['created_at', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'created_at') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.$refs.editForm.reset()

    },
    async save () {
      if (true === this.$refs.editForm.validate()) {
        const item = Object.assign({}, this.editedItem)
        const time = this.editedItem.date + " " + this.editedItem.time + ":00"
        // Convert time.
        item.display_time = new Date(time)
        delete item.date
        delete item.time
        if (-1 === this.editedIndex) {
          item.author = "leafly"
        }
        const func = this.editedIndex > -1 ? updateArticle : createArticle
        const r = await func(item)
        if (20000 === r.code) {
          item.id = r.data.id
          item.display_time = time
          item.date = this.editedItem.date
          item.time = this.editedItem.time
          if (this.editedIndex > -1) {
            Object.assign(this.list[this.editedIndex], item)
          } else {
            item.pageviews = 0
            this.list.unshift(item)
          }
          this.$dialog.message.success('Save success')
          this.close()
        }
      }
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
