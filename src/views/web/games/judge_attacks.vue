<template>
    <el-row>
        <el-col :span="24">
            <h1>
                攻击申请列表
            </h1>
        </el-col>
        <el-col :span="24">
            <el-form>
                <el-form-item label="攻击状态">
                    <el-select v-model="state" class="m-2" placeholder="Select">
                        <el-option
                            v-for="item in state_list"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="攻击内容">
                    <el-input v-model="content" class="m-2" placeholder="请输入攻击内容"></el-input>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-table
                :data="attacks"
                style="width: 100%"
            >
                <el-table-column
                    prop="id"
                    label="ID"
                    width="180"
                />
                <el-table-column
                    prop="reason"
                    label="申请理由"
                />
                <el-table-column
                    prop="state"
                    label="状态"
                    width="180"
                >
                    <template #default="scope">
                        <el-tag
                            :type="scope.row.state == 0 ? 'warning' : (scope.row.state == 1 ? 'success' : 'danger')"
                        >
                            {{ state_list[scope.row.state + 1].name }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="create_at"
                    label="创建时间"
                    width="180"
                >
                    <template #default="scope">
                        {{ new Date(scope.row.create_at * 1000).toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180"
                >
                    <template #default="scope">
                        <el-button
                            type="primary"
                            size="mini"
                            :disabled="scope.row.state != 0"
                            @click="accept_attack(scope.row.id)"
                        >
                            同意
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            :disabled="scope.row.state != 0"
                            @click="reject_attack(scope.row.id)"
                        >
                            拒绝
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center; width: 100%;">
                <el-pagination
                    layout="prev, pager, next" :total="9999999"
                    v-model:current-page="page"
                >
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import {
    api_game_manage_attack_list,
    api_game_manage_attack_accept,
    api_game_manage_attack_reject
} from '@/api/game'
import { isSuccess } from '@/api/utils'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const game_id = ref('')

const attacks = ref([] as any[])

const page = ref(1)
const state = ref(-1)
const content = ref('')

watch(state, () => {
    get_attacks()
})

watch(content, () => {
    get_attacks()
})

watch(page, () => {
    get_attacks()
})

const state_list = ref([
    {name: '全部', value: -1},
    {name: '未审核', value: 0},
    {name: '已通过', value: 1},
    {name: '未通过', value: 2},
])

const get_attacks = async () => {
    const data = await api_game_manage_attack_list(game_id.value, page.value, 20, state.value, content.value)
    if (isSuccess(data)) {
        attacks.value = data.data.attacks
    } else {
        ElNotification({
            title: '获取攻击列表失败',
            message: data.message,
            type: 'error'
        })
    }
}

const accept_attack = async (id: string) => {
    const data = await api_game_manage_attack_accept(game_id.value, id)
    if (isSuccess(data)) {
        ElNotification({
            title: '操作成功',
            message: '已同意该攻击',
            type: 'success'
        })
        get_attacks()
    } else {
        ElNotification({
            title: '操作失败',
            message: data.message,
            type: 'error'
        })
    }
}

const reject_attack = async (id: string) => {
    const data = await api_game_manage_attack_reject(game_id.value, id, 'x')
    if (isSuccess(data)) {
        ElNotification({
            title: '操作成功',
            message: '已拒绝该攻击',
            type: 'success'
        })
        get_attacks()
    } else {
        ElNotification({
            title: '操作失败',
            message: data.message,
            type: 'error'
        })
    }
}

onMounted(() => {
    let id = router.currentRoute.value.params.id
    id = id + ''
    if (id) {
        game_id.value = id
        get_attacks()
    } else {
        router.back()
    }
})

</script>