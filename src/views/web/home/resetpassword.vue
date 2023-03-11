<template>
    <el-form>
        <el-form-item label="旧密码">
            <el-input type="password" v-model="form.old_password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="reset_password">修改密码</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {
    api_reset_password
} from '@/api/auth'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { isSuccess } from '@/api/utils'

const router = useRouter()

const form = ref({
    old_password: '',
    password: '',
})

const reset_password = async () => {
    const data = await api_reset_password(form.value.old_password, form.value.password)
    if(isSuccess(data)) {
        ElNotification.success({
            title: '提示',
            message: '修改密码成功'
        })
        router.push('/web/home')
    } else {
        ElNotification.error({
            title: '提示',
            message: data.message
        })
    }
}


</script>