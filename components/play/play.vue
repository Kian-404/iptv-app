<template>
	<view class="player">
		<u-popup v-model="showDialog" mode="center" :safe-area-inset-bottom="true" @close="changeShow">
			<view class="content">
				<text class="title">{{vedio.title}}</text>
				<video id="myVideo" :src="vedio.url" :danmu-btn="false" enable-danmu controls autoplay
					:title="vedio.title" play-strategy="3"></video>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: "play",
		props: {
			vedio: {
				type: Object,
				default: () => {}
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {};
		},
		computed: {
			showDialog() {
				return this.show;
				}
		},
		methods: {
			changeShow() {
				this.$emit('changeShow', false)
			}
		}
	}
</script>

<style lang="scss">
	.player {
		.content {
			display: flex;
			flex-direction: column;

			.title {
				text-align: center;
				background-color: #F3F4F6;
				color: #909399;

			}
		}
	}
</style>
