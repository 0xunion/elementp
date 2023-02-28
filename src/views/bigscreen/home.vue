<script lang="ts" setup>
import scroll from '../../hooks/Scroll'
import { onMounted, ref } from "vue";

const tableData = [{ rank: '1', name: 'Tom', num: '111', }, { rank: '2', name: 'xxx', num: '2121', }, { rank: '3', name: 'ccc', num: '31312', }, { rank: '4', name: 'rrr', num: '423', }, { rank: '5', name: 'Tom', num: '111', }, { rank: '6', name: 'xxx', num: '2121', }, { rank: '7', name: 'ccc', num: '31312', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', }, { rank: '8', name: 'rrr', num: '423', },]

//设置滚动
const table1 = ref();
onMounted(() => {
	scroll(table1.value.$refs.bodyWrapper);
});

</script>


<template>
	<div class="building">
		<el-container>
			<!-- 标题 -->
			<el-header>
				<el-row class="row-bg" justify="space-around">
					<el-col :span="10"><div class="grid-content" justify="center">1</div></el-col>
					<el-col :span="4"><div class="grid-content" >1</div></el-col>
					<el-col :span="10"><div class="grid-content" >1</div></el-col>
				  </el-row>
			</el-header>
			<el-container>
				<el-container>
					<el-main>Main</el-main>
					<!-- 左下 -->
					<el-footer>
						<div>
							<el-auto-resizer>

								<el-table :data="tableData" height="250">
									<el-table-column prop="rank" label="rank" align="center" />
									<el-table-column prop="name" label="Name" align="center" />
									<el-table-column prop="num" label="num" align="center" />

								</el-table>

							</el-auto-resizer>
						</div>
					</el-footer>
				</el-container>
				<!-- 侧边栏 -->
				<el-aside>

					<el-table ref="table1" :data="tableData" height="464">
						<el-table-column prop="rank" label="rank" />
						<el-table-column prop="name" label="Name" align="center" />
						<el-table-column prop="num" label="num" align="center" />
					</el-table>

				</el-aside>
			</el-container>
		</el-container>
	</div>
</template>


<style scoped>
.el-header {
	background:url("../assets/bg_head.png");
	background-size: cover;

	margin:0;
	padding:0;
  
}
.building{
    background:url("../assets/bg.png");
    width:100%;
    height:100%;
    position:fixed;
    background-size:100% 100%;
  }
.el-footer {
	background: #33aec44f;
	height: 280px;
	color: black;
}

.el-main {
	background: #29cf2c00;
	height: 450px;
}

.el-aside {
	width: 370px;
}

.el-row {
	margin-bottom: 0;
	margin: 0;
	padding: 0;
}



.el-col {
	border-radius: 4px;
	background: #4189d749;

}

.grid-content {
	border-radius: 4px;
	min-height: 60px;
	background: #3ddfa652;
}
</style>
