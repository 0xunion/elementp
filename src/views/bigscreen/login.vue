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
                    {{ login_method == 'phone' ? '手机号' : '邮箱' }}
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
          <el-form-item>
            <el-image
                :src="form.captcha" 
                :fit="true"
                style="width: 200px; height: 50px"
                @click="refreshCaptcha"
            ></el-image>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.input_captcha">
                <template #prepend>
                    验证码
                </template>
            </el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-row justify="begin">
            <div class="mb-2 flex items-center text-sm">
                <el-radio-group v-model="login_method" class="ml-4">
                    <el-radio label="phone" size="large">手机号</el-radio>
                    <el-radio label="email" size="large">邮箱</el-radio>
                </el-radio-group>
            </div>
          </el-row>
          <el-row justify="end">
            <el-form-item class="login_btn">
              <el-button type="primary" @click="handleLogin">登录</el-button>
              <el-button type="info" @click="handleReset">重置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
</template>
   
<script lang="ts" setup>
    import { api_email_login, api_login_captcha, api_phone_login } from "@/api/auth";
    import { isSuccess, setAuthToken } from '@/api/utils'
    import { Response } from '@/api'
    import { ref, onMounted } from "vue"
    import { ElNotification } from 'element-plus'
    import { useRouter } from 'vue-router'
    import { WebRoutesHome } from '@/router/routes/web'

    const router = useRouter()

    const login_method = ref<string>("phone")

    const form = ref({
        identity: "",
        password: "",
        captcha: "",
        captcha_token: "",
        input_captcha: ""
    });

    const refreshCaptcha = async () => {
        const data = await api_login_captcha()
        if(isSuccess(data)) {
            form.value.captcha_token = data.data.token
            form.value.captcha = data.data.captcha
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    };

    const handleLogin = async () => {
        let login_api: (identity: string, password: string, input_captcha: string, captcha_token: string) => Promise<Response>
        if(login_method.value == 'phone') {
            login_api = api_phone_login
        } else {
            login_api = api_email_login
        }
        const data = await login_api(form.value.identity, form.value.password, form.value.input_captcha, form.value.captcha_token)
        if(isSuccess(data)) {
            setAuthToken(data.data.token)
            ElNotification.success({
                title: '提示',
                message: '登录成功，即将跳转到个人中心'
            })
            setTimeout(() => {
                router.push({
                    name: WebRoutesHome.NAME
                })
            }, 1000)
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    };

    const handleReset = () => {
        form.value.identity = ""
        form.value.password = ""
        refreshCaptcha()
    };

    onMounted(() => {
        refreshCaptcha()
    })


</script>
   
<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100vh;
  }
  .login_box {
    width: 450px;
    height: 400px;
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