<template>
    <v-ace-editor
      v-model:value="content"
      @init="editorInit"
      lang="javascript"
      :options="{
        fontSize: 14,
        tabSize: 2,
        showPrintMargin: false,
        highlightActiveLine: true,
      }"
      theme="monokai"
      style="height: 400px; width: 100%; background: #000; color: #fff"
      @input="update"
    >
    </v-ace-editor>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  ref,
  onMounted,
  nextTick,
  defineEmits,
} from "vue";
import { VAceEditor } from "vue3-ace-editor";
import ace from "ace-builds";

ace.config.set('basePath', '/static/src-noconflict/');
function editorInit() {
  
}

const content = ref("");

// define v-model
const emit = defineEmits(["update:value"]);
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});

const update = (value: any) => {
    emit("update:value", content.value);
};

watch(
  () => props.value,
  (value) => {
    content.value = value;
  }
);

onMounted(() => {
    nextTick(() => {
        editorInit();
    });

    content.value = props.value;
});
</script>

<style>
/* 修改光标颜色 */
.ace_cursor {
  color: #fff !important;
}
</style>