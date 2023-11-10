<template>
  <div class="home">
    <h2>部门管理</h2>
    <!-- 查询 -->
    <el-form :inline='true'>
      <el-form-item >
        <el-input v-model="deptQuery.id" placeholder="ID" class="inputVal"></el-input>
        <el-input v-model="deptQuery.manager" placeholder="部门经理"  class="inputVal"></el-input>
        <el-input v-model="deptQuery.name" placeholder="部门名称"  class="inputVal"></el-input>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="depts">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="manager" label="部门经理"></el-table-column>
      <el-table-column prop="name" label="部门名字"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination layout="total,sizes,prev,pager,next,jumper"
      :total="total" :page-sizes="[2,5,10]" :page-size="pageSize" 
      :current-page="pageNum" 
    ></el-pagination>
  </div>
</template>

<script> 
import axios from 'axios'

export default {
  name: 'DeptView',
  data(){
    return{
      deptQuery:{id:'',manager:'',name:''},
      total:21,pageSize:5,pageNum:1,
      depts:[{id:'001',manager:'Ada',name:'HR'},
             {id:'002',manager:'Bob',name:'HR2'},
             {id:'002',manager:'Bob',name:'HR2'},
             {id:'002',manager:'Bob',name:'HR2'},
             {id:'002',manager:'Bob',name:'HR2'},
             {id:'002',manager:'Bob',name:'HR2'},
            ],

    }
  },
  methods: {
    query(){
      axios.get("http://localhost:9090/depts",{ params:{
        pageNum:this.pageNum, pageSize:this.pageSize, 
        id:this.deptQuery.id, manager:this.deptQuery.manager, name:this.deptQuery.name,
       } })
      .then(resp=>{ 
        console.log(resp);
        this.depts=resp.data
      }) 
    },
  },
  mounted(){

  }
}
</script>
<style>
 .inputVal{
  width: 150px;
 }
</style>