<script setup lang="ts">
const { token, logout } = useAuth()
const navs = [
  { value: '首页', linkTo: '/' },
  { value: '产品列表', linkTo: '/product' },
  { value: '订单列表', linkTo: '/order' },
  { value: '订单详情', linkTo: '/order/detail-1' },
  { value: '登录', linkTo: '/login' },
  { value: '注册', linkTo: '/register' },
]
const out = () => {
  logout()
}
</script>

<template>
  <div id="__layout">
    <nav class="n-playground__nav">
      <div v-for="nav in navs" :key="nav.value" class="link">
        <NuxtLink :to="nav.linkTo">{{ nav.value }}</NuxtLink>
      </div>
      <div class="logout" @click="out()">退出登录</div>
    </nav>
    <div class="n-playground__login-state">
      <h2>
        登录状态：<span>{{ token ? '已登录' : '未登录' }}</span>
      </h2>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.n-playground__nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90vw;
  height: 60px;
  border: 1px solid #1fbf86;
  margin: 60px auto 0;

  .link {
    padding: 4px 8px;

    a {
      font-size: 20px;
      color: #333;
      text-decoration: none;

      &:hover {
        color: #05a86b;
      }
    }
  }
  .logout {
    font-size: 20px;
    color: #333;
    padding: 4px 8px;
    cursor: pointer;
    &:hover {
      color: #05a86b;
    }
  }
}
.n-playground__login-state {
  width: 90vw;
  margin: 20px auto 0;

  span {
    color: #fb5800;
  }
}
</style>
