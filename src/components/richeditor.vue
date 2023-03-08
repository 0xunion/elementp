<template>
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
</template>
<script lang="ts" setup>
    import '@wangeditor/editor/dist/css/style.css' // 引入 css

    import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import {
      ElNotification,
    } from 'element-plus'

    import {
      api_upload_image,
      api_download_image_url
    } from '@/api/file'
    import { isSuccess } from '@/api/utils';


    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('')

    type InsertFnType = (url: string, alt: string, href: string) => void

    const toolbarConfig = {
    }
    const editorConfig = { 
      placeholder: '请输入内容...',
      MENU_CONF : {
        uploadImage : {
          async customUpload(file: File, insertFn: InsertFnType) {
            const data = await api_upload_image(file)
            if (isSuccess(data)) {
              const hash = data.data
              const url = api_download_image_url(hash)
              insertFn(url, '', '')
            } else {
              ElNotification.error({
                title: '上传失败',
                message: data.message
              })
            }
          }
        }
      }
    }

    // 定义v-model
    const props = defineProps({
      value: {
        type: String,
        default: ''
      },
      game_id: {
        type: String,
        default: ''
      }
    })
    const emit = defineEmits(['update:value'])

    watch(
      () => props.value,
      (val) => {
        valueHtml.value = val
      }
    )

    watch(
      () => valueHtml.value,
      (val) => {
        emit('update:value', val)
      }
    )

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    const mode = ref('simple')
</script> 