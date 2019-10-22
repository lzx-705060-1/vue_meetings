<template>
	<div id="meeting_body">
		<van-tabs v-model="active">
			<van-tab title="会议发起">
				<van-cell-group>
					<van-cell>申请日期:<label style="margin-left: 32%;">{{applyDatetime}}</label></van-cell>
					<div class="div-style">
						<van-field required clearable label="申请人:"></van-field>
						<van-field readonly clickable :value="phone" @touchstart.native.stop="showPhone = true" label="申请人联系电话:" />
						<van-number-keyboard :show="showPhone" :maxlength="10" @blur="showPhone = false" close-button-text="完成" v-model="phone"	 @input="onInput" @delete="onDelete" />
						<van-field required clearable label="会议主题:" />
						<van-cell is-link @click="start_datetime()">会议开始日期:<label style="margin-left: 27%;">{{startDatetime}}</label></van-cell>
						<van-popup v-model="show_popup_start" closeable position="bottom" :style="{height:'45%'}" round>
							<div class="vant-field-date">
								<van-datetime-picker :min-date="minDate" :max-date="maxDate" v-model="startDate" @confirm="confirm" @change="confirm"	 type="datetime" @click="startDatetime()" title="会议开始日期"></van-datetime-picker>
							</div>
						</van-popup>
						<van-cell is-link @click="end_datetime()">会议结束日期:<label style="margin-left: 27%;">{{endDatetime}}</label></van-cell>
						<van-popup v-model="show_popup_end" position="bottom" :style="{height:'36%'}" round>
							<div class="vant-field-date">
								<van-datetime-picker :min-date="minDate" :max-date="maxDate" v-model="endDate" @confirm="confirm" @change="confirm"	 type="datetime" @click="startDatetime()" title="会议结束日期"></van-datetime-picker>
							</div>
						</van-popup>
						<van-field required clearable label="会议组织者:" />
						<van-field required clearable label="会议主持者:" />
						<van-field required clearable label="会议记录者:" />
						<van-cell is-link @click="showPopup_XingShi()">会议形式:<label id="label-type" style="margin-left: 47%;">{{xingshi}}</label></van-cell>
						<van-popup v-model="show_popup_xingshi" position="bottom" :style="{height:'23%'}" round closeable close-icon="close">
							<div class="radio-type">
								<van-radio-group v-model="radio_XingShi">
									<van-cell-group>
										<van-cell title="视频" clickable @click="radiosXingShi('-7400262493883379753')">
											<van-radio slot="right-icon" name="-7400262493883379753" />
										</van-cell>
										<van-cell title="现场" clickable @click="radiosXingShi('-6266237119449510811')">
											<van-radio slot="right-icon" name="-6266237119449510811" />
										</van-cell>
										<van-cell title="视频+现场" clickable @click="radiosXingShi('-2165911456725906503')">
											<van-radio slot="right-icon" name="-2165911456725906503" />
										</van-cell>
									</van-cell-group>
								</van-radio-group>
							</div>
						</van-popup>
						<van-field readonly clickable :value="numbers" @touchstart.native.stop="showNumbers = true" label="会议出席人数:" />
						<van-number-keyboard @blur="showNumbers = false" :show="showNumbers" @input="onInput" @delete="onDelete"	 :maxlength="10" close-button-text="完成" v-model="numbers" />
						<van-cell is-link @click="showPopup_type()">会议类型:<label id="label-type" style="margin-left: 47%;">{{type}}</label></van-cell>
						<van-popup v-model="show_popup_type" position="bottom" :style="{height:'18%'}" round closeable close-icon="close">
							<div class="radio-type">
								<van-radio-group v-model="radio_type">
									<van-cell-group>
										<van-cell title="固定会议" clickable @click="radiosType('-288312812531596042')">
											<van-radio slot="right-icon" name="-288312812531596042" />
										</van-cell>
										<van-cell title="非固定会议" clickable @click="radiosType('-9140242611314146983')">
											<van-radio slot="right-icon" name="-9140242611314146983" />
										</van-cell>
									</van-cell-group>
								</van-radio-group>
							</div>
						</van-popup>
						<van-cell is-link @click="showPopup_kongGu()">是否邀请控股L1领导:<label id="label-kongGu" style="margin-left: 31%;">{{kGu}}</label></van-cell>
						<van-popup v-model="show_popup_konggu" position="bottom" :style="{height:'18%'}" round closeable close-icon="close">
							<div class="radio-kongGu">
								<van-radio-group v-model="radio_kongGu">
									<van-cell-group>
										<van-cell title="是" clickable @click="radiosKongGu('0')">
											<van-radio slot="right-icon" name="0" />
										</van-cell>
										<van-cell title=" 否" clickable @click="radiosKongGu('1')">
											<van-radio slot="right-icon" name="1" />
										</van-cell>
									</van-cell-group>
								</van-radio-group>
							</div>
						</van-popup>
						<div class="div-shen" style="display: none;">
							<van-field v-model="shen" clearable label="控股领导会议审核人:" />
						</div>
						<van-cell is-link @click="showPopup_waiQi()">是否有外单位参加:<label id="label-kongGu" style="margin-left: 35%;">{{waiQi}}</label></van-cell>
						<van-popup v-model="show_popup_waiQi" position="bottom" :style="{height:'18%'}" round closeable close-icon="close">
							<div class="radio-waiQi">
								<van-radio-group v-model="radio_waiQi">
									<van-cell-group>
										<van-cell title="是" clickable @click="radiosWaiQi('0')">
											<van-radio slot="right-icon" name="0" />
										</van-cell>
										<van-cell title=" 否" clickable @click="radiosWaiQi('1')">
											<van-radio slot="right-icon" name="1" />
										</van-cell>
									</van-cell-group>
								</van-radio-group>
							</div>
						</van-popup>
						<van-field type="textarea" required clearable label="议程/议题:" />
						<van-field type="textarea" required clearable label="参会人员:" />
						<van-field type="textarea" required clearable label="备注:" />
						<van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">发起区域</van-divider>
						<div class="div-footer">
							<div id="submit_btn" @click="submitSuccess()">
								<van-button @click="submitOverlay=true" round type="info" size="large" text="发起" />
							</div>
							<div id="reset_btn">
								<van-button type="default" size="mini" text="重置" />
							</div>
							<van-overlay :show="submitOverlay" @click="submitOverlay = false" />
						</div>
					</div>

				</van-cell-group>

				<div id="div_hover">
					<div class="div_icon" @click="open_room()">
						<van-icon name="bars" size='2em' />
					</div>
				</div>
			</van-tab>
			<van-tab title="已发记录" icon="notes-o">
				<van-collapse v-model="activeNames">
					<!-- @click="summary(item.name.summaryId)" -->
					<div v-for="(item,index) in Tablist" @click="summary(item.name.summaryId)" :key="index">
						<van-collapse-item accordion=true icon='coupon-o' :title="item.name.startMemberName" :value="item.name.startDateStandard"	 title-class="collapse_item_title" value-class="collapse_item_value" label-class="collapse_item_label">
							<div class="div_content">
								<div class="van_grid_tr">
									会议室所在地
								</div>
								<div class="van_grid_td">
									雅居乐会议中心
								</div>
							</div>
						</van-collapse-item>
					</div>
				</van-collapse>
			</van-tab>
		</van-tabs>

	</div>
