<template>
  <div class="header-cont">
    <div class="left">
      <h1>
        <router-link to="/">{{ t("sitename") }}</router-link>
      </h1>
    </div>
    <div class="right flex-center">
      <div class="lang gap">
        <span
          class="item"
          :class="{ active: locale === 'zh-cn' }"
          @click="changeLanguage('zh-cn')"
          >简体中文</span
        >
        /
        <span
          class="item"
          :class="{ active: locale === 'zh-cn' }"
          @click="changeLanguage('en')"
          >EN</span
        >
      </div>
      <template v-if="isLogin">
        <div class="gap cursor">
          <router-link to="/personal/message"
            ><el-badge :is-dot="!!unRedCount"
              ><el-icon><message /></el-icon></el-badge
          ></router-link>
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
          <div class="flex-center cursor">
            {{ username }}
            <el-icon><caret-bottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="toPersoanl">{{
                t("personalCenter")
              }}</el-dropdown-item>
              <el-dropdown-item command="toLogout">{{
                t("logout")
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <template v-else-if="$route.name !== 'Login'">
        <router-link to="/login">{{ t("login") }}</router-link>
      </template>
    </div>
  </div>
</template>
<script setup>
import { logout } from '@/api/login'
import { computed } from "vue";
import { useRouter } from "vue-router";
const { locale, t } = useI18n();
const store = useStore()
//语言切换
function changeLanguage(lang) {
  locale.value = lang;
  localStorage.setItem("locale", lang);
}

const isLogin = computed(() => store.getters['user/isLogin']);
const userInfo = computed(() => store.state.user.userInfo)
const username = computed(() => userInfo.value?.name);

store.dispatch('user/refreshInfo')

const unRedCount = ref(0);
unRedCount.value = 3;

const router = useRouter();
const commands = ({
  toPersoanl: () => { 
    router.push({
      path: "/personal"
    });
  },
  toLogout: () => {  
    logout().then((res) => {
      if(res.code == 200) {
        store.commit('user/clearToken') 
        store.commit('user/clearUserInfo')
        router.push('/login')
      }  
    })
  },
});
function handleCommand(command) {
    console.log(command);
    commands[command] && commands[command](); 
}
</script>
<style lang="scss">
.header-cont {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
  a {
    color: inherit;
    text-decoration: none;
  }
  h1 {
    margin: 0;
    font-size: 20px;
  }
  .gap {
    margin-right: 20px;
  }
  .right {
    .lang {
      font-size: 14px;
      .item {
        cursor: pointer;
        &.active {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  .el-dropdown {
    color: inherit;
  }
}
</style>
