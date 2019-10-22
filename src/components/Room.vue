<template>
	<div id="room">
		<van-divider dashed :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px', height:'0px'}">会议室资源</van-divider>
		<div id="room_content">
			<van-cell-group>
				<van-cell is-link @click="start_datetime()">请输入用户名<label style="margin-left: 12%;">{{startDatetime}}</label></van-cell>
				<van-popup v-model="show_popup_start" position="bottom" :style="{height:'45%'}" round>
					<div class="vant-field-date">
						<van-datetime-picker :min-date="minDate" :max-date="maxDate" v-model="startDate" @confirm="confirm" @change="confirm"
						 type="datetime" @click="startDatetime()" title="会议开始日期"></van-datetime-picker>
					</div>
				</van-popup>
				<van-field v-model="username" required clearable label="用    户    名" right-icon="question-o" placeholder="请输入用户名"
				 @click-right-icon="$toast('question')" />
				<div id="room_left">
					<van-grid :gutter="2" clickable :column-num="1">
						<van-grid-item v-for="value in 8" :key="value" clickable=true icon="search"  text="value"
						 info="满" />
					</van-grid>
				</div>
				<div id="room_right">
					<van-grid :gutter="2" clickable :column-num="10">
						<van-grid-item v-for="value in 100" :key="value" clickable=true icon="search" text="value" />
					</van-grid>
				</div>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				username: '用户名',
				show_popup_start: false,
				startDate: new Date(),
				startDatetime: this.dateFormat(new Date()),
				minHour: 10,
				maxHour: 20,
				minDate: new Date(),
				maxDate: new Date(2019, 12, 1),
			};
		},
		mounted() {
			console.log(" 初始化");
			this.ok();
		},
		created: function() {
			console.log("created");
		},
		methods: {
			ok() {
				console.log("methods");
			},
			// 日期控件
			start_datetime() {
				this.show_popup_start = true;
			},
			confirm(val) {
				this.startDatetime = this.dateFormat(val)
				this.endDatetime = this.dateFormat(val)
			},
			change(e) {
				console.log(e.getValues()) // 打印出了选中的时间，是个数组
			},
			dateFormat: function(time) {
				var date = new Date(time);
				var year = date.getFullYear();
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				 * */
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
			}
		}
	}
</script>
<style>
	#room_left {
		float: left;
		width: 20%;
		height: auto;
		border: 1px solid #3AADFB;
	}

	#room_right {
		float: right;
		width: 79%;
		height: auto;
		border: 1px solid red;
	}
</style>
<style scoped="scoped">
	#room_content {
		width: auto;
		height: auto;
		background-color: #3AADFB;
	}
</style>
