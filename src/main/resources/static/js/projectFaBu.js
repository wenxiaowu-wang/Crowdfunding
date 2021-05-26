let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        topTips: "返回首页",
        activeIndex: '2-1',
        imageURL_header: "img/avatar/",
        imageURL_suffix: ".jpg",
        user_avatar: "001",
        user_name: '测试用户',//用户昵称2


        biaoti: '',
        money: '',
        time: '',
        xiangqing: '',

        options: [{
            value: '医疗',
            label: '医疗'
        }, {
            value: '旅游',
            label: '旅游'
        }, {
            value: '家居',
            label: '家居'
        }, {
            value: 'J类',
            label: 'J类'
        }, {
            value: '就学',
            label: '就学'
        }],
        value: ''



    },

    methods: {
        //导航栏切换
        handleSelect(key, keyPath) {
            console.log("当前导航在:(key,keyPath)" + key, keyPath);
            switch (key) {
                case "1":
                    window.location.assign("toPersonalCenter");
                    break;
                case "2-1": {
                    this.$message({
                        type: 'info',
                        message: '您已经在【众筹项目发布】，不必跳转。'
                    });
                    break;
                }
                case "2-2":
                    window.location.assign("myProject");
                    break;
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
        },
        publishProject(){
            if (this.biaoti === "") {
                this.$message({
                    type: 'error',
                    message: '请输入标题'
                });
                return false;
            } else if (this.value === "") {
                this.$message({
                    type: 'error',
                    message: '请选择类别'
                });
                return false;
            }else if (this.money === "") {
                this.$message({
                    type: 'error',
                    message: '请输入众筹金额'
                });
                return false;
            }else if (this.time === "") {
                this.$message({
                    type: 'error',
                    message: '请输入期限'
                });
                return false;
            }else if (this.xiangqing === "") {
                this.$message({
                    type: 'error',
                    message: '请输入项目描述'
                });
                return false;
            }else{
                axios.post("/project/publishProject/"
                    + this.biaoti + "/" + this.value + "/" + this.money+ "/" + this.time+ "/" + this.xiangqing +"/"+ this.user_name).then(response => {
                    let result = response.data.data;
                    if (result === true) {
                        this.$message({
                            type: 'success',
                            message: '发布成功！'
                        });
                        this.biaoti = ''
                        this.xiangqing = ''
                        this.time = ''
                        this.money = ''
                        this.value =''
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '网络异常！'
                    });
                    console.log(error);
                });
            }
        }
    },
    mounted() {

        //用户session
        axios.get("/user/getUserSession").then(res => {
            let data = res.data.data;
            this.user_name = data.yonghuming;
            this.user_avatar = data.touxiang;
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
