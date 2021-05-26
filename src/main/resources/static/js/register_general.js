let register_vm = new Vue({
    el: "#app",
    data: {
        yonghuming: '',
        mima: '',
        password: '',
        xingming: '',
        xingbie: '男',
        chushengnianyue: '',
        qq: '',
        youxiang: '',
        dianhua: '',
        shenfenzheng: '',
        dizhi: '',
        beizhu: '',

    },
    methods: {
        save() {
            // const d = new Date(this.chushengnianyue)
            const resDate = this.chushengnianyue.getFullYear() + '-' + this.p((this.chushengnianyue.getMonth() + 1)) + '-' + this.p(this.chushengnianyue.getDate())

            if (this.yonghuming === "") {
                this.$message({
                    type: 'error',
                    message: '请输入用户名'
                });
                return false;
            } else if (this.mima === "") {
                this.$message({
                    type: 'error',
                    message: '请输入密码'
                });
                return false;
            } else if (this.password === "") {
                this.$message({
                    type: 'error',
                    message: '请输入确认密码'
                });
                return false;
            }else if (this.password !== this.mima) {
                this.$message({
                    type: 'error',
                    message: '两次输入的密码不一致'
                });
                return false;
            } else if (this.password === "") {
                this.$message({
                    type: 'error',
                    message: '请输入确认密码'
                });
                return false;
            } else if (this.xingming === "") {
                this.$message({
                    type: 'error',
                    message: '请输入姓名'
                });
                return false;
            }else if (this.chushengnianyue === "") {
                this.$message({
                    type: 'error',
                    message: '请选择出生年月'
                });
                return false;
            }else if (this.qq === "") {
                this.$message({
                    type: 'error',
                    message: '请输入qq'
                });
                return false;
            }else if (this.youxiang === "") {
                this.$message({
                    type: 'error',
                    message: '请输入邮箱'
                });
                return false;
            }else if (this.dianhua === "") {
                this.$message({
                    type: 'error',
                    message: '请输入手机号'
                });
                return false;
            }else if (this.shenfenzheng === "") {
                this.$message({
                    type: 'error',
                    message: '请输入身份证号码'
                });
                return false;
            }else if (this.dizhi === "") {
                this.$message({
                    type: 'error',
                    message: '请输入地址'
                });
                return false;
            }else if (this.beizhu === "") {
                this.$message({
                    type: 'error',
                    message: '请输入备注'
                });
                return false;
            } else{
                $.ajax({
                    url: "user/getRegisterResult",
                    type: "post",
                    data: {
                        yonghuming:this.yonghuming,
                        mima:this.mima,
                        xingming:this.xingming,
                        xingbie:this.xingbie,
                        chushengninayue:resDate.toString(),
                        qq:this.qq,
                        youxiang:this.youxiang,
                        dianhua:this.dianhua,
                        shenfenzheng:this.shenfenzheng,
                        dizhi:this.dizhi ,
                        beizhu:this.beizhu
                    },
                    dataType: 'json'
                    , headers: 'getRegisterResult',
                    success: function (msg) {
                        console.log(msg.data)
                        if (msg.data === true) {
                            alert("注册成功，赶快去登陆吧")
                        } else {
                            alert("该用户名已存在，注册失败！")
                        }
                    }
                });
            }

        },
        p(s) {
            return s < 10 ? '0' + s : s
        },

    }
});

