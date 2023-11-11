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
        <el-button type="primary" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="depts" style="margin-left: 50px;margin-bottom: 10px;">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="manager" label="部门经理"></el-table-column>
      <el-table-column prop="name" label="部门名字"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination layout="total,sizes,prev,pager,next,jumper"
      @current-change="currentChange"
      @size-change="sizeChange"
      :total="total" 
      :page-sizes="[2,5,10]" 
      :page-size="pageSize" 
      :current-page="pageNum"
    ></el-pagination>
  </div>
</template>

<script> 
import axios from 'axios'

export default {
  name: 'DeptView',
  data(){
    return {
      deptQuery:{id:'',manager:'',name:''},
      total: 0,
      pageSize: 2,
      pageNum: 1,
      depts:[],
    }
  },
  methods: {
    query(){
      axios.get("http://localhost:8080/depts",{ params:{
        pageNum: this.pageNum,
        pageSize: this.pageSize, 
        id: this.deptQuery.id,
        manager: this.deptQuery.manager,
        name: this.deptQuery.name,
       } })
      .then(resp=>{ 
        console.log(resp);
        this.depts = resp.data.content
        this.total = resp.data.totalElements
      }) 
    },
    currentChange(idx) {
      console.log("idx", idx)
      this.pageNum = idx
      this.query()
    },
    sizeChange(size) {
      console.log("size", size)
      this.pageSize = size
      this.query()
    }
  },
  mounted(){
    this.query();
  }
}
</script>
<style>
 .inputVal{
  width: 150px;
  margin-right: 5px;
 }
</style>