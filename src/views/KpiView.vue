<template>
  <div class="home">
    <h2>员工考核</h2>
    <el-form>
      <el-form-item>
        <el-input v-model="empKpiQuery.employeeID" placeholder="员工编号" class="inputVal"></el-input>
        <el-input v-model="empKpiQuery.employeeName" placeholder="员工姓名" class="inputVal"></el-input>
        <el-input v-model="empKpiQuery.kpi" placeholder="员工kpi" class="inputVal"></el-input>
        <el-button type="primary" @click="kpiQuery">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="kpiList" style="margin: 20 20 20 20">
        <el-table-column prop="employeeID" label="员工编号"></el-table-column>
        <el-table-column prop="employeeName" label="员工姓名"></el-table-column>
        <el-table-column prop="kpi" label="员工kpi"></el-table-column>
        <el-table-column prop="leader" label="考核人"></el-table-column>
        <el-table-column prop="comments" label="考核评价"></el-table-column>
        <el-table-column prop="check_date" label="评价时间"></el-table-column>
    </el-table>
    <el-pagination layout="total,sizes,prev,pager,next,jumper"
    :total="total"
    :page-sizes="[2, 5, 10]"
    :page-size="pageSize"
    :current-page="pageNum"
    @size-change="sizeChange"
    @current-change="currentChange"
    ></el-pagination>
  </div>
</template>

<script> 
import axios from 'axios'

export default {
  name: 'KpiView',
  data(){
    return {
      total: 0,
      pageSize: 10,
      pageNum: 1,
      empKpiQuery: { employeeID: "", employeeName: "", kpi: "" },
      kpiList: []
    }
  },
  methods: {
    kpiQuery() {
      axios.get('http://localhost:8080/empKpi', {
        params: {
          pageSize: this.pageSize,
          pageNumber: this.pageNum,
          empId: this.empKpiQuery.employeeID,
          empName: this.empKpiQuery.employeeName,
          kpi: this.empKpiQuery.kpi
      }}).then(resp => {
        this.kpiList = resp.data.content
          this.total = resp.data.totalElements
      })
    },
    sizeChange(size) {
      this.pageSize = size
      this.kpiQuery()
    },
    currentChange(idx) {
      this.pageNum = idx
      this.kpiQuery()
      
     }
  },
  mounted(){
    this.kpiQuery()
  }
}
</script>

<style>
.inputVal {
  width: 120px;
  margin-right: 10px;
}

</style>
