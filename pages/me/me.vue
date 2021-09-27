<template>
	<view class="me">
		<u-navbar :background="background" :is-back="false" title="me"></u-navbar>
		<view class="content">
			<u-empty mode="history" v-if="this.history.length==0"></u-empty>
			<view class="list">
				<u-cell-group>
					<u-cell-item icon="rewind-right-fill" :title="item[0]" v-for="(item,index) in history"
						:key="item.url" @click="showInfo(item[1])" :arrow="false">
					</u-cell-item>
				</u-cell-group>
			</view>
			<view class="bottom-btn">
				<u-button type="success" class="btn" v-if="this.history.length> 0" @click="clarnHistory">清空记录</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
		<Player :vedio="vedio" :show="show" @changeShow="changeShow" />
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import Player from '../../components/play/play.vue'
	export default {
		components: {
			Player
		},
		data() {
			return {
				show: false,
				vedio: {
					src: ""
				},
				history: [],
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		methods: {
			changeShow(flag) {
				this.show = flag
			},
			showInfo(item) {
				console.log(item)
				this.show = true;
				this.vedio = item;
			},
			clarnHistory() {
				uni.removeStorage({
					key: 'channels',
					success: (res) => {
						console.log('success');
						this.$refs.uToast.show({
							title: '操作成功',
							type: 'success', 
						})
						this.history = [];
					}
				});
			}
		},
		onShow() {
			console.log('page show')
			let result = uni.getStorageSync('channels');
			this.history = JSON.parse(result);
			console.log(this.history);
			console.log('页面进入执行 执行多次 onShow')
		},
		onHide() {

			console.log('页面进入离开 执行多次 onHide')
		},

	}
</script>

<style lang="scss">
	.me {
		// height: calc(100vh - 100px);
		width: 100%;
		.content {
			height: calc(100vh - 100px);
			display: flex;
			flex-direction: column;
			.list {
				flex: 1;
				display: flex;
				overflow: scroll;
			}
		}
	}
</style>
