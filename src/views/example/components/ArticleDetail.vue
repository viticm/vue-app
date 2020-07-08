<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id ArticleDetail.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/29 09:52
 - @uses The article detail page.
-->
<template>
  <v-container fluid>
    <v-form ref="postForm" lazy-validation>
      <sticky 
        :z-index="10" 
        :class-name="'sticky-navbar ' + postForm.status" 
        :sticky-top="60"
        >
        <v-row dense>
          <v-spacer></v-spacer>
          <v-col sm="2">
            <v-select 
              v-model="postForm.comment_disabled" 
              :label="$t('common.comment')"
              :items="commentStatus"
              dense
              >
            </v-select>
          </v-col>
          <v-col sm="3">
						<v-select
							v-model="postForm.platforms"
							:items="platformOptions"
							:label="$t('common.platform')"
							multiple
              dense
						>
							<template v-slot:selection="{ item, index }">
                <span v-if="index === 0">{{ item.text }}</span>
								<span
									v-if="index === 1"
									class="grey--text caption"
                  >
                  (+{{ postForm.platforms.length - 1 }} {{ $t('common.other') }})
                </span>
							</template>
						</v-select>
          </v-col>
          <v-col sm="1">
            <v-btn color="#00E676" dense @click="submitForm">
              {{ $t('common.publish') }}
            </v-btn>
          </v-col>
          <v-col sm="1">
            <v-btn color="yellow lighten-1" dense @click="draftForm">
              {{ $t('common.draft') }}
            </v-btn>
          </v-col>
        </v-row>
      </sticky>
      <v-row>
        <v-col cols="12">
          <Warning />
        </v-col>
        <v-col cols="12">
          <v-text-field 
            v-model="postForm.title" 
            :label="$t('table.title')"
            :rules="titleRules"/>
        </v-col>
        <v-col xs="12" sm="4">
          <v-text-field v-model="postForm.author" :label="$t('table.author')" />
        </v-col>
        <v-col xs="12" sm="3">
          <v-menu
            ref="dateMenu"
            v-model="dateMenu"
            :close-on-content-click="false"
            :return-value.sync="postForm.date"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="postForm.date"
                :label="$t('table.displayDate')"
                prepend-icon="mdi-timetable"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              :locale="dateLocale"
              v-model="postForm.date"
              no-title
              scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dateMenu = false">
                {{ $t('common.cancel') }}
              </v-btn>
              <v-btn text color="primary"
                @click="$refs.dateMenu.save(postForm.date)">
                {{ $t('common.confirm') }}
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col xs="12" sm="3">
          <v-menu
            ref="timeMenu"
            v-model="timeMenu"
            :close-on-content-click="false"
            :return-value.sync="postForm.time"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="postForm.time"
                :label="$t('table.displayTime')"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timeMenu"
              v-model="postForm.time"
              full-width
              @click:minute="$refs.timeMenu.save(postForm.time)"
            ></v-time-picker>
          </v-menu>
        </v-col>
        <v-col xs="12" sm="2">
          <span>{{ $t('table.importance') }}</span>
          <v-rating
            v-model="postForm.importance"
            :length="3"
            color="red lighten-3"
            background-color="grey lighten-1"
            ></v-rating>
        </v-col>
        <v-col cols="12">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'
import { parseTime } from '@/utils'
import Warning from './Warning'
// import {SourceUrlDropdown } from './Dropdown'
import i18n from '@/lang'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  date: undefined,  // 展示日期
  time: undefined,  // 展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: 0,
  importance: 0
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, Sticky, Warning },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      titleRules: [
        v => !! v || 'Title is required',
      ],
      contentRules: [
        v => !! v || 'Content is required',
      ],
      platformOptions: [
        { text: 'a-platform', value: 'a-platform' },
        { text: 'b-platform', value: 'b-platform' },
        { text: 'c-platform', value: 'c-platform' }
      ],
      dateMenu: false,
      timeMenu: false,
    }
  },
  computed: {
    contentShortLength () {
      return this.postForm.content_short.length
    },
    lang () {
      return this.$store.getters.language
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get () {
        return (+new Date(this.postForm.display_time))
      },
      set (val) {
        this.postForm.display_time = new Date(val)
      }
    },
    commentStatus () {
      return [
        { text: i18n.t('common.open'), value: 0 },
        { text: i18n.t('common.close'), value: 1 }
      ]
    },
    dateLocale () {
      const locale = this.$i18n.locale
      return locale.toLowerCase()
    },
  },
  created () {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      const now = new Date()
      this.postForm.date = parseTime(now, "{y}-{m}-{d}")
      this.postForm.time = parseTime(now, "{h}:{i}")
    }
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data
        console.log('this.postForm', this.postForm)
        this.postForm.date = 
          parseTime(this.postForm.display_time, "{y}-{m}-{d}")
        this.postForm.time = parseTime(this.postForm.display_time, "{h}:{i}")

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setPageTitle () {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },
    submitForm () {
      if (this.postForm.content.length === 0 || 
        this.postForm.title.length === 0) {
        this.$dialog.message.warning('请填写必要的标题和内容')
        return
      }
      const item = Object.assign({}, this.postForm)
      const time = this.postForm.date + " " + this.postForm.time + ":00"
      // Convert time.
      this.display_time = new Date(time)
      delete item.date
      delete item.time
      console.log(item)

      this.$dialog.message.success('保存成功')
      this.postForm.status = 'published'
    },
    draftForm () {
      if (this.postForm.content.length === 0 || 
        this.postForm.title.length === 0) {
        this.$dialog.message.warning('请填写必要的标题和内容')
        return
      }
      this.$dialog.message.success('保存成功')
      this.postForm.status = 'draft'
    },
    getRemoteUserList (query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>
