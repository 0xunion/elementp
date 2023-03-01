<template>
    <div>
        <el-table :data="games" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="start_time" label="开始时间">
                <template #default="scope">
                    <span>{{ new Date(scope.row.start_time).toLocaleString() }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间">
                <template #default="scope">
                    <span>{{ new Date(scope.row.end_time).toLocaleString() }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="text" size="small">攻击大屏</el-button>
                    <el-button type="text" size="small">防守大屏</el-button>
                    <el-button type="text" size="small" v-if="isAdminRoute" >管理后台</el-button>
                    <el-button type="text" size="small" v-if="isAdminRoute"
                        @click="toEditor(scope.row.id)"
                    >编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { api_admin_get_games, api_get_games } from '@/api/game'
import { isSuccess } from '@/api/utils';
import { ElNotification } from 'element-plus';
import { WebRoutesAdminGameEditor } from '@/router/routes/admin/admin';

const router = useRouter()

// check if route is in admin routes
const isAdminRoute = computed(() => {
    return router.currentRoute.value.path.includes('admin')
})

const api = computed(() => isAdminRoute.value ? api_admin_get_games : api_get_games)

const games = ref([])
const page = ref(1)

const getGames = async () => {
    const data = await api.value(page.value, 20)
    if (isSuccess(data)) {
        games.value = data.data.games
    } else {
        ElNotification.error({
            title: '提示',
            message: data.message
        })
    }
}

const toEditor = (id : string) => {
    router.push({
        path : `${WebRoutesAdminGameEditor.PATH.replace(':id', id)})}`
    })
}

onMounted(() => {
    getGames()
})

</script>