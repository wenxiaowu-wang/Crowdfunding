let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {


        topTips: "返回首页",
        activeIndex: '1',
        imageURL_header: "../images/avatar/",
        imageURL_suffix: ".jpg",

        city: "火星",

        user_name2:'测试用户',//用户昵称2


    },

    methods: {
        //导航栏切换
        handleSelect(key, keyPath) {
            console.log("当前导航在:(key,keyPath)"+key, keyPath);
            switch (key){
                case "1":{
                    this.$message({
                        type:'info',
                        message:'您已经在【首页】，不必跳转。'
                    });
                    break;
                }
                case "2":window.location.assign("../pages/bookShelfInterface.html");break;
                case "3":window.location.assign("toProject");break;
                case "4":window.location.assign("../pages/personalAccountInterface.html");break;
                default:break;
            }
        },
        toHome(){
            window.location.assign("toHome");
        }
    },
    mounted() {

        //用户session
        axios.get("/user/getUserSession").then(res => {

            console.log(res.data.data)
            let data = res.data.data;
            this.user_name2 = data.yonghuming;

        }).catch(error => {
            console.log("获取session信息失败！" + error);
        });

    }
});
