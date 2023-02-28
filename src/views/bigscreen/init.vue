<template>
    <div class="login_container">
      <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
          <img src="../../assets/vue.png" alt="" />
        </div>
        <!-- 登录表单区域 -->
        <el-form label-width="0px" class="login_form">
          <!-- 用户名 -->
          <el-form-item>
            <el-input v-model="form.identity">
                <template #prepend>
                    初始化管理员邮箱
                </template>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item>
            <el-input type="password" v-model="form.password">
                <template #prepend>
                    密码
                </template>
            </el-input>
          </el-form-item>
          <el-row justify="end">
            <el-form-item class="login_btn">
              <el-button type="primary" @click="handleLogin">初始化</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
</template>
   
<script lang="ts" setup>
    import { api_init_root } from "@/api/auth";
    import { isSuccess } from '@/api/utils'
    import { ref } from "vue"
    import { ElNotification } from 'element-plus'
    import { useRouter } from 'vue-router'
    import { LoginRoute } from '@/router/routes/bigscreen'

    const router = useRouter()

    const login_method = ref<string>("phone")

    const form = ref({
        identity: "",
        password: "",
    });

    const handleLogin = async () => {
        const data = await api_init_root(form.value.identity, form.value.password)
        if(isSuccess(data)) {
            ElNotification.success({
                title: '提示',
                message: '初始化成功，即将跳转到登录页面'
            })
            setTimeout(() => {
                router.push({
                    name: LoginRoute.NAME
                })
            }, 1000)
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    };
</script>
   
<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100vh;
  }
  .login_box {
    width: 450px;
    height: 250px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .login_btn {
    // 设置弹性布局
    display: flex;
    // 横轴上尾部对齐
    justify-content: flex-end;
  }
  </style>