</template>

<script>
	import {
		Toast
	} from 'vant';
	import $ from 'jquery';
	import 'vant/lib/index.css'
	// 全局
	const urlPath = "http://10.1.19.170";
	var flag = true;
	export default {
		name: 'app',
		data() {
			return {
				loginName: '',
				shen: '',
				kongGu: '',
				activeNames: ['1'],
				username: '',
				active: 0,
				loading: false,
				finished: false,
				showNumbers: false,
				showPhone: false,
				show_popup_type: false,
				show_popup_konggu: false,
				show_popup_waiQi: false,
				show_popup_xingshi: false,
				phone: '',
				numbers: '',
				radio_type: '-9140242611314146983',
				type: "非固定会议",
				radio_kongGu: '1',
				kGu: "否",
				radio_waiQi: '1',
				waiQi: '否',
				radio_XingShi: '-7400262493883379753',
				xingshi: '现场',
				submitOverlay: false,
				//  日期
				show_popup_start: false,
				applyDatetime: this.dateFormat(new Date()),
				startDate: new Date(),
				startDatetime: this.dateFormat(new Date()),
				show_popup_end: false,
				endDate: new Date(),
				endDatetime: this.dateFormat(new Date()),
				minHour: 10,
				maxHour: 20,
				minDate: new Date(),
				maxDate: new Date(2019, 12, 1),
				Tablist: [],



			};
		},
		mounted() {
			this.initread();
			this.radiosType();
			this.radiosKongGu();
			this.radiosWaiQi();
			this.radiosXingShi();


			// this.ok();
		},
		created: function() {
			console.log("created");
		},
		methods: {
			initread() {
				var arr = new Array();
				console.log("初始化");
				this.Tablist = arr;
				console.log(this.Tablist);
				localStorage.setItem("meeting_loginname", "A108248")
				this.loginName = localStorage.getItem("meeting_loginname");
				var token = this.getToken("rest", "123456");
				var id = '';
				var logName = '';
				var memberId = '';
				if (flag) {
					$.ajax({
						// url: (url + "/seeyon/rest/orgMember?loginName=" + loginName + "&token=" + token),
						url: (urlPath + "/seeyon/rest/orgMember/code/" + this.loginName + "?token=" + token),
						type: "GET",
						dataType: "text",
						async: false,
						processData: false,
						success: function(data) {
							var orgLogin = data.replace(/(".*?"\s*:\s*)(-{0,1}\d+)/g, '$1' + '"$2"');
							var dateLogin = eval('(' + orgLogin + ')');
							console.log(dateLogin);
							for (var i = 0; i < dateLogin.length; i++) {
								memberId = dateLogin[i].id;
								logName = dateLogin[i].loginName;
							}

						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("发起[ ERROR ]" + textStatus + ":" + errorThrown);
							Toast("获取失败");
						}
					});
					$.ajax({
						url: (urlPath + "/seeyon/rest/token/rest/123456?loginName=" + logName + "&memberId=" + memberId +
							"&userAgentFrom=weixin"),
						// url: (url + "/seeyon/rest/token/rest/123456?loginName=" + loginName + "&memberId=-" + memberId + "&userAgentFrom=weixin"),
						type: "GET",
						dataType: "text",
						async: false,
						processData: false,
						success: function(data) {
							id = data;
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("获取[ ERROR ]" + textStatus + ":" + errorThrown);
							Toast("获取失败");
						}
					});
					$.ajax({
						url: (urlPath + "/seeyon/rest/coll/sentAffairs?token=" + id),
						type: "POST",
						dataType: "text",
						contentType: "application/json",
						async: false,
						processData: false,
						data: JSON.stringify({
							"openFrom": "listDone",
							"pageNo": 1,
							"pageSize": 10000
						}), //==body设置
						success: function(date) {
							var strDate = date.replace(/(".*?"\s*:\s*)(-{0,1}\d+)/g, '$1' + '"$2"');
							var result = eval('(' + strDate + ')');
							for (var i = 0; i < result.data.length; i++) {
								arr.push({
									name: result.data[i]
								});
							}
						},
						error: function(XMLHttpRequest, textStatus, errorThrown) {
							console.log("发起[ ERROR ]" + textStatus + ":" + errorThrown);
							Toast("查询失败");
						}
					});
					flag = false;
				}

			},
			open_room() {
				window.location.href = ('./components/Room')
			},
			clickDay(data) {
				console.log(data);
			},
			changeDate(data) {
				console.log(data);
			},
			clickToday(data) {
				console.log(data);
			},
			// 下拉框showPopup
			showPopup_type() {
				this.show_popup_type = true;
			},
			showPopup_kongGu() {
				this.show_popup_konggu = true;
			},
			showPopup_XingShi() {
				this.show_popup_xingshi = true;
			},
			showPopup_waiQi() {
				this.show_popup_waiQi = true;
			},
			// 下拉框单选框radios
			radiosType() {
				console.log(this.radio_type);
				if (this.radio_type == '-288312812531596042') {
					this.type = '固定会议';
				} else if (this.radio_type == '-9140242611314146983') {
					this.type = '非固定会议';
				}
			},
			radiosKongGu() {
				var kongGu = this.radio_kongGu;
				console.log(kongGu)
				if (kongGu == 0) {
					this.kGu = '是'
					$(".div-shen").css("display", "block");
				} else {
					this.kGu = '否'
					$(".div-shen").css("display", "none");
				}

			},
			radiosWaiQi() {
				if (this.radio_waiQi == 0) {
					this.waiQi = '是';
				} else if (this.radio_waiQi == 1) {
					this.waiQi = '否';
				}
			},
			radiosXingShi() {
				console.log(this.radio_XingShi);
				if (this.radio_XingShi == '-7400262493883379753') {
					this.xingshi = '视频';
				} else if (this.radio_XingShi == '-6266237119449510811') {
					this.xingshi = '现场';
				} else if (this.radio_XingShi == '-2165911456725906503') {
					this.xingshi = '现场+视频';
				}

			},
			summary(value) {
				console.log(value);
				// var token = this.getToken("rest", "123456");
				// var van_grid = "";
				// $.ajax({
				// 	url: (urlPath + "/seeyon/rest/meeting/colSummary/" + value + "/?token=" + token),
				// 	type: "GET",
				// 	dataType: "JSON",
				// 	contentType: "application/json",
				// 	async: false,
				// 	processData: false,
				// 	success: function(date) {
				// 		console.log(date)
				// 		if (date == "") {
				// 			$.ajax({
				// 				url: (urlPath + "/seeyon/rest/meeting/activity/" + value + "/?token=" + token),
				// 				type: "GET",
				// 				dataType: "JSON",
				// 				contentType: "application/json",
				// 				async: false,
				// 				processData: false,
				// 				success: function(res) {
				// 					console.log(res)
				// 					res.forEach(function(value, index) {
				// 						console.log(value, index)
				// 						console.log(res[index].CSID)
				// 						var waiqi = res[index].FIELD0008;
				// 						var meetingtype = res[index].FIELD0039;
				// 						var apply = res[index].FFIELD0053;
				// 						var startDateTime = res[index].FFIELD0007;
				// 						var endDateTime = res[index].FFIELD0030;
				// 						var start = startDateTime.slice(2, 19);
				// 						var end = endDateTime.slice(2, 19);
				// 						var applys = apply.slice(2, 19);
				// 						van_grid += "<van-grid>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"会议室所在地\" />";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"雅居乐会议中心\" />";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"会议主题\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0005 + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"申请人\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0003_NAME + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"申请部门\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].OUNAME + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"发起日期\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + applys + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"申请人联系电话\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0010 + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"会议时间\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + start + "<br>" + end + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"会议组织者\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0009_NAME + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"会议主持者\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0040_NAME + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"会议记录者\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0038_NAME + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"议程/议题\" />";
				// 						van_grid += "<div class=\"van_grid\">" + res[index].FIELD0046 + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"参会人员\" />";
				// 						van_grid += "<div class=\"van_grid\">" + res[index].FIELD0032_NAME + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"会议出席人数\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0011 + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"会议形式\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0058 + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"是否有外单位参加\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + waiqi + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"会议类型\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + meetingtype + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"是否邀请控股L1领导\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0031 + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"状态\" />";
				// 						van_grid += "<div class=\"van_grid_td\">审批中</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"备注\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0012 + "</div>";
				// 						van_grid += "<van-grid-item info=\"graphic\" text=\"发起设备\" />";
				// 						van_grid += "<div class=\"van_grid_td\">" + res[index].FIELD0005 + "</div>";
				// 						van_grid += "</van-grid>";
				// 						$(".div_content").html(van_grid);
				// 					})
				// 				},
				// 				error: function(XMLHttpRequest, textStatus, errorThrown) {
				// 					console.log("发起[ ERROR ]" + textStatus + ":" + errorThrown);
				// 					Toast("查询失败");
				// 				}
				// 			});
				// 		} else {
				// 			console.log(date)
				// 			date.forEach(function(value, index) {
				// 				console.log(value, index);
				// 				// var waiqi = date[index].FIELD0008;
				// 				// var meetingtype = date[index].FIELD0039;
				// 				// var apply = date[index].FFIELD0053;
				// 				// var startDateTime = date[index].FFIELD0007;
				// 				// var endDateTime = date[index].FFIELD0030;
				// 				// var start = startDateTime.slice(2, 19);
				// 				// var end = endDateTime.slice(2, 19);
				// 				// var applys = apply.slice(2, 19);
				// 				var Perm = date[index].EXT_ATT1;
				// 				if (Perm == "collaboration.dealAttitude.agree") {
				// 					van_grid += "<van-grid>";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"会议主题\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"申请部门\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"组织者\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"申请部门\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"会议时间\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"会议室\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"议程/议题\" />";
				// 					van_grid += "<div class=\"van_grid\">";
				// 					van_grid += "</div>";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"发起设备\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"\" />";
				// 					van_grid += "</van-grid>";
				// 					$(".div_content").html(van_grid);

				// 				} else if (Perm == "collaboration.dealAttitude.disagree") {
				// 					van_grid += "<van-grid>";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"状态\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"不同意\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"意见\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"发起设备\" />";
				// 					van_grid += "<van-grid-item info=\"graphic\" text=\"\" />";
				// 					van_grid += "</van-grid>";
				// 					$(".div_content").html(van_grid);
				// 				}

				// 			});
				// 		}
				// 	},
				// 	error: function(XMLHttpRequest, textStatus, errorThrown) {
				// 		console.log("发起[ ERROR ]" + textStatus + ":" + errorThrown);
				// 		Toast("查询失败");
				// 	}
				// })
			},
			onInput(value) {
				console.log(value);
			},
			onDelete() {
				Toast('删除');
			},
			submitSuccess() {
				Toast.success('发起成功');
			},
			icon_Aroom() {
				console.log("room")
				this.$router.push('/Room');
			},
			// 日期控件
			start_datetime() {
				this.show_popup_start = true;
			},
			end_datetime() {
				this.show_popup_end = true;
			},
			confirm(val) {
				this.startDatetime = this.dateFormat(val)
				this.endDatetime = this.dateFormat(val)
			},
			change(e) {
				console.log(e.getValues()) // 打印出了选中的时间，是个数组
			},
			open(picker) {
				this.$refs[picker].open();
			},
			initreadPicker() {
				// $.ajax({
				// 	url: "http://localhost:8089/Result_war/rest/meeting/list/3/2019-10-08",
				// 	type: "GET",
				// 	dataType: "JSON",
				// 	async: false,
				// 	processData: false,
				// 	success: function(data) {
				// 		console.log(data);
				// 	},
				// 	error: function(XMLHttpRequest, textStatus, errorThrown) {
				// 		console.log("[ ERROR ]" + textStatus + ":" + errorThrown);
				// 	}
				// })
			},
			onClickDisabled(name) {
				this.$toast(name + '已被禁用')
			},
			ok(value) {
				console.log(value);
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
			},
			getToken: function(username, password) {
				var token = null;
				$.ajax({
					url: (urlPath + "/seeyon/rest/token"),
					type: "POST",
					dataType: "json",
					async: false,
					data: '{"userName":"' + username + '", "password":"' + password + '"}"}',
					processData: false,
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					success: function(data) {
						token = data.id;
					},
					error: function() {
						Toast("token有误！");
					}
				});
				return token;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.div-style .van-field__control {
		display: block;
		box-sizing: border-box;
		width: 100%;
		min-width: 0;
		margin: 0;
		padding: 0;
		color: #323233;
		text-align: left;
		/* background-color: transparent; */
		background-color: #FFF5D2 !important;
		border: 0;
		resize: none;
	}
	.van-collapse-item__content{
		/* padding: 10px; */
		color: #969799;
		font-size: 13px;
		line-height: 1.5;
		background-color: #3AADFB;
		width: 100%;
		height: auto;
	}
	.collapse_item_title {
		width: 10px;
	}

	.collapse_item_value {
		width: 300px;
		position: fixed;
		right: 100px;
	}

	.van_grid {
		width: 74%;
		height: 67px;
		border: 1px solid #EBEDF0;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.van_grid_td {
		float: left;
		width: 24%;
		height: 67px;
		border: 1px solid #EBEDF0;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.van_grid_tr{
		float: left;
		width: 24%;
		height: 67px;
		border: 1px solid #EBEDF0;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.wh_content_all[data-v-2ebcbc83] {
		font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Helvetica Neue, STHeiti, Microsoft Yahei, Tahoma, Simsun, sans-serif;
		background-color: #9e9a9b;
		width: 100%;
		overflow: hidden;
		padding-bottom: 8px;
		border-radius: 5%;
	}

	.wh_content_item .wh_isToday[data-v-2ebcbc83] {
		background: rgba(255, 255, 255, .4);
		border-radius: 100px;
	}

	#div_hover {
		top: 30%;
		left: 87%;
		width: 40px;
		height: 40px;
		position: fixed;
		background-color: #FFF;
		/* opacity: 0.8; */
		z-index: 1;
		border-radius: 32%;
		box-shadow: 0px 1px 4px 1px #3AADFB;
	}

	.div_icon {
		margin-top: 3px;
		margin-left: 3px;
	}
	
	.div_content{
		width: 100%;
		height: auto;
		background-color: #EBEDF0;
	}
	
</style>
<!-- scoped 不覆盖原有样式 -->
<style scoped>
	#meeting_body {
		margin: *;
		padding: *;
	}

	.div-type {
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 16px;
		overflow: hidden;
		color: #323233;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
		border-bottom: 1px solid #ebedf0;
	}

	.label-meetingType {
		width: 140px;
	}

	.radio-type,
	.radio-kongGu,
	.radio-waiQi {
		margin-top: 39px;
		background-color: antiquewhite;
	}

	.applydatetime {
		background-color: #FFFFFF;
	}

	.div-footer {
		float: left;
		bottom: 0;
		width: calc(100% - 2px);
		height: 50px;
		position: fixed;
		background-color: #FFFFFF;
		/* opacity: 0.5; */
		z-index: 1;
	}

	#submit_btn {
		float: left;
		/* margin:  0 auto; */
		width: 100px;
		padding-left: 38%;

	}

	#reset_btn {
		float: left;
		width: 30px;
		padding-left: 40px;
		margin-top: 15px;
	}



	/* 日历 */
	.vant-field-date {
		margin-top: 35px;
	}
</style>
