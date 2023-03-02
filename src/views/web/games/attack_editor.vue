<template>
    <div class="report-editor">
        <el-row>
            <el-col :span="24">
                <h1>
                    编辑高危攻击申请
                </h1>
            </el-col>
            <el-col :span="24">
                <el-form>
                    <el-form-item label="防守目标">
                        <el-select v-model="form.defender_id" class="m-2" placeholder="Select">
                            <el-option
                            v-for="item in defenders"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="理由">
                        <el-input v-model="form.reason" class="m-2" placeholder="攻击理由"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-divider></el-divider>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
    import { api_game_attacker_attack_apply, api_game_attacker_list_defender } from '@/api/game';
    import { useRouter } from 'vue-router';
    import { ref, onMounted, computed } from 'vue';
    import { isSuccess } from '@/api/utils';
    import { WebRoutesGamesAttackerPage, WebRoutesGamesList } from '@/router/routes/game';
    import { ElNotification } from 'element-plus';

    const router = useRouter()

    class Defender {
        name: string = ''
        id: string = ''
    }

    const game_id = ref('')
    const attack_id = ref('')
    const defenders = ref([] as Defender[])

    const form = ref({
        reason : '',
        defender_id: '',
    })

    const get_defenders = async () => {
        const data = await api_game_attacker_list_defender(game_id.value)
        if (isSuccess(data)) {
            defenders.value = data.data.defenders
        }
    }

    const submit = async () => {
        const data = await api_game_attacker_attack_apply(game_id.value, form.value.defender_id, form.value.reason)
        if (isSuccess(data)) {
            ElNotification({
                title: '成功',
                message: '提交成功',
                type: 'success',
            })
            router.push({
                name: WebRoutesGamesAttackerPage.NAME,
                params: {
                    game_id: game_id.value,
                },
            })
        }
    }

    onMounted(() => {
        const id = router.currentRoute.value.params.game_id as string
        if (id) {
            game_id.value = id
        } else {
            router.push({ 
                name: WebRoutesGamesList.NAME,
            })
            return
        }

        get_defenders()
    })
</script>