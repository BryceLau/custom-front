<template>
    <div>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <i-dropdown transfer v-if="item.children.length !== 1" placement="right-start" :key="index" @on-click="changeMenu">
                    <i-button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <i-icon :size="20" :color="iconColor" :type="item.icon"></i-icon>
                    </i-button>
                    <i-dropdown-menu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <i-dropdown-item :name="child.name" :key="i"><Icon :type="child.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(child) }}</span></i-dropdown-item>
                        </template>
                    </i-dropdown-menu>
                </i-dropdown>
                <i-dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <i-button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <i-icon :size="20" :color="iconColor" :type="item.children[0].icon || item.icon"></i-icon>
                    </i-button>
                    <i-dropdown-menu style="width: 200px;" slot="list">
                        <i-dropdown-item :name="item.children[0].name" :key="'d' + index"><Icon :type="item.children[0].icon || item.icon"></Icon><span style="padding-left:10px;">{{ itemTitle(item.children[0]) }}</span></i-dropdown-item>
                    </i-dropdown-menu>
                </i-dropdown>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'white'
        },
        menuTheme: {
            type: String,
            default: 'darck'
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    }
};
</script>
