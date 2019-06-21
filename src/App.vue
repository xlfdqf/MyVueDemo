<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
  margin: 0;
  padding: 0;
}
.el-submenu__title:focus, .el-submenu__title:hover{
    background: #409EFF!important;
   color:#fff!important;
}
.el-menu-item:focus, .el-menu-item:hover{
   background: #409EFF!important;
   color:#fff!important;
}
.el-submenu__title, .el-menu-item{
  color:#BFCBD9!important;
}
.el-menu {
  background-color: #1F2D3D!important;
}

</style>
