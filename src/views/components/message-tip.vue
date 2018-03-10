<template>
    <div @click="showMessage" class="message-con">
        <i-tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
            <i-badge :count="value" dot>
                <i-icon type="ios-bell" :size="22"></i-icon>
            </i-badge>
        </i-tooltip>
    </div>
</template>

<script>
import util from '@/libs/util.js';
export default {
    name: 'messageTip',
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    methods: {
        showMessage () {
            util.openNewPage(this, 'message_index');
            this.$router.push({
                name: 'message_index'
            });
        }
    }
};
</script>
