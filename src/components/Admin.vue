<template>
      <div>
        <div class="nav row">
            <div class="container">
                <div class="col-lg-8">
                    <div class="nav-item"><router-link to="/">首页</router-link></div>
                    <div class="nav-item"><router-link to="/admin/table">桌号管理</router-link></div>
                    <div class="nav-item"> <router-link to="/admin/dish">菜品管理</router-link></div>
                    <div class="nav-item"> <router-link to="/admin/order">订单管理</router-link></div>
                </div>
                <div class="col-lg-4 right">
                    <div class="nav-item" @click="logout"><a>登出</a></div>
                </div>
            </div>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
     methods: {
        logout() {
            localStorage.removeItem('logged_in');
            this.$router.push('/login');
        }
    }
}
</script>

<style src="..\css\global.css"></style>
<style src="..\css\index.css"></style>


