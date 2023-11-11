<template>
  <div class="home">
    <h2>部门管理</h2>
    <!-- 查询 -->
    <el-form>
      <el-form-item >
        <el-input v-model="deptQuery.id" placeholder="ID" class="inputVal"></el-input>
        <el-input v-model="deptQuery.manager" placeholder="部门经理"  class="inputVal"></el-input>
        <el-input v-model="deptQuery.name" placeholder="部门名称"  class="inputVal"></el-input>
        <el-button type="primary" @click="query" size="small">查询</el-button>
        <el-button type="primary" @click="visibleDialogAdd = true" size="small">新增</el-button>
        <el-button type="danger" size="small" @click="delBatch">删除</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹出框新增 -->
    <el-dialog :visible="visibleDialogAdd" title="新增" @close="visibleDialogAdd = false">
      <el-form>
        <el-form-item>
          <el-input v-model="deptAdd.id" placeholder="ID" class="inputVal"></el-input> 
        </el-form-item>  
        <el-form-item>
          <el-input v-model="deptAdd.manager" placeholder="部门经理" class="inputVal"></el-input>
        </el-form-item>  
        <el-form-item>
          <el-input v-model="deptAdd.name" placeholder="部门名称" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>  
          <el-button type="primary" @click="visibleDialogAdd = false">取消</el-button>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 弹出框修改 -->
    <el-dialog :visible="visibleDialogEdit" title="修改" @close="visibleDialogEdit = false">
      <el-form>
        <el-form-item>
          <el-input v-model="deptEdit.id" :disabled="true" placeholder="ID" class="inputVal"></el-input> 
        </el-form-item>  
        <el-form-item>
          <el-input v-model="deptEdit.manager" placeholder="部门经理" class="inputVal"></el-input>
        </el-form-item>  
        <el-form-item>
          <el-input v-model="deptEdit.name" placeholder="部门名称" class="inputVal"></el-input>
        </el-form-item>
        <el-form-item>  
          <el-button type="primary" @click="visibleDialogEdit = false">取消</el-button>
          <el-button type="primary" @click="edit">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 弹出框查看 -->
    <el-dialog :visible="visibleDialogView" title="查看" @close="visibleDialogView = false" width="400px">
      <el-form>
        <el-form-item label="ID">
          <el-input v-model="deptView.id" :disabled="true" placeholder="ID" class="inputVal"></el-input> 
        </el-form-item>  
        <el-form-item label="部门经理">
          <el-input v-model="deptView.manager" :disabled="true" placeholder="部门经理" class="inputVal"></el-input>
        </el-form-item>  
        <el-form-item label="部门名称">
          <el-input v-model="deptView.name" :disabled="true" placeholder="部门名称" class="inputVal"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>  

    <!-- 列表 -->
    <el-table :data="depts" @selection-change="selectionChange" style="margin-left: 50px;margin-bottom: 10px;">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="manager" label="部门经理"></el-table-column>
      <el-table-column prop="name" label="部门名字"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="doView(scope.row.id)">查看</el-button>
          <el-button type="primary" size="small" @click="doEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger"  size="small" @click="doDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination layout="total,sizes,prev,pager,next,jumper"
        :total="total" 
        :page-sizes="[2, 5, 10]" 
        :page-size="pageSize" 
        :current-page="pageNum"
        @current-change="currentChange"
        @size-change="sizeChange"
    ></el-pagination>
  </div>
</template>

<script> 
import axios from 'axios'

export default {
  name: 'DeptView',
  data(){
    return {
      total: 0,
      pageNum: 1,
      pageSize: 10,
      depts: [],
      ids: "",
      deptQuery: { id: '', manager: '', name: '' },
      deptAdd: { id: '', manager: '', name: '' },
      deptEdit: { id: '', manager: '', name: '' },
      deptView: { id: '', manager: '', name: '' },
      visibleDialogAdd: false,
      visibleDialogEdit: false,
      visibleDialogView: false,
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
        this.depts = resp.data.content
        this.total = resp.data.totalElements
      }) 
    },
    currentChange(idx) {
      this.pageNum = idx
      this.query()
    },
    sizeChange(size) {
      this.pageSize = size
      this.query()
    },
    selectionChange(rows) {
      let tmpIds = []
      rows.forEach(item => {
        tmpIds.push(item.id)
      })
      this.ids = tmpIds.join(",")
    },
    delBatch() {
      if (this.ids == '') {
        this.$message.error('请选择删除的记录');
        return
      }
      axios.delete("http://localhost:8080/depts", { params: { ids: this.ids, } })
      .then(resp => {
        if (resp.data.code == 200) {
          this.$message('删除成功')
          this.query()
        } else {
          this.$message.error('删除失败')
        }
      })
    },  
    add() {
      axios.post("http://localhost:8080/dept", this.deptAdd)
        //deptAdd:{id:'',manager:'',name:''},
        .then(resp => {
          if (resp.data.code == 200) {
            this.$message('新增成功')
            this.query()
          } else {
            this.$message.error('新增失败:' + resp.data.message)
          }
          this.visibleDialogAdd = false
        })
    },
    doEdit(id) {
      this.visibleDialogEdit = true
      axios.get("http://localhost:8080/dept", {
        params: {
          id: id,
        }
      }).then(resp => {
          this.deptEdit = resp.data
        })
    },
    edit() { 
      axios.put("http://localhost:8080/dept", this.deptEdit)
        .then(resp => {
          if (resp.data.code == 200) {
            this.$message('修改成功')
            this.query()
          } else {
            this.$message.error('修改失败:' + resp.data.message)
          }
          this.visibleDialogEdit = false
        })
    },
    doView(id) {
      this.visibleDialogView = true
      axios.get("http://localhost:8080/dept", {
        params: {
          id: id,
        }
      }).then(resp => {
        this.deptView = resp.data
      })
    },
    doDel(id) {
      axios.delete("http://localhost:8080/dept", {
        params: {
          id: id
        }
      }).then(resp => {
        if (resp.data.code == 200) {
          this.$message('删除成功')
          this.query()
        } else {
          this.$message.error('删除失败:' + resp.data.message)
        }
      })
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