<template>
    <!-- fantastic home page -->
    <div class="home">
      <h1>{{ $store.getters['user/getUserName'] }}的个人主页</h1>
      <el-row>
        <el-col :span="24">
            <el-tag v-if="$store.getters['user/isLogin']" type="success">已登录</el-tag>
            <el-tag v-else type="danger">未登录</el-tag>
            <el-tag v-if="$store.getters['user/isAdmin']">管理员</el-tag>
        </el-col>
      </el-row>
      <h3>链接</h3>
      <ul>
        <li><a href="https://github.com/0xunion" target="_blank">关于我们</a></li>
        <li><a href="https://github.com/0xunion" target="_blank">关于我们</a></li>
        <li><a href="https://github.com/0xunion" target="_blank">关于我们</a></li>
        <li><a href="https://github.com/0xunion" target="_blank">关于我们</a></li>
        <li><a href="https://github.com/0xunion" target="_blank">关于我们</a></li>
        <br>
      </ul>
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex'
    const store = useStore()
    const $store = store
</script>


<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>