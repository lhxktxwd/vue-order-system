<template>
    <div class="main">
        <div class="row">
            <h2 class="col-lg-9">桌号管理</h2>
            <div class="col-lg-3 right">
                <button class="el-button" @click="show_form = !show_form"><span v-if="show_form">取消</span><span v-else>创建桌号</span></button>
            </div>
        </div>
        <form class="col-lg-3" v-if="show_form" @submit="create($event)">
            <div class="input-wrap">
                <label>桌号</label>
                <input type="text" v-model="current.name">
            </div>
            <div class="input-wrap">
                <label>座位数</label>
                <input type="text" v-model="current.capacity">
            </div>
            <button class="el-button">提交</button>
        </form>
        <table class="left">
            <thead>
                <tr>
                    <th>id</th>
                    <th>桌号</th>
                    <th>座位数</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "item in list" :key=item.id>
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.capacity}}</td>
                    <td><button class="el-button" @click="current = item">修改</button><button class="el-button" @click="remove(item.id)">删除</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import AdminPage from "./AdminPage.vue";
export default {
  data() {
    return {
      model: "table",
      validate_props: ["name", "capacity"]
    };
  },
  methods: {
    validate_name(value) {
      value = value || this.current.name;

      const MAX_LENGTH = 255;

      if (!value) return "桌号为必填项";

      if (value.length >= MAX_LENGTH) return `此项最大长度为${MAX_LENGTH}`;

      return true;
    },
    validate_capacity(value) {
      value = value || this.current.capacity;

      if (!value) return "座位数为必填项";

      if (value < 1 || value > 1000000) return "不合法的座位数";

      return true;
    }
  },
  mixins: [AdminPage]
};
</script>
