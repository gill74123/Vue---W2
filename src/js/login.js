import { createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js'

const app = {
    data() {
        return {
            baseUrl: "https://vue3-course-api.hexschool.io/v2",
            user: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            const url = `${this.baseUrl}/admin/signin`;
            axios.post(url, this.user)
            .then((res) => {
                console.log(res);
                // 將 token, expired 取出
                const { token, expired } = res.data;
                // 將 token, expired 存入 cookie
                document.cookie = `gillToken=${token}; expires=${new Date(expired)} path=/`;
                
                // 跳轉頁面
                window.location = "products.html";
            })
            .catch((err) => {
                console.dir(err);
                alert(err.response.data.message);
            })
        }
    }
}
createApp(app).mount("#app");