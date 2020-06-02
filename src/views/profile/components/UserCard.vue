<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id UserCard.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/02 15:36
 - @uses The user card page.
-->
<template>
  <v-card style="margin-bottom:20px;">
    <v-card-text>
      <div slot="header" class="clearfix">
        <span>About me</span>
      </div>

      <div class="user-profile">
        <div class="box-center">
          <pan-thumb 
            :image="user.avatar" 
            :height="'100px'" 
            :width="'100px'" 
            :hoverable="false">
            <div>Hello</div>
            {{ user.role }}
          </pan-thumb>
        </div>
        <div class="box-center">
          <div class="user-name text-center">{{ user.name }}</div>
          <div class="user-role text-center text-muted">
            {{ user.role | uppercaseFirst }}
          </div>
        </div>
      </div>

      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header">
            <v-icon small>mdi-book-open-outline</v-icon>
            <span>Education</span>
          </div>
          <div class="user-bio-section-body">
            <div class="text-muted">
              JS in Computer Science from the University of Technology
            </div>
          </div>
        </div>

        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header">
            <v-icon small>mdi-offer</v-icon>
            <span>Skills</span>
          </div>
          <div class="user-bio-section-body">
            <div class="progress-item">
              <span>Vue</span>
              <v-progress-linear :value="70" />
            </div>
            <div class="progress-item">
              <span>JavaScript</span>
              <v-progress-linear :value="18" />
            </div>
            <div class="progress-item">
              <span>Css</span>
              <v-progress-linear :value="12" />
            </div>
            <div class="progress-item">
              <span>C++</span>
              <v-progress-linear :value="100" />
            </div>
            <div class="progress-item">
              <span>ESLint</span>
              <v-progress-linear :value="100" color="success" />
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
