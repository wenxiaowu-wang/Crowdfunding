let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        reloadTest:"",
        topTips: "返回首页",
        activeIndex: '2',
        imageURL_header: "img/avatar/",
        imageURL_suffix: ".jpg",
        avatar:"001",
        city: "火星",
        user_name2:'测试用户',//用户昵称2

        biaoti:'杨府山城市公园争取明年11月份开园',
        leibie:'众筹须知',
        neirong:'测试数据',
        dianjilv:'15',
        addtime:'2019-03-26 17:01:31',
        tianjiaren:'hsg',


    },

    methods: {
        //导航栏切换
        handleSelect(key, keyPath) {
            console.log("当前导航在:(key,keyPath)"+key, keyPath);
            switch (key){
                case "1":window.location.assign("toHome");break;
                case "2":{
                    this.$message({
                        type:'info',
                        message:'您已经在【众筹须知详情】，不必跳转。'
                    });
                    break;
                }
                case "3":window.location.assign("toProject");break;
                case "4":window.location.assign("adminLogin");break;
                default:break;
            }
        },
        backProject(){
            window.location.assign("toProjectXuZhi");
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

        //用户众筹项目的ID
        axios.get("/project/getProjectDetailSession").then(res => {
            let id = res.data.data;

            console.log(id)
            console.log(id)

            axios.get('/project/getZhongChouXuZhiDetail/' +
                id ).then(ress => {
                let data =ress.data.data;

                this.biaoti = data.biaoti;
                this.leibie =data.leibie;
                this.neirong =data.neirong;
                this.dianjilv =data.dianjilv;
                this.addtime =data.addtime;
                this.tianjiaren =data.tianjiaren;

            }).catch(error => {
                this.$message({
                    type: 'error',
                    message: '网络错误！'
                });
            });

        }).catch(error => {
            console.log("获取session信息失败！" + error);
        });


    }
});
