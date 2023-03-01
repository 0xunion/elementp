<template>
    <el-row>
        <el-col :span="24">
            <el-button-group>
                <el-button type="primary" @click="router.push({ name: WebRoutesAdminGameEditor.NAME })">新建比赛</el-button>
            </el-button-group>                
        </el-col>
        <el-divider />
        <el-col :span="24">
            <GamesComponent></GamesComponent>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import GamesComponent from '@/components/games.vue'
    import { useRouter } from 'vue-router'
    import { WebRoutesAdminGameEditor } from '@/router/routes/admin/admin';
    const router = useRouter()
</script>