let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        book_num: '1',
        topTips: "返回首页",
        activeIndex: '2',
        imageURL_header: "img/avatar/",
        imageURL_suffix: ".jpg",
        avatar:"001",


        user_name2:'测试用户',//用户昵称2

        tableData: [{
            ID:'001',
            biaoti:'众筹须知',
            leibie:'测试',
            tianjiaren:'张三',
            dianjilv:'50000',
            addtime:'2020-10-10',

        }],


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
                        message:'您已经在【众筹须知】，不必跳转。'
                    });
                    break;
                }
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
        },
        goToDetails(id){
            axios.get('/project/setProjectDetailSession/' +
                id).then(response => {
                let data = response.data;
                console.log("项目编号ID:"+data.data)
                window.location.assign("toProjectXuZhiDetail");
            }).catch(error => {
                console.log("登录失败"+error);
                this.$message({
                    type: 'error',
                    message: '网络错误！'
                });
            });
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

        //众筹项目列表
        axios.get("/project/getZhongChouXuZhi").then(res => {
            let data=res.data.data
            console.log(data)
            let tableData=[];
            data.forEach(function (value) {

                let list = {
                    ID: value["id"],
                    biaoti: value["biaoti"],
                    leibie: value["leibie"],
                    tianjiaren: value["tianjiaren"],
                    dianjilv: value["dianjilv"],
                    addtime: value["addtime"],
                };
                tableData.push(list);
            });

            this.tableData = tableData;

        }).catch(error => {
            this.$message({
                type: 'error',
                message: '网络错误！'
            });
        });

    }
});
