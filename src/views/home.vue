<template>
    <div class="main" :class="shrink">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow:shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme"
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink" src="../assets/img/logo.jpg" key="max-logo"/>
                    <img v-show="shrink" src="../assets/img/logo-min.jpg" key="min-logo"/>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <i-button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                              @click="toggleClick">
                        <i-icon type="navicon" size="32"></i-icon>
                    </i-button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>
                <div class="header-avator-con">
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <lock-screen></lock-screen>
                    <message-tip v-model="mesCount"></message-tip>
                    <div class="user-dropdown-menu-con">
                        <i-row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <i-dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <i-icon type="arrow-down-b"></i-icon>
                                </a>
                                <i-dropdown-menu slot="list">
                                    <i-dropdown-item name="ownSpace">{{$t('message.home.ownSpace')}}</i-dropdown-item>
                                    <i-dropdown-item name="switchLang" divided>{{$t('message.home.switchLang')}}
                                    </i-dropdown-item>
                                    <i-dropdown-item name="loginOut" divided>{{$t('message.home.loginOut')}}
                                    </i-dropdown-item>
                                </i-dropdown-menu>
                            </i-dropdown>
                            <i-avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></i-avatar>
                        </i-row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import shrinkableMenu from '@components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from '@components/tags-page-opened.vue';
    import breadcrumbNav from '@components/breadcrumb-nav.vue';
    import fullScreen from '@components/fullscreen.vue';
    import lockScreen from '@components/lockscreen/lockscreen.vue';
    import messageTip from '@components/message-tip.vue';
    import themeSwitch from '@components/theme-switch/theme-switch.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            themeSwitch
        },
        data() {
            return {
                shrink: false,
                userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            menuList() {
                return this.$store.state.app.menuList;
            },
            pageTagsList() {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath() {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath() {
                return localStorage.avatorImgPath;
            },
            cachePage() {
                return this.$store.state.app.cachePage;
            },
            lang() {
                return this.$store.state.app.lang;
            },
            menuTheme() {
                return this.$store.state.app.menuTheme;
            },
            mesCount() {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {
            init() {
                let userInfo = JSON.parse(Cookies.get('userInfo'));
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.userName = userInfo['userInfoName'] + ' | ' + userInfo['userInfoDept'];
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick() {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown(name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'switchLang') {
                    this.$store.commit('switchLang', this.$store.state.app.lang === 'zh-CN' ? 'en-US' : 'zh-CN');
                } else if (name === 'loginOut') {
                    // 退出登录
                    this.$store.commit('logout', this);
                    this.$store.commit('clearOpenedSubmenu');
                    this.$router.push({
                        name: 'login'
                    });
                }
            },
            checkTag(name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange(val) {
                val;
            },
            beforePush(name) {
                name;
                return true;
            },
            fullscreenChange(isFullScreen) {
                isFullScreen;
            }
        },
        watch: {
            '$route'(to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang() {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted() {
            this.init();
        },
        created() {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
        }
    };
</script>
<style lang="less">
    @import "./home.less";
</style>
