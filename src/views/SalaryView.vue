<template>
    <div class="home"> 
        <h1>涨薪管理</h1>
        <el-form>
            <el-form-item>
                <el-input v-model="applyQuery.manager" placeholder="审批人" class="inputVal"></el-input>
                <el-date-picker type="daterange" v-model="applyQuery.approveDate" 
                start-placeholder="审批时间开始时间"
                end-placeholder="审批时间结束时间"
                value-format="yyyy-MM-dd" class="inputVal"></el-date-picker>
                <el-button type="primary" @click="list">查询</el-button>
            </el-form-item>
        
        </el-form>

        <el-table :data="applyList" style="padding: 20 20 20 20;">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="empId" label="员工编号"></el-table-column>
            <el-table-column prop="empName" label="员工姓名"></el-table-column>
            <el-table-column prop="empDept" label="员工部门"></el-table-column>
            <el-table-column prop="manager" label="审批人"></el-table-column>
            <el-table-column prop="empSalary" label="审批前薪资"></el-table-column>
            <el-table-column prop="approveRate" label="审批薪资幅度(%)"></el-table-column>
            <el-table-column prop="approveSalary" label="审批后薪资"></el-table-column>
            <el-table-column prop="approveAdvice" label="审批意见"></el-table-column>
            <el-table-column prop="approveDate" label="审批时间"></el-table-column>
        </el-table>

        <el-pagination layout="total,sizes,prev,pager,next,jumper" 
        :total="total"
        :page-sizes="[2, 5, 10]"
        :page-size="pageSize"
        :current-page="pageNum"
        @current-change="currentChange"
        @size-change="sizeChange">
            
        </el-pagination>
    </div>
    
</template>

<script>
import axios from 'axios'

export default {
    name: 'salary',
    data() { 
        return {
            total: 0,
            pageNum: 1,
            pageSize: 10,
            applyList: [],
            applyQuery: {manager: "", approveDate: []}
        }
    },
    methods: {
        list() {
            axios.get('http://localhost:8080/empSalaryApply', {
                params: {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    manager: this.applyQuery.manager,
                    approveDateStart: this.applyQuery.approveDate[0],
                    approveDateEnd: this.applyQuery.approveDate[1]
                    
            }}).then(resp => {
                this.applyList = resp.data.content
                this.total = resp.data.totalElements
            })
        },
        currentChange(idx) {
            this.pageNum = idx
        },
        sizeChange(size) {
            this.pageSize = size
        }
    },
    mounted() {
        this.list()
    }
}

</script>

<style>
    .inputVal {width: 120px; margin-right: 10px;};
</style>