<template>
    <div class="report-editor">
        <el-row>
            <el-col :span="24">
                <h1>
                    编辑报告
                </h1>
            </el-col>
            <el-col :span="24">
                <el-form>
                    <el-form-item label="报告标题">
                        <el-input v-model="form.name" placeholder="请输入报告标题"></el-input>
                    </el-form-item>
                    <el-form-item label="溯源目标">
                        <el-select v-model="form.attacker_team_id" class="m-2" placeholder="Select">
                            <el-option
                            v-for="item in attackers"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="导入word">
                        <el-button @click="importWord">
                            选择文件（仅支持docx）
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-divider></el-divider>
                <RichEditor v-model:value="form.content"></RichEditor>
            </el-col>
            <el-col :span="24">
                <el-divider></el-divider>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
    import RichEditor from '@/components/richeditor.vue'
    import { 
        api_game_defender_attacker_list,
        api_game_defender_report_submit
    } from '@/api/game';
    import {
        api_upload_image,
        api_download_image_url
    } from '@/api/file'
    import { useRouter } from 'vue-router';
    import { ref, onMounted, computed } from 'vue';
    import { isSuccess } from '@/api/utils';
    import { WebRoutesGamesAttackerPage, WebRoutesGamesDefenderPage, WebRoutesGamesList } from '@/router/routes/game';
    import { ElNotification } from 'element-plus';

    const router = useRouter()

    class Section {
        name: string = ''
        value: number = 0
        cn: string = ''
    }

    class Attacker {
        name: string = ''
        id: string = ''
    }

    const game_id = ref('')
    const report_id = ref('')
    const attackers = ref([] as Attacker[])

    const form = ref({
        content : '',
        attacker_team_id : '',
        name : ''
    })

    const isNewReport = computed(() => {
        return report_id.value === ''
    })

    const get_attackers = async () => {
        const data = await api_game_defender_attacker_list(game_id.value, 1, 1000)
        if (isSuccess(data)) {
            attackers.value = data.data.attackers
        } else {
            ElNotification.error({
                title: '提示',
                message: '获取攻击方列表失败'
            })
        }
    }

    const submit = async () => {
        const data = await api_game_defender_report_submit(
            game_id.value, 
            form.value.content,
            form.value.attacker_team_id,
            form.value.name,
        )
            
        if (isSuccess(data)) {
            ElNotification.success({
                title: '提示',
                message: '提交成功，正在跳转……'
            })

            setTimeout(() => {
                router.push({
                    path: WebRoutesGamesDefenderPage.PATH.replace(':id', game_id.value)
                })
            }, 500)
        } else {
            ElNotification.error({
                title: '提示',
                message: '提交失败'
            })
        }
    }

    const importWord = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (!file) {
                return
            }

            const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() })
            // build this result to a new DOM
            const div = document.createElement('div')
            div.innerHTML = result.value
            // get all images
            const images = div.querySelectorAll('img')
            for (let i = 0; i < images.length; i++) {
                const img = images[i]
                const src = img.src
                if (src) {
                    const blob = await fetch(src).then(r => r.blob())
                    const file = new File([blob], 'image.png', { type: 'image/png' })
                    const data = await api_upload_image(file)
                    if (isSuccess(data)) {
                        const url = api_download_image_url(data.data)
                        img.src = url
                    } else {
                        img.src = ''
                    }
                } else {
                    img.src = ''
                }
            }

            form.value.content = div.innerHTML
        }
        input.click()
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

        const script = document.createElement('script') 
        script.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.4.8/mammoth.browser.min.js'
        document.body.appendChild(script)

        const rid = router.currentRoute.value.params.report_id as string
        if (rid) {
            report_id.value = rid
        }

        get_attackers()
    })
</script>