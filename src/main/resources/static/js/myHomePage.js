let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        topTips: "返回首页",
        activeIndex: '1',
        imageURL_header: "img/avatar/",
        imageURL_suffix: ".jpg",
        avatar:"001",
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
                case "2":window.location.assign("toProjectXuZhi");break;
                case "3":window.location.assign("toProject");break;
                case "4":window.location.assign("adminLogin");break;
                default:break;
            }
        },
        signOut(){
            window.location.assign("userLogin");
        },
        personally(){
            window.location.assign("toPersonalCenter");
        }
    },
    mounted() {

        //用户session
        axios.get("/user/getUserSession").then(res => {

            let data = res.data.data;
            this.user_name2 = data.yonghuming;
            this.avatar = data.touxiang;

        }).catch(error => {
            console.log("获取session信息失败！" + error);
            // this.$confirm('请先登录！', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     window.location.assign("userLogin");
            // }).catch(() => {
            //     window.location.assign("userLogin");
            // });
        });

    }
});
