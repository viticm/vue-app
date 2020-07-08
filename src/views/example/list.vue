<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id list.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/28 10:27
 - @uses The example article list page.
-->
<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="list"
      :loading="listLoading"
      >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>
              {{ item.display_time | parseTime('{y}-{m}-{d} {h}:{i}') }}
            </td>
            <td>
              <a @click="handleUpdate(item)">{{ item.title }}</a>
            </td>
            <td>{{ item.author }}</td>
            <td>
              <v-rating
                v-model="item.importance"
                :length="item.importance"
                color="red lighten-3"
                background-color="grey lighten-1"
                readonly
                ></v-rating>
            </td>
            <td>{{ item.status }}</td>
            <td>
              <v-btn
                color="primary"
                class="ma-2"
                @click="handleUpdate(item)" small>
                {{ $t('table.edit') }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>

// import { parseTime } from '@/utils'
import i18n from '@/lang'
import { fetchList } from '@/api/article'

export default {
  name: 'ArticleList',
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20
      },
      headerList: [
        "id",
        "date",
        "title",
        "author",
        "importance",
        "status",
        "actions"
      ],
    }
  },
  computed: {
    headers () {
      let r = []
      this.headerList.forEach(name => {
        const one = { text: i18n.t('table.' + name) }
        if (name !== 'id') {
          one.sortable = false
        } else {
          one.value = 'id' // For sort.
        }
        r.push(one)
      })
      return r
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleUpdate (item) {
      this.$router.push('/example/edit/' + item.id)
    }
  }
}
</script>
