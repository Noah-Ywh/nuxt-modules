<script setup lang="ts">
const { login } = useAuth()
</script>

<template>
  <div class="n-playground-login">
    <div class="n-playground__button" @click="login('123')">Login</div>
  </div>
</template>

<style lang="scss" scoped>
.n-playground-login {
  width: 50vw;
  height: 50vh;
  text-align: center;
  padding: 10px;
  margin: 100px auto 0;
  box-shadow: 0 0 4px 2px #eee;
}
.n-playground__button {
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background-color: #05a86b;
  border-radius: 4px;
  margin: 40px auto;
}
</style>
