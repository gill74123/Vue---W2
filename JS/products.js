import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const app = {
    data() {
        return{
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "gill74123",
            productsData: [],
            tempProduct: {}
        }
    },
    methods: {
        // 確認是否登入
        checkAdmin() {
            axios.post(`${this.url}/api/user/check`)
            .then((res) => {
                // console.log(res);

                // 執行 取得產品資料
                this.getData();
            })
            .catch((err) => {
                console.dir(err.response.data.message);
                alert(err.response.data.message);

                // 同網域頁面跳轉
                window.location = "index.html";
            })
        },
        // 取得產品資料
        getData() {
            axios.get(`${this.url}/api/${this.path}/admin/products`)
            .then((res) => {
                // console.log(res);

                // 把取得的資料賦予 productsData
                this.productsData = res.data.products;
            })
            .catch((err) => {
                console.log(err);
            })
        },
        // 選擇產品 查看細節
        selectProduct(product) {
            this.tempProduct = product;
        }
    },
    // 生命週期(進入頁面就會執行，似 init())
    mounted() {
        // 取得登入頁面存入的 token
        const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)gillToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 將 token 帶入 axios headers 內
        axios.defaults.headers.common.Authorization = myToken;

        // 執行方法(確認是否登入)
        this.checkAdmin();
    },
}

createApp(app).mount("#app");