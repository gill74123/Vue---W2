import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';

const app = {
    data() {
        return{
            url: "https://vue3-course-api.hexschool.io/v2"
        }
    },
    methods: {
        // 確認是否登入
        checkAdmin() {
            axios.post(`${this.url}/api/user/check`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
            })
        }
    },
    // 生命週期(進入頁面就會執行)
    mounted() {
        // 取得登入頁面存入的 token
        const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)gillToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log(myToken);
        // 將 token 帶入 axios headers 內
        axios.defaults.headers.common.Authorization = myToken;

        // 執行方法(確認是否登入)
        this.checkAdmin();
    },
}

createApp(app).mount("#app");