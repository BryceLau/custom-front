<template>
    <div class="login-content">
        <div class="login-form">
            <i-row>
                <i-col :xs="4" :sm="8" :md="10" :lg="12">
                    <div class="login-carousel">
                    </div>
                </i-col>
                <i-col :xs="16" :sm="12" :md="10" :lg="8">
                    <div class="login-card-parent">
                        <div class="login-card">
                            <i-form ref="loginForm" :model="formInline" :rules="ruleInline">
                                <i-form-item prop="system" style="font-size: large">
                                    <img src="../assets/img/system_logo_without_name.png"
                                         style='display:block;float:left;' alt="">
                                    <div
                                            style="margin-left: 100px; text-align:center;height:100px;line-height: 100px;font-size:  26px;color: #2179b9 ">
                                        {{$t('message.sysname')}}

                                    </div>
                                </i-form-item>
                                <i-form-item prop="language">
                                    <i-select v-model="language" @on-change="switchLang">
                                        <Option value="en-US">English</Option>
                                        <Option value="zh-CN">中文</Option>
                                    </i-select>
                                </i-form-item>
                                <i-form-item prop="user">
                                    <i-input type="text" v-model="formInline.user"
                                             :placeholder="$t('message.login.username')">
                                        <i-icon type="ios-person-outline" slot="prepend"></i-icon>
                                    </i-input>
                                </i-form-item>
                                <i-form-item prop="password">
                                    <i-input type="password" v-model="formInline.password"
                                             :placeholder="$t('message.login.password')">
                                        <i-icon type="ios-locked-outline" slot="prepend"></i-icon>
                                    </i-input>
                                </i-form-item>
                                <i-form-item>
                                    <i-button type="primary" style="width: 45% ;margin-right: 10px"
                                              @click="doLogin">
                                        {{$t("message.sign_in")}}


                                    </i-button>
                                    <i-button style="width: 45%;float: right">{{$t("message.sign_up")}}</i-button>
                                </i-form-item>
                            </i-form>
                        </div>
                    </div>
                </i-col>
                <i-col :xs="4" :sm="4" :md="4" :lg="4">
                </i-col>
            </i-row>
        </div>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                language: this.$store.state.app.lang,
                value2: 0,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        {required: true, message: this.$t('message.login.username_error'), trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: this.$t('message.login.password_error'), trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            switchLang: function (lang) {
                this.$store.commit('switchLang', lang);
                this.ruleInline.user[0].message = this.$t('message.login.username_error');
                this.ruleInline.password[0].message = this.$t('message.login.password_error');
            },
            doLogin: function () {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        /*
                        this.$axios.ajax({
                            method: 'post',
                            url: '/doLogin',
                            data: {
                                userName: this.formInline.user,
                                password: this.formInline.password
                            }
                        }).then((res) => {
                            if (res.data.success) {
                                Cookies.set('user', this.formInline.user);
                                Cookies.set('password', this.formInline.password);
                                Cookies.set('userInfo', JSON.stringify(res.data.data));
                                this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                this.$router.push('/home'); //跳转用户中心页
                            } else {
                                this.$Message.error(res.data.message);
                            }

                        });*/
                        let userInfo={
                            userInfoName:this.formInline.user,
                            userInfoDept:'管理员'
                        };
                        Cookies.set('user', this.formInline.user);
                        Cookies.set('password', this.formInline.password);
                        Cookies.set('userInfo', JSON.stringify(userInfo));
                        this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                        this.$router.push('/home'); //跳转用户中心页
                    }
                });

            }
        }
    };
</script>

<style lang="less">
    @import "./login.less";
</style>
