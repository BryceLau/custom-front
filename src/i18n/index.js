import Vue from 'vue';
import zh from './lang/zh.json';
import en from './lang/en.json';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.lang || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const mergeZH = Object.assign(zhLocale, zh);
const mergeEN = Object.assign(enLocale, en);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);
