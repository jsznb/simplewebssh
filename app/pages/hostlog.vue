<template>
  <div class="container">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><a href="/" target="_blank">Hosts</a></el-menu-item>
      <el-menu-item index="2"><a href="/cmd" target="_blank">Commands</a></el-menu-item>
    </el-menu>
    <el-drawer
      title="我是标题"
      :visible.sync="rdrawer"
      :direction="rtl">
      <span>我来啦!</span>
    </el-drawer>
    <el-row>
      <el-col><el-input
        placeholder="Search Path"
        prefix-icon="el-icon-search"
        v-model="pathLike"
        @change="onSearch">
      </el-input></el-col>
    </el-row>
    <el-row>
      <el-table
        :data="hostTableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="path"
          label="Path">
        </el-table-column>
        <el-table-column
          prop="content"
          label="content" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create_at"
          label="CreateAt"
          :formatter="formatDate" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="hostCount">
        </el-pagination>
      </div>
    </el-row>
  </div>

</template>

<script>
import axios from "axios"
export default {
  name: 'WebSSH',
  data () {
    return {
      rdrawer: false,
      hostTableData: [],
      hostCount: 1000,
      pathLike: '',
      pageSize: 20,
      pageCur: 1,
      combCmd: '',
    }
  },
  methods: {
    onSearch() {
      axios.get(`/api/host/log`, { params:{ path:this.pathLike,offset:(this.pageCur-1)*this.pageSize,limit:this.pageSize }}).then((res)=>{
        if(res.status!=200||res.data.code!=0) throw "Error: Query Data"
        this.hostTableData = res.data.data;
        this.hostCount = res.data.count;
        this.combCmd = ''
        for(let i=this.hostTableData.length-1; i>=0; i--) {
          this.cpmbCmd += this.hostTableData[i].content;
        }
        console.log(this.cpmbCmd);
      }).catch(console.log)
    },
    formatDate(row,col,cellvalue,index) {
      return new Date(cellvalue).toUTCString()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.onSearch()
    },
    handleCurrentChange(val) {
      this.pageCur = val
      this.onSearch()
    }
  },
  mounted() {
    if(this.$route.query&&this.$route.query.path) {
      this.pathLike = this.$route.query.path
    }
    this.onSearch()
  }
}
</script>

<style scoped>
</style>
