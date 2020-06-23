<template>
    <div class="contain">
        <transition name="component-fade" mode="out-in">
            <div class="form-div" v-if="flag==='login'">
                <div class="title">欢迎登录</div>
                <el-form ref="form" size="large" :model="form" label-width="80px">
                    <el-form-item prop="username" label-width="0">
                        <el-input
                                placeholder="请输入用户名"
                                prefix-icon="el-icon-user"
                                v-model="form.username"
                                name="username"
                                type="text"
                                tabindex="1"
                                auto-complete="on">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" label-width="0">
                        <el-input
                                placeholder="请输入密码"
                                prefix-icon="el-icon-lock"
                                type="password"
                                auto-complete="on"
                                v-model="form.password">
                        </el-input>
                    </el-form-item>
                    <el-button type="primary" class='login-btn' @click="login">登录</el-button>
                    <!--<div class="login-notice" @click="flag='regist'">还没账号？</div>-->
                </el-form>
            </div>
            <div class="form-div" v-else>
                <div class="title">注册账号</div>
                <el-form ref="form" size="large" :model="form" label-width="80px">
                    <el-form-item prop="username" label-width="0">
                        <el-input
                                placeholder="请输入用户名"
                                prefix-icon="el-icon-user"
                                v-model="form_regist.username"
                                name="username"
                                type="text"
                                tabindex="1"
                                auto-complete="on">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" label-width="0">
                        <el-input
                                placeholder="请输入密码"
                                prefix-icon="el-icon-lock"
                                type="text"
                                auto-complete="on"
                                v-model="form_regist.password">
                        </el-input>
                    </el-form-item>
                    <el-button type="primary" class='login-btn' @click="regist">注册</el-button>
                    <div class="login-notice" @click="flag='login'">已有账号？</div>
                </el-form>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                form_regist: {
                    username: '',
                    password: ''
                },
                flag: 'login'
            }
        },
        methods: {
            login() {
                /*
                登录逻辑
                提交账号密码，验证成功后，保存cookie相关身份信息在localstorage和store中，
                然后跳转到主界面
                 */
                if (!this.form.username) {
                    this.$message({
                        type: 'warning',
                        message: '请输入用户名！'
                    });
                    return
                }
                if (!this.form.password) {
                    this.$message({
                        type: 'warning',
                        message: '请输入密码！'
                    });
                    return
                }
                let data = {
                    admin_name: this.form.username,
                    password: this.form.password,
                }
                this.request.post('/admin/login/', data).then(res => {
                    //登录成功之后跳转到layout
                    if (res.data.ret == 0) {
                        this.$router.push('/layout')
                    }
                })

            },
            regist() {//注册账号
                /*
              注册逻辑
              提交账号密码注册，注册成功后，保存相关身份详细，登录，成功后进入主界面
               */
                this.request.post('/ws/insurance/page', {}).then(res => {

                })

            }
        }

    }
</script>

<style scoped lang="scss">
    .contain {
        width: 100vw;
        height: 100vh;
        background-color: #2d3a4b;
        display: flex;
        justify-content: center;
        align-items: center;

        .form-div {
            position: relative;
            width: 420px;
            max-width: 100%;
            padding: 0px 35px 200px;
            margin: 0 auto;
            overflow: hidden;

            .login-btn {
                width: 100%;
            }

            .title {
                font-size: 26px;
                color: #eee;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
                letter-spacing: 10px;
            }

            .login-notice {
                margin-top: 10px;
                text-align: right;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
            }

            /* Chrome all / Safari all /opera15+*/
            -webkit-user-select: none;
            /* Firefox all */
            -moz-user-select: none;
            /* IE 10+ */
            -ms-user-select: none;
            /* 通用 */
            user-select: none;
        }
    }
</style>