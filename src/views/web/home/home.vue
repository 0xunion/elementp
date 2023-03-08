<template>
    <!-- fantastic home page -->
    <div class="home">
      <div class="home-bar">
        <div class="home-bar-avatar">
          <div class="home-bar-avatar-img"></div>
        </div>
        <div class="home-bar-name">
          <div class="home-bar-name-text">
            {{ $store.getters['user/getUserName'] }}
          </div>
          <div class="home-bar-name-identity">
            <el-tag v-if="$store.getters['user/isLogin']" type="success">已登录</el-tag>
            <el-tag v-else type="danger">未登录</el-tag>
            <el-tag v-if="$store.getters['user/isAdmin']">管理员</el-tag>
          </div>
        </div>
      </div>
      <div class="home-board">
        <div class="boardcast">
          <ul>
            <li>欢迎来到0xUn1on红蓝对战平台</li>
            <li>如您为外部导入的用户，如管理员导入的红蓝队人员，请点击上面的导航栏进入比赛界面</li>
            <li>如您为内部用户，请根据文档指引操作</li>

          </ul>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
    import { useStore } from 'vuex'
    const store = useStore()
    const $store = store
</script>


<style scoped lang="less">
    .home {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .home-bar {
            width: calc(100% - 40px);
            height: 150px;
            padding: 20px;
            display: flex;
            flex-direction: row;
            background-image: radial-gradient(circle at 5% 12%, rgb(66, 134, 244), rgb(153, 204, 204), rgb(97, 187, 187));
            box-shadow: 0 1px 10px 0 rgba(61,89,171,.443)!important;
            .home-bar-avatar {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: #f2f2f2;
                display: flex;
                align-items: center;
                justify-content: center;
                .home-bar-avatar-img {
                    width: 94px;
                    height: 94px;
                    border-radius: 50%;
                    background-image: url('../../../assets/avatar.png');
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                }
            }
            .home-bar-name {
                margin-left: 20px;
                display: flex;
                flex-direction: column;
                .home-bar-name-text {
                    font-size: 20px;
                    font-weight: bold;
                    color: #ffffff;
                    font-weight: 700;
                    text-shadow: 0 0 1px #fff, 0 0 10px hsl(0deg 0% 100% / 30%);
                }
                .home-bar-name-identity {
                    margin-top: 10px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    .el-tag {
                        margin-right: 10px;
                    }
                }
            }
        }

        .home-board {
            width: 100%;
            height: calc(100% - 150px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .boardcast {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                ul {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    li {
                        font-size: 20px;
                        font-weight: bold;
                        color: #0b8e92;
                        font-weight: 700;
                        text-shadow: 0 0 1px #fff, 0 0 10px hsl(0deg 0% 100% / 30%);
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
</style>