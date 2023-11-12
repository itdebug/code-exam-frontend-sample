<template>
  <div class="home">
    <h2>员工管理</h2>

    <!-- 查询项 员工编号、员工姓名、员工所在部门、员工职位和员工薪资-->
    <el-form>
      <el-form-item>
        <el-input v-model="empQuery.id" placeholder="员工编号" class="inputVal"> </el-input>
        <el-input v-model="empQuery.name" placeholder="员工姓名" class="inputVal"></el-input>
        <el-input v-model="empQuery.dept" placeholder="员工所在部门" class="inputVal"></el-input>
        <el-input v-model="empQuery.position" placeholder="员工职位" class="inputVal"></el-input>
        <el-input v-model="empQuery.salary" placeholder="员工薪资" class="inputVal"></el-input>
        <el-button type="primary" @click="list" class="inputVal">查询</el-button>
        <el-button type="primary" @click="addDialog = true"  class="inputVal">新增</el-button>
        <el-button type="danger"  @click="deleteBatch" class="inputVal">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增弹窗 -->
    <el-dialog :visible="addDialog" title="新增" @close="addDialog = false">
      <el-form>
        <el-form-item>
          <el-input v-model="empAdd.id" placeholder="员工编号" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="empAdd.name" placeholder="员工姓名" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="empAdd.dept" placeholder="员工所在部门" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="empAdd.position" placeholder="员工职位" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="empAdd.salary" placeholder="员工薪资" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addDialog = false">取消</el-button>
          <el-button type="primary" @click="doAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog :visible="editDialog" title="编辑" @close="editDialog = false">
      <el-form>
        <el-form-item>
          员工编号: <el-input v-model="empEdit.id" :disabled="true" placeholder="员工编号" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工姓名: <el-input v-model="empEdit.name" placeholder="员工姓名" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工所在部门: <el-input v-model="empEdit.dept" placeholder="员工所在部门" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工职位: <el-input v-model="empEdit.position" placeholder="员工职位" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工薪资: <el-input :disabled="true" v-model="empEdit.salary" placeholder="员工薪资" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editDialog = false" size="small">取消</el-button>
          <el-button type="primary" @click="edit" size="small">编辑</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 涨薪申请 -->
    <el-dialog :visible="salaryDialog" title="涨薪申请" @close="salaryDialog = false">
      <el-form>
        <el-form-item>
          流水号:<el-input v-model="empSalaryApplyEdit.id" placeholder="流水号" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工编号:<el-input :disabled="true" v-model="empSalaryApplyEdit.empId" placeholder="员工编号" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工姓名:<el-input :disabled="true" v-model="empSalaryApplyEdit.empName" placeholder="员工姓名" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工所在部门:<el-input :disabled="true" v-model="empSalaryApplyEdit.empDept" placeholder="员工所在部门" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工当前薪资:<el-input :disabled="true" v-model="empSalaryApplyEdit.empSalary" placeholder="员工当前薪资" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
            审核人:<el-input v-model="empSalaryApplyEdit.manager" placeholder="审核人" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          涨薪幅度(%):<el-input-number :max="100" :min="1" v-model="empSalaryApplyEdit.approveRate" placeholder="涨薪幅度" class="inputVal"></el-input-number>
        </el-form-item>
        <el-form-item>
          审核意见:<el-input type="textarea" v-model="empSalaryApplyEdit.approveAdvice" placeholder="审核人" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="salaryDialog = false">取消</el-button>
          <el-button size="small" type="primary" @click="doSalaryApply">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- kpi弹窗 -->
    <el-dialog :visible="kpiDialog" title="kpi考核" @close="kpiDialog = false">
      <el-form>
        <el-form-item>
          流水号:<el-input v-model="empKpi.id" placeholder="流水号" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工编号:<el-input :disabled="true" v-model="empKpi.employeeID" placeholder="员工编号" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工姓名:<el-input :disabled="true" v-model="empKpi.employeeName" placeholder="员工姓名" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工部门:<el-input :disabled="true" v-model="empKpi.dept" placeholder="员工部门" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          员工职位:<el-input :disabled="true" v-model="empKpi.position" placeholder="员工职位" class="inputVal"></el-input>
        </el-form-item> 
        <el-form-item>
          KPI:<el-input-number :max="100" :min="1" v-model="empKpi.kpi" placeholder="KPI" class="inputVal"></el-input-number>
        </el-form-item>
        <el-form-item>
          考核人:<el-input v-model="empKpi.leader" placeholder="考核人" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          考核评价:<el-input type="textarea" v-model="empKpi.comments" placeholder="考核评价" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="kpiDialog = false">取消</el-button>
          <el-button  type="primary" size="small" @click="kpi">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 列表 -->
    <el-table :data="emps" @selection-change="selectionChange" style="margin: 15px 15px 15px 15px;">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="id" label="员工编号"></el-table-column>
      <el-table-column prop="name" label="员工姓名"></el-table-column>
      <el-table-column prop="dept" label="员工所在部门"></el-table-column>
      <el-table-column prop="position" label="员工职位"></el-table-column>
      <el-table-column prop="salary" label="员工薪资"></el-table-column>
      <el-table-column fixed="right" label="操作" width="400px">
        <template slot-scope="scope">
          <el-button type="primary" @click="doEdit(scope.row.id)" size="small">编辑</el-button>
          <el-button type="danger" @click="doDelete(scope.row.id)" size="small">删除</el-button>
          <el-button type="primary" @click="doKpi(scope.row.id)" size="small">员工考核</el-button>
          <el-button type="primary" @click="salaryApply(scope.row.id)" size="small">涨薪申请</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination layout="total,sizes,prev,pager,next,jumper"
      :total="total"
      :page-sizes="[2, 5, 10]"
      :pageSize="pageSize"
      :current-page="pageNum"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script> 
