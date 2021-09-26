<template>
	<view>
		<u-tabbar v-model="current" :list="list" @change="changRouter"></u-tabbar>
	</view>
</template>

<script>
	export default {
		name: "tabBar",
		data() {
			return {
				list: [{
						"pagePath": "pages/index/index",
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						customIcon: false,
					},
					{
						"pagePath": "pages/hello/hello",
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '放映厅',
						customIcon: false,
					},

					{
						"pagePath": "pages/live/live",
						iconPath: "play-right",
						selectedIconPath: "play-right-fill",
						text: '直播',
						customIcon: false,
					},
					{
						"pagePath": "pages/me/me",
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 23,
						isDot: false,
						customIcon: false,
					},
				],
				current: 0,
			};
		},
		methods: {
			changRouter(index) {
				console.log(index);
				uni.switchTab({
					url: '/' + this.list[index].pagePath
				})
			}
		},
	}
</script>

<style>

</style>
