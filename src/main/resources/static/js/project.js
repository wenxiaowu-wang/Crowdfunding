let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        book_num: '1',
        topTips: "返回首页",
        activeIndex: '3',
        imageURL_header: "../images/avatar/",
        imageURL_suffix: ".jpg",

        user_name2:'测试用户',//用户昵称2

        tableData: [{
            pId:'001',
            biaoti:'测试项目',
            type:'医疗',
            money:'50000',
            qixian:'2',
            shouP:'张三',
            faP:'李四'
        }],

    },

    methods: {
        //导航栏切换
        handleSelect(key, keyPath) {
            console.log("当前导航在:(key,keyPath)"+key, keyPath);
            switch (key){
                case "1":window.location.assign("toHome");break;
                case "2":window.location.assign("../pages/bookShelfInterface.html");break;
                case "3":{
                    this.$message({
                        type:'info',
                        message:'您已经在【众筹项目】，不必跳转。'
                    });
                    break;
                }
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
