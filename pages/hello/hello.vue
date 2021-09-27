<template>
	<view class="hello">
		<view>
			<u-navbar :background="background" :is-back="false" title="频道"></u-navbar>
			<view class="content ">
				<u-sticky>
					<u-tabs name="cate_name" count="cate_count" :list="tabList" :is-scroll="false" :current="current"
						@change="change"></u-tabs>
				</u-sticky>
				<u-cell-group>
					<u-cell-item icon="rewind-right-fill" :title="item.title" v-for="(item,index) in list"
						:key="item.url" @click="showInfo(item)" :arrow="false">
						<!-- 		<view class="item">
							<view class="image" v-slot="icon">
								<u-image width="100rpx" height="100rpx" v-if="item['tvg-logo'].length !== 0"
									:src="item['tvg-logo']">
									<u-loading slot="loading"></u-loading>
								</u-image>
								<u-image width="100rpx" height="100rpx" v-else
									src="https://cdn.uviewui.com/uview/example/fade.jpg">
									<u-loading slot="loading"></u-loading>
								</u-image>
							</view>
							<view class="title" v-slot="title">
								{{item.title}}
							</view>
						</view> -->

					</u-cell-item>

				</u-cell-group>
				<Player :vedio="vedio" :show="show" @changeShow="changeShow" />
			</view>
		</view>
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
				history: new Map(),
				loading: true,
				show: false,
				list: [],
				tabList: [{
					cate_name: '卫视'
				}, {
					cate_name: '影视'
				}, {
					cate_name: '体育',
				}],
				current: 0,
				vedio: {
					src: ""
				},
				background: {
					// backgroundColor: '#001f3f',

					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',

					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		methods: {
			changeShow(flag) {
				this.show = flag
			},
			showInfo(item) {
				this.history.set(item.title, item);
				console.log(this.history)
				uni.setStorage({
					key: 'channels',
					data: JSON.stringify([...this.history]),
					success: function() {
						console.log('success');
					}
				})
				console.log(item)
				this.show = true;
				this.vedio = item;
				uni.getStorage({
					key: 'channels',
					success: function(res) {
						console.log(res.data);
					}
				})
			},
			change(index) {
				this.current = index;
				let BASE_URL = 'https://iptv-api.vercel.app'
				let url = '/api/satellite-list'
				if (this.current == 0) {
					url = '/api/satellite-list'
				} else if (this.current == 1) {
					url = '/api/move-list'
				} else if (this.current == 2) {
					url = '/api/sport-list'
				}
				this.$u.get(`${BASE_URL}${url}`).then(res => {
					console.log(res);
					this.list = res.data;
					this.loading = false;
				})
			}
		},
		onShow() {
			this.$u.get('https://iptv-api.vercel.app/api/satellite-list').then(res => {
				console.log(res);
				this.list = res.data;
			})
		}
	}
</script>

<style lang="scss">
	.hello {
		height: 100vh;

		.content {
			.item {
				display: flex;
				align-items: center;
			}
		}
	}
</style>
