<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id ServerOptDetail.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/07/18 22:27
 - @uses your description
-->
<template>

  <v-container fluid>
    <v-form ref="form">
      <v-row>
        <v-col cols="12">
           <v-text-field
            v-model="item.server_id"
            :label="$t('game.serverID')"
            :loading="serverIDLoading"
            :rules="serverIDRules"/>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="item.type"
            :label="$t('game.serverType')"
            :items="serverTypes"
            dense
            >
          </v-select>
        </v-col>
        <v-col cols="12">
           <v-text-field
            v-model="item.server_name"
            :label="$t('game.serverName')"
            :rules="serverNameRules"/>
        </v-col>
        <v-col cols="12">
           <v-text-field
            v-model="item.inner_ip"
            :label="$t('game.innerIP')"
            :rules="innerIPRules"/>
        </v-col>
        <v-col cols="12">
           <v-text-field
            v-model="item.net_ip"
            :label="$t('game.netIP')"
            :rules="netIPRules"/>
        </v-col>
        <v-col cols="12">
          <v-switch v-model="dbOpen" label="DB:" />
        </v-col>
        <template v-if="dbOpen">
          <template v-for="(one, i) in item.db">
            <v-card :key="i">
              <v-col cols="12">
                <v-select
                  v-model="one.name"
                  label="name"
                  :items="dbOpts"
                  dense
                  >
                </v-select>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  v-model="one.count"
                  label="Count"
                  type="number"
                  value="number"
                  :rules="DBCountRules"/>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  v-model="one.database"
                  :label="$t('game.DBName')"
                  :rules="DBNameRules"/>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  v-model="one.host"
                  :label="$t('game.DBIP')"
                  :rules="DBIPRules"/>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  v-model="one.port"
                  type="number"
                  value="number"
                  :label="$t('game.DBPort')"
                  :rules="DBPortRules"/>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  v-model="one.user"
                  :label="$t('game.DBUser')"
                  :rules="DBUserRules"/>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  v-model="one.password"
                  :label="$t('game.DBPassword')"
                  :rules="DBPasswordRules"/>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  v-model="one.charset"
                  label="charset"
                  :rules="DBCharsetRules"/>
              </v-col>
              <v-col cols="12">
                 <v-text-field
                  v-model="one.max_packet_size"
                  type="number"
                  value="number"
                  label="Max packet size"
                  :rules="DBMaxPacketSizeRules"/>
              </v-col>
              <v-divider v-if="i !== item.db.length" />
              <v-btn small @click="addDB" >
                {{ $t('common.new') }}
              </v-btn>
              <v-btn small v-if="item.db.length > 1" @click="removeDB(i)" >
                {{ $t('common.remove') }}
              </v-btn>
            </v-card>
          </template>
        </template>
        <v-col cols="12">
          <v-switch v-model="pclOpen" label="PCL:" />
        </v-col>
        <template v-if="pclOpen">
          <v-col cols="12">
             <v-text-field
              v-model="item.pcl.host"
              label="Host"
              :rules="PCLRules"/>
          </v-col>
          <v-col cols="12">
             <v-text-field
              v-model="item.pcl.chat_host"
              label="Chat host"
              :rules="PCLRules"/>
          </v-col>
          <v-col cols="12">
             <v-text-field
              v-model="item.pcl.game_id"
              label="Game ID"
              :rules="GameIDRules"/>
          </v-col>
          <v-col cols="12">
             <v-text-field
              v-model="item.pcl.game_key"
              label="Game key"
              :rules="GameKeyRules"/>
          </v-col>
        </template>
        <v-col cols="12">
           <v-text-field
            v-model="item.port"
            :label="$t('game.listenPort')"
            :rules="DBNameRules"/>
        </v-col>
        <v-col v-if="'login' == item.type" cols="12">
           <v-text-field
            v-model="item.auth_count"
            :label="$t('game.authCount')"
            :rules="authCountRules"/>
        </v-col>
        <v-col cols="12">
          <v-spacer />
          <v-btn @click="save">{{ $t('common.save') }}</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

</template>

<script>

import {
  fetchServerOpt, saveServerOpt, fetchServerOptExistsOne
} from '@/api/game'
import { validIP, validURL } from '@/utils/validate'

const defaultDBOpt = {
  database: 'leafly_game',
  host: 'localhost',
  port: 3306,
  user: 'leafly',
  password: 'Leafly333',
  charset: 'utf8',
  max_packet_size: 1024 * 1024,
  name: 'DB_GAME',
  count: 5,
}

const defaultPcl = {
  host: 'https://leafly.goho.co/lumen-api/game/',
  chat_host: 'https://leafly.goho.co/lumen-api/game/',
  game_id: 1,
  game_key: 'O6YuI4eS@l!N9WUs'
}

