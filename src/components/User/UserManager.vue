<template>
  <div class="user">
    <el-card class="box-card">
      <el-form :inline="true"  class="demo-form-inline">
        <!-- <el-button @click="dianji">{{name}}</el-button> -->
        <el-form-item label="姓名">
          <el-input v-model="userName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-select v-model="education" placeholder="学历">
            <el-option label="高中" value="gaozhong"></el-option>
            <el-option label="专科" value="zhuanke"></el-option>
            <el-option label="本科" value="benke"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="default">新增</el-button>
            <el-button type="danger">批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
     <el-card class="box-card">
         <el-table
          :data="tableData"
          stripe
          @selection-change="handleSelectionChange"
          style="width: 100%">
           <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            :formatter="formatEmail">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pager">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
        </div>
    </el-card>
  </div>
</template>

<script>
import {getTest} from '@/api/api.js'; // 导入api接口
  export default {
    name: 'user',
    data:function(){
      return {
          list:'' ,//后端查询的表格数据
          userName:'',
          education:'',
          age:'',
          total:'',
          curentPage:1,
          pageSize:10,
          multipleSelection:[],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            email:'1574425015@qq.com'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
             email:'1574425015@qq.com'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
             email:'1574425015@qq.com'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
             email:'1574425015@qq.com'
          }],
      }
    },
    created(){
       this.queryList();
    },
    computed:{
       name(){
         return this.$store.getters.getName;
       }
    },
    methods:{
      dianji(){
         this.$store.dispatch("setName2");//派发action
      },
      // 查询表格数据
      queryList(){
          let curentPage = this.curentPage;
          let pageSize = this.pageSize;
          let params={curentPage,pageSize};
          // 调用api接口，并且提供了两个参数
            getTest(params).then(res => {
               console.log('后端返回数据：',res)
            })
      },
     onSubmit(){
       console.log("111")
     },
     handleClick(value){
       console.log(value)
     },
      handleSelectionChange(val) {
       this.multipleSelection = val;
       console.log(val)
     },
     formatEmail(row, column){
       return <router-link to="">{row.email}</router-link>
     },
     handleSizeChange(val){ // 每页条数
       this.pageSize=val;
     },
     handleCurrentChange(val){  //当前页
      this.curentPage=val;
     }
    }
  }
</script>

<style scoped>
  .show-enter-active,.show-leave-active{
         transition:all 2s;
     }
     .show-enter,.show-leave-to{
         margin-left: 100px;
     }
    .show-enter-to,.show-leave{
          margin-left:0px;
     }
  .box-card{
    margin-top:20px;
  }
  .pager{
    text-align: center;
    padding: 30px;
  }
</style>
