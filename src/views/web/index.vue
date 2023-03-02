<template>
<div class="web-all">
    <el-header height="50px; background-color: black;">
        <el-menu
            class="el-menu-top"
            mode="horizontal"
            :ellipsis="false"
        >
            <el-menu-item index="0">LOGO</el-menu-item>
            <div class="flex-grow" />
        </el-menu>
    </el-header>
    <div :class="['wrapper']" class="web_container">
        <el-container>
          <el-aside :width="'210px'">
            <el-row class="tac">
                <el-col :span="24">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-main"
                    :style="'width: 210px;'"
                >
                    <el-sub-menu v-for="route in routeList" :index="route.name" :key="route.name" v-show="allowRoute(route)">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>{{ route.meta?.title }}</span>
                        </template>
                        <el-menu-item-group >
                            <el-menu-item v-if="route.children.length == 0" :index="route.name" :key="route.name" @click="router.push(route)">{{ route.meta?.title }}</el-menu-item>
                            <el-menu-item v-for="child in route.children" :title="child.name" :key="child.name" :index="child.name" @click="router.push(child)" v-show="allowRoute(child)">{{ child.meta?.title }}</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
                </el-col>
            </el-row>
          </el-aside>
          <el-container>
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

    const allowRoute = (route: any) => {
        if (route.meta?.require === undefined) {
            return false
        }
        return route.meta.require()
    }

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

//set web container width, if the screen is larger than 1200px, set it to 1200px, set border to 1px and full height
.web_container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    border: 1px solid #ebeef5;
}

// set web all background to /static/images/web_bg.png
.web-all {
    //background-image: url('/static/images/web_bg.png');
    // background-size: cover;
    // background-repeat: no-repeat;
    // background-position: center;
    // // when the scroll event is triggered, the background image should not move
    // background-attachment: fixed;
    // cover the whole screen
    height: 100vh;
    width: 100%;
}

// set el-table header to transparent
.el-table th.el-table__cell {
    background-color: transparent !important;
}

</style>