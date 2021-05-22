let adminLoginInterface_vm = new Vue({
    el:"#adminLogin",
    data:{
        labelPosition:"right",
        formLabel:{
            admin_id: "",
            admin_password: ""
        }
    },
    methods: {
        findData() {
            return {
                adminData: []
            }
        },
        adminLogin() {
            if (this.formLabel.admin_id === "" || this.formLabel.admin_password === "") {
                this.$message({
                    type: 'error',
                    message: '输入不可为空！'
                });
            } else {
                let userName = this.formLabel.admin_id;
                let password = this.formLabel.admin_password;
                this.$message({
                    type: 'success',
                    message: '登录请求发送成功！'
                });
                $.ajax({
                    url: "/admin/isAdmin",
                    type: "POST",
                    data: {'userName':userName,
                    "password":password},
                    dataType: 'json',
                    success: function (res) {
                        // console.log(res);
                        let theResult = res.data;
                            if (theResult) {
                                //登录成功，进行的操作:在当前界面跳进入管理员主界面；
                                //跳转界面
                                window.location.assign("toAdminMain");
                            } else {
                                alert("用户名或密码输入错误！");
                            }
                    }
                });
                // axios.post("/admin/isAdmin/" +
                //     userName + "/" + password).then(response =>{
                //     //response.data本身即为字符串格式，JSON处理是为了将整个response对象解析成字符串，否则直接打印response为Object
                //     let theResult = response.data;
                //     if (theResult) {
                //         //登录成功，进行的操作:在当前界面跳进入管理员主界面；
                //         //跳转界面
                //         window.location.assign("http://www.baidu.com");
                //     } else {
                //         this.$message({
                //             type: 'error',
                //             message: '账号或密码错误！'
                //         });
                //     }
                // }).catch(error =>{
                //     console.log("登录失败+" + error);
                // });
            }
        },
    }
})