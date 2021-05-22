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
            } else {
                axios.post("/user/getRegisterResult/" +
                    this.yonghuming + "/" +this.mima + "/" +this.xingming + "/" +this.xingbie + "/" +this.chushengnianyue + "/" +this.qq + "/" +this.youxiang + "/" +this.dianhua + "/" +this.shenfenzheng + "/" +this.dizhi + "/" +this.beizhu ).then(res => {
                        let result =res.data;
                        if(result){
                            this.$message({
                                type: 'success',
                                message: '注册成功'
                            });
                        }else{
                            this.$message({
                                type: 'error',
                                message: '注册失败'
                            });
                        }
                }).catch(error => {

                    this.$message({
                        type: 'error',
                        message: '网络异常'
                    });
                    console.log("注册失败："+error);
                });
            }
        },
        goToLogin() {
            window.location.assign("../pages/UserLogin.html");
        }
    }
});