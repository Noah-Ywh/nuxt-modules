<script setup lang="ts">
interface Res {
  userId: number
  id: number
  title: string
  body: string
}

const getExampleRes = ref<Res | null>(null)
const getExample = async () => {
  // 注入响应数据的类型：Res
  const { data, pending, error, refresh } = await useFetch<Res>('/api/posts/1')
  getExampleRes.value = data.value
}

const postExampleRes = ref<Res | null>(null)
const postExample = async () => {
  // 注入响应数据的类型：Res
  const { data, pending, error, refresh } = await useFetch<Res>('/example/posts', {
    method: 'post',
    body: {
      userId: 2,
    },
  })
  postExampleRes.value = data.value
}
</script>

<template>
  <div class="n-playground">
    <h1>首页</h1>

    <div class="n-playground__example">
      <div class="n-playground__example-item">
        <div class="button" @click="getExample()">测试 Get 请求</div>
        <div class="data">{{ getExampleRes }}</div>
      </div>
      <div class="n-playground__example-item">
        <div class="button" @click="postExample()">测试 POST 请求</div>
        <div class="data">{{ postExampleRes }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.n-playground {
  width: 50vw;
  height: 50vh;
  margin: 100px auto 0;
  box-shadow: 0 0 4px 2px #eee;

  h1 {
    text-align: center;
  }
}
.n-playground__example {
  display: flex;
  justify-content: space-around;
}

.n-playground__example-item {
  width: 50%;

  .button {
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #05a86b;
    border-radius: 4px;
    margin: 0 auto;
  }
  .data {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
}
</style>
