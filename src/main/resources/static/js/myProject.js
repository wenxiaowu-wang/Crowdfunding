let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {


        topTips: "返回首页",
        activeIndex: '2-2',
        imageURL_header: "img/avatar/",
        imageURL_suffix: ".jpg",
        user_avatar: "001",
        user_name: '测试用户',//用户昵称2

        book_num: '1',
        tableData: [{
            id:'1',
            pId:'00100000',
            biaoti:'测试项目',
            type:'医疗',
            money:'50000',
            qixian:'2',
            shouP:'张三',
            faP:'李四',
            state:'审核中'
        }],

    },

    methods: {
        //导航栏切换
        handleSelect(key, keyPath) {
            console.log("当前导航在:(key,keyPath)" + key, keyPath);
            switch (key) {
                case "1":
                    window.location.assign("toPersonalCenter");
                    break;
                case "2-1": window.location.assign("toProjectFaBu");
                    break;
                case "2-2":{
                    this.$message({
                        type: 'info',
                        message: '您已经在【我的众筹项目】，不必跳转。'
                    });
                    break;
                }
                case "2-3":
                    window.location.assign("touziMy");
                    break;
                case "3":
                    window.location.assign("myTouzi");
                    break;
                default:
                    break;
            }
        },
        backHome() {
            window.location.assign("toHome");
        },
        signOut() {
            window.location.assign("userLogin");
        },goToDetails(id) {
            axios.get('/project/setProjectDetailSession/' +
                id).then(response => {
                let data = response.data;
                window.location.assign("toProjectDetails");
            }).catch(error => {
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
            this.user_name = data.yonghuming;
            this.user_avatar = data.touxiang;

            //我的众筹项目列表
            axios.get("/project/getMyZhongChouXiangMu/"+
                data.yonghuming).then(res => {
                let data=res.data.data
                this.book_num = data.length;
                let tableData=[];
                data.forEach(function (value) {
                    let list = {
                        id: value["id"],
                        pId: value["xiangmubianhao"],
                        biaoti: value["biaoti"],
                        type: value["leibie"],
                        money: value["zhongchoujine"],
                        qixian: value["qixian"],
                        shouP: value["shouyi"],
                        faP:value["faburen"],
                        state:value["issh"],
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
