let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        book_num: '1',
        topTips: "返回首页",
        activeIndex: '3',
        imageURL_header: "img/avatar/",
        imageURL_suffix: ".jpg",
        avatar:"001",

        user_name2:'测试用户',//用户昵称2

        tableData: [{
            id:'1',
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
                case "2":window.location.assign("toProjectXuZhi");break;
                case "3":{
                    this.$message({
                        type:'info',
                        message:'您已经在【众筹项目】，不必跳转。'
                    });
                    break;
                }
                case "4":window.location.assign("adminLogin");break;
                default:break;
            }
        },
        signOut(){
            window.location.assign("userLogin");
        },
        personally(){
            alert("代码未实现")
        },
        goToDetails(id){
            console.log("项目编号ID"+id)
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
        axios.get("/project/getZhongChouXiangMu").then(res => {
            let data=res.data.data
            console.log(data)
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
