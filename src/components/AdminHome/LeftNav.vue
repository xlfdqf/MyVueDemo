<template>
  <el-menu :default-active='activeItem' @select='clickMenuItem'>
    <!-- <el-menu-item key="adminIndex" index="adminIndex" >
      <h2>首页</h2>
    </el-menu-item> -->
      <el-submenu v-for="sub in subMenu" :key="sub" :index='sub' >
        <template slot="title">
          <span>  {{sub}}</span>
        </template>
        <el-menu-item-group v-for=" group in groupMenu(sub)" :key="group" :index="group">
          <template slot="title"><span>{{group}}</span></template>
          <el-menu-item v-for="item in itemMenu(sub,group)" :key="item.index" :index="item.index">
         {{item.name}}
          </el-menu-item>
        </el-menu-item-group>
         <el-menu-item v-for="item in itemMenu(sub,null)" :key="item.index" :index="item.index">
            {{item.name}}
          </el-menu-item>
      </el-submenu>
      <el-menu-item-group v-for=" group in groupMenu()" :key="group" :index="group">
          <template slot="title"><span>{{group}}</span></template>
          <el-menu-item v-for="item in itemMenu(null,group)" :key="item.index" :index="item.index">
            {{item.name}}
          </el-menu-item>
      </el-menu-item-group>
      <el-menu-item v-for="item in itemMenu()" :key="item.inedx" :index='item.index'>
        {{item.name}}
      </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  mounted() {
    this.getMenu();
    this.clickMenuItem("adminIndex");
    console.log(this.subMenu)
     console.log(this.menu)
  },
  methods: {
    ...mapActions("menu", {
      getMenu: "getMenu",
      clickMenuItem: "clickMenuItem"
    })
  },
  computed: {
    ...mapState("menu", {
      menu: "menu",
      activeItem: "activeItem"
    }),
    ...mapGetters("menu", {
      subMenu: "subMenu",
      groupMenu: "groupMenu",
      itemMenu: "itemMenu"
    })
  }
};
</script>

<style scoped>
.el-menu > ul,
.el-menu {
  height: 100%;
}
</style>
