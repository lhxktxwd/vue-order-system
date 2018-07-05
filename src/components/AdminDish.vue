<template>
    <div class="main col-lg-12">
        <div class="row">
            <h2 class="col-lg-9">菜品管理</h2>
            <div class="col-lg-3 right">
                <button class="el-button" @click="show_form = !show_form"><span v-if="show_form">取消</span><span v-else>创建菜品</span></button>
            </div>
        </div>
        <form class="col-lg-3" v-if="show_form" @submit="create($event)">
            <div class="input-wrap">
                <label>菜名</label>
                <input type="text" v-model="current.name">
            </div>
            <div class="input-wrap">
                <label>价格</label>
                <input type="text" v-model="current.price">
            </div>
            <div class="input-wrap">
                <label>描述</label>
                <input type="text" v-model="current.description">
            </div>
            <div class="input-wrap">
                <label>图片地址</label>
                <input type="text" v-model="current.cover_url">
            </div>
            <button>提交</button>
        </form>
        <table class="left">
            <thead>
                <tr>
                    <th>菜名</th>
                    <th>价格</th>
                    <th>描述</th>
                    <th>封面</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for = "item in list" :key=item.id>
                    <td>{{item.name}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.description || "-" }}</td>
                    <td>
                        <img v-if="item.cover_url" :src="item.cover_url" :alt="item.name">
                        <span class="empty-holder" v-else>暂无封面</span>
                    </td>
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
            model: 'dish',
            validate_props: ['cover_url', 'description', 'name', 'price'], // 需要验证的属性
        };
    },

    methods: {

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
