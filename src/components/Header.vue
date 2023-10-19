<template>
    <div class="header">
      <div class="logo">
          <!-- <img src="https://www.premierleague.com/resources/rebrand/v7.130.2/i/elements/pl-main-logo.png" alt="Premier League Logo"> -->
        <img src="@/assets/images/logo.jpg" alt="">
        </div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal"
        background-color="#38043c" text-color="#fff" active-text-color="#ffd04b" router>
        <el-menu-item index="/">主页</el-menu-item>
        <el-menu-item index="/team">球队榜</el-menu-item>
        <el-menu-item index="/player">射手榜</el-menu-item>
      </el-menu>
      <div class="header-right">
          No Room For Racism
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        activeIndex: "1",
      };
    }
  };
</script>
  
<style lang="less" scoped>
.header{
    display: flex;
    background: #38043c;
    color: white;
    img{
        width: 105px;
        height: inherit;
    }
    .header-right{
        padding: 60px, 60px;
        line-height: 60px;
        font-size: 14px;
        font-weight: 2000px;
        left: 50px;
    }
    .el-menu-demo{
        flex: 1;
        font-size: 16px;
        font-weight: 700px;
    }
    .el-menu.el-menu--horizontal{
        border-bottom: none;
    }
}
</style>
  