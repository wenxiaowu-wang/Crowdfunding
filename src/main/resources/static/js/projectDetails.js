let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        reloadTest:"",
        topTips: "返回首页",
        activeIndex: '3',
        imageURL_header: "img/avatar/",
        imageURL_suffix: ".jpg",
        avatar:"001",
        city: "火星",

        user_name2:'测试用户',//用户昵称2

        biaoti:'',
        leibie:'',
        zhongchoujine:'',
        qixian:'',
        shouyi:'',//
        addtime:'',
        faburen:'',
        xiangqing:'',
        picture:'001',

    },

    methods: {
        //导航栏切换
        handleSelect(key, keyPath) {
            console.log("当前导航在:(key,keyPath)"+key, keyPath);
            switch (key){
                case "1":window.location.assign("toHome");break;
                case "2":window.location.assign("toProjectXuZhi");break;
                case "3":{
                    this.$message({
                        type:'info',
                        message:'您已经在【众筹项目详情】，不必跳转。'
                    });
                    break;
                }
                case "4":window.location.assign("adminLogin");break;
                default:break;
            }
        },
        backProject(){
            window.location.assign("toProject");
        },
        signOut(){
            window.location.assign("userLogin");
        },
        personally(){
            alert("代码未实现")
        },
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

            let data = res.data.data;

            console.log(data)

            axios.get('/project/getZhongChouDetail/' +
                data ).then(ress => {

                let data =ress.data.data;

                this.biaoti = data.biaoti;
                this.leibie =data.leibie;
                this.zhongchoujine =data.zhongchoujine;
                this.qixian =data.qixian;
                this.shouyi =data.shouyi;
                this.addtime =data.addtime;
                this.faburen =data.faburen;
                this.xiangqing =data.xiangqing;
                this.picture=data.picture;

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
