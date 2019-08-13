<template>
  <div>
    <!-- <edit-table :columns="columns" :data="tableData"></edit-table> -->
    <edit-table :columns="columns" :data="tableData"></edit-table>
  </div>
</template>

<script>
import { getTableData } from "@/api/data";
import EditTable from "./editTable";
export default {
  data() {
    return {
      tableData: [],
      columns: [
        { key: "name", title: "姓名" },
        { key: "age", title: "年龄", editable: true },
        { key: "email", title: "邮箱", editable: true }
      ]
    };
  },
  components: {
    EditTable
  },
  mounted() {
    getTableData().then(res => {
      // console.log(typeof res.data.arr);
      this.tableData = res.data.arr;
      console.log(this.tableData);
    });
    console.log(this.tableData);
  }
};
</script>

<style>
</style>
