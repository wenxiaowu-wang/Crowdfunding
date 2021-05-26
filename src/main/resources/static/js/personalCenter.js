let myHomePage_vm = new Vue({
    el: "#myHomePage",
    data: {

        introduction: "这家伙很懒，什么都没有留下！",
        activeIndex: '1',
        imageURL_header: "../img/avatar/",
        imageURL_suffix: ".jpg",

        phone_number: '',
        user_avatar: "009",//用户头像
        user_id: 0,//用户id
        user_name: '123',//用户昵称
        gender: '男',//用户性别
        dateValue: '',//用户生日
        area: '测试',//用户地区
        QQ: '',
        email: '',

        //修改密码
        comparePwd: '',//存入session的原密码
        oldPwd: '',//原密码
        newPwd: '',//新密码
        newPwd2: '',//重复新密码

        carouselFigures: [
            {
                figureUrl: "heci1",
                hyperlink: "https://baijiahao.baidu.com/s?id=1687656758816139053&wfr=spider&for=pc",
            }, {
                figureUrl: "heci2",
                hyperlink: "https://baijiahao.baidu.com/s?id=1687656758816139053&wfr=spider&for=pc",
            }, {
                figureUrl: "heci3",
                hyperlink: "https://baijiahao.baidu.com/s?id=1687656758816139053&wfr=spider&for=pc",
            }
        ],//轮播图图片名字（图片格式为png）
    },

    methods: {
        handleSelect(key, keyPath) {
            console.log("当前导航在:(key,keyPath)" + key, keyPath);
            switch (key) {
                case "1": {
                    this.$message({
                        type: 'info',
                        message: '您已经在【个人资料】，不必跳转。'
                    });
                    break;
                }
                case "2":
                    break;
                case "2-1":
                    alert("2-1");
                    break;
                case "2-2":
                    alert("2-1");
                    break;
                case "2-3":
                    alert("2-1");
                    break;
                case "3":
                    // window.location.assign("");
                    break;
                case "4":
                    // window.location.assign("");
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
        updateUser() {
            const d = new Date(this.dateValue)
            const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
            if (this.dateValue === "") {
                this.$message({
                    type: 'error',
                    message: '请选择出生年月'
                });
                return false;
            } else if (this.QQ === "") {
                this.$message({
                    type: 'error',
                    message: '请输入qq'
                });
                return false;
            } else if (this.email === "") {
                this.$message({
                    type: 'error',
                    message: '请输入邮箱'
                });
                return false;
            } else if (this.phone_number === "") {
                this.$message({
                    type: 'error',
                    message: '请输入手机号'
                });
                return false;
            } else if (this.area === "") {
                this.$message({
                    type: 'error',
                    message: '请输入地址'
                });
                return false;
            } else {
                $.ajax({
                    url: "user/updateUser",
                    type: "post",
                    data: {
                        yonghuming: this.user_name,
                        xingbie: this.gender,
                        chushengnianyue: resDate,
                        qq: this.QQ,
                        youxiang: this.email,
                        dianhua: this.phone_number,
                        dizhi: this.area,
                    },
                    dataType: 'json'
                    , headers: 'updateUser',
                    success: function (msg) {
                        console.log(msg.data)
                        if (msg.data === true) {
                            alert("修改成功！")
                            window.location.assign("toPersonalCenter");
                        } else {
                            alert("修改失败！")
                        }
                    }
                });
            }
        },
        updatePwd() {

            if (this.oldPwd === "") {
                this.$message({
                    type: 'error',
                    message: '原密码输入不得为空'
                });
                return false;
            } else if (this.oldPwd !== this.comparePwd) {
                this.$message({
                    type: 'error',
                    message: '原密码输入不正确'
                });
                return false;
            } else if (this.newPwd ==="") {
                this.$message({
                    type: 'error',
                    message: '新密码输入不得为空'
                });
                return false;
            } else if (this.newPwd2 ==="") {
                this.$message({
                    type: 'error',
                    message: '重复密码输入不得为空'
                });
                return false;
            }else if (this.newPwd2 !== this.newPwd) {
                this.$message({
                    type: 'error',
                    message: '新密码与重复密码输入不一致'
                });
                return false;
            }else {
                $.ajax({
                    url: "user/updatePwd",
                    type: "post",
                    data: {
                        yonghuming: this.user_name,
                        mima: this.newPwd,
                    },
                    dataType: 'json'
                    , headers: 'updatePwd',
                    success: function (msg) {
                        console.log(msg.data)
                        if (msg.data === true) {
                            alert("修改成功！")
                        } else {
                            alert("修改失败！")
                        }
                    }
                });
            }
        },
        p(s) {
            return s < 10 ? '0' + s : s
        },
    },
    mounted() {
        //用户session
        axios.get("/user/getUserSession").then(res => {
            let data = res.data.data;
            this.user_name = data.yonghuming;
            this.user_avatar = data.touxiang;
            this.phone_number = data.dianhua;
            this.user_id = data.xingming;
            this.gender = data.xingbie;
            this.dateValue = data.chushengnianyue;
            this.area = data.dizhi;
            this.QQ = data.qq;
            this.email = data.youxiang;
            this.comparePwd = data.mima;

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
