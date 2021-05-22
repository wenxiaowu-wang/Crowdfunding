new Vue({
    el: "#app",
    data: {
        yonghuming:'',
        mima:'',
        activeName: 'first'
    },
    methods: {

        normalLogin() {


            if (this.yonghuming === "") {
                this.$message({
                    type: 'error',
                    message: '请输入账号！'
                });
                return;
            }
            if (this.mima === "") {
                this.$message({
                    type: 'error',
                    message: '请输入密码！'
                });
                return false;
            } else {
                axios.get('/user/getLoginResult/' +
                    this.yonghuming + '/' + this.mima).then(response => {
                    let data = response.data;
                    console.log("账号密码是否正确:"+data.data)
                    if (data.data === true) {
                        window.location.assign("toHome");
                    }else{
                        this.$message({
                            type: 'error',
                            message: '账号或密码错误！'
                        });
                    }
                }).catch(error => {
                    console.log("登录失败"+error);
                    this.$message({
                        type: 'error',
                        message: '网络错误！'
                    });
                });
            }
        },
        gotoRegistration(){
            window.location.assign("userRegister");
        },


    }
});