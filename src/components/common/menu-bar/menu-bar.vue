<template>
    <div class="menu-item-wrapper">
        <ul v-if="menuList.length" class="menu-item-list">
            <li class="menu-item" v-for="(menuItem, index) in menuList" :key="index">
                <template v-if="menuItem.subMenus.length == 1">
                    <router-link :to="{name: menuItem.subMenus[0].name }"> {{ menuItem.name }}</router-link>
                </template>
                <template v-else>
                    <div>{{ menuItem.name }}</div>
                    <ul>
                        <li v-for="(subMenu, subMenuIndex) in menuItem.subMenus" :key="subMenuIndex">
                            <router-link :to="{name: subMenu.name}">
                                {{ subMenu.text }}
                            </router-link>
                        </li>
                    </ul>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { routes } from '@/routes/routes';
    export default {
        setup() {
            let menuList = ref([])

            onMounted(() => {
                loadMenu()
            });
    
            const loadMenu = () => {
                const groupItems = [];
                routes.forEach(groupitem => {
                    if(groupitem.group && !groupItems.includes(groupitem.group)) {
                        groupItems.push(groupitem.group);
                    }
                })

                const menuItems = groupItems.map(groupItem => {
                    const subMenuItems = routes.filter(route => route.group == groupItem);
                    return {name: groupItem, subMenus: subMenuItems};
                })

                menuList.value = menuItems
            }

            return {
                menuList,
            }
            
        }
    }
</script>

<style lang="scss" scoped>
@import './menu-bar.scss';
</style>