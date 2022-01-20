import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

const productsList = {
    data() {
        return {
            baseUrl: "https://vue3-course-api.hexschool.io/v2",
            path: "gillchin",
            products: [],
            tempProduct: {},
        }
    },
    methods: {
        // 判斷是否登入
        checkAdmin() {
            const url = `${this.baseUrl}/api/user/check`;
            axios.post(url)
            .then((res) => {
                console.log(res);
                
                // 執行 取得產品列表
                this.getData();
            })
            .catch((err) => {
                console.dir(err);
                alert(err.response.data.message);

                // 沒有登入 跳轉頁面
                window.location = "index.html"
            })
        },
        // 取得產品列表
        getData() {
            const url = `${this.baseUrl}/api/${this.path}/admin/products`;
            axios.get(url)
            .then((res) => {
                console.log(res);
                
                // 賦予到 data() 資料內
                this.products = res.data.products;
            })
            .catch((err) => {
                console.dir(err);
            })
        },
        // 取得產品詳情
        getProductDetail(item){
            this.tempProduct = item;
        },
        // 登出
        logout() {
            const url = `${this.baseUrl}/logout`;
            axios.post(url)
            .then((res) => {
                console.log(res);
                alert(res.data.message);

                // 登出 頁面跳轉
                window.location = "index.html";
            })
            .catch((err) => {
                console.dir(err);
            })
        },
        // 刪除產品
        deleteProduct(id) {
            const url = `${this.baseUrl}/api/${this.path}/admin/product/${id}`;
            axios.delete(url)
            .then((res) => {
                console.log(res);
                alert(res.data.message);
                // 執行 取得產品列表
                this.getData();
            })
            .catch((err) => {
                console.dir(err);
            })
        }
    },
    mounted() {
        // 從 cookie 內取出 token
        const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)gillToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // axios headers 帶入 token
        axios.defaults.headers.common["Authorization"] = myToken;

        // 執行 判斷是否登入
        this.checkAdmin();
    }
}

createApp(productsList).mount("#productsList");