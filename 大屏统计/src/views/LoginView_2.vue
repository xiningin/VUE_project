<template>

	<div class="logo_box">
		<svg t="1666750360588" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
			p-id="2615" width="80" height="80">
			<path
				d="M689.6 728l-409.6 97.6a129.6 129.6 0 0 1-155.2-94.4L35.2 350.4c-16-68.8 27.2-137.6 94.4-153.6l409.6-97.6c68.8-16 137.6 25.6 155.2 94.4l91.2 379.2c16 68.8-27.2 137.6-96 155.2z"
				fill="#E1E1DF" p-id="2616"></path>
			<path
				d="M772.8 992H259.2c-70.4 0-128-57.6-128-128V256c0-70.4 57.6-128 128-128h513.6c70.4 0 128 57.6 128 128v608c0 70.4-57.6 128-128 128z"
				fill="#4E8DF6" p-id="2617"></path>
			<path
				d="M976 555.2l-35.2-22.4c-14.4-9.6-35.2-4.8-43.2 9.6l-22.4 35.2c-3.2 4.8-1.6 11.2 3.2 14.4l72 43.2c4.8 3.2 11.2 1.6 14.4-3.2l22.4-35.2c9.6-12.8 4.8-33.6-11.2-41.6zM713.6 851.2l70.4 43.2c4.8 3.2 11.2 1.6 16-3.2l142.4-220.8c3.2-4.8 1.6-11.2-3.2-16l-70.4-43.2c-4.8-3.2-11.2-1.6-16 3.2l-142.4 222.4c-4.8 4.8-3.2 11.2 3.2 14.4zM694.4 976l72-48c6.4-4.8 6.4-14.4 0-19.2L704 872c-6.4-3.2-16 0-17.6 8l-11.2 86.4c1.6 8 11.2 16 19.2 9.6z"
				fill="#E1E1DF" p-id="2618"></path>
			<path
				d="M676.8 192H355.2c-25.6 0-48-22.4-48-48V80c0-27.2 22.4-48 48-48h321.6c27.2 0 48 20.8 48 48v64c0 25.6-22.4 48-48 48z"
				fill="#2166CC" p-id="2619"></path>
			<path
				d="M737.6 427.2H534.4c-14.4 0-27.2-11.2-27.2-27.2v-11.2c0-14.4 11.2-27.2 27.2-27.2h203.2c14.4 0 27.2 12.8 27.2 27.2v11.2c0 14.4-12.8 27.2-27.2 27.2zM769.6 608H534.4c-14.4 0-27.2-12.8-27.2-27.2v-11.2c0-14.4 11.2-27.2 27.2-27.2h235.2c14.4 0 27.2 12.8 27.2 27.2v11.2c0 14.4-11.2 27.2-27.2 27.2zM673.6 788.8h-139.2c-14.4 0-27.2-12.8-27.2-27.2v-11.2c0-14.4 11.2-27.2 27.2-27.2h139.2c14.4 0 27.2 12.8 27.2 27.2v11.2c0 14.4-12.8 27.2-27.2 27.2z"
				fill="#2166CC" p-id="2620"></path>
			<path
				d="M396.8 385.6l-88 92.8-25.6-27.2c-11.2-11.2-30.4-11.2-41.6 0-11.2 12.8-11.2 32 0 43.2l44.8 48c4.8 6.4 12.8 9.6 20.8 9.6s16-3.2 20.8-9.6l107.2-113.6c11.2-11.2 12.8-32 1.6-43.2-9.6-11.2-28.8-11.2-40 0z"
				fill="#FFFFFF" p-id="2621"></path>
		</svg>
	</div>
	<div class="login_box">
		<!-- 		<input class="input_box" type="text" placeholder="用户名">
		<input class="input_box" type="password" placeholder="密码">
		<input class="button_box" type="button" value="登录"> -->
		<el-radio-group size="large" style="margin-top: 10%;">
			<el-radio-button label="login" @click="TologinPage" />
			<el-radio-button label="register" @click="ToRegisterPage" />
		</el-radio-group>
		<!-- 登录输入表单 -->
		<div v-if="isInLoginPage">
			<el-form ref="loginReluForm" :model="loginReluForm" status-icon :rules="rules" label-width="70px"
				class="login-loginReluForm">
				<el-form-item label="Account" prop="account">
					<el-input v-model="loginReluForm.account" />
				</el-form-item>
				<el-form-item label="password" prop="pass">
					<el-input v-model="loginReluForm.pass" type="password" autocomplete="off" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="LoginSubmit(loginReluForm)" :loading="isloading"
						class="button_box">
						login
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div v-else>
			<el-form ref="registerReluForm" :model="registerReluForm" status-icon :rules="rules" label-width="70px"
				class="register-registerReluForm">
				<el-form-item label="Account" prop="account">
					<el-input v-model="registerReluForm.account" />
				</el-form-item>
				<el-form-item label="NickName" prop="nickName">
					<el-input v-model="registerReluForm.nickName" />
				</el-form-item>
				<el-form-item label="password" prop="pass">
					<el-input v-model="registerReluForm.pass" type="password" autocomplete="off" />
				</el-form-item>
				<el-form-item label="Confirm" prop="checkPass">
					<el-input v-model="registerReluForm.checkPass" type="password" autocomplete="off" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="RegisterSubmit(registerReluForm)" :loading="isloading"
						class="button_box">register</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		reactive,
		ref
	} from 'vue'
	import {
		FormInstance,
		ElMessage
	} from 'element-plus'
	// import CodeInput from '@/components/CodeInput.vue'
	import service from '../../service.js'
	import sha256 from 'js-sha256'

	const formRef = ref < FormInstance > ('')
	export default {
		name: 'LoginPage',
		props: {
			msg: String
		},
		components: {
			// CodeInput
		},

		data() {
			var checkAccount = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Please input the account'));
				} else {
					callback();
				}
			};
			var checkNickName = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Please input the password'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Please input the password'));
				} else {
					callback();
				}
			};
			var validateConfirmPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Please input the password'));
				} else if (value !== this.registerReluForm.pass) {
					callback(new Error("Two inputs don't match!"));
				} else {
					callback();
				}
			};
			return {
				isloading: false,
				isInLoginPage: true,

				loginReluForm: {
					account: '',
					pass: '',
				},
				registerReluForm: {
					account: '',
					nickName: '',
					pass: '',
					checkPass: ''
				},
				rules: {
					account: [{
						validator: checkAccount,
						trigger: 'blur'
					}],
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					nickName: [{
						validator: checkNickName,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validateConfirmPass,
						trigger: 'blur'
					}]
				},
			}
		},
		methods: {
			TologinPage: function() {
				this.isInLoginPage = true;
			},
			ToRegisterPage: function() {
				this.isInLoginPage = false;
			},
			LoginSubmit: function(formEl) {
				this.isloading = true
				console.log(formEl.account)
				//请求示例
				service.send("/auth/login", {
						// "nickname": "admin",
						"account": formEl.account,
						"password": sha256(formEl.pass)
					}, true).then((res) => {
						//请求成功
						console.log(res);
						if (res.code === 200) {
							const data = res.data;
							ElMessage({
								showClose: true,
								message: res.msg,
								type: 'success',
								// duration: 5 * 1000
							});
							this.$router.push({
								path: '/person'
							})
						} else {
							ElMessage({
								showClose: true,
								message: res.msg,
								type: 'error',
								// duration: 5 * 1000
							})
						}
						this.isloading = false
					})
					.catch(err => {
						console.log(err)
					})
			},
			RegisterSubmit: function(formEl) {
				//请求示例
				service.send("/auth/register", {
						"nickname": formEl.nickName,
						"account": formEl.account,
						"password": sha256(formEl.pass)
					}, false).then((res) => {
						//请求成功
						console.log("注册成功", res);
						if (res.code === 200) {
							// const data = res.data;
							// console.log("接口数据", data);
							ElMessage({
								showClose: true,
								message: res.msg,
								type: 'success',
								// duration: 5 * 1000
							});
							this.$router.push({
								path: '/person'
							})
						} else {
							//处理业务失败的情况
							//一般情况下是直接弹出来提示用户
							ElMessage({
								showClose: true,
								message: res.msg,
								type: 'error',
								// duration: 5 * 1000
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		}
	}
	const completed = ref(false)
</script>

<style scoped>
	body {
		/* background-color: #e1e1e1; */
		/* background-image: url(images/background.jpg); */
		background-repeat: no-repeat;
		background-size: cover;

	}

	.login_box {
		width: 400px;
		height: 400px;
		background-color: #fff;
		margin: auto;
		margin-top: 150px;
		border-radius: 5px;
		overflow: hidden;
	}

	.title {
		text-align: center;
		font-size: 28px;
		color: #000;
		margin-top: 80px;
		margin-bottom: 10px;
		letter-spacing: 3px;
		font-family: sans-serif;
	}

	.input_box {
		width: 300px;
		height: 30px;
		width: 300px;
		height: 40px;
		padding-left: 10px;
		margin-top: 20px;
		margin-left: 50px;
	}

	.button_box {
		width: 300px;
		height: 35px;
		width: 300px;
		height: 40px;
		margin-top: 20px;
		margin-left: 50px;
		border-radius: 5px;
		background-color: #64a9d9;
		cursor: pointer;
		color: #fff;
	}

	.logo_box {
		position: absolute;
		background-color: #fff;
		width: 100px;
		height: 100px;
		border-radius: 100px;
		top: 100px;
		left: 46%;
		border: solid 5px #A68364;
		text-align: center;
	}

	.logo_img {
		margin-top: 20px;
	}
</style>
