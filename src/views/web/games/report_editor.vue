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
                    <el-form-item label="成果类型">
                        <el-radio-group v-model="form.achievement_type" class="ml-4">
                            <el-radio :label="item.value" v-for="item in sections.achievement_type">
                                {{ item.cn }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="攻击类型">
                        <el-radio-group v-model="form.attack_type" class="ml-4">
                            <el-radio :label="item.value" v-for="item in sections.attack_type">
                                {{ item.cn }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="隔离突破">
                        <el-radio-group v-model="form.isolation_break" class="ml-4">
                            <el-radio :label="item.value" v-for="item in sections.isolation_break">
                                {{ item.cn }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="漏洞等级">
                        <el-radio-group v-model="form.level" class="ml-4">
                            <el-radio :label="item.value" v-for="item in sections.level">
                                {{ item.cn }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="漏洞类型">
                        <el-radio-group v-model="form.vuln_type" class="ml-4">
                            <el-radio :label="item.value" v-for="item in sections.vuln_type">
                                {{ item.cn }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
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
                    <el-form-item label="URI">
                        <el-input v-model="form.uri" class="m-2" placeholder="请输入URI"></el-input>
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
        api_game_attacker_report_section, 
        api_game_attacker_report_commit, 
        api_game_attacker_list_defender,
    } from '@/api/game';
    import {
        api_upload_image,
        api_download_image_url
    } from '@/api/file'
    import { useRouter } from 'vue-router';
    import { ref, onMounted, computed } from 'vue';
    import { isSuccess } from '@/api/utils';
    import { WebRoutesGamesAttackerPage, WebRoutesGamesList } from '@/router/routes/game';
    import { ElNotification } from 'element-plus';

    const router = useRouter()

    class Section {
        name: string = ''
        value: number = 0
        cn: string = ''
    }

    class Defender {
        name: string = ''
        id: string = ''
    }

    const game_id = ref('')
    const report_id = ref('')
    const defenders = ref([] as Defender[])

    const sections = ref({
        achievement_type: [] as Section[],
        attack_type: [] as Section[],
        isolation_break: [] as Section[],
        level: [] as Section[],
        status: [] as Section[],
        vuln_type: [] as Section[],
    })
    const form = ref({
        achievement_type : 0,
        attack_type : 0,
        isolation_break : 0,
        level : 0,
        vuln_type : 0,
        content : '',
        defender_id : '',
        uri : '',
        name : ''
    })

    const isNewReport = computed(() => {
        return report_id.value === ''
    })

    const get_sections = async () => {
        const data = await api_game_attacker_report_section(game_id.value)
        if (isSuccess(data)) {
            sections.value = data.data.sections
        }
    }

    const get_defenders = async () => {
        const data = await api_game_attacker_list_defender(game_id.value)
        if (isSuccess(data)) {
            defenders.value = data.data.defenders
        }
    }

    const submit = async () => {
        const data = await api_game_attacker_report_commit(
            game_id.value, 
            form.value.defender_id,
            form.value.content,
            form.value.isolation_break,
            form.value.vuln_type,
            form.value.achievement_type,
            form.value.attack_type,
            form.value.uri,
            form.value.level,
            form.value.name,
        )
            
        if (isSuccess(data)) {
            ElNotification.success({
                title: '提示',
                message: '提交成功，正在跳转……'
            })

            setTimeout(() => {
                router.push({
                    path: WebRoutesGamesAttackerPage.PATH.replace(':id', game_id.value)
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

        // import https://cdn.jsdelivr.net/npm/mammoth@1.4.8/mammoth.browser.min.js
        const script = document.createElement('script') 
        script.src = 'https://cdn.jsdelivr.net/npm/mammoth@1.4.8/mammoth.browser.min.js'
        document.body.appendChild(script)

        const rid = router.currentRoute.value.params.report_id as string
        if (rid) {
            report_id.value = rid
        }

        get_sections()
        get_defenders()
    })
</script>