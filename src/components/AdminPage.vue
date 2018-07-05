<script>
export default {
     data() {
        return {
            list: [], // 正在列出的数据（多行）
            show_form: false, // 是否显示表单
            current: {}, // 正在编辑的行
        };
    },
    mounted() {
        this.read();
    },
    methods: {
        create(e) {
            e.preventDefault();

            if (!this.validate())
                return;

            let is_update = this.current.id;
            let action = is_update ? 'update' : 'create';

             this.http
                .post(`${this.model}/${action}`, this.current)
                .then(r => {
                    if (r.data.success) {
                        this.current = {};
                        if (!is_update)
                            this.list.push(r.data.data);
                    }
                });
        },
        remove(id) {

            if (!confirm('确定要删除吗？'))
                return;

             this.http
                .post(`${this.model}/delete`, {
                    id
                })
                .then(r => {
                    if (r.data.success) {
                        this.util.delete_element_by_id(this.list, id);
                    }
                });
        },
        read() {
             this.http
                .post(`${this.model}/read`)
                .then(r => {
                    this.list = r.data.data;
                    console.log(this.list)
                    if (this.after_read) {
                        this.after_read(r);
                    }
                });
        },
        validate(row) {
            row = row || this.current;

            this.error = [];

            this.validate_props.forEach(prop => {
                // 如果prop等于name，相当于 this.validate_name()
                let r = this['validate_' + prop]();

                if (r === true)
                    return;

                this.error.push(r);
            });

            return !this.error.length;
        },
    }
}
</script>