const defaultItem = {
  id: undefined,
  server_name: '',
  type: 'world',
  server_id: 1,
  port: 2333,
  inner_ip: '0.0.0.0',
  net_ip: '0.0.0.0',
  auth_count: 8,
  db: [ defaultDBOpt ],
  pcl: defaultPcl
}

export default {

  data: () => {
    return {
      item: Object.assign({}, defaultItem),
      serverNameRules: [
        v => !!v || 'Server name is required',
      ],
      serverTypeRules: [
        v => !!v || 'Server type is required',
      ],
      innerIPRules: [
        v => !!v || 'Inner IP is required',
        v => validIP(v) || 'Inner IP error'
      ],
      netIPRules: [
        v => !!v || 'Net IP is required',
        v => validIP(v) || 'Net IP error'
      ],
      DBNameRules: [
        v => !!v || 'DB name is required',
      ],
      DBIPRules: [
        v => !!v || 'DB IP is required',
        v => validIP(v) || 'DB IP error'
      ],
      DBPortRules: [
        v => !!v || 'DB port is required',
        v => v > 0 && v <= 65535 || 'DB port error'
      ],
      DBUserRules: [
        v => !!v || 'DB user is required',
      ],
      DBPasswordRules: [
        v => !!v || 'DB password is required',
      ],
      authCountRules: [
        v => !!v || 'Auth count is required',
        v => /^[0-9]+$/.test(v) || 'Auth count must be a number',
        v => v > 0 && v <= 99 || 'Auth count between 0 and 99',
      ],
      DBCharsetRules: [
        v => !!v || 'DB charset is required',
      ],
      DBMaxPacketSizeRules: [
        v => !!v || 'DB max packet size is required',
        v => /^[0-9]+$/.test(v) || 'Must be a number',
      ],
      DBCountRules: [
        v => !!v || 'DB count is required',
        v => /^[0-9]+$/.test(v) || 'DB count must be a number',
        v => v > 0 && v <= 99 || 'DB count between 0 and 99',
      ],
      PCLRules: [
        v => !!v || 'Pcl is required',
        v => validURL(v) || 'Invalid url'
      ],
      GameIDRules: [
        v => !!v || 'Game ID is required',
        v => /^[0-9]+$/.test(v) || 'Game ID must be a number',
        v => v > 0 && v <= 999 || 'Game ID between 0 and 999',
      ],
      GameKeyRules: [
        v => !!v || 'Game key is required'
      ],
      serverTypes: ['login', 'world', 'global', 'cross'],
      serverIDLoading: false,
      dbOpen: false,
      dbOpts: ['DB_GAME', 'DB_LOGIN', 'DB_LOG', 'DB_GLOBAL', 'DB_CROSS'],
      pclOpen: false,
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    serverIDRules() {
      return [
        v => !!v || 'Server ID is required',
        /**
        v => {
          const r = ! this.existsOne('server_id', v, 'serverIDLoading')
          return r || 'Server ID is exists'
        }
        **/
      ]
    }
  },
  methods: {
    async save () {
      if (true === this.$refs.form.validate()) {
        const one = Object.assign({}, this.item)
        if (one.type != 'login') {
          delete one['auth_count']
        }
        if (! this.dbOpen) {
          delete one['db']
        } else {
          // This for debug.
          one.db.forEach(item => {
            item.count = Number(item.count)
          })
          one.db = JSON.stringify(one.db)
        }
        if (! this.pclOpen) {
          delete one['pcl']
        } else {
          one.pcl.game_id = Number(one.pcl.game_id)
          one.pcl = JSON.stringify(one.pcl)
        }
        console.log('save data', one.db)
        const r = await saveServerOpt(one)
        if (20000 == r.code) {
          this.item.id = r.data.id
          this.$dialog.message.success('保存成功')
        }
      }
    },
    async existsOne (key, value, loadingKey) {
      if (loadingKey) {
        this[loadingKey] = true
      }
      const r = await fetchServerOptExistsOne(key, value);
      if (loadingKey) {
        this[loadingKey] = false
      }
      if (20000 == r.code) {
        console.log('1------------', 1 === r.data.r)
        return 1 === r.data.r
      } else {
        return false
      }
    },
    fetchData(id) {
      fetchServerOpt(id).then(response => {
        this.item = response.data
        if (! this.item.db) {
          const one = Object.assign({}, defaultDBOpt)
          this.item.db = [ one ]
        } else {
          this.item.db = JSON.parse(this.item.db)
          console.log(this.item.db)
          this.dbOpen = true
        }

        if (! this.item.pcl) {
          const one = Object.assign({}, defaultPcl)
          this.item.pcl = one
        } else {
          this.item.pcl = JSON.parse(this.item.pcl)
          console.log(this.item.pcl)
          this.pclOpen = true
        }

      })
    },

    removeDB (index) {
      this.item.db.splice(index, 1)
    },

    addDB () {
      const one = Object.assign({}, defaultDBOpt)
      this.item.db.push(one)
    }

  },
  created () {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
  },


}

</script>
