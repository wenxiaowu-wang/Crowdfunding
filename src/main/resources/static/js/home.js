let adminFrame_vm = new Vue({
    el:"#app",
    data:{


    },
    methods:{

    },
    mounted(){

        //用户session
        axios.get("/user/getUserSession").then(response => {


        }).catch(error => {
            console.log("获取session信息失败！" + error);
        });
    },
})