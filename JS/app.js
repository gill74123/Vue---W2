import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.27/vue.esm-browser.min.js';


const app = {
    data() {
        return{
            url: "https://vue3-course-api.hexschool.io/v2",
            username: "",
            password: ""
        }
    },
    methods: {
        login() {
            let user = {
                username: this.username,
                password: this.password
            }
            axios.post(`${this.url}/admin/signin`, user)
            .then((res) => {
                console.log(res.data);
                // console.log(res.data.token, res.data.expired);
                // 取出 token, expired
                const { token, expired } = res.data;
                document.cookie = `gillToken=${token}; expires=${new Date(expired)}; path=/`;
                window.location = "products.html";
            })
            .catch((err) => {
                console.log(err.response);
            })
        }
    },
}

createApp(app).mount('#app');