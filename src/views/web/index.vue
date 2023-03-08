<template>
<div class="web-all">
    <el-header height="50px; background-color: black;">
        <el-menu
            class="el-menu-top"
            mode="horizontal"
            :ellipsis="false"
        >
            <el-menu-item index="0">
                0xUn1on
            </el-menu-item>
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
    </el-header>
    <div :class="['wrapper']" class="web_container">
        <el-container>
          <el-container>
            <el-main>
              <breadcrumb/>
              <div v-if="isRouterAlive">
                <router-view></router-view>
              </div>
            </el-main>
        </el-container>
    </el-container>
</div>
<div class="footer">
    <div class="footer-content">
        <div class="footer-content-item">
            <div class="footer-content-item-title">关于我们</div>
            <div class="footer-content-item-text">关于我们</div>
            <div class="footer-content-item-text">联系我们</div>
            <div class="footer-content-item-text">加入我们</div>
        </div>
    </div>  
    <el-divider></el-divider>
    <div class="footer-copyright">
        <div class="footer-copyright-content">
            <div class="footer-copyright-content-item">
                <div class="footer-copyright-content-item-text">© 2022 ~ {{ new Date().getUTCFullYear() }} 0xUn1on All rights reserved.</div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script setup lang="ts">
    import { ref, nextTick } from 'vue'
    import { web_routes } from '@/router/routes/web'
    import { Location, CircleCheckFilled } from '@element-plus/icons-vue'
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

// footer, make sure it is at the bottom of the page, but not cover the content
.footer {
    display: flex;
    flex-direction: column;
    height: 350px;
    width: calc(100% - 160px);
    background-color: #3d59ab;
    padding: 0 80px;
}

.footer-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 20px;
}

.footer-content-item {
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.footer-content-item-title {
    font-size: 20px;
    color: #0b8e92;;
    padding: 8px;
}

.footer-content-item-text {
    font-size: 14px;
    padding: 8px;
    color: #c5c5c5;
}

.footer-copyright {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
}

.footer-copyright-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
}


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
    margin-top: 20px;
    // only left and right border
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    min-height: calc(100vh - 400px);
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

// set all font-family to 'Microsoft YaHei'
* {
    font-family: 'Microsoft YaHei';
}

</style>