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
						@click="showInfo(item)" :arrow="false">
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
			

				<u-popup v-model="show" mode="center">
					<view>
						<video id="myVideo" :src="vedio.url" :danmu-btn="false" enable-danmu controls autoplay
							:title="vedio.title" play-strategy="3"></video>
					</view>
				</u-popup>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>

</template>

<script>
	export default {
		data() {
			return {

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

			showInfo(item) {
				console.log(item)
				this.show = true;
				this.vedio = item;
			},
			change(index) {
				this.current = index;
				let url = 'https://iptv-api.vercel.app/api/satellite-list'
				if (this.current == 0) {
					url = 'https://iptv-api.vercel.app/api/satellite-list'
				} else if (this.current == 1) {
					url = 'https://iptv-api.vercel.app/api/move-list'
				} else if (this.current == 2) {
					url = 'https://iptv-api.vercel.app/api/sport-list'
				}
				this.$u.get(url).then(res => {
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
