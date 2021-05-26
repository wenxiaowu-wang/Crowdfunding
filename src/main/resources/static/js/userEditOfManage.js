let userEditOfManage_vm = new Vue({
    el:"#userEditOfManage",
    data:{
        form:{
            id:"",
            yonghuming:"",
            mima:"",
            xingming:"",
            xingbie:"",
            chushengnianyue:"",
            qq:"",
            youxiang:"",
            dianhua:"",
            shenfenzheng:"",
            touxiang:"",
            dizhi:"",
            beizhu:"",
            addtime:"",
            issh:"",
        },
        labelPosition:"right",
        formLabel:{
            admin_id: "",
            admin_password: ""
        }
    },
    methods: {
        onSubmit(){
            //提交修改
            let user = {};
            $.ajax({
                url: "/user/updateUserById",
                type: "post",
                data: {
                    id:this.form.id,
                    yonghuming:this.formatString(this.form.yonghuming),
                    mima:this.formatString(this.form.mima),
                    xingming:this.formatString(this.form.xingming),
                    xingbie:this.formatString(this.form.xingbie),
                    chushengnianyue:this.formatString(this.form.chushengnianyue),
                    qq:this.formatString(this.form.qq),
                    youxiang:this.formatString(this.form.youxiang),
                    dianhua:this.formatString(this.form.dianhua),
                    shenfenzheng:this.formatString(this.form.shenfenzheng),
                    touxiang:this.formatString(this.form.touxiang),
                    dizhi:this.formatString(this.form.dizhi),
                    beizhu:this.formatString(this.form.beizhu),
                    // addtime:this.formatString(this.form.addtime),
                    issh:this.formatString(this.form.issh),
                },
                dataType: 'json'
                , headers: 'updateUserById',
                success: function (msg) {
                    let theResult = res.data;
                    if (theResult){
                        this.$message({
                            type:'success',
                            message:"修改信息成功！"
                        });
                        refreshBgtDbTable();
                        window.close();
                    }else{
                        this.$message({
                            type:'error',
                            message:"修改信息失败！"
                        });
                    }
                }
            });
            // $.ajax({
            //     url: "/user/updateUserById",
            //     type: "POST",
            //     data: {
            //         id:this.form.id,
            //         yonghuming:this.formatString(this.form.yonghuming),
            //         mima:this.formatString(this.form.mima),
            //         xingming:this.formatString(this.form.xingming),
            //         xingbie:this.formatString(this.form.xingbie),
            //         chushengnianyue:this.formatString(this.form.chushengnianyue),
            //         qq:this.formatString(this.form.qq),
            //         youxiang:this.formatString(this.form.youxiang),
            //         dianhua:this.formatString(this.form.dianhua),
            //         shenfenzheng:this.formatString(this.form.shenfenzheng),
            //         touxiang:this.formatString(this.form.touxiang),
            //         dizhi:this.formatString(this.form.dizhi),
            //         beizhu:this.formatString(this.form.beizhu),
            //         addtime:this.formatString(this.form.addtime),
            //         issh:this.formatString(this.form.issh),
            //     },
            //     dataType: 'json',
            //     headers: 'updateUserById',
            //     // contentType:"application/json;charset=UTF-8",
            //     success: function (res) {
            //         // console.log(res);
            //         let theResult = res.data;
            //         if (theResult){
            //             this.$message({
            //                 type:'success',
            //                 message:"修改信息成功！"
            //             });
            //             refreshBgtDbTable();
            //             window.close();
            //         }
            //     }
            // });
        },
        cancel(){
            window.close();
        },
        formatString(str){
            if (str === null){
                return "空";
            }else {
                return str;
            }
        },
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
    },
    mounted(){
        //获取缓存id，根据id获取信息
        axios.get("/user/getUserBySessionId").then(response =>{
            //进行添加关注信息操作
            if (response.data !== null){
                let user = response.data.data;
                this.form.id = user.id;
                this.form.yonghuming = user.yonghuming;
                this.form.mima = user.mima;
                this.form.xingming = user.xingming;
                this.form.xingbie = user.xingbie;
                this.form.chushengnianyue = user.chushengnianyue;
                this.form.qq = user.qq;
                this.form.youxiang = user.youxiang;
                this.form.dianhua = user.dianhua;
                this.form.shenfenzheng = user.shenfenzheng;
                this.form.touxiang = user.touxiang;
                this.form.dizhi = user.dizhi;
                this.form.beizhu = user.beizhu;
                this.form.addtime = user.addtime;
                this.form.issh = user.issh;
            }else{
                console.log("信息获取不匹配！");
                this.$message({
                    type:'error',
                    message:'未选中目标或系统故障，获取信息失败！'
                });
            }
            // let object = JSON.stringify(response.data);
            // let object_int = parseInt(object);
        }).catch(error =>{
            this.$message({
                type:'error',
                message:"信息响应失败！"
            });
            console.log("信息响应失败");
        });
    }
})