import axios from 'axios'

export default {
  name: 'EmpView',
  data(){
    return{
      total: 0,
      pageSize: 10,
      pageNum: 1,
      emps: [],
      empQuery: { "id": "", "name": "", "dept": "", "position": "", "salary": "" },
      empAdd: { "id": "", "name": "", "dept": "", "position": "", "salary": "" },
      empEdit: { "id": "", "name": "", "dept": "", "position": "", "salary": "" },
      empView: { "id": "", "name": "", "dept": "", "position": "", "salary": "" },
      empSalaryApplyEdit: {
        "id": "", "empId": "", "empName": "",
        "empDept": "", "empPosition": "", "empSalary": "",
        "approveRate": 0.00, "manager": "", "approveAdvice":""
      },
      empKpi: {id: "", employeeID :"", employeeName :"", dept: "", position: "", kpi: "", leader :"", comments :""},
      ids: '',
      addDialog: false,
      editDialog: false,
      viewDialog: false,
      salaryDialog: false,
      kpiDialog: false,
    }
  },
  methods: {
    list() { 
      axios.get("http://localhost:8080/employees",
        {
          params: {
            pageNum: this.pageNum,
          pageSize: this.pageSize,
          id: this.empQuery.id,
          name: this.empQuery.name,
          dept: this.empQuery.dept,
          position: this.empQuery.position,
          salary: this.empQuery.salary,
          }
        })
        .then(resp => { 
          this.emps = resp.data.content
          this.total = resp.data.totalElements
        })
    },
    selectionChange(rows) {
      let tmp = []
      rows.forEach(row => {
        tmp.push(row.id)
      })
      this.ids = tmp.join(',')
    },
    doAdd() { 
      axios.post("http://localhost:8080/employee", this.empAdd)
        .then(resp => {
          if (resp.data.code == 200) {
            this.$message('新增成功')
            this.list()
          } else {
            this.$message('新增失败')
          }
          this.addDialog = false
        })
    },
    deleteBatch() {
      if (this.ids == '') {
        this.$message.error('请勾选需删除的记录')
        return
      }
      axios.delete('http://localhost:8080/employees', { params: {ids: this.ids} }).then(resp => {
        if (resp.data.code == 200) {
          this.$message('删除成功')
          this.list()
        } else {
          this.$message('删除失败')
        }
      })
    },
    doEdit(id) {
      this.editDialog = true
      axios.get('http://localhost:8080/employee', { params: { id: id } })
        .then(resp => {
          this.empEdit = resp.data
      })
    },
    edit() {
      axios.put('http://localhost:8080/employee', this.empEdit).then(resp => {
        if (resp.data.code == 200) {
          this.$message('修改成功')
          this.list()
          this.editDialog = false
        } else {
          this.$message('修改失败')
        }
      })
    },
    doDelete(id) {
      axios.delete('http://localhost:8080/employee', { params: { id: id } })
        .then(resp => {
          if (resp.data.code == 200) {
            this.$message('删除成功')
            this.list()
          } else {
            this.$message.error('删除失败')
        }
      })
    },
    currentChange(idx) {
      this.pageNum = idx
      this.list()
    },
    sizeChange(size) {
      this.pageSize = size
      this.list()
    },
    salaryApply(id) {
      this.salaryDialog = true;
      axios.get('http://localhost:8080/employeeAndDept', { params: { id: id } }).then(resp => {
        this.empSalaryApplyEdit.empId = resp.data.id
        this.empSalaryApplyEdit.empName = resp.data.name
        this.empSalaryApplyEdit.empDept = resp.data.dept
        this.empSalaryApplyEdit.empPosition = resp.data.position
        this.empSalaryApplyEdit.empSalary = resp.data.salary
        this.empSalaryApplyEdit.manager = resp.data.manager
      })
      
    },
    doSalaryApply() {
      axios.post('http://localhost:8080/empSalaryApply', this.empSalaryApplyEdit).then(resp => {
        if (resp.data.code == 200) {
          this.salaryDialog = false
          this.list()
          this.$message('涨薪申请成功')
          this.$router.push('/salary')
        } else {
          this.$message('涨薪申请失败')
        }
      })
    },
    doKpi(id) {
      axios.get('http://localhost:8080/employeeAndDept', {
        params:
        {id: id
        
        }
      }).then(resp => {
        this.empKpi.employeeID = resp.data.id
        this.empKpi.employeeName = resp.data.name
        this.empKpi.leader = resp.data.manager
        this.empKpi.dept = resp.data.dept
        this.empKpi.position = resp.data.position
      })
      this.kpiDialog = true
    },
    kpi() {
      axios.post('http://localhost:8080/empKpi', this.empKpi).then(resp => {
        if (resp.data.code == 200) {
          this.$message('考核提交成功');
          this.$router.push('/kpi')
        } else {
          this.$message('考核提交失败');
        }
      })
    }
  },
  mounted(){
    this.list()
  }
}
</script>

<style>
.inputVal {
  width: 120px;
  margin-left: 10px;
}
</style>
