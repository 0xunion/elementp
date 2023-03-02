<template>
    <div>
        <el-table :data="games" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180" v-if="isAdminRoute"></el-table-column>
            <el-table-column prop="id" label="ID" width="180">
                <template #default="scope">
                    <span v-if="isAdminRoute">{{ scope.row.id }}</span>
                    <span v-else>{{ scope.row.game.id }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" v-if="isAdminRoute"></el-table-column>
            <el-table-column prop="name" label="名称">
                <template #default="scope">
                    <span v-if="isAdminRoute">{{ scope.row.name }}</span>
                    <span v-else>{{ scope.row.game.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述" v-if="isAdminRoute"></el-table-column>
            <el-table-column prop="description" label="描述">
                <template #default="scope">
                    <span v-if="isAdminRoute">{{ scope.row.description }}</span>
                    <span v-else>{{ scope.row.game.description }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间">
                <template #default="scope">
                    <span v-if="isAdminRoute">{{ new Date(scope.row.start_time * 1000).toLocaleString() }}</span>
                    <span v-else>{{ new Date(scope.row.game.start_time * 1000).toLocaleString() }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间">
                <template #default="scope">
                    <span v-if="isAdminRoute">{{ new Date(scope.row.end_time * 1000).toLocaleString() }}</span>
                    <span v-else>{{ new Date(scope.row.game.end_time * 1000).toLocaleString() }}</span>
                </template>
            </el-table-column>
            <el-table-column label="参赛身份" scope="identity" v-if="!isAdminRoute">
                <template #default="scope">
                    <el-tag v-if="scope.row.identity === 0">攻击方</el-tag>
                    <el-tag v-else-if="scope.row.identity === 1">防守方</el-tag>
                    <el-tag v-else-if="scope.row.identity === 2">裁判</el-tag>
                    <el-tag v-else-if="scope.row.identity === 3">领导</el-tag>
                    <el-tag v-else-if="scope.row.identity === 4">甲方</el-tag>
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
                    <el-button type="text" size="small" v-if="scope.row.identity == 2" @click="toJudge(isAdminRoute ? scope.row.id : scope.row.game.id)">裁判后台</el-button>
                    <el-button type="text" size="small" v-if="scope.row.identity == 1" @click="toDefender(isAdminRoute ? scope.row.id : scope.row.game.id)">防守方后台</el-button>
                    <el-button type="text" size="small" v-if="scope.row.identity == 0" @click="toAttacker(isAdminRoute ? scope.row.id : scope.row.game.id)">攻击方后台</el-button>
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
import { WebRoutesGamesAttackerPage, WebRoutesGamesDefenderPage, WebRoutesGamesJudgePage } from '@/router/routes/game';

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

const toJudge = (id : string) => {
    router.push({
        path : `${WebRoutesGamesJudgePage.PATH.replace(':id', id)})}`
    })
}

const toDefender = (id : string) => {
    router.push({
        path : `${WebRoutesGamesDefenderPage.PATH.replace(':id', id)})}`
    })
}

const toAttacker = (id : string) => {
    router.push({
        path : `${WebRoutesGamesAttackerPage.PATH.replace(':id', id)})}`
    })
}

onMounted(() => {
    getGames()
})

</script>