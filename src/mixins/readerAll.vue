<script>
    import api from "../lib/api";

    export default {
        methods: {
            readAll(model) {
                api(model + '/read')
                    .then(res => {
                        this.$set(this.selectList, model, res.data)
                    });
            }
        }
    }
</script>


