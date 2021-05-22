new Vue({
    el: "#app",
    data: {
        userInfo: {
            phone_number: '',
            password: '',
        },
        phone_number: '',
        user_id: '',
        user_name: '',
        head_portrait: '',
        password: '',


        activeName: 'first'
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        yz() {
            let regphoto = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
            if (!regphoto.test(this.phone_number)) {
                this.$message({
                    type: "error",
                    message: "手机号格式错误，请重新输入"
                });
            }
        },
        normalLogin() {


            if (this.userInfo.phone_number === "") {
                this.$message({
                    type: 'error',
                    message: '请输入账号！'
                });
                return;
            }
            if (this.userInfo.password === "") {
                this.$message({
                    type: 'error',
                    message: '请输入密码！'
                });
                return;
            } else {
                axios.get('/shaohuashuwu/userInfoController/userLogin/' +
                    this.userInfo.phone_number + '/' + this.userInfo.password).then(response => {

                    let loginResult = response.data;
                    console.log(typeof (loginResult));
                    if (loginResult === false) {
                        this.$message({
                            type: 'error',
                            message: '账号或密码错误！'
                        });
                    } else {
                        //将手机号  密码 code等传入session
                        this.smsCode = '0';
                        axios.get("/shaohuashuwu/userSession/saveUserPhoneNumber/" +
                            this.userInfo.phone_number+"/"+ this.userInfo.password +"/"+ this.smsCode ).then(res => {
                        }).catch(error => {
                            console.log(error);
                            alert("响应失败");
                        });

                       // 获取用户数据
                        axios.get('/shaohuashuwu/userInfoController/getUserIdNameAndHeaderByPhone/' +
                            this.userInfo.phone_number).then(response => {
                            let user_id1 = response.data["user_id"];
                            let user_name1 = response.data["user_name"];
                            let head_portrait1 = response.data["head_portrait"];
                            let gender1 = response.data["gender"];
                            let birthday1 = response.data["birthday"];
                            let area1 = response.data["area"];
                            //保存到userSession
                            axios.post("/shaohuashuwu/userSession/savePersonalData/" +
                                user_id1 + "/" + user_name1 + "/" + head_portrait1+"/"+ gender1 + "/" + birthday1 + "/" + area1).then(resp => {
                                console.log("用户数据同步到session中。");
                                //alert("用户数据同步到session中")
                                window.location.assign("../pages/userMainInterface.html");
                                // window.location.assign("../pages/novelDetailsInterface.html");
                            }).catch(error => {
                                console.log("用户数据同步session失败。"+error);
                            });
                        }).catch(error => {
                            console.log("获取用户信息失败。" + error);
                        });

                    }
                }).catch(error => {
                    console.log(error);
                    alert("响应失败");
                });
            }
        },
        gotoRegistration(){
            window.location.assign("../pages/usersRegistrationInterface.html");
        },


    }
});