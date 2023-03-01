<template>
<div :class="['wrapper']">
    <el-container>
      <el-aside :width="'210px'">
        <el-row class="tac">
            <el-col :span="24">
            <el-menu
                default-active="2"
                class="el-menu-vertical-main"
                :style="'position: fixed;'"
            >
                <el-sub-menu v-for="route in routeList" :index="route.name" :key="route.name">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>{{ route.meta?.title }}</span>
                    </template>
                    <el-menu-item-group >
                        <el-menu-item v-if="route.children.length == 0" :index="route.name" :key="route.name" @click="router.push(route)">{{ route.meta?.title }}</el-menu-item>
                        <el-menu-item v-for="child in route.children" :title="child.name" :key="child.name" :index="child.name" @click="router.push(child)">{{ child.meta?.title }}</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
            </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header height="50px">
            <el-menu
                class="el-menu-top"
                mode="horizontal"
                :ellipsis="false"
            >
                <el-menu-item index="0">LOGO</el-menu-item>
                <div class="flex-grow" />
            </el-menu>
        </el-header>
        <el-main>
          <breadcrumb/>
          <div v-if="isRouterAlive">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
</div>
</template>

<script setup lang="ts">
    import { ref, nextTick } from 'vue'
    import { web_routes } from '@/router/routes/web'
    import { Location } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router';

    const router = useRouter()

    // build a route list which has at most two levels
    const routes = web_routes.filter(route => route.name !== undefined)
    const routeList = routes.map(route => {
        return {
            name: route.name,
            children: route.children?.map(child => {
                return {
                    name: child.name,
                    path: child.path,
                    meta: child.meta
                }
            }) || [],
            meta: route.meta
        }
    })

    const isRouterAlive = ref<boolean>(true)
    const handleReload = () => {
        isRouterAlive.value = false
        nextTick(() => {
            isRouterAlive.value = true
        })
    }

</script>

<style lang="scss" scoped>
// set element-plus side menu min-height to fit the screen
.el-menu-vertical-main {
    min-height: 100vh;
}

// unset element-plus top menu padding
header {
    padding: 0;
}
</style>