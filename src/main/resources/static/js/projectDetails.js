let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        reloadTest: "",
        topTips: "返回首页",
        activeIndex: '1',
        imageURL_header: "img/avatar/",
        imageURL_suffix: ".jpg",
        avatar: "001",
        city: "火星",

        user_name2: '测试用户',//用户昵称2

        biaoti: '',
        leibie: '',
        zhongchoujine: '',
        qixian: '',
        shouyi: '',//
        addtime: '',
        faburen: '',
        xiangqing: '',
        picture: '001',
        issh: '',

        projectId: '',

        dialogFormVisible: false,
        dialogVisible: false,


        textarea: '',//评论内容
        commentData: [{
            user_id: '1',
            user_name: 'fu测试1',
            head_portrait: '001',//用户头像
            comment_time: '2020-12-12',
            comment_content: '测试评论内容',
            comment_id: '1',
        }],


        //投资
        alipayVisible: false,
        weChatVisible: false,
        paymentCheck: "",
        form: {
            name: "测试用户",
            method: "0",
            money: 0
        },
        formLabelWidth: '120px',
        alipayImg: "../img/pay/支付宝.png",
        weChatImg: "../img/pay/微信.png",

    },

    methods: {
        //导航栏切换
        handleSelect(key, keyPath) {
            console.log("当前导航在:(key,keyPath)" + key, keyPath);
            switch (key) {
                case "1":
                    window.location.assign("toHome");
                    break;
                case "2":
                    window.location.assign("toProjectXuZhi");
                    break;
                case "3": {
                    this.$message({
                        type: 'info',
                        message: '您已经在【众筹项目详情】，不必跳转。'
                    });
                    break;
                }
                case "4":
                    window.location.assign("adminLogin");
                    break;
                default:
                    break;
            }
        },
        backProject() {
            window.history.back();
        },
        signOut() {
            window.location.assign("userLogin");
        },
        personally() {
            window.location.assign("toPersonalCenter");
        },
        comment() {
            this.dialogFormVisible = true;
            // alert(this.projectId)
        },
        investment() {
            if(this.issh==='已完成'){
                this.$message({
                    type: 'error',
                    message: '该项目已完成投资，无须投资！'
                });
                return false;
            }
            this.dialogVisible = true;
            // alert(this.projectId)
        },
        submit_comment() {
            if (this.textarea === "") {
                this.$message({
                    type: 'error',
                    message: '请输入评论信息！'
                });
            } else {
                axios.post("/project/setComment/"
                    + this.user_name2 + "/" + this.textarea + "/" + this.projectId).then(response => {
                    let result = response.data.data;
                    if (result === true) {
                        this.$message({
                            type: 'success',
                            message: '回复评论成功！'
                        });
                        this.textarea = '';
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '网络异常！'
                    });
                    console.log(error);
                });
            }
        },

        paymentCommit() {
            if (this.paymentCheck === "1234") {
                this.topUpsCommit();
            } else {
                this.$message({
                    type: "error",
                    message: "付款接收码错误，请重试!"
                });
            }
        },
        topUpsCommit() {

            console.log("投资金额" + this.form.money);
            console.log("投资人" + this.form.name);
            console.log("投资项目ID" + this.projectId);

            if (this.form.money === "") {
                this.$message({
                    type: 'error',
                    message: '请输入投资金额！'
                });
            } else if (this.form.money < 0) {
                this.$message({
                    type: 'error',
                    message: '投资金额不得小于0！'
                });
            } else {
                axios.post("/project/setInvestment/"
                    + this.form.money + "/" + this.user_name2 + "/" + this.projectId).then(response => {
                    let result = response.data.data;
                    if (result === true) {
                        this.alipayVisible = false;
                        this.weChatVisible = false;
                        this.paymentCheck = "";
                        this.form.money = 0;
                        this.$message({
                            type: 'success',
                            message: '投资成功！'
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: 'error',
                        message: '网络异常！'
                    });
                    console.log(error);
                });
            }

        },
        topUpsCheck() {
            //校验提交信息
            if (this.form.money === "") {
                this.$message({
                    type: 'error',
                    message: '请输入投资金额！'
                });
            } else if (this.form.money < 0) {
                this.$message({
                    type: 'error',
                    message: '投资金额不得小于0！'
                });
            }else if (this.form.money === 0) {
                this.$message({
                    type: 'error',
                    message: '投资金额不得为0！'
                });
            } else {
                let method = parseInt(this.form.method);//将表单数据中的支付方式数据类型由string转为number
                if (method === 0) {
                    this.$message({
                        type: "info",
                        message: "请用支付宝扫一扫支付"
                    });
                    //支付宝方式付款
                    this.alipayVisible = true;
                } else if (method === 1) {
                    //微信方式付款
                    this.$message({
                        type: "info",
                        message: "请用微信扫一扫支付"
                    });
                    this.weChatVisible = true;
                } else {
                    this.$message({
                        type: "error",
                        message: "系统出错"
                    });
                    // alert("money type ="+typeof (this.form.money)+"值为【"+this.form.money+"】"+" method type ="+typeof (this.form.method)+"值为【"+this.form.method+"】");
                }

            }
        }
    },
    mounted() {

        //用户session
        axios.get("/user/getUserSession").then(res => {

            let data = res.data.data;
            this.user_name2 = data.yonghuming;
            this.avatar = data.touxiang;
            form.name = data.yonghuming;

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
            this.projectId = data;
            axios.get('/project/getZhongChouDetail/' +
                data).then(ress => {

                let data = ress.data.data;
                this.biaoti = data.biaoti;
                this.leibie = data.leibie;
                this.zhongchoujine = data.zhongchoujine;
                this.qixian = data.qixian;
                this.shouyi = data.shouyi;
                this.addtime = data.timmmme;
                this.faburen = data.faburen;
                this.xiangqing = data.xiangqing;
                this.picture = data.picture;
                this.issh = data.issh;


            }).catch(error => {
                this.$message({
                    type: 'error',
                    message: '网络错误！'
                });
            });

            axios.get('/project/getComment/' +
                data).then(resss => {
                let data = resss.data.data
                let tableData = [];
                data.forEach(function (value) {

                    let list = {
                        user_id: value["pinglunren"],
                        user_name: value["yonghuming"],
                        head_portrait: value["touxiang"],
                        comment_time: value["addtime"],
                        comment_content: value["pinglunneirong"],
                        comment_id: value["xinwenid"],
                    };
                    tableData.push(list);
                });
                this.commentData = tableData;

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
