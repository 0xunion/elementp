<template>
    <div class="textbox">
        <div class="textbox-title">
            {{ props.title }}
        </div>
        <div class="textbox-value">
            {{ props.value }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    // define title and value
    const props = defineProps({
        title : {
            type : [String, Number],
            default : "title"
        },
        value : {
            type : [String, Number],
            default : 'value'
        }
    })


</script>

<style lang="less">
    .textbox {
        width: 100%;
        height: 100%;
        color: #ffffff;
        font-size: 1.5em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .textbox-title {
        font-size: 0.5em;
        color: rgb(2,133,187);
        font-size: 20px;
        font-weight: 700;
    }
    .textbox-value {
        font-size: 1.5rem;
        font-weight: 600;
    }

    // use background image in ../assets/textbox.png
    .textbox {
        background-image: url('../assets/textbox.png');
        background-size: 100% 100%;
    }
</style>