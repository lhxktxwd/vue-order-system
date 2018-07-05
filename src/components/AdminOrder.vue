<template>
    <div>
        <div class="row">
            <h2 class="col-lg-9">订单管理</h2>
        </div>
        <table class="left">
            <thead>
                <tr>
                    <th>id</th>
                    <th>桌子</th>
                    <th>菜品详情</th>
                    <th>主单</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for = "item in list" :key=item.id>
                        <td>{{item.id}}</td>
                        <td>{{item.$table ? item.$table.name : '-'}}</td>
                        <td>
                            <span v-for="dish in JSON.parse(item.dish_info)" :key=dish.dish_id>
                                <span>菜品：{{dish.dish_id}}</span>
                                <span>数量：{{dish.count}}</span>
                            </span>
                        </td>
                        <td>{{ item.parent_id || '-' }}</td>
                        <td>
                            <select @change="change_status(item.id, item.status)" v-model="item.status">
                                <option v-for="(index,status) in status_list" :key=index :value="status.value">{{status.name}}</option>
                            </select>
                            <button class="el-button" @click="remove(item.id)">删除</button>
                        </td>
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
            model: 'order',
            validate_props: ['cover_url', 'description', 'name', 'price'], // 需要验证的属性
            status_list: [{
                    name: '进行中',
                    value: 'created',
                },
                {
                    name: '已支付',
                    value: 'paid',
                },
                {
                    name: '已关闭',
                    value: 'closed',
                },
                {
                    name: '已取消',
                    value: 'canceled',
                },
            ],
        };
    },
    methods: {
        change_status(id, status) {
            http.post('order/update', {
                id,
                status
            });
        },

        validate_name(value) {

            value = value || this.current.name;

            const MAX_LENGTH = 255;

            if (!value)
                return '菜名为必填项';

            if (value.length >= MAX_LENGTH)
                return `此项最大长度为${MAX_LENGTH}`;

            return true;
        },

        validate_price(value) {
            value = value || this.current.price;

            if (
                value === '' ||
                value === undefined ||
                value < 0 ||
                value > 1000000
            ) return '不合法的价格';

            return true;
        },

        validate_cover_url(value) {
            value = value || this.current.cover_url;

            let re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

            if (!value)
                return true;

            if (!re.test(value))
                return '不合法的地址';

            return true;
        },

        validate_description(value) {
            value = value || this.current.description;

            if (!value)
                return true;

            const MAX_LENGTH = 10000;
            if (value.length > MAX_LENGTH)
                return `此项最大长度为${MAX_LENGTH}`;

            return true;
        },
    },
    mixins: [AdminPage]
}
</script>
