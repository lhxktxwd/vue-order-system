<template>
    <div class="container-sm">
            <h1> 欢迎来到lhxk餐厅</h1>
            <div class="col-lg-10">
                <div class="row dish" v-for="dish in dish_list" :key="dish.id">
                    <div class="col-lg-3 picture">
                        <img :src="dish.cover_url || default_cover_url">
                    </div>
                    <div class="col-lg-5 detail">
                        <div class="name">{{dish.name}}</div>
                        <div class="description">{{dish.description}}</div>
                    </div>
                    <div class="col-lg-4 operate-box">
                        <div class="row el-input-number">
                            <button class="col-lg-3 el-button button-decrease"  @click="decrement(dish.id)">-</button>
                            <div class="col-lg-6">
                             <input type="number" v-model="dish.$count" />
                            </div>
                            <button class="col-lg-3 el-button button-increase"  @click="increment(dish.id)">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-trigger" @click="show_order = true">🛒 <span>￥: {{order.total_fee || 0}}</span></div>
            <div class="footer">
                <div v-if="show_order" class="shopping-cart">
                    <div class="close" @click="show_order = false"></div>
                    <h2>订单详情 </h2>
                    <div  v-if="order.total_fee" >
                        <div class="item" v-for="dish in order.dish_info" :key="dish.dish_id">
                            <div >菜品：{{dish_list[dish.dish_id].name}}</div>
                            <div >数量：{{dish.count}}</div>
                        </div>
                        <button @click="submit_order">提交订单</button>
                    </div>
                    <div v-else>你啥都没点</div>
                    <h4>总价:{{order.total_fee || 0}}</h4>
                </div>
                <router-link to="/login">管理员登录</router-link>
            </div>
        </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "home",
  data() {
    return {
      show_order: false,
      dish_list: [],
      default_cover_url: "http://biaoyansu.com/img/biaoyansu_logo.svg",
      order: {}
    };
  },
  methods: {
    read_dish() {
      this.http
        .post("dish/read", {
          key_by: "id"
        })
        .then(r => {
          this.dish_list = r.data.data;
          this.reset_order();
        });
    },

    increment(id) {
      this.dish_list[id].$count++;
    },

    decrement(id) {
      let row = this.dish_list[id];
      if (row.$count > 0) row.$count--;
    },
    submit_order() {
      this.prepare_order_info();

      this.order.status = "created";

      this.main_order_id().then(id => {
        if (id) this.order.parent_id = id;

        this.http.post("order/create", this.order).then(r => {
          if (r.data.success) {
            this.reset_order();
          }
        });
      });
    },
    main_order_id() {
      return  this.http
        .post("order/first", {
          where: {
            and: {
              table_id: this.order.table_id,
              status: "created",
              parent_id: null
            }
          }
        })
        .then(function(r) {
          if (!r.data.data) return false;
          return r.data.data.id;
        });
    },
    reset_order() {
      this.order = {
        table_id: this.order.table_id
      };

      let list = this.dish_list;
      for (let key in list) {
        Vue.set(this.dish_list[key], "$count", 0);
      }
    },
    prepare_order_info() {
      let info = [];

      let list = this.dish_list;

      for (let key in list) {
        let dish = list[key];
        let count = dish.$count;

        if (!count) continue;

        console.log("dish:", dish);

        info.push({
          dish_id: dish.id,
          count: parseInt(count)
        });
      }

      this.order.dish_info = info;
    }
  },
  mounted() {
    this.read_dish();
    this.order.table_id = this.$route.query.table_id;
    // if (!this.order.table_id)
    //   this.ask_table();
  },
  watch: {
    dish_list: {
      deep: true,
      handler() {
        let total = 0;

        this.prepare_order_info();

        let dishes = this.order.dish_info;

        if (!dishes) return;

        dishes.forEach(dish => {
          let count = dish.count;
          let price = this.dish_list[dish.dish_id].price;
          total += count * price;
        });

        this.order.total_fee = total;
      }
    }
  }
};
</script>

<style src="..\css\global.css"></style>
<style src="..\css\index.css"></style>
