<template>
    <el-row>
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