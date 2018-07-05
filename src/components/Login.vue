<template>
    <form class="login" @submit="login($event)" novalidate>
        <h2>登录</h2>

        <div  class="input-wrap">
            <label>账号</label>
            <input type="text" v-model="user.username" />
        </div>
        <div  class="input-wrap">
            <label>密码</label>
            <input type="password" v-model="user.password" />
        </div>
        <button class="el-button" >登录</button>
    </form>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      if (this.user.username != "lhxk" || this.user.password != "lhxk123") {
        alert("用户名或密码有误");
        return;
      }
      localStorage.setItem("logged_in", 1);
      this.$router.push("/admin/order");
    }
  }
};
</script>

<style src="..\css\global.css"></style>
<style src="..\css\index.css"></